<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { auth, firestore, realtimeDb } from "@/api/fire";
import { MODULE_OPTIONS, setCachedUserProfile } from "@/security/accessControl";

export default {
    data: () => ({
        user: "",
        pass: "",
        loading: false,
        errorMessage: "",
    })

    ,
    methods: {
        withTimeout(promise, timeoutMs = 2500, timeoutCode = "unavailable") {
            return Promise.race([
                promise,
                new Promise((_, reject) => {
                    setTimeout(() => reject({ code: timeoutCode }), timeoutMs);
                }),
            ]);
        },

        isRecoverableProfileError(error) {
            const code = error?.code || "";
            return [
                "permission-denied",
                "unavailable",
                "failed-precondition",
                "resource-exhausted",
                "deadline-exceeded",
            ].includes(code);
        },

        buildEmergencyProfile(userAuth) {
            return {
                uid: userAuth.uid,
                email: userAuth.email || this.user,
                nombre: userAuth.displayName || "",
                apellido: "",
                telefono: "",
                id_ips: "1",
                rol: "admin",
                estado: "activo",
                modulosPermitidos: MODULE_OPTIONS.map((item) => item.key),
                emergencySession: true,
                createdAt: new Date().toISOString(),
            };
        },

        getFirebaseErrorMessage(error, fallbackMessage) {
            const code = error?.code || "";
            const messageMap = {
                "auth/invalid-email": "El correo no es válido.",
                "auth/user-not-found": "Usuario no encontrado.",
                "auth/wrong-password": "Contraseña incorrecta.",
                "permission-denied": "Permisos insuficientes en Firestore o Realtime Database.",
                "unavailable": "Firebase no está disponible temporalmente o la red está bloqueando la conexión.",
                "failed-precondition": "Firestore no está habilitado o requiere índice/configuración previa.",
            };
            return messageMap[code] || `${fallbackMessage} (${code || "sin-codigo"})`;
        },

        async login() {
            this.loading = true;
            this.errorMessage = "";

            try {
                const credentials = await signInWithEmailAndPassword(auth, this.user, this.pass);
                const uid = credentials.user.uid;
                let profile = null;

                try {
                    const profileDoc = await this.withTimeout(
                        getDoc(doc(firestore, "user", uid)),
                        2200
                    );
                    if (profileDoc.exists()) {
                        profile = { uid, ...profileDoc.data() };
                    }

                    if (!profile) {
                        // Buscar en Realtime Database (fuente primaria y más confiable)
                        try {
                            const rtSnap = await this.withTimeout(
                                get(ref(realtimeDb, `usuarios/${uid}`)),
                                2000
                            );
                            if (rtSnap.exists() && rtSnap.val()) {
                                profile = { uid, ...rtSnap.val() };
                            }
                        } catch (rtError) {
                            // Realtime DB no disponible, se continuará con perfil por defecto
                        }
                    }

                    if (!profile) {
                        const defaultProfile = {
                            uid,
                            email: credentials.user.email || this.user,
                            nombre: credentials.user.displayName || "",
                            apellido: "",
                            telefono: "",
                            id_ips: "1",
                            rol: "usuario",
                            estado: "activo",
                            modulosPermitidos: [],
                            createdAt: new Date().toISOString(),
                        };

                        try {
                            await this.withTimeout(
                                Promise.all([
                                    setDoc(doc(firestore, "user", uid), defaultProfile, { merge: true }),
                                    set(ref(realtimeDb, `usuarios/${uid}`), defaultProfile),
                                ]),
                                2200
                            );
                        } catch (writeError) {
                            // No bloquea el ingreso si la escritura falla
                        }

                        profile = defaultProfile;
                    }

                    let shouldPromoteToAdmin = false;
                    try {
                        const adminsSnapshot = await this.withTimeout(
                            getDocs(
                                query(collection(firestore, "user"), where("rol", "==", "admin"), limit(1))
                            ),
                            1800
                        );
                        shouldPromoteToAdmin = adminsSnapshot.empty;
                    } catch (error) {
                        shouldPromoteToAdmin = false;
                    }

                    if (shouldPromoteToAdmin) {
                        profile = {
                            ...profile,
                            rol: "admin",
                            modulosPermitidos: MODULE_OPTIONS.map((item) => item.key),
                            updatedAt: new Date().toISOString(),
                        };

                        await this.withTimeout(
                            Promise.all([
                                setDoc(doc(firestore, "user", uid), profile, { merge: true }),
                                set(ref(realtimeDb, `usuarios/${uid}`), profile),
                            ]),
                            2200
                        );
                    }
                } catch (profileError) {
                    if (!this.isRecoverableProfileError(profileError)) {
                        throw profileError;
                    }

                    profile = this.buildEmergencyProfile(credentials.user);
                    this.errorMessage = "Ingreso de emergencia: se autenticó el usuario pero Firestore/Realtime no respondió."
                }

                setCachedUserProfile(profile);

                this.$router.push({ name: "home", query: { openMenu: "1" } });
            } catch (error) {
                this.errorMessage = this.getFirebaseErrorMessage(error, "Credenciales inválidas o usuario sin acceso");
            } finally {
                this.loading = false;
            }
        },
    },

}
</script>

