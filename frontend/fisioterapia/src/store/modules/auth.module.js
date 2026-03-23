/**
 * AUTH MODULE - Consolidated Vuex Module
 *
 * Manages authentication, user information, and company/page configuration
 *
 * Parts consolidated:
 * - state.js: Initial state structure
 * - actions.js: CRUD operations for company and page data
 * - mutations.js: State mutations
 * - getters.js: State getters (none currently in use)
 *
 * Original location: src/components/dashboard/store/auth/
 *
 * State properties:
 * - auth: Authentication status
 * - id_ips: IPS identifier
 * - id_user: User identifier
 * - rol: User role (admin, etc)
 * - DataEmpresa[]: Company data array
 * - DataPagina[]: Page data array
 * - stateEmpresa: CRUD state for company (crear, ver, actualizar)
 * - statePagina: CRUD state for page (crear, ver, actualizar)
 */

import firebase_api from "@/api/firebaseApi";

/**
 * STATE
 * Initial state definition with auth and company/page data
 */
const state = () => ({
    // Auth state
   /*  auth: true, */

    // IPS and User info (used in SidebarLayout, home.vue)
    /* id_ips: "1", */
    id_profesional: "-OM_G1R4rWmmq1GMZo1H",
    id_paciente: "",
    rol: "admin",

    // Company and Page data
    DataEmpresa: [],
    DataPagina: [],

    // Professionals data
    dataprofesionales: [],
    existeprofesionales: "",

    // State management for CRUD operations
    stateEmpresa: "crear", // crear, ver, actualizar
    statePagina: "crear", // crear, ver, actualizar
});

/**
 * GETTERS
 * Note: No getters currently in use - components access state directly via mapState
 */
const getters = {
    // Available for future use
};

/**
 * MUTATIONS
 * Synchronous state modifications
 */
const mutations = {
    /**
     * Set Company Data
     * Actualiza datos de la empresa
     */
    setStateEmpresa: (state, entradas) => {
        state.DataEmpresa = [];
        state.DataEmpresa = [...state.DataEmpresa, ...entradas];
        state.stateEmpresa = "ver";
    },

    /**
     * Set Page Data
     * Actualiza datos de página
     */
    setStatePagina: (state, entradas) => {
        state.DataPagina = [];
        state.DataPagina = [...state.DataPagina, ...entradas];
        state.statePagina = "ver";
    },

    /**
     * Set Generic State
     * Actualiza cualquier propiedad del estado
     */
    muta_setNewState: (state, entrada) => {
        state[entrada.state] = entrada.value;
    },

    /**
     * Set Professionals Data
     */
    setStateProfesionales: (state, entryDataProfesionales) => {
        state.dataprofesionales = [...entryDataProfesionales];
        state.existeprofesionales = entryDataProfesionales.length;
    },

    /**
     * Set Specific Professional Data
     */
    setStateDataProfesional: (state, entryDataProfesional) => {
        state.dataprofesionales = [...entryDataProfesional];
    },
};

/**
 * ACTIONS
 * Asynchronous operations and business logic
 */
