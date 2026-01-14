/**
 * AGENDAS MODULE - Consolidated Vuex Module
 * 
 * Manages appointments, patients, professionals, and schedules
 * 
 * Parts consolidated:
 * - state.js: Initial state structure
 * - actions.js: Data retrieval, creation, and manipulation
 * - mutations.js: State mutations
 * - getters.js: State getters (none currently in use)
 * 
 * Original location: src/components/agendas/store/agendas/
 * 
 * State properties:
 * - datapaciente[]: Patient data array
 * - dataprofesionales[]: Professionals data array
 * - datausuarios[]: Users data array
 * - dataCitas[]: Appointments data array
 * - dataAllCitas[]: All appointments data array
 * - dataAllCitasPaciente[]: All appointments for specific patient
 * - dataAgendas[]: Agendas/schedules array
 * - existepaciente: Patient existence flag
 * - existeprofesionales: Professionals existence flag
 * - existeusuarios: Users existence flag
 */

import firebase_api from "@/api/firebaseApi";

/**
 * STATE
 * Initial state definition for agendas, appointments, and related data
 */
const state = () => ({
    // Patients data
    datapaciente: [],
    existepaciente: "",

    // Professionals data
    dataprofesionales: [],
    existeprofesionales: "",

    // Users data
    datausuarios: [],
    existeusuarios: "",

    // Appointments data
    dataCitas: [],
    dataAllCitas: [],
    dataAllCitasPaciente: [],

    // Agendas/Schedules
    dataAgendas: [],
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
     * Set Patient Data
     */
    setStatePaciente: (state, entryDataPaciente) => {
        state.datapaciente = [...entryDataPaciente];
        state.existepaciente = entryDataPaciente.length;
    },

    /**
     * Set No Patient Found
     */
    SetStatenoregistrado: (state, noreg) => {
        state.existepaciente = noreg;
    },

    /**
     * Set Agendas Data
     */
    setStateAgendas: (state, data) => {
        state.dataAgendas = [...data];
    },

    /**
     * Set Appointments Data
     */
    setStateCitas: (state, citas) => {
        state.dataCitas = [...citas];
    },

    /**
     * Set All Appointments Data
     */
    setStateAllCitas: (state, citas) => {
        state.dataAllCitas = [...citas];
    },

    /**
     * Clear All Data
     */
    ClearStoreM: (state) => {
        state.dataCitas = [];
        state.dataAgendas = [];
        state.datapaciente = [];
        state.existepaciente = "";
        state.dataprofesionales = [];
        state.existeprofesionales = "";
    },

    /**
     * Clear Patient Data
     */
    ClearStorePaciente: (state) => {
        state.dataAllCitasPaciente = [];
        state.datapaciente = [];
        state.existepaciente = "";
    },

    /**
     * Set Professionals Data
     */
    setStateProfesionales: (state, entryDataProfesionales) => {
        state.dataprofesionales = [...entryDataProfesionales];
        state.existeprofesionales = entryDataProfesionales.length;
    },

    /**
     * Set Users Data
     */
    setStateUsuarios: (state, entryDataUsuarios) => {
        state.datausuarios = [...entryDataUsuarios];
        state.existeusuarios = entryDataUsuarios.length;
    },

    /**
     * Close Patient Modal
     */
    ClosetModalP: (state) => {
        state.existeusuarios = 0;
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
     * Get Agendas by Parameter
     * Obtiene agendas filtrando por parámetro específico
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
     * Get Data By Range (Greater Than)
     * Obtiene datos filtrando por rango superior (ej: fechas mayores a una fecha específica)
     * @param {Object} context - Vuex context
     * @param {Array} parametros - [{bd, parametro, valor, rta}]
     */
    getDataByRangoSuperior: async ({ commit }, parametros) => {
        const [{ bd, parametro, valor, rta }] = parametros;
        console.log("Getting data by range (superior):", { bd, parametro, valor });
        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                startAt: `"${valor}"`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data)) {
            datasalida.push({ id, ...data[id] });
        }
        // Ordenar por fecha
        datasalida.sort((a, b) => {
            if (a.fecha < b.fecha) return -1;
            if (a.fecha > b.fecha) return 1;
            return 0;
        });
        if (datasalida.length > 0) {
            commit(`${rta}`, datasalida);
        }
    },

    /**
     * Create New Agenda
     * Crea una nueva agenda
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_profesional, fecha, id_ips, clase, bd}
     */
    CreateAgendaNueva: async ({ commit }, entradas) => {
        console.log("Creating new agenda:", entradas);
        const { id_profesional, fecha, id_ips, clase, bd } = entradas;
        const D_Save = { id_profesional, fecha, id_ips, clase };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, D_Save);
        D_Save.id = data.name;
    },

    /**
     * Get Users by Parameter
     * Obtiene usuarios/pacientes filtrando por parámetro
     * @param {Object} context - Vuex context
     * @param {Array} parametros - [{bd, parametro, valor, rta}]
     */
    getDataUsersbyParam: async ({ commit }, parametros) => {
        const [{ bd, parametro, valor, rta }] = parametros;
        console.log("Getting users by parameter:", { bd, parametro, valor });
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
        } else {
            commit("SetStatenoregistrado", 2);
        }
    },

    /**
     * Get Users by Parameter (Alias - Flexible payload)
     * Permite consumir el mismo flujo que `getDataUsersbyParam` pero aceptando
     * estructuras de parámetros con llaves `parametro1`/`valor1` usadas en componentes antiguos.
     * @param {Object} context - Vuex context
     * @param {Array} parametros - [{bd, parametro|parametro1, valor|valor1, rta}]
     */
    NewgetDataUsersbyParam: async ({ commit }, parametros) => {
        const [p] = parametros;
        const bd = p.bd;
        const rta = p.rta;
        const parametro = p.parametro !== undefined ? p.parametro : p.parametro1;
        const valor = p.valor !== undefined ? p.valor : p.valor1;
        console.log("Getting users by parameter (alias):", { bd, parametro, valor });

        if (!bd || !parametro || typeof valor === "undefined") {
            console.warn("NewgetDataUsersbyParam: parámetros inválidos", p);
            return [];
        }

        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                equalTo: `"${valor}"`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data || {})) {
            datasalida.push({ id, ...data[id] });
        }
        if (datasalida.length > 0 && rta) {
            commit(`${rta}`, datasalida);
        }
        return datasalida;
    },

    /**
     * Create New Appointment (Cita)
     * Crea una nueva cita médica
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {paciente, numdoc, telpaciente, estado, hora, id_agenda, tipo, fecha, idprofesional, bd}
     */
    createEntradaCitaNueva: async ({ commit }, entradas) => {
        console.log("Creating new appointment:", entradas);
        const { paciente, numdoc, telpaciente, estado, hora, id_agenda, tipo, fecha, idprofesional, bd } = entradas;
        const DataToSave = { paciente, numdoc, telpaciente, estado, hora, id_agenda, tipo, fecha, idprofesional };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
    },

    /**
     * Create New Patient
     * Crea un nuevo paciente
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {numdoc, name1, name2, apell1, apell2, celular, email, dir, fnacimiento, bd}
     */
    createEntradanewPaciente: async ({ commit }, entradas) => {
        console.log("Creating new patient:", entradas);
        const { numdoc, name1, name2, apell1, apell2, celular, email, dir, fnacimiento, bd } = entradas;
        const DataToSave = { numdoc, name1, name2, apell1, apell2, celular, email, dir, fnacimiento };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
    },

    /**
     * Close Modal New Patient
     * @param {Object} context - Vuex context
     */
    ClosetModalNewPaciente: async ({ commit }) => {
        commit("ClosetModalP");
    },

    /**
     * Create New User
     * Crea un nuevo usuario (admin, profesional, etc)
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, estado, nombre, pass, rol, doc, bd}
     */
    createEntradaUser: async ({ commit }, entradas) => {
        console.log("Creating new user:", entradas);
        const { id_ips, estado, nombre, pass, rol, doc, bd } = entradas;
        const DataToSave = { id_ips, estado, doc, nombre, pass, rol };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
    },

    /**
     * Create New Professional
     * Crea un nuevo profesional
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, estado, doc, name1, name2, apell1, apell2, cel, reg_medico, tipo, correo, bd}
     */
    createEntradaProf: async ({ commit }, entradas) => {
        console.log("Creating new professional:", entradas);
        const { id_ips, estado, doc, name1, name2, apell1, apell2, cel, reg_medico, tipo, correo, bd } = entradas;
        const DataToSave = { id_ips, estado, doc, name1, name2, apell1, apell2, cel, reg_medico, tipo, correo };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
    },

    /**
     * Delete Item
     * Elimina un elemento de una colección
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id, bd}
     */
    DeleteItem: async ({ commit }, entradas) => {
        console.log("Deleting item:", entradas);
        const { id, bd } = entradas;
        const Ruta = `/${bd}/${id}.json`;
        await firebase_api.delete(Ruta);
    },

    /**
     * Clear Data Store
     * Limpia los datos del store
     * @param {Object} context - Vuex context
     */
    clearDataStoreA: async ({ commit }) => {
        commit("ClearStoreM");
    },

    /**
     * Clear Patient Store
     * Limpia los datos de paciente del store
     * @param {Object} context - Vuex context
     */
    clearStorePaciente: async ({ commit }) => {
        commit("ClearStorePaciente");
    },

    /**
     * Update Reservation Status
     * Actualiza el estado de una reserva/cita
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id, estado, bd}
     */
    updateReserva: async ({ commit }, entradas) => {
        console.log("Updating reservation:", entradas);
        const { id, estado, bd } = entradas;
        const ruta = `/${bd}/${id}.json`;
        const currentDataResponse = await firebase_api.get(ruta);
        const currentData = currentDataResponse.data || {};
        const dataToSave = { ...currentData, estado };
        await firebase_api.put(ruta, dataToSave);
        return dataToSave;
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