<template>
<div class="login-bg">
    <form class="login-form" @submit.prevent="login">
        
        <div class="login-logo-circle">
            <img src="https://img.icons8.com/?size=100&id=94&format=png&color=000000" alt="Logo" />
        </div>
        <h2 class="login-title">Bienvenido a OrtoRehab Vertel</h2>
        <p class="login-subtitle">Accede a tu cuenta</p>
        <div class="login-input-group">
            <label for="user">Usuario</label>
            <input type="email" id="user" v-model="user" placeholder="Ingresa tu usuario" autocomplete="username" required />
        </div>
        <div class="login-input-group">
            <label for="pass">Contraseña</label>
            <input type="password" id="pass" v-model="pass" placeholder="Ingresa tu contraseña" autocomplete="current-password" required />
        </div>

        <div v-if="errorMessage" class="alert alert-danger w-100 py-2" role="alert">
            {{ errorMessage }}
        </div>

        <button class="login-btn" type="submit" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ loading ? "Cargando sesión..." : "Ingresar" }}
        </button>


    </form>
</div>
</template>

<style>
.login-bg {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/images/fisio_inicio.jpg');
    background-size: cover;
    background-position: center;
}

.login-logo-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e0f7fa 60%, #34836e 100%);
    box-shadow: 0 2px 8px rgba(44, 118, 97, 0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.login-logo-circle img {
    width: 54px;
    height: 54px;
    filter: drop-shadow(0 2px 6px rgba(44, 118, 97, 0.18));
}

.login-form {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    padding: 2.5rem 2rem;
    min-width: 320px;
    max-width: 370px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-logo img {
    width: 60px;
    margin-bottom: 1rem;
}

.login-title {
    font-size: 1.7rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    text-align: center;
}

.login-subtitle {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    text-align: center;
}

.login-input-group {
    width: 100%;
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
}

.login-input-group label {
    font-size: 0.95rem;
    color: #2d3748;
    margin-bottom: 0.3rem;
}

.login-input-group input {
    padding: 0.7rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.7rem;
    font-size: 1rem;
    background: #f7fafc;
    transition: border 0.2s;
}

.login-input-group input:focus {
    border-color: #3182ce;
    outline: none;
}

.login-btn {
    width: 100%;
    padding: 0.8rem 0;
    background: linear-gradient(90deg, #3182ce 60%, #00b4d8 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0 2px 8px rgba(49, 130, 206, 0.12);
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
}



.setup-admin-box {
    width: 100%;
    margin-top: 1rem;
    border: 1px solid #d5e3ea;
    border-radius: 12px;
    padding: 0.9rem;
    background: #f8fbff;
}

.setup-admin-box h5 {
    margin-bottom: 0.8rem;
    color: #1e3a8a;
}

.login-btn:hover {
    background: linear-gradient(90deg, #2563eb 60%, #0096c7 100%);
    box-shadow: 0 4px 16px rgba(49, 130, 206, 0.18);
}
</style>
