/**
 * HC MODULE (Medical Records / Historia Clínica) - Consolidated Vuex Module
 * 
 * Manages medical record data across 13 sections
 * 
 * Parts consolidated:
 * - state.js: Session tracking state
 * - actions.js: Save operations for each HC section
 * - mutations.js: State mutations
 * - getters.js: State getters (none currently in use)
 * 
 * Original location: src/components/hc/store/hc/
 * 
 * HC Sections:
 * 0. Cabecera (Header) - Basic patient and professional info
 * 1. Datos de Consulta - Consultation data and vital signs
 * 2. Observación - General clinical observations
 * 3. Inspección Estática - Static inspection/postural analysis
 * 4. Evaluación Postural - Postural evaluation
 * 5. Inspección Dinámica - Dynamic inspection (movement analysis)
 * 6. Escala Visual - Pain scale and location
 * 7. Imágenes - Diagnostic images
 * 8. Exploración Física - Physical examination
 * 9. Sistema Muscular - Muscular system/strength evaluation
 * 10. Análisis - Clinical analysis and assessment
 * 11. Diagnóstico - Diagnosis (ICD-10)
 * 12. Tratamiento - Treatment plan and objectives
 * 13. Orden Médica - Medical orders (CUPS procedures)
 * 
 * State properties:
 * - id_paciente: Current patient ID
 * - id_ips: Current IPS ID
 * - id_prof: Current professional ID
 * - StateNumRegHC: Current medical record registration number
 */

import firebase_api from "@/api/firebaseApi";

/**
 * STATE
 * Minimal state for tracking current session information
 */