const actions = {
    /**
     * EMPRESA DATA ACTIONS
     * Acciones para gestionar datos de la empresa (datos_empresa)
     */

    /**
     * Crear nueva empresa
     * @param {Object} context - Vuex context
     * @param {Object} entradasE - {id_ips, nombre, nit, desc, direccion, celular, wsp, logo, bd}
     */
    Action_createDataEmpresa: async ({ commit }, entradasE) => {
        console.log("Creating new company:", entradasE);
        const { id_ips, nombre, nit, desc, direccion, celular, wsp, logo, bd } = entradasE;
        const DataToSaveE = { id_ips, nombre, nit, desc, direccion, celular, wsp, logo, bd };
        const Ruta = `/${bd}.json`;
        await firebase_api.post(Ruta, DataToSaveE);
    },

    /**
     * Actualizar datos de empresa existente
     * @param {Object} context - Vuex context
     * @param {Object} entradasE - {id_ips, nombre, nit, desc, direccion, celular, wsp, logo, bd, rta, id}
     */
    Action_update_Empresa: async ({ commit }, entradasE) => {
        console.log("Updating company:", entradasE);
        const {
            id_ips,
            nombre,
            nit,
            desc,
            direccion,
            celular,
            wsp,
            logo,
            bd,
            rta,
            id,
        } = entradasE;
        const dataToUpdateE = { id_ips, nombre, nit, desc, direccion, celular, wsp, logo };
        const rutaE = `/${bd}/${id}.json`;
        await firebase_api.put(rutaE, dataToUpdateE);
        commit(rta, { ...entradasE });
    },

    /**
     * PAGE DATA ACTIONS
     * Acciones para gestionar datos de página (datos_pagina)
     */

    /**
     * Crear nueva página de datos
     * @param {Object} context - Vuex context
     * @param {Object} entradasP - {quienessomos, mision, vision, nuestrosservicios, etc}
     */
    Action_createDataPagina: async ({ commit }, entradasP) => {
        console.log("Creating new page data:", entradasP);
        const {
            quienessomos,
            mision,
            vision,
            nuestrosservicios,
            nuestrosservicios_lm,
            clasesrutinas,
            clasesrutinas_lm,
            tiendaonline,
            tiendaonline_lm,
            bd,
            id_ips,
        } = entradasP;
        const DataToSaveP = {
            quienessomos,
            mision,
            vision,
            nuestrosservicios,
            nuestrosservicios_lm,
            clasesrutinas,
            clasesrutinas_lm,
            tiendaonline,
            tiendaonline_lm,
            bd,
            id_ips,
        };
        const Ruta = `/${bd}.json`;
        await firebase_api.post(Ruta, DataToSaveP);
    },

    /**
     * Actualizar datos de página existente
     * @param {Object} context - Vuex context
     * @param {Object} entradasP - incluye todos los campos de página más id, rta, bd
     */
    Action_update_Pagina: async ({ commit }, entradasP) => {
        console.log("Updating page data:", entradasP);
        const {
            quienessomos,
            mision,
            vision,
            nuestrosservicios,
            nuestrosservicios_lm,
            clasesrutinas,
            clasesrutinas_lm,
            tiendaonline,
            tiendaonline_lm,
            id,
            id_ips,
            rta,
            bd,
        } = entradasP;
        const dataToUpdateP = {
            quienessomos,
            mision,
            vision,
            nuestrosservicios,
            nuestrosservicios_lm,
            clasesrutinas,
            clasesrutinas_lm,
            tiendaonline,
            tiendaonline_lm,
            id_ips,
        };
        const rutaP = `/${bd}/${id}.json`;
        await firebase_api.put(rutaP, dataToUpdateP);
        commit(rta, { ...entradasP });
    },

    /**
     * GET DATA BY PARAMETER
     * Obtiene datos de Firebase filtrando por un parámetro específico
     * Se usa en la carga inicial para traer datos de empresa o página
     * @param {Object} context - Vuex context
     * @param {Array} parametros - [{bd, parametro, valor, mutation}]
     */
    getDataIPSbyParam: async ({ commit }, parametros) => {
        const [{ bd, parametro, valor, mutation }] = parametros;
        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                equalTo: `"${valor}"`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data)) {
            datasalida.push({ id, ...data[id] });
        }
        if (datasalida.length > 0) {
            commit(`${mutation}`, datasalida);
        }
        return datasalida;
    },

    /**
     * UTILITY ACTIONS
     */

    /**
     * Get Data by Parameter
     * Obtiene datos filtrando por un parámetro específico
     * Se usa para traer datos de profesionales
     * @param {Object} context - Vuex context
     * @param {Array} parametros - [{bd, parametro, valor, rta}]
     */
    getDatabyParam: async ({ commit }, parametros) => {
        const [{ bd, parametro, valor, rta }] = parametros;
        console.log("Getting data by parameter:", { bd, parametro, valor });
        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                equalTo: `"${valor}"`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data)) {
            datasalida.push({ id, ...data[id] });
        }
        if (datasalida.length > 0) {
            commit(`${rta}`, datasalida);
        }
        return datasalida;
    },

    /**
     * Get Data by Primary Key
     * Obtiene un registro específico usando su clave principal
     * Se usa para traer datos de un profesional específico
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {bd, clavePrincipal, rta}
     */
    getDatabyKey: async ({ commit }, parametros) => {
        const { bd, clavePrincipal, rta } = parametros;
        console.log("Getting data by key:", { bd, clavePrincipal });
        const response = await firebase_api.get(`/${bd}/${clavePrincipal}.json`);
        const data = response.data;
        const datasalida = [];
        if (data) {
            datasalida.push({ id: clavePrincipal, ...data });
        }
        if (datasalida.length > 0) {
            commit(rta, datasalida);
        }
        return datasalida;
    },

    /**
     * Cambiar estado de un campo en el store
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {state, value, mutation}
     */
    ChangeState: async ({ commit }, parametros) => {
        const { state, value, mutation } = parametros;
        commit(`${mutation}`, { state, value });
    },
};

/**
 * Module Export
 * Configured with namespacing enabled for clean organization
 */
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
