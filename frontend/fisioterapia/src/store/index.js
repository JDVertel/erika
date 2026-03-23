import { createStore } from "vuex";

/**
 * VUEX STORE - Main Configuration
 * Centralized state management with namespaced modules
 * 
 * All modules are registered from the centralized modules directory
 * 
 * Modules:
 * - Auth: Authentication and company/page data management
 * - Agendas: Appointment scheduling and patient/professional management
 * - hc: Medical records (Historia Clínica)
 * - vitrina: E-commerce products, services, and invoicing
 * 
 * @see ./modules/index.js - Module registry and exports
 */

// Import modules from centralized location
import { Auth, Agendas, Hc, vitrina, users } from "./modules/index";

/**
 * Vuex Store Instance
 * All modules use namespacing for better organization and to avoid naming conflicts
 */
const store = createStore({
  modules: {
    Auth,
    Agendas,
    hc: Hc,
    vitrina,
    users
  },

  // Global error handler can be added here in the future
  // strict: process.env.NODE_ENV !== 'production'
});

export default store;