const state = () => ({
    id_paciente: "xxx",     // Current patient ID
    id_ips: "xxx",          // Current IPS ID
    id_prof: "xxx",         // Current professional ID
    StateNumRegHC: "",      // Current medical record registration number
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
     * Set Medical Record Registration Number
     */
    NumRegHC: (state, entradas) => {
        state.StateNumRegHC = entradas;
    },
};

/**
 * ACTIONS
 * Asynchronous operations - Save operations for medical record sections
 */
const actions = {
    /**
     * MEDICAL RECORD (HC) DATA ACTIONS
     * Acciones para guardar datos de historia clínica en las diferentes secciones
     * Cada SaveDatos corresponde a una sección específica de la HC
     */

    /**
     * Save HC Header/Metadata
     * Guarda información de cabecera de la historia clínica
     * @param {Object} context - Vuex context
     * @param {Object} Data - {idpaciente, idprofesional, idips}
     */
    SaveHCcabecera: async ({ commit }, Data) => {
        console.log("Saving HC header:", Data);
        const { idpaciente, idprofesional, idips } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips };
        const Ruta = `/hc_cabeceras.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        const idGenerado = data.name;
        const updateObj = { idHC: idGenerado };
        await firebase_api.patch(`/hc_cabeceras/${idGenerado}.json`, updateObj);
        const registroFinal = { ...DatatoSave, ...updateObj };
        if (Object.keys(registroFinal).length > 0) {
            commit('NumRegHC', registroFinal);
        }
        return idGenerado;
    },

    /**
     * HC1 - Save Initial Consultation Data
     * Guarda: antecedentes, signos vitales, peso, talla, IMC, etc
     * @param {Object} context - Vuex context
     * @param {Object} Data - Consultation data
     */
    SaveDatos1: async ({ commit }, Data) => {
        console.log("Saving HC section 1 (Consultation):", Data);
        const { idpaciente, idhc, motivoConsulta, Enfermedad, TratPrevios, MedPrevios, peso, talla, estatura, imc, temp, fcardiaca, frespiratoria, tarterial, bd, ant } = Data;
        const DatatoSave = { idpaciente, idhc, motivoConsulta, Enfermedad, TratPrevios, MedPrevios, peso, talla, estatura, imc, temp, fcardiaca, frespiratoria, tarterial, ant };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC2 - Save Observation/Clinical Observation Data
     * Guarda observaciones clínicas generales
     * @param {Object} context - Vuex context
     * @param {Object} Data - Observation data
     */
    SaveDatos2: async ({ commit }, Data) => {
        console.log("Saving HC section 2 (Observation):", Data);
        const { idpaciente, idhc, dataObserv, bd } = Data;
        const DatatoSave = { idpaciente, idhc, dataObserv };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC3 - Save Static Inspection Data
     * Guarda datos de inspección estática (postura en reposo)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Static inspection data
     */
    SaveDatos3: async ({ commit }, Data) => {
        console.log("Saving HC section 3 (Static Inspection):", Data);
        const { idpaciente, idhc, bd, dataeval } = Data;
        const DatatoSave = { idpaciente, idhc, dataeval };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC4 - Save Postural Evaluation Data
     * Guarda datos de evaluación postural
     * @param {Object} context - Vuex context
     * @param {Object} Data - Postural evaluation data
     */
    SaveDatos4: async ({ commit }, Data) => {
        console.log("Saving HC section 4 (Postural Evaluation):", Data);
        const { idpaciente, idhc, bd, dataeval } = Data;
        const DatatoSave = { idpaciente, idhc, dataeval };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC5 - Save Dynamic Inspection Data
     * Guarda datos de inspección dinámica (evaluación en movimiento)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Dynamic inspection data
     */
    SaveDatos5: async ({ commit }, Data) => {
        console.log("Saving HC section 5 (Dynamic Inspection):", Data);
        const { idpaciente, idhc, bd, Acualitativo, Acuantitativo } = Data;
        const DatatoSave = { idpaciente, idhc, Acualitativo, Acuantitativo };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC6 - Save Visual Scale Data
     * Guarda datos de escala visual analógica de dolor
     * @param {Object} context - Vuex context
     * @param {Object} Data - Pain scale data
     */
    SaveDatos6: async ({ commit }, Data) => {
        console.log("Saving HC section 6 (Visual Scale):", Data);
        const { idpaciente, bd, idhc, D_escala, D_ubicacion, D_semiologia } = Data;
        const DatatoSave = { idpaciente, idhc, D_escala, D_ubicacion, D_semiologia };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC7 - Save Images Data
     * Guarda datos de imágenes diagnósticas
     * @param {Object} context - Vuex context
     * @param {Object} Data - Diagnostic images data
     */
    SaveDatos7: async ({ commit }, Data) => {
        console.log("Saving HC section 7 (Images):", Data);
        const { idpaciente, bd, idhc, imgDiag, tipoimg, descImagen } = Data;
        const DatatoSave = { idpaciente, idhc, imgDiag, tipoimg, descImagen };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC8 - Save Physical Examination Data
     * Guarda datos de exploración física (evaluación articular y muscular)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Physical examination data
     */
    SaveDatos8: async ({ commit }, Data) => {
        console.log("Saving HC section 8 (Physical Examination):", Data);
        const { idpaciente, idhc, bd, Data_observaciones, Data_SOseo, Data_EvalMSuperior, Data_EvalMInferior } = Data;
        const DatatoSave = { idpaciente, idhc, Data_observaciones, Data_SOseo, Data_EvalMSuperior, Data_EvalMInferior };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC9 - Save Muscular System Data
     * Guarda datos del sistema muscular (fuerza muscular)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Muscular system data
     */
    SaveDatos9: async ({ commit }, Data) => {
        console.log("Saving HC section 9 (Muscular System):", Data);
        const { idpaciente, idhc, bd, dataSistMuscular, dataEvalMuscularGeneral, dataEvalMuscDetallada } = Data;
        const DatatoSave = { idpaciente, idhc, dataSistMuscular, dataEvalMuscularGeneral, dataEvalMuscDetallada };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC10 - Save Analysis/Assessment Data
     * Guarda análisis e interpretación de datos clínicos
     * @param {Object} context - Vuex context
     * @param {Object} Data - Analysis data
     */
    SaveDatos10: async ({ commit }, Data) => {
        console.log("Saving HC section 10 (Analysis):", Data);
        const { idpaciente, idhc, bd, Data_analisis } = Data;
        const DatatoSave = { idpaciente, idhc, Data_analisis };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC11 - Save Diagnosis Data
     * Guarda diagnósticos (CIE-10)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Diagnosis data
     */
    SaveDatos11: async ({ commit }, Data) => {
        console.log("Saving HC section 11 (Diagnosis):", Data);
        const { idhc, idPaciente, bd, Data_analisis } = Data;
        const DatatoSave = { idhc, idPaciente, Data_analisis };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC12 - Save Treatment Plan Data
     * Guarda plan de tratamiento y objetivos
     * @param {Object} context - Vuex context
     * @param {Object} Data - Treatment plan data
     */
    SaveDatos12: async ({ commit }, Data) => {
        console.log("Saving HC section 12 (Treatment Plan):", Data);
        const { planTratamiento, objetivos, bd, idhc, idPaciente } = Data;
        const DatatoSave = { planTratamiento, objetivos, idhc, idPaciente };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
    },

    /**
     * HC13 - Save Medical Order Data
     * Guarda órdenes médicas (procedimientos CUPS)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Medical order data
     */
    SaveDatos13: async ({ commit }, Data) => {
        console.log("Saving HC section 13 (Medical Orders):", Data);
        const { idPaciente, idhc, bd, DataOMedica } = Data;
        const DatatoSave = { idPaciente, idhc, DataOMedica };
        const Ruta = `/${bd}.json`;
        const { data } = await firebase_api.post(Ruta, DatatoSave);
        DatatoSave.id = data.name;
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
