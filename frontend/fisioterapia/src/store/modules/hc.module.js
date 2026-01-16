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

    // Current professional ID
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
     * @param {Object} Data - {idpaciente, idprofesional, idips, tipoC, fecha}
     */
    SaveHCcabecera: async ({ commit, state }, Data) => {
        console.log("Saving HC header:", Data);
        const { idpaciente, idprofesional, idips, tipoC, fecha } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, tipoC, fecha };
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
    SaveDatos1: async ({ commit, state }, Data) => {
        console.log("Saving HC section 1 (Consultation):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, motivoConsulta, Enfermedad, TratPrevios, MedPrevios, peso, talla, estatura, imc, temp, fcardiaca, frespiratoria, tarterial, bd, ant } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, motivoConsulta, Enfermedad, TratPrevios, MedPrevios, peso, talla, estatura, imc, temp, fcardiaca, frespiratoria, tarterial, ant };
        // Guardar usando idhc como clave del registro en Firebase
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC2 - Save Observation/Clinical Observation Data
     * Guarda observaciones clínicas generales
     * @param {Object} context - Vuex context
     * @param {Object} Data - Observation data
     */
    SaveDatos2: async ({ commit, state }, Data) => {
        console.log("Saving HC section 2 (Observation):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, dataObserv, bd } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, dataObserv };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC3 - Save Static Inspection Data
     * Guarda datos de inspección estática (postura en reposo)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Static inspection data
     */
    SaveDatos3: async ({ commit, state }, Data) => {
        console.log("Saving HC section 3 (Static Inspection):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, dataeval } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, dataeval };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC4 - Save Postural Evaluation Data
     * Guarda datos de evaluación postural
     * @param {Object} context - Vuex context
     * @param {Object} Data - Postural evaluation data
     */
    SaveDatos4: async ({ commit, state }, Data) => {
        console.log("Saving HC section 4 (Postural Evaluation):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, dataeval } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, dataeval };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC5 - Save Dynamic Inspection Data
     * Guarda datos de inspección dinámica (evaluación en movimiento)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Dynamic inspection data
     */
    SaveDatos5: async ({ commit, state }, Data) => {
        console.log("Saving HC section 5 (Dynamic Inspection):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, Acualitativo, Acuantitativo } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, Acualitativo, Acuantitativo };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC6 - Save Visual Scale Data
     * Guarda datos de escala visual analógica de dolor
     * @param {Object} context - Vuex context
     * @param {Object} Data - Pain scale data
     */
    SaveDatos6: async ({ commit, state }, Data) => {
        console.log("Saving HC section 6 (Visual Scale):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, D_escala, D_ubicacion, D_semiologia } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, D_escala, D_ubicacion, D_semiologia };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC7 - Save Images Data
     * Guarda datos de imágenes diagnósticas
     * @param {Object} context - Vuex context
     * @param {Object} Data - Diagnostic images data
     */
    SaveDatos7: async ({ commit, state }, Data) => {
        console.log("Saving HC section 7 (Images):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, imgDiag, tipoimg, descImagen } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, imgDiag, tipoimg, descImagen };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC8 - Save Physical Examination Data
     * Guarda datos de exploración física (evaluación articular y muscular)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Physical examination data
     */
    SaveDatos8: async ({ commit, state }, Data) => {
        console.log("Saving HC section 8 (Physical Examination):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, Data_observaciones, Data_SOseo, Data_EvalMSuperior, Data_EvalMInferior } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, Data_observaciones, Data_SOseo, Data_EvalMSuperior, Data_EvalMInferior };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC9 - Save Muscular System Data
     * Guarda datos del sistema muscular (fuerza muscular)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Muscular system data
     */
    SaveDatos9: async ({ commit, state }, Data) => {
        console.log("Saving HC section 9 (Muscular System):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, dataSistMuscular, dataEvalMuscularGeneral, dataEvalMuscDetallada } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, dataSistMuscular, dataEvalMuscularGeneral, dataEvalMuscDetallada };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC10 - Save Analysis/Assessment Data
     * Guarda análisis e interpretación de datos clínicos
     * @param {Object} context - Vuex context
     * @param {Object} Data - Analysis data
     */
    SaveDatos10: async ({ commit, state }, Data) => {
        console.log("Saving HC section 10 (Analysis):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, Data_analisis } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, Data_analisis };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC11 - Save Diagnosis Data
     * Guarda diagnósticos (CIE-10)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Diagnosis data
     */
    SaveDatos11: async ({ commit, state }, Data) => {
        console.log("Saving HC section 11 (Diagnosis):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, Data_analisis } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, Data_analisis };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC12 - Save Treatment Plan Data
     * Guarda plan de tratamiento y objetivos
     * @param {Object} context - Vuex context
     * @param {Object} Data - Treatment plan data
     */
    SaveDatos12: async ({ commit, state }, Data) => {
        console.log("Saving HC section 12 (Treatment Plan):", Data);
        const { planTratamiento, objetivos, bd, idpaciente, idprofesional, idips, fecha, idhc, } = Data;
        const DatatoSave = { planTratamiento, objetivos, idpaciente, idprofesional, idips, fecha, idhc };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC13 - Save Medical Order Data
     * Guarda órdenes médicas (procedimientos CUPS)
     * @param {Object} context - Vuex context
     * @param {Object} Data - Medical order data
     */
    SaveDatos13: async ({ commit, state }, Data) => {
        console.log("Saving HC section 13 (Medical Orders):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, DataOMedica } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc, DataOMedica };
        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
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
