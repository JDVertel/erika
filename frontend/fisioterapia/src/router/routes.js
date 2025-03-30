import { createRouter, createWebHistory } from "vue-router";
//aplicacion
import Home from "./../views/home.vue";
import About from "./../views/about.vue";
import Header from "./../views/header.vue";

// agendas
import Agendas from "./../components/agendas/agendas/index.vue";
//contenido web
import HomeVitrina from "./../components/vitrina/vitrinahome.vue";
//hc
import hc from "./../components/hc/hc.vue";
import buscar_hc from "./../components/hc/buscar_hc.vue";
//dashboard
import login from "./../views/login.vue";
//dashboard

import dashboard from "./../components/dashboard/index.vue";

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
  },
  /* -------------------------------------------------------------------------------- */
  //dashboard -----
  { path: "/dashboard", component: dashboard, name: "dashboard" },
  /* ------------- */
  // agendas
  { path: "/agendas", component: Agendas, name: "agendas" },
  //hc
  { path: "/buscar_hc/:idpaciente?", component: buscar_hc, name: "buscar_hc" },
  //hc 2
  { path: "/hc/:idpaciente?", component: hc, name: "hc" },

  /* -------------------------------------------------------------------------------- */
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


  //parametros
  { path: "/parametros", component: parametros, name: "parametros" },
  { path: "/reservas/:id_user", component: reservas, name: "reservas" },
  { path: "/ventas", component: ventas, name: "ventas" },



  /* { path: "/header", component: Header, name: "header" }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
