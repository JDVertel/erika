import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth";
import { deleteApp, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, set, update, remove } from "firebase/database";
import firebase_api from "@/api/firebaseApi";
import { auth, firebaseConfig, firestore, realtimeDb } from "@/api/fire";
import { getCachedUserProfile } from "@/security/accessControl";

function withTimeout(promise, timeoutMs = 2500, timeoutCode = "unavailable") {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject({ code: timeoutCode }), timeoutMs);
    }),
  ]);
}

function getFirebaseErrorMessage(error, fallbackMessage) {
  const code = error?.code || "";
  const messageMap = {
    "auth/email-already-in-use": "El correo ya está en uso.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña es muy débil (mínimo 6 caracteres).",
    unavailable: "Firebase no respondió a tiempo. Intenta de nuevo.",
    "permission-denied": "No hay permisos suficientes para sincronizar el perfil.",
    "failed-precondition": "Firestore no está disponible o requiere configuración adicional.",
  };
  return messageMap[code] || `${fallbackMessage} (${code || "sin-codigo"})`;
}

function mapRealtimeUsers(data) {
  if (!data || typeof data !== "object") {
    return [];
  }

  return Object.entries(data).map(([uid, profile]) => ({ uid, ...profile }));
}

function buildLegacyDoc(profile) {
  if (profile.doc) {
    return profile.doc;
  }

  const tipo = profile.tipo_documento || "";
  const numero = profile.num_documento || "";
  return `${tipo}${numero}`.trim();
}

function buildProfesionalRecord(uid, profile) {
  return {
    id: uid,
    id_ips: profile.id_ips || "1",
    rol: "profesional",
    name1: profile.nombre || "",
    apell1: profile.apellido || "",
    tipo: profile.tipo_consulta || "",
    doc: buildLegacyDoc(profile),
    cel: profile.telefono || "",
    correo: profile.email || "",
    reg_medico: profile.tarjeta_profesional || "",
    tarjeta_profesional: profile.tarjeta_profesional || "",
    tipo_documento: profile.tipo_documento || "",
    num_documento: profile.num_documento || "",
    email: profile.email || "",
    telefono: profile.telefono || "",
    estado: profile.estado || "activo",
  };
}

function buildCurrentSessionUser() {
  const cachedProfile = getCachedUserProfile();
  const authUser = auth.currentUser;

  if (cachedProfile?.uid) {
    return {
      estado: "activo",
      modulosPermitidos: [],
      ...cachedProfile,
    };
  }

  if (!authUser) {
    return null;
  }

  return {
    uid: authUser.uid,
    email: authUser.email || "",
    nombre: authUser.displayName || "",
    apellido: "",
    telefono: "",
    rol: "usuario",
    id_ips: "1",
    estado: "activo",
    modulosPermitidos: [],
  };
}

function mergeUsersWithSessionUser(users) {
  const currentSessionUser = buildCurrentSessionUser();
  if (!currentSessionUser?.uid) {
    return users;
  }

  const existingIndex = users.findIndex((item) => item.uid === currentSessionUser.uid);
  if (existingIndex === -1) {
    return [currentSessionUser, ...users];
  }

  const mergedUsers = [...users];
  mergedUsers[existingIndex] = {
    ...mergedUsers[existingIndex],
    ...currentSessionUser,
  };
  return mergedUsers;
}

const state = () => ({
  users: [],
  loading: false,
  error: "",
  successMessage: "",
});

const getters = {
  totalUsers: (state) => state.users.length,
  
  // Retorna profesionales (usuarios con rol === "profesional")
  // Mapeados al formato legacy esperado por módulos de agendas
  getProfessionals: (state) => {
    return state.users
      .filter(user => user.rol === "profesional" && user.estado === "activo")
      .map(user => ({
        id: user.uid,
        id_ips: user.id_ips || "1",
        uid: user.uid,
        rol: "profesional",
        name1: user.nombre || "",
        apell1: user.apellido || "",
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        tipo: user.tipo_consulta || "",
        tipo_consulta: user.tipo_consulta || "",
        doc: user.doc || `${user.tipo_documento || ""}${user.num_documento || ""}`,
        cel: user.telefono || "",
        telefono: user.telefono || "",
        correo: user.email || "",
        email: user.email || "",
        reg_medico: user.tarjeta_profesional || "",
        tarjeta_profesional: user.tarjeta_profesional || "",
        tipo_documento: user.tipo_documento || "",
        num_documento: user.num_documento || "",
        estado: user.estado || "activo",
      }));
  },

  // Retorna profesionales filtrados por IPS
  getProfessionalsByIps: (state) => (id_ips = "1") => {
    return state.users
      .filter(user => user.rol === "profesional" && user.id_ips === id_ips && user.estado === "activo")
      .map(user => ({
        id: user.uid,
        id_ips: user.id_ips || "1",
        uid: user.uid,
        rol: "profesional",
        name1: user.nombre || "",
        apell1: user.apellido || "",
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        tipo: user.tipo_consulta || "",
        tipo_consulta: user.tipo_consulta || "",
        doc: user.doc || `${user.tipo_documento || ""}${user.num_documento || ""}`,
        cel: user.telefono || "",
        telefono: user.telefono || "",
        correo: user.email || "",
        email: user.email || "",
        reg_medico: user.tarjeta_profesional || "",
        tarjeta_profesional: user.tarjeta_profesional || "",
        tipo_documento: user.tipo_documento || "",
        num_documento: user.num_documento || "",
        estado: user.estado || "activo",
      }));
  },
};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
  setUsers(state, users) {
    state.users = users;
  },
  setError(state, message) {
    state.error = message;
  },
  setSuccessMessage(state, message) {
    state.successMessage = message;
  },
  clearMessages(state) {
    state.error = "";
    state.successMessage = "";
  },
  upsertUser(state, user) {
    const index = state.users.findIndex((item) => item.uid === user.uid);
    if (index === -1) {
      state.users = [...state.users, user];
      return;
    }
    const updated = [...state.users];
    updated[index] = { ...updated[index], ...user };
    state.users = updated;
  },
  removeUser(state, uid) {
    state.users = state.users.filter((user) => user.uid !== uid);
  },
};

