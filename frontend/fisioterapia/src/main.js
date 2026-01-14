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

// Error handler global para capturar y manejar errores de render
app.config.errorHandler = (error, instance, info) => {
    // Ignorar error de parentNode null que ocurre durante transiciones de rutas
    if (error && error.message && error.message.includes("parentNode")) {
        console.warn("Warning: parentNode access during route transition", error);
        return; // No propagar el error
    }

    // Ignorar errores de propiedades undefined en componentes que se están desmontando
    if (error && error.message && (error.message.includes("Cannot read properties of undefined") || error.message.includes("Cannot read property"))) {
        console.warn("Warning: Property access on undefined/null during component unmount", error);
        return; // No propagar el error
    }

    // Para otros errores, mostrar en consola
    console.error(`Error: ${info}`, error);
};

app.use(store);
app.use(router);
app.mount('#app')



