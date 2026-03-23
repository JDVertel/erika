<script>
import { mapState } from "vuex";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref as dbRef } from "firebase/database";
import { auth, realtimeDb } from "@/api/fire";
import {
  clearCachedUserProfile,
  getCachedUserProfile,
  setCachedUserProfile,
  hasModuleAccess,
} from "@/security/accessControl";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;
const ACTIVITY_EVENTS = ["click", "keydown", "mousemove", "scroll", "touchstart"];

export default {
  name: "SidebarLayout",
  components: {},
  props: {
    params: {
      type: Array,
      default: () => [], // Valor por defecto si no se pasa nada
    },
  },
  data() {
    return {
      isNavbarOpen: false,
      imagenlogo: "./../assets/logo.png",
      inactivityTimerId: null,
      sessionProfile: getCachedUserProfile(),
      authUser: auth.currentUser,
      authUnsubscribe: null,
    };
  },
  methods: {
    mapAction() {
      // Completar acción según necesidad
    },
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    toggleNavbarCloset() {
      this.isNavbarOpen = false;
    },
    openMenuIfRequested() {
      if (this.$route?.query?.openMenu === "1") {
        this.isNavbarOpen = true;
        const { openMenu, ...restQuery } = this.$route.query;
        this.$router.replace({ query: restQuery });
      }
    },
    reservasRoute() {
      const profile = getCachedUserProfile();
      return `/reservas/${profile?.uid || ""}`;
    },
    canAccess(moduleKey) {
      const profile = this.sessionProfile || getCachedUserProfile();
      return hasModuleAccess(profile, moduleKey);
    },
    async refreshProfileFromDb(uid) {
      try {
        const snap = await Promise.race([
          get(dbRef(realtimeDb, `usuarios/${uid}`)),
          new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000)),
        ]);
        if (snap.exists && snap.exists() && snap.val()) {
          const freshProfile = { uid, ...snap.val() };
          setCachedUserProfile(freshProfile);
          this.sessionProfile = freshProfile;
        }
      } catch (error) {
        // No bloquea la UI si falla la actualización del perfil
      }
    },
    syncSessionProfile() {
      const cachedProfile = getCachedUserProfile();
      if (cachedProfile) {
        this.sessionProfile = cachedProfile;
        return;
      }

      if (this.authUser) {
        this.sessionProfile = {
          uid: this.authUser.uid,
          email: this.authUser.email || "",
          nombre: this.authUser.displayName || "",
          apellido: "",
          rol: "usuario",
        };
        return;
      }

      this.sessionProfile = null;
    },
    clearInactivityTimer() {
      if (this.inactivityTimerId) {
        clearTimeout(this.inactivityTimerId);
        this.inactivityTimerId = null;
      }
    },
    scheduleInactivityTimer() {
      this.clearInactivityTimer();
      if (!this.hasActiveSession) {
        return;
      }
      this.inactivityTimerId = setTimeout(() => {
        this.performLogout(true);
      }, INACTIVITY_TIMEOUT_MS);
    },
    handleUserActivity() {
      if (!this.hasActiveSession) {
        return;
      }
      this.scheduleInactivityTimer();
    },
    async performLogout(isAutomatic = false) {
      this.clearInactivityTimer();
      clearCachedUserProfile();
      this.sessionProfile = null;

      try {
        await signOut(auth);
      } catch (error) {
        // Incluso si signOut falla, se limpia el estado local para cortar acceso.
      }

      if (this.$route.name !== "login") {
        await this.$router.push({
          name: "login",
          query: isAutomatic ? { sessionExpired: "1" } : {},
        });
      }
    },
    attachActivityListeners() {
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.addEventListener(eventName, this.handleUserActivity, { passive: true });
      });
    },
    detachActivityListeners() {
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, this.handleUserActivity);
      });
    },
  },
  computed: {
    ...mapState("Auth", ["rol", "id_ips", "id_user"]),
    hasActiveSession() {
      return Boolean(this.sessionProfile || this.authUser);
    },
    isAdminSession() {
      return this.sessionProfile?.rol === "admin";
    },
    sessionDisplayName() {
      if (!this.sessionProfile) {
        return "Invitado";
      }

      const fullName = [this.sessionProfile.nombre, this.sessionProfile.apellido]
        .filter(Boolean)
        .join(" ")
        .trim();

      return fullName || this.sessionProfile.email || "Usuario autenticado";
    },
    sessionRoleLabel() {
      if (!this.sessionProfile?.rol) {
        return "Sin rol";
      }

      const roleMap = {
        admin: "Administrador",
        profesional: "Profesional",
        usuario: "Usuario",
      };

      return roleMap[this.sessionProfile.rol] || this.sessionProfile.rol;
    },
    sessionRoleClass() {
      const role = this.sessionProfile?.rol || "usuario";
      return `role-theme-${role}`;
    },

    // Determina si el grupo "Opciones principales" tiene al menos un ítem visible
    hasOpcionesPrincipales() {
      return (
        this.canAccess("users_admin") ||
        this.canAccess("informes") ||
        this.canAccess("agendas") ||
        this.canAccess("hc") ||
        this.canAccess("vitrina") ||
        this.canAccess("parametros")
      );
    },

    // Determina si el grupo "Otras opciones" tiene al menos un ítem visible
    hasOtrasOpciones() {
      return (
        this.canAccess("reservas") ||
        this.canAccess("ventas") ||
        this.canAccess("profesional")
      );
    },
  },
  mounted() {
    this.syncSessionProfile();
    this.attachActivityListeners();
    this.scheduleInactivityTimer();
    this.openMenuIfRequested();

    this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
      this.authUser = user;
      if (!user) {
        clearCachedUserProfile();
        this.sessionProfile = null;
        this.clearInactivityTimer();
        return;
      }

      this.syncSessionProfile();
      this.scheduleInactivityTimer();
      // Refrescar perfil completo desde Realtime DB para obtener modulosPermitidos actualizados
      this.refreshProfileFromDb(user.uid);
    });
  },
  beforeUnmount() {
    this.clearInactivityTimer();
    this.detachActivityListeners();
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
      this.authUnsubscribe = null;
    }
  },
};
</script>

