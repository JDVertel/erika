import { createApp } from "vue";
//componentes-rutas
import App from "./App.vue";
import router from "./router/routes";

// store
import store from './store/index.js';

//bootstrap
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

//axios
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

//firebase

const app = createApp(App);

// Hacer bootstrap disponible globalmente
window.bootstrap = bootstrap;

app.use(store);
app.use(router);
app.mount('#app')


