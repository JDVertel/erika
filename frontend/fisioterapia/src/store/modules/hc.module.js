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
    StateNumRegHC: "", // Current medical record registration number
    Cie10: [],
    Cups: [],
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
 *
 */

const mutations = {
    /**
     * Set Medical Record Registration Number
     */

    SetStateCie10: (state, cie10List) => {
        state.Cie10 = cie10List;
    },

    SetStateCUPS: (state, cupsList) => {
        state.Cups = cupsList;
    },

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
    // Función auxiliar para validar si un valor tiene contenido significativo

    loadCIE10: async ({ commit }) => {
        try {
            console.log("Iniciando carga de CIE10...");
            const { data } = await firebase_api.get("/cie10.json");
            const cie10List = Object.values(data || {}); // Convierte objeto a array
            console.log("CIE10 cargado, registros:", cie10List.length);
            commit("SetStateCie10", cie10List); // Actualiza el estado
            return cie10List;
        } catch (error) {
            console.error("Error cargando CIE-10:", error);
            commit("SetStateCie10", []); // Asegurarse de que sea un array vacío, no un mensaje de error
            return [];
        }
    },
    loadCUPS: async ({ commit }) => {
        try {
            const { data } = await firebase_api.get("/Fcups.json");
            const cupsList = Object.values(data || {}); // Convierte objeto a array
            commit("SetStateCUPS", cupsList); // Actualiza el estado
            return cupsList;
        } catch (error) {
            console.error("Error cargando CUPS:", error);
            commit("SetStateCUPS", error.message);
        }
    },
    _validateData: (valor) => {
        if (valor === null || valor === undefined) return false;
        if (typeof valor === "string" && valor.trim() === "") return false;
        if (Array.isArray(valor) && valor.length === 0) return false;
        if (valor === 0 || valor === false || valor === "") return false;

        // Validar objetos recursivamente
        if (typeof valor === "object" && !Array.isArray(valor)) {
            const keys = Object.keys(valor);
            if (keys.length === 0) return false;
            // Verificar si al menos una propiedad tiene valor significativo
            const tieneValor = keys.some((key) => actions._validateData(valor[key]));
            return tieneValor;
        }

        return true;
    },

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
            commit("NumRegHC", registroFinal);
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
        const {
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
            motivoConsulta,
            Enfermedad,
            TratPrevios,
            MedPrevios,
            peso,
            talla,
            estatura,
            imc,
            temp,
            fcardiaca,
            frespiratoria,
            tarterial,
            bd,
            ant,
        } = Data;

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(motivoConsulta)) DatatoSave.motivoConsulta = motivoConsulta;
        if (actions._validateData(Enfermedad)) DatatoSave.Enfermedad = Enfermedad;
        if (actions._validateData(TratPrevios)) DatatoSave.TratPrevios = TratPrevios;
        if (actions._validateData(MedPrevios)) DatatoSave.MedPrevios = MedPrevios;
        if (actions._validateData(peso)) DatatoSave.peso = peso;
        if (actions._validateData(talla)) DatatoSave.talla = talla;
        if (actions._validateData(estatura)) DatatoSave.estatura = estatura;
        if (actions._validateData(imc)) DatatoSave.imc = imc;
        if (actions._validateData(temp)) DatatoSave.temp = temp;
        if (actions._validateData(fcardiaca)) DatatoSave.fcardiaca = fcardiaca;
        if (actions._validateData(frespiratoria)) DatatoSave.frespiratoria = frespiratoria;
        if (actions._validateData(tarterial)) DatatoSave.tarterial = tarterial;
        if (actions._validateData(ant)) DatatoSave.ant = ant;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(dataObserv)) DatatoSave.dataObserv = dataObserv;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(dataeval)) DatatoSave.dataeval = dataeval;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(dataeval)) DatatoSave.dataeval = dataeval;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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
        const {
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
            bd,
            Acualitativo,
            Acuantitativo,
        } = Data;

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(Acualitativo)) DatatoSave.Acualitativo = Acualitativo;
        if (actions._validateData(Acuantitativo)) DatatoSave.Acuantitativo = Acuantitativo;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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
        const {
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
            bd,
            D_escala,
            D_ubicacion,
            D_semiologia,
        } = Data;

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(D_escala)) DatatoSave.D_escala = D_escala;
        if (actions._validateData(D_ubicacion)) DatatoSave.D_ubicacion = D_ubicacion;
        if (actions._validateData(D_semiologia)) DatatoSave.D_semiologia = D_semiologia;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

        const RutaConId = `/${bd}/${idhc}.json`;
        await firebase_api.put(RutaConId, DatatoSave);
        DatatoSave.id = idhc;
    },

    /**
     * HC7 - Save Images Data
     * Guarda datos de imágenes diagnósticas
     * @param {Object} context - Vuex context
     * @param {Object} Data - Array de imágenes o imagen individual
     */
    SaveDatos7: async ({ commit, state }, Data) => {
        console.log("Saving HC section 7 (Images):", Data);
        const { idpaciente, idprofesional, idips, fecha, idhc, bd, imagenesArray } = Data;

        // Si imagenesArray existe, guardar múltiples imágenes
        if (Array.isArray(imagenesArray) && imagenesArray.length > 0) {
            const datosImagenes = imagenesArray.filter(
                (img) => actions._validateData(img.imgDiag) && actions._validateData(img.tipoimg)
            );

            if (datosImagenes.length === 0) {
                console.log("No hay imágenes válidas para guardar.");
                return;
            }

            const DatatoSave = {
                idpaciente,
                idprofesional,
                idips,
                fecha,
                idhc,
                imagenes: datosImagenes,
            };

            const RutaConId = `/${bd}/${idhc}.json`;
            await firebase_api.put(RutaConId, DatatoSave);
            console.log("Imágenes guardadas exitosamente:", datosImagenes.length);
            return;
        }

        // Fallback para imagen individual (compatibilidad hacia atrás)
        const { imgDiag, tipoimg, descImagen } = Data;
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(imgDiag)) DatatoSave.imgDiag = imgDiag;
        if (actions._validateData(tipoimg)) DatatoSave.tipoimg = tipoimg;
        if (actions._validateData(descImagen)) DatatoSave.descImagen = descImagen;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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
        const {
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
            bd,
            Data_observaciones,
            Data_SOseo,
            Data_EvalMSuperior,
            Data_EvalMInferior,
        } = Data;

        // Construir DatatoSave validando TODOS los campos (base + formulario)
        const DatatoSave = {};

        // Validar y agregar campos base solo si tienen datos
        if (actions._validateData(idpaciente)) DatatoSave.idpaciente = idpaciente;
        if (actions._validateData(idprofesional)) DatatoSave.idprofesional = idprofesional;
        if (actions._validateData(idips)) DatatoSave.idips = idips;
        if (actions._validateData(fecha)) DatatoSave.fecha = fecha;
        if (actions._validateData(idhc)) DatatoSave.idhc = idhc;

        // Validar y agregar campos del formulario solo si tienen datos
        if (actions._validateData(Data_observaciones))
            DatatoSave.Data_observaciones = Data_observaciones;
        if (actions._validateData(Data_SOseo)) DatatoSave.Data_SOseo = Data_SOseo;
        if (actions._validateData(Data_EvalMSuperior))
            DatatoSave.Data_EvalMSuperior = Data_EvalMSuperior;
        if (actions._validateData(Data_EvalMInferior))
            DatatoSave.Data_EvalMInferior = Data_EvalMInferior;

        // Verificar que haya AL MENOS UN campo del formulario con datos válidos
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        // Si no hay datos del formulario, no guardar nada
        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

        // Si hay datos, guardar
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
        const {
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
            bd,
            dataSistMuscular,
            dataEvalMuscularGeneral,
            dataEvalMuscDetallada,
        } = Data;

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(dataSistMuscular))
            DatatoSave.dataSistMuscular = dataSistMuscular;
        if (actions._validateData(dataEvalMuscularGeneral))
            DatatoSave.dataEvalMuscularGeneral = dataEvalMuscularGeneral;
        if (actions._validateData(dataEvalMuscDetallada))
            DatatoSave.dataEvalMuscDetallada = dataEvalMuscDetallada;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(Data_analisis)) DatatoSave.Data_analisis = Data_analisis;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(Data_analisis)) DatatoSave.Data_analisis = Data_analisis;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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
        const {
            planTratamiento,
            objetivos,
            bd,
            idpaciente,
            idprofesional,
            idips,
            fecha,
            idhc,
        } = Data;

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(planTratamiento))
            DatatoSave.planTratamiento = planTratamiento;
        if (actions._validateData(objetivos)) DatatoSave.objetivos = objetivos;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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

        // Construir DatatoSave solo con campos que tienen datos
        const DatatoSave = { idpaciente, idprofesional, idips, fecha, idhc };

        if (actions._validateData(DataOMedica)) DatatoSave.DataOMedica = DataOMedica;

        // Verificar que haya al menos un campo del formulario
        const camposBase = ["idpaciente", "idprofesional", "idips", "fecha", "idhc"];
        const camposFormulario = Object.keys(DatatoSave).filter(
            (key) => !camposBase.includes(key)
        );

        if (camposFormulario.length === 0) {
            console.log("No hay datos en el formulario para guardar.");
            return;
        }

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