const actions = {
  clearUserMessages({ commit }) {
    commit("clearMessages");
  },

  async ensureCurrentSessionUser({ commit }) {
    const currentSessionUser = buildCurrentSessionUser();
    if (!currentSessionUser?.uid) {
      return null;
    }

    commit("upsertUser", currentSessionUser);

    try {
      await withTimeout(set(ref(realtimeDb, `usuarios/${currentSessionUser.uid}`), currentSessionUser), 2000);
    } catch (error) {
      // No bloquea el flujo visual del listado.
    }

    try {
      await withTimeout(setDoc(doc(firestore, "user", currentSessionUser.uid), currentSessionUser, { merge: true }), 3000);
    } catch (error) {
      // Firestore sigue siendo sincronización secundaria.
    }

    return currentSessionUser;
  },

  async loadUsers({ commit, dispatch }) {
    commit("setLoading", true);
    commit("setError", "");

    try {
      const usersRef = collection(firestore, "user");
      const snapshot = await withTimeout(getDocs(usersRef), 2200);
      const users = snapshot.docs.map((item) => ({ uid: item.id, ...item.data() }));
      commit("setUsers", mergeUsersWithSessionUser(users));
    } catch (error) {
      try {
        const response = await withTimeout(firebase_api.get("/usuarios.json"), 2200);
        commit("setUsers", mergeUsersWithSessionUser(mapRealtimeUsers(response.data)));
        commit("setSuccessMessage", "Listado cargado desde Realtime Database por fallback.");
      } catch (fallbackError) {
        commit("setError", getFirebaseErrorMessage(fallbackError, "No se pudo cargar el listado de usuarios."));
      }
    } finally {
      await dispatch("ensureCurrentSessionUser");
      commit("setLoading", false);
    }
  },

  async createUserWithProfile({ commit, dispatch }, payload) {
    commit("setLoading", true);
    commit("clearMessages");

    let secondaryApp = null;
    let secondaryAuth = null;

    try {
      const {
        email,
        password,
        nombre,
        apellido,
        telefono,
        rol,
        id_ips,
        modulosPermitidos,
        tipo_documento,
        num_documento,
        tipo_consulta,
        tarjeta_profesional,
      } = payload;

      secondaryApp = initializeApp(firebaseConfig, `secondary-${Date.now()}`);
      secondaryAuth = getAuth(secondaryApp);
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const firebaseUser = userCredential.user;

      if (nombre || apellido) {
        await updateProfile(firebaseUser, {
          displayName: `${nombre || ""} ${apellido || ""}`.trim(),
        });
      }

      // Si es profesional, agregar automáticamente el módulo "profesional"
      let finalModulos = Array.isArray(modulosPermitidos) ? modulosPermitidos : [];
      if (rol === "profesional" && !finalModulos.includes("profesional")) {
        finalModulos = [...finalModulos, "profesional"];
      }

      const profile = {
        uid: firebaseUser.uid,
        email,
        nombre: nombre || "",
        apellido: apellido || "",
        telefono: telefono || "",
        rol: rol || "usuario",
        id_ips: id_ips || "",
        doc: buildLegacyDoc({ tipo_documento, num_documento }),
        modulosPermitidos: finalModulos,
        estado: "activo",
        createdAt: new Date().toISOString(),
        ...(rol === "profesional" && {
          tipo_documento: tipo_documento || "CC",
          num_documento: num_documento || "",
          tipo_consulta: tipo_consulta || "",
          tarjeta_profesional: tarjeta_profesional || "",
        }),
      };

      await withTimeout(set(ref(realtimeDb, `usuarios/${firebaseUser.uid}`), profile), 2500);

      // Si es profesional, sincronizar con la colección profesionales (usada por agendas)
      if (rol === "profesional") {
        const profRecord = buildProfesionalRecord(firebaseUser.uid, profile);
        try {
          await withTimeout(set(ref(realtimeDb, `profesionales/${firebaseUser.uid}`), profRecord), 3000);
        } catch (error) {
          // Fallback por REST para asegurar compatibilidad con módulos legacy.
          await withTimeout(firebase_api.put(`/profesionales/${firebaseUser.uid}.json`, profRecord), 3000);
        }
      }

      let syncedFirestore = true;
      try {
        await withTimeout(setDoc(doc(firestore, "user", firebaseUser.uid), profile), 3500);
      } catch (error) {
        syncedFirestore = false;
      }

      commit("upsertUser", profile);
      commit(
        "setSuccessMessage",
        syncedFirestore
          ? "Usuario creado correctamente en Auth, Firestore y Realtime Database."
          : "Usuario creado en Auth y Realtime Database. Firestore quedó pendiente de sincronización."
      );

      dispatch("loadUsers");
    } catch (error) {
      commit("setError", getFirebaseErrorMessage(error, "No se pudo crear el usuario."));
    } finally {
      if (secondaryAuth) {
        try {
          await signOut(secondaryAuth);
        } catch (error) {
          // No bloquea el flujo principal si la limpieza falla.
        }
      }
      if (secondaryApp) {
        try {
          await deleteApp(secondaryApp);
        } catch (error) {
          // No bloquea el flujo principal si la limpieza falla.
        }
      }
      commit("setLoading", false);
    }
  },

  async updateUserProfile({ commit }, payload) {
    commit("setLoading", true);
    commit("clearMessages");

    try {
      const { uid, nombre, apellido, telefono, rol, id_ips, estado, modulosPermitidos,
        tipo_documento, num_documento, tipo_consulta, tarjeta_profesional } = payload;

      // Si es profesional, agregar automáticamente el módulo "profesional"
      let finalModulos = Array.isArray(modulosPermitidos) ? modulosPermitidos : [];
      if (rol === "profesional" && !finalModulos.includes("profesional")) {
        finalModulos = [...finalModulos, "profesional"];
      }

      const updates = {
        nombre,
        apellido,
        telefono,
        rol,
        id_ips,
        estado,
        doc: buildLegacyDoc({ tipo_documento, num_documento }),
        modulosPermitidos: finalModulos,
        updatedAt: new Date().toISOString(),
        ...(rol === "profesional" && {
          tipo_documento: tipo_documento || "CC",
          num_documento: num_documento || "",
          tipo_consulta: tipo_consulta || "",
          tarjeta_profesional: tarjeta_profesional || "",
        }),
      };

      await withTimeout(update(ref(realtimeDb, `usuarios/${uid}`), updates), 2500);

      // Sincronizar / actualizar colección profesionales si corresponde
      if (rol === "profesional") {
        const profRecord = buildProfesionalRecord(uid, { ...updates, email: payload.email || "" });
        try {
          await withTimeout(set(ref(realtimeDb, `profesionales/${uid}`), profRecord), 3000);
        } catch (error) {
          // Fallback por REST para asegurar compatibilidad con módulos legacy.
          await withTimeout(firebase_api.put(`/profesionales/${uid}.json`, profRecord), 3000);
        }
      } else {
        // Si el rol cambió y ya no es profesional, remover de profesionales
        try {
          await withTimeout(remove(ref(realtimeDb, `profesionales/${uid}`)), 2000);
        } catch (error) {
          // Fallo silencioso
        }
      }

      let syncedFirestore = true;
      try {
        await withTimeout(updateDoc(doc(firestore, "user", uid), updates), 3500);
      } catch (error) {
        syncedFirestore = false;
      }

      commit("upsertUser", { uid, ...updates });
      commit(
        "setSuccessMessage",
        syncedFirestore
          ? "Perfil actualizado en Firestore y Realtime Database."
          : "Perfil actualizado en Realtime Database. Firestore quedó pendiente de sincronización."
      );
    } catch (error) {
      commit("setError", getFirebaseErrorMessage(error, "No se pudo actualizar el perfil."));
    } finally {
      commit("setLoading", false);
    }
  },

  async deleteUserData({ commit }, uid) {
    commit("setLoading", true);
    commit("clearMessages");

    try {
      await withTimeout(remove(ref(realtimeDb, `usuarios/${uid}`)), 2500);

      let syncedFirestore = true;
      try {
        await withTimeout(deleteDoc(doc(firestore, "user", uid)), 3500);
      } catch (error) {
        syncedFirestore = false;
      }

      commit("removeUser", uid);
      commit(
        "setSuccessMessage",
        syncedFirestore
          ? "Datos del usuario eliminados de Firestore y Realtime Database."
          : "Datos eliminados de Realtime Database. Firestore quedó pendiente de sincronización."
      );
    } catch (error) {
      commit("setError", getFirebaseErrorMessage(error, "No se pudo eliminar el perfil del usuario."));
    } finally {
      commit("setLoading", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
