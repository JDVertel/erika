import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/api/fire";
import {
  PUBLIC_ROUTE_NAMES,
  clearCachedUserProfile,
  getCachedUserProfile,
  hasModuleAccess,
  setCachedUserProfile,
} from "@/security/accessControl";
//aplicacion
import Home from "./../views/home.vue";
import About from "./../views/about.vue";
/* import Header from "./../views/header.vue"; */
// agendas
import Agendas from "./../components/agendas/agendas/index.vue";
//informes
import Informes from  "./../components/informes/index.vue";
//contenido web
import HomeVitrina from "./../components/vitrina/vitrinahome.vue";
//hc
import hc from "./../components/hc/hc.vue";
import buscar_hc from "./../components/hc/buscar_hc.vue";
//dashboard
import login from "./../views/login.vue";
//dashboard
import dashboardUsers from "./../components/dashboard/users/index.vue";
//quienesomos
import quienes_somos from "./../components/quienes_somos/index.vue";
import parametros from "./../components/parametros/index.vue";
import reservas from "./../components/agendas/reservas/rcitas.vue";
import ventas from "./../components/vitrina/ventas.vue";
import profesional from "./../components/profesional/index.vue";

const routes = [

  //home
  { path: "/", name: "home", component: Home },
  /* --------------------------------------------------------------- */
  //profesionales
  {
    path: "/profesional",
    component: profesional,
    name: "profesional",
    meta: { requiresAuth: true, moduleKey: "profesional" },
  },
  /* -------------------------------------------------------------------------------- */
  //usuarios -----
  { path: "/dashboard/usuarios", component: dashboardUsers, name: "dashboardUsuarios", meta: { requiresAuth: true, moduleKey: "users_admin" } },
  /* ------------- */
  // agendas
  { path: "/agendas", component: Agendas, name: "agendas", meta: { requiresAuth: true, moduleKey: "agendas" } },
  
  //buscar hc
  { path: '/buscar_hc', component: buscar_hc, name: "buscar_hc", meta: { requiresAuth: true, moduleKey: "hc" } },

  //hc
  { path: "/hc/:idpaciente/:idprofesional/:idips/:tipoC", component: hc, name: "hc", meta: { requiresAuth: true, moduleKey: "hc" } },

  /* -------------------------------------------------------------------------------- */
  { path: "/informes", component: Informes, name: "informes", meta: { requiresAuth: true, moduleKey: "informes" } },

  //login
  {
    path: "/login",
    component: login,
    name: "login",
  },
  /* ---------------------------------------------------------------- */
  //about
  { path: "/about", component: About, name: "about" },



  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  //contenido web
  {
    path: "/vitrina",
    component: HomeVitrina,
    name: "vitrina",
  },
//quienessomos
 { path: "/quienes_somos", component: quienes_somos, name: "quienes_somos" },

  //parametros
  { path: "/parametros", component: parametros, name: "parametros", meta: { requiresAuth: true, moduleKey: "parametros" } },
  { path: "/reservas/:id_user?", component: reservas, name: "reservas", meta: { requiresAuth: true, moduleKey: "reservas" } },
  { path: "/ventas", component: ventas, name: "ventas", meta: { requiresAuth: true, moduleKey: "ventas" } },




  /* { path: "/header", component: Header, name: "header" }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function getCurrentAuthUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function resolveUserProfile(uid) {
  const cachedProfile = getCachedUserProfile();
  if (cachedProfile && cachedProfile.uid === uid) {
    return cachedProfile;
  }

  try {
    const profileDoc = await getDoc(doc(firestore, "user", uid));
    if (!profileDoc.exists()) {
      return null;
    }

    const profile = { uid, ...profileDoc.data() };
    setCachedUserProfile(profile);
    return profile;
  } catch (error) {
    if (cachedProfile && cachedProfile.uid === uid) {
      return cachedProfile;
    }
    throw error;
  }
}

router.beforeEach(async (to) => {
  if (!to.meta?.requiresAuth || PUBLIC_ROUTE_NAMES.includes(to.name)) {
    return true;
  }

  const user = await getCurrentAuthUser();
  if (!user) {
    clearCachedUserProfile();
    return { name: "login", query: { redirect: to.fullPath } };
  }

  let profile = null;
  try {
    profile = await resolveUserProfile(user.uid);
  } catch (error) {
    const cached = getCachedUserProfile();
    if (cached && cached.uid === user.uid) {
      profile = cached;
    }
  }

  if (!profile) {
    clearCachedUserProfile();
    return { name: "login" };
  }

  if (!hasModuleAccess(profile, to.meta?.moduleKey)) {
    return { name: "home", query: { denied: to.name } };
  }

  return true;
});

export default router;
