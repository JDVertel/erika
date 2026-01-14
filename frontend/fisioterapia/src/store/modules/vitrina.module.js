/**
 * VITRINA MODULE - Consolidated Vuex Module
 * 
 * E-commerce product catalog, inventory, and invoicing system
 * 
 * Parts consolidated:
 * - state.js: Product catalog and inventory state
 * - actions.js: Product management and invoice operations
 * - mutations.js: State mutations
 * - getters.js: State getters (none currently in use)
 * 
 * Original location: src/components/vitrina/store/vitrina/
 * 
 * Features:
 * - Product catalog management (create, update, delete, publish)
 * - Service management
 * - Inventory tracking
 * - Invoice/Factura management (header and details)
 * - Daily invoices reporting
 * 
 * State properties:
 * - entry[]: Product catalog entries
 * - cargando: Loading indicator
 * - cant: Product quantity
 * - StateInventario[]: Inventory state tracking
 * - StateFacturasDiarias[]: Daily invoices state
 * - StateQueryFacturas[]: Invoice query results
 */

import firebase_api from "@/api/firebaseApi";

/**
 * STATE
 * E-commerce product catalog and inventory state management
 */
const state = () => ({
    entry: [],                  // Product catalog entries
    cargando: true,             // Loading indicator
    cant: "",                   // Product quantity
    StateInventario: [],        // Inventory state tracking
    StateFacturasDiarias: [],   // Daily invoices state
    StateQueryFacturas: [],     // Invoice query results
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
     * Set Product Catalog
     */
    setVitrina: (state, entradas) => {
        state.entry = [...entradas];
        state.cargando = false;
        state.cant = entradas.length;
    },

    /**
     * Update Product Data
     */
    updateDataVitrina: (state, entradas) => {
        const idx = state.entry.map((e) => e.id).indexOf(entradas.id);
        state.entry[idx] = entradas;
    },

    /**
     * Add New Product
     */
    newDataVitrina: (state, entradas) => {
        state.entry = [entradas, ...state.entry];
    },

    /**
     * Delete Product Item
     */
    DeleteItemVitrina: (state, idDelete) => {
        state.entry = state.entry.filter((e) => e.id !== idDelete);
    },

    /**
     * Set Inventory State
     */
    setStateInventario: (state, entrada) => {
        state.StateInventario = [entrada, ...state.StateInventario];
    },

    /**
     * Set Daily Invoices
     */
    setStateFacturasDiarias: (state, entrada) => {
        state.StateFacturasDiarias = [entrada, ...state.StateFacturasDiarias];
    },

    /**
     * Set Invoice Query Results
     */
    setStateQueryFacturas: (state, entrada) => {
        state.StateQueryFacturas = [entrada, ...state.StateQueryFacturas];
    },
};

/**
 * ACTIONS
 * Asynchronous operations for product and invoice management
 */
const actions = {
    /**
     * VITRINA PRODUCT STORE ACTIONS
     * Acciones para gestionar productos, servicios, rutinas y facturación
     */

    /**
     * Load Vitrina
     * Carga todos los productos de la vitrina
     * @param {Object} context - Vuex context
     */
    load_Vitrina: async ({ commit }) => {
        console.log("Loading vitrina products");
        const response = await firebase_api.get("/vitrina.json");
        const { data } = response;
        const dataentradas = [];
        for (let id of Object.keys(data)) {
            dataentradas.push({ id, ...data[id] });
        }
        commit("setVitrina", dataentradas);
    },

    /**
     * Get Vitrina Data by Parameters
     * Obtiene productos filtrando por parámetro específico
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {bd, parametro, valor, mutation}
     */
    getDatosVitrinabyParams: async ({ commit }, parametros) => {
        const { bd, parametro, valor, mutation } = parametros;
        console.log("Getting vitrina data by parameters:", { bd, parametro, valor });
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
    },

    /**
     * Get Vitrina Data by Date Range
     * Obtiene datos entre un rango de fechas (para informes)
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {bd, parametro, fechaInicio, fechaFin, mutation}
     */
    getDatosVitrinabyParamsDate: async ({ commit }, parametros) => {
        const { bd, parametro, fechaInicio, fechaFin, mutation } = parametros;
        console.log("Getting vitrina data by date range:", { bd, parametro, fechaInicio, fechaFin });
        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                startAt: `"${fechaInicio}"`,
                endAt: `"${fechaFin}"`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data || {})) {
            datasalida.push({ id, ...data[id] });
        }
        if (datasalida.length > 0) {
            commit(`${mutation}`, datasalida);
        }
    },

    /**
     * Update Vitrina Product
     * Actualiza un producto de la vitrina
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, tipo, nombre, desc, precio, cant, publicado, img, id}
     */
    updateVitrinaP: async ({ commit }, entradas) => {
        console.log("Updating vitrina product:", entradas);
        const { id_ips, tipo, nombre, desc, precio, cant, publicado, img } = entradas;
        const dataToSave = { id_ips, tipo, nombre, desc, precio, cant, publicado, img };
        const ruta = `/vitrina/${entradas.id}.json`;
        await firebase_api.put(ruta, dataToSave);
        commit("updateDataVitrina", { ...entradas });
    },

    /**
     * Update Vitrina Service
     * Actualiza un servicio de la vitrina
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, tipo, nombre, desc, precios, publicado, img, id}
     */
    updateVitrinaS: async ({ commit }, entradas) => {
        console.log("Updating vitrina service:", entradas);
        const { id_ips, tipo, nombre, desc, precios, publicado, img } = entradas;
        const dataToSave = { id_ips, tipo, nombre, desc, precios, publicado, img };
        const ruta = `/vitrina/${entradas.id}.json`;
        await firebase_api.put(ruta, dataToSave);
        commit("updateDataVitrina", { ...entradas });
    },

    /**
     * Create New Vitrina Service Entry
     * Crea un nuevo servicio en la vitrina
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, tipo, nombre, desc, precios, cant, img, publicado}
     */
    createEntradaVitrinaS: async ({ commit }, entradas) => {
        console.log("Creating new vitrina service:", entradas);
        const { id_ips, tipo, nombre, desc, precios, cant, img, publicado } = entradas;
        const DataToSave = { id_ips, tipo, nombre, desc, precios, cant, img, publicado };
        const Ruta = `/vitrina.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
        commit("newDataVitrina", DataToSave);
    },

    /**
     * Create New Vitrina Product Entry
     * Crea un nuevo producto en la vitrina
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, tipo, nombre, desc, precio, cant, img, publicado}
     */
    createEntradaVitrina: async ({ commit }, entradas) => {
        console.log("Creating new vitrina product:", entradas);
        const { id_ips, tipo, nombre, desc, precio, cant, img, publicado } = entradas;
        const DataToSave = { id_ips, tipo, nombre, desc, precio, cant, img, publicado };
        const Ruta = `/vitrina.json`;
        const { data } = await firebase_api.post(Ruta, DataToSave);
        DataToSave.id = data.name;
        commit("newDataVitrina", DataToSave);
    },

    /**
     * Change Vitrina Publication Status
     * Cambia el estado de publicación de un producto
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {id_ips, tipo, nombre, desc, precios, cant, publicado, img, id}
     */
    CambiarEstadoVitrina: async ({ commit }, entradas) => {
        console.log("Changing vitrina publication status:", entradas);
        const { id_ips, tipo, nombre, desc, precios, cant, publicado, img } = entradas;
        const DataStore = { id_ips, tipo, nombre, desc, precios, cant, publicado: !publicado, img };
        const ruta = `/vitrina/${entradas.id}.json`;
        entradas.publicado = !entradas.publicado;
        await firebase_api.put(ruta, DataStore);
        commit("updateDataVitrina", { ...entradas });
    },

    /**
     * Delete Item from Vitrina
     * Elimina un producto/servicio de la vitrina
     * @param {Object} context - Vuex context
     * @param {String} entradas - Id del producto a eliminar
     */
    DeleteItemVitrina: async ({ commit }, entradas) => {
        console.log("Deleting vitrina item:", entradas);
        const Ruta = `/vitrina/${entradas}.json`;
        await firebase_api.delete(Ruta);
        commit("DeleteItemVitrina", entradas);
    },

    /**
     * INVOICE/FACTURA ACTIONS
     */

    /**
     * Create Invoice Header
     * Crea el encabezado de una factura
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {idpac, idfact, idips, fecha}
     */
    createEntradaFacturaCabecera: async ({ commit }, entradas) => {
        console.log("Creating invoice header:", entradas);
        const { idpac, idfact, idips, fecha } = entradas;
        if (!idpac || idpac.trim() === "") {
            console.error("Error: idpac inválido o vacío");
            return null;
        }
        const DataToSave = { idpac, idfact, idips, fecha };
        const Ruta = `/facturasCabecera.json`;
        try {
            const { data } = await firebase_api.post(Ruta, DataToSave);
            return data;
        } catch (error) {
            console.error("Error al guardar la factura cabecera:", error);
            throw error;
        }
    },

    /**
     * Create Invoice Details (Multiple Entries)
     * Crea múltiples líneas de detalle para una factura
     * @param {Object} context - Vuex context
     * @param {Array} entradas - Array de objetos con datos de detalle
     */
    createEntradaFacturaDetalle: async ({ commit }, entradas) => {
        console.log("Creating invoice details:", entradas);
        try {
            const promesasGuardado = entradas.map(async (entrada) => {
                const { idpac, idfact, idips, categoria, nombre, combo, precio, cant, subt, fecha } = entrada;
                if (!idpac || idpac.trim() === "") {
                    console.error("Entrada inválida: idpac vacío", entrada);
                    return null;
                }
                const DataToSave = {
                    idpac,
                    idfact,
                    idips,
                    categoria,
                    nombre,
                    combo,
                    precio,
                    cant: Number(cant),
                    subt: Number(subt),
                    fecha
                };
                const Ruta = `/facturasDetalle.json`;
                return firebase_api.post(Ruta, DataToSave).then(({ data }) => data);
            });
            const resultados = await Promise.all(promesasGuardado);
            return resultados.filter(r => r !== null);
        } catch (error) {
            console.error("Error al guardar detalles de factura:", error);
            throw error;
        }
    },

    /**
     * Get Invoice List by Date
     * Obtiene facturas de un día específico
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {bd, parametro, valor, mutation}
     */
    getListFacturasDia: async ({ commit }, parametros) => {
        console.log("Getting invoices by date:", parametros);
        const { bd, parametro, valor, mutation } = parametros;
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
    },

    /**
     * Get Current Invoice ID
     * Obtiene el ID actual de la factura
     * @param {Object} context - Vuex context
     * @param {Object} parametros - {bd, parametro, valor}
     */
    getCurrentIdFactura: async ({ commit }, parametros) => {
        console.log("Getting current invoice ID:", parametros);
        const { bd, parametro, valor } = parametros;
        const response = await firebase_api.get(`/${bd}.json`, {
            params: {
                orderBy: `"${parametro}"`,
                equalTo: `${valor}`,
            },
        });
        const { data } = response;
        const datasalida = [];
        for (let id of Object.keys(data)) {
            datasalida.push({ id, ...data[id] });
        }
        if (datasalida.length > 0) {
            let idFactura = datasalida[0].idFact;
            let id = datasalida[0].id;
            return { idFactura, id };
        }
        return null;
    },

    /**
     * Update Invoice ID
     * Actualiza el ID de la factura
     * @param {Object} context - Vuex context
     * @param {Object} entradas - {bd, id, idFact}
     */
    UpdateNewIdFactura: async ({ commit }, entradas) => {
        console.log("Updating invoice ID:", entradas);
        const { bd, id, idFact } = entradas;
        const ruta = `/${bd}/${id}.json`;
        const dataToSave = { idFact };
        try {
            const response = await firebase_api.patch(ruta, dataToSave);
            return response.data;
        } catch (error) {
            console.error("Error actualizando factura:", error);
            throw error;
        }
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