<template>
  <div>
    <div class="layout-wrapper">
      <!-- Overlay -->
      <div v-if="isNavbarOpen" class="sidebar-overlay" @click="toggleNavbar"></div>

      <!-- Sidebar -->
      <nav id="sidebar" :class="{ active: isNavbarOpen }">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between align-items-center">
            <h3>FisioApp</h3>
            <button class="btn-close btn-close-white" @click="toggleNavbar"></button>
          </div>
        </div>

        <ul class="list-unstyled components">
          <li v-if="canAccess('home')">
            <router-link to="/" @click="toggleNavbar" class="nav-link">
              <img
                class="icono"
                width="18"
                height="18"
                src="https://img.icons8.com/ios-filled/50/home.png"
                alt="home"
              />
              <span>Home</span>
            </router-link>
          </li>
          <li v-if="canAccess('quienes_somos')">
            <router-link to="/quienes_somos" @click="toggleNavbar" class="nav-link">
              <img
                class="icono"
                width="18"
                height="18"
                src="https://img.icons8.com/?size=100&id=77&format=png&color=000000"
                alt="quienes"
              />
              <span>Quienes somos</span>
            </router-link>
          </li>
          <li v-if="canAccess('about')">
            <router-link to="/about" @click="toggleNavbar" class="nav-link">
              <img
                class="icono"
                width="18"
                height="18"
                src="https://img.icons8.com/?size=100&id=3439&format=png&color=000000"
                alt="about"
              />
              <span>About</span>
            </router-link>
          </li>
          <li v-if="!hasActiveSession">
            <router-link to="/login" @click="toggleNavbar" class="nav-link">
              <img
                class="icono"
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/key--v1.png"
                alt="login"
              />
              <span>Login</span>
            </router-link>
          </li>

          <template v-if="hasActiveSession">
            <template v-if="hasOpcionesPrincipales">
              <li class="menu-separator"></li>
              <li class="menu-section-title">Opciones principales</li>
            </template>
            <li v-if="canAccess('users_admin')">
              <router-link to="/dashboard/usuarios" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/ios/50/conference-call--v1.png"
                  alt="usuarios"
                />
                <span>Usuarios</span>
              </router-link>
            </li>
            <li v-if="canAccess('informes')">
              <router-link to="/informes" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=53380&format=png&color=000000"
                  alt="informes"
                />
                <span>Informes</span>
              </router-link>
            </li>
            <li v-if="canAccess('agendas')">
              <router-link to="/agendas" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=63765&format=png&color=000000"
                  alt="agendas"
                />
                <span>Agendas</span>
              </router-link>
            </li>
            <li v-if="canAccess('hc')">
              <router-link to="/buscar_hc" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=9774&format=png&color=000000"
                  alt="historia clinica"
                />
                <span>Historia Clínica</span>
              </router-link>
            </li>
            <li v-if="canAccess('vitrina')">
              <router-link to="/vitrina" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=74058&format=png&color=000000"
                  alt="vitrina"
                />
                <span>Vitrina</span>
              </router-link>
            </li>
            <li v-if="canAccess('parametros')">
              <router-link to="/parametros" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
                  alt="parametros"
                />
                <span>Parámetros</span>
              </router-link>
            </li>

            <template v-if="hasOtrasOpciones">
              <li class="menu-separator"></li>
              <li class="menu-section-title">Otras opciones</li>
            </template>
            <li v-if="canAccess('reservas')">
              <router-link :to="reservasRoute()" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=78945&format=png&color=000000"
                  alt="reservas"
                />
                <span>Reservas</span>
              </router-link>
            </li>
            <li v-if="canAccess('ventas')">
              <router-link to="/ventas" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/?size=100&id=100257&format=png&color=000000"
                  alt="ventas"
                />
                <span>Facturar</span>
              </router-link>
            </li>
            <li v-if="canAccess('profesional')">
              <router-link to="/profesional" @click="toggleNavbar" class="nav-link">
                <img
                  class="icono"
                  width="18"
                  height="18"
                  src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/64/external-11-disaster-febrian-hidayat-glyph-febrian-hidayat.png"
                  alt="profesional"
                />
                <span>Profesional</span>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>

      <!-- Main Content -->
      <div id="content">
        <!-- Top Navigation -->
        <nav class="navbar navbar-expand-lg session-topbar">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn" @click="toggleNavbar">
              <span class="navbar-toggler-icon"> </span>
            </button>
            <span class="navbar-text">Tu recuperación es nuestro objetivo !</span>
          </div>
        </nav>

        <!-- Main Content -->
        <div class="content-body">
          <slot></slot>
        </div>

        <!-- Barra de sesión activa (reemplaza el footer) -->
        <div v-if="hasActiveSession" class="session-banner" :class="sessionRoleClass">
          <div class="session-banner-copy">
            <span class="session-banner-label">Sesión activa</span>
            <span class="session-banner-user">{{ sessionDisplayName }}</span>
            <span class="session-banner-role">{{ sessionRoleLabel }}</span>
          </div>
          <button
            type="button"
            class="btn btn-light btn-sm session-banner-button"
            @click="performLogout(false)"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

