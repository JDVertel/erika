/**
 * CONSOLIDATED STORE MODULES
 * Central location for all Vuex store modules
 * 
 * This directory will eventually contain all modules consolidated from:
 * - src/components/dashboard/store/auth/
 * - src/components/agendas/store/agendas/
 * - src/components/hc/store/hc/
 * - src/components/vitrina/store/vitrina/
 */

// Import all consolidated modules
import Auth from "./auth.module.js";
import Agendas from "./agendas.module.js";
import Hc from "./hc.module.js";
import vitrina from "./vitrina.module.js";

/**
 * Module Registry
 * Maps module names to their configurations
 * 
 * All modules have been consolidated and are now imported from their
 * individual .module.js files in this directory
 */
export const moduleRegistry = {
    Auth: {
        name: "Auth",
        namespace: "Auth",
        module: Auth,
        description: "Authentication and company/page data management",
        currentPath: "src/store/modules/auth.module.js",
        legacyPath: "src/components/dashboard/store/auth/",
        state: ["auth", "id_ips", "id_user", "rol", "DataEmpresa", "DataPagina", "stateEmpresa", "statePagina"],
        actions: 6,
        mutations: 3,
        consolidated: true
    },

    Agendas: {
        name: "Agendas",
        namespace: "Agendas",
        module: Agendas,
        description: "Appointment scheduling and patient/professional management",
        currentPath: "src/store/modules/agendas.module.js",
        legacyPath: "src/components/agendas/store/agendas/",
        state: ["datapaciente", "dataprofesionales", "datausuarios", "dataCitas", "dataAllCitas", "dataAgendas"],
        actions: 14,
        mutations: 11,
        consolidated: true
    },

    HC: {
        name: "HC",
        namespace: "hc",
        module: Hc,
        description: "Medical records (Historia Clínica)",
        currentPath: "src/store/modules/hc.module.js",
        legacyPath: "src/components/hc/store/hc/",
        state: ["id_paciente", "id_ips", "id_prof", "StateNumRegHC"],
        actions: 14,
        mutations: 1,
        consolidated: true
    },

    Vitrina: {
        name: "Vitrina",
        namespace: "vitrina",
        module: vitrina,
        description: "E-commerce products, services, and invoicing",
        currentPath: "src/store/modules/vitrina.module.js",
        legacyPath: "src/components/vitrina/store/vitrina/",
        state: ["entry", "cargando", "cant", "StateInventario", "StateFacturasDiarias", "StateQueryFacturas"],
        actions: 17,
        mutations: 7,
        consolidated: true
    }
};

/**
 * Get all modules for store registration
 */
export function getAllModules() {
    return Object.values(moduleRegistry).reduce((acc, module) => {
        acc[module.namespace] = module.module;
        return acc;
    }, {});
}

/**
 * Get module info by name
 */
export function getModuleInfo(moduleName) {
    return moduleRegistry[moduleName];
}

/**
 * List all modules
 */
export function listModules() {
    return Object.values(moduleRegistry).map(m => ({
        name: m.name,
        namespace: m.namespace,
        description: m.description,
        currentPath: m.currentPath,
        actions: m.actions,
        mutations: m.mutations
    }));
}

// Export modules individually for convenience
export { Auth, Agendas, Hc, vitrina };