#sidebar {
  min-width: 170px;
  max-width: 220px;
  background: #34836e;
  color: #fff;
  transition: all 0.3s ease-in-out;
  position: fixed;
  height: 100vh;
  left: -250px;
  top: 0;
  z-index: 1050;
  box-shadow: 2px 0 16px 0 rgba(44, 118, 97, 0.12);
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}

#sidebar.active {
  left: 0;
}

.sidebar-header {
  padding: 20px;
  background: #2c7661;
}

.sidebar-header h3 {
  color: #fff;
  margin: 0;
  padding: 10px 0;
}

#sidebar ul {
  padding: 0;
  list-style: none;
}

#sidebar ul li {
  margin-bottom: 6px;
}

.menu-separator {
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  margin: 10px 14px;
}

.menu-section-title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
  padding: 2px 18px 8px;
  margin-bottom: 2px;
}

#sidebar ul li a {
  padding: 13px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(44, 118, 97, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}

#sidebar ul li a:hover {
  background: #2c7661;
  box-shadow: 0 4px 16px rgba(44, 118, 97, 0.18);
}

.icono {
  filter: invert(1);
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.navbar-text {
  color: #fff;
}

.session-topbar {
  background-color: #34836e;
  transition: background-color 0.25s ease;
}

#sidebarCollapse {
  background-color: transparent;
  border: none;
  color: white;
}

#sidebarCollapse:hover {
  background-color: #2c7661;
}

.session-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 20px;
  color: #ffffff;
  transition: background-color 0.25s ease;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  min-height: 50px;
}

.session-banner-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.session-banner-label {
  font-size: 0.68rem;
  opacity: 0.88;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.session-banner-user {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
}

.session-banner-role {
  font-size: 0.76rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.session-banner-button {
  flex-shrink: 0;
  color: #0b4f8a;
  border-color: rgba(255, 255, 255, 0.6);
}

.session-banner-button:hover {
  color: #08375f;
}

.role-theme-admin {
  background: linear-gradient(90deg, #0b4f8a 0%, #1273c4 100%);
}

.role-theme-profesional {
  background: linear-gradient(90deg, #1f6f78 0%, #2ea3b0 100%);
}

.role-theme-usuario {
  background: linear-gradient(90deg, #5c6f7b 0%, #7f97a6 100%);
}

.content-body {
  padding: 20px;
  padding-bottom: 110px;
  flex: 1;
}

@media (max-width: 768px) {
  .layout-wrapper {
    overflow-x: hidden;
  }

  #sidebar {
    width: 100%;
  }

  .session-banner {
    flex-direction: column;
    align-items: flex-start;
  }

  .session-banner-button {
    width: 100%;
  }

  .content-body {
    padding-bottom: 160px;
  }
}
</style>
