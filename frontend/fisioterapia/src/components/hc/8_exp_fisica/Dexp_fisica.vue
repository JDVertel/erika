<script>
import { computed } from "vue";
import { exp_fisica } from "./../../../firebase/bd.js";
import { BuscarDetalles, BuscarExpFisicaDetalleNombre } from "./../../backend/rutinas.js";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    bd: "hc8_expfisica",
    data_exp: exp_fisica,
    tipoclase: "0",
    tipomusculo: "0",
    detalle: "",
    tipoevaluacion: "0",
    datosC: "",
    observaciones: "",
    evalFisicaObservaciones: "",

    // Listas de movimientos por articulación
    articulaciones: {
      RAQUISCERVICAL: ["flexion", "extencion", "IncLateral", "rotacionI"],
      RAQUISDORSOLUMBAR: [
        "RD_Flexión",
        "Extención",
        "Inclinación lateral der",
        "Inclinación lateral izq",
        "Rotación Izq",
        "Rotación Der",
      ],
      HOMBRO: [
        "Flexión",
        "Extención",
        "Abduccion",
        "Aduccion",
        "Rotación Interna",
        "Rotación Externa",
      ],
      CODO: ["Flexión", "Extención", "Pronación", "Supinación"],
      MUNECA: ["Flexión", "Extención", "Desviacion radial", "Desviacion cubital"],
      CADERA: [
        "Flexión",
        "Extensión",
        "Abducción",
        "Aducción",
        "Rotación Interna",
        "Rotación Externa",
      ],
      RODILLA: ["Flexión", "Extención"],
      TOBILLO: ["Flexión plantar", "Flexión dorsal"],
      ART_SUBASTRAGALINA: ["inversion", "Eversión"],
    },

    // Clasificación de articulaciones por miembro
    articulacionesPorMiembro: {
      "Miembro Superior": [
        "RAQUISCERVICAL",
        "RAQUISDORSOLUMBAR",
        "HOMBRO",
        "CODO",
        "MUNECA",
      ],
      "Miembro Inferior": ["CADERA", "RODILLA", "TOBILLO", "ART_SUBASTRAGALINA"],
    },

    // Estado actual para formulario unificado
    currentMiembro: null,
    currentArticulacion: null,
    currentMovimiento: "",
    currentIzquierdo: "",
    currentDerecho: "",

    // Array unificado para todos los datos de movimientos
    movimientosData: [],

    // Variables para mantener disponibles las opciones
    availableMovimientos: {},
    availableArticulaciones: {},

    /* ------------------------------------------ */
    NewAntec: [],
    ArraySaveConsulta: [],
  }),

  mounted() {
    this.idPaciente = this.idpaciente;
    // Inicializar el estado de movimientos disponibles
    this.initializeAvailableMovimientos();
  },

  methods: {
    ...mapActions("hc", ["SaveDatos8"]),

    // Inicializar opciones disponibles
    initializeAvailableMovimientos() {
      for (const articulo in this.articulaciones) {
        this.availableMovimientos[articulo] = [...this.articulaciones[articulo]];
      }
      for (const miembro in this.articulacionesPorMiembro) {
        this.availableArticulaciones[miembro] = [
          ...this.articulacionesPorMiembro[miembro],
        ];
      }
    },

    // Métodos unificados
    addMovimiento() {
      if (
        !this.currentMiembro ||
        !this.currentArticulacion ||
        !this.currentMovimiento ||
        !this.currentIzquierdo ||
        !this.currentDerecho
      ) {
        return;
      }

      const item = {
        miembro: this.currentMiembro,
        articulo: this.currentArticulacion,
        movimiento: this.currentMovimiento,
        izquierdo: this.currentIzquierdo,
        derecho: this.currentDerecho,
      };

      this.movimientosData.push(item);

      // Remover de la lista disponible
      const index = this.availableMovimientos[this.currentArticulacion].indexOf(
        this.currentMovimiento
      );
      if (index > -1) {
        this.availableMovimientos[this.currentArticulacion].splice(index, 1);
      }

      // Limpiar formulario
      this.clearMovimientoForm();
    },

    deleteMovimiento(index) {
      const item = this.movimientosData[index];
      // Devolver el movimiento a la lista disponible
      this.availableMovimientos[item.articulo].push(item.movimiento);
      // Ordenar alfabéticamente
      this.availableMovimientos[item.articulo].sort();
      // Eliminar del array
      this.movimientosData.splice(index, 1);
    },

    clearMovimientoForm() {
      this.currentArticulacion = null;
      this.currentMovimiento = "";
      this.currentIzquierdo = "";
      this.currentDerecho = "";
    },

    getArticuloLabel(articulo) {
      const labels = {
        RAQUISCERVICAL: "Raquis Cervical",
        RAQUISDORSOLUMBAR: "Raquis Dorsolumbar",
        HOMBRO: "Hombro",
        CODO: "Codo",
        MUNECA: "Muñeca",
        CADERA: "Cadera",
        RODILLA: "Rodilla",
        TOBILLO: "Tobillo",
        ART_SUBASTRAGALINA: "Art. Subastragalina",
      };
      return labels[articulo] || articulo;
    },

    // Métodos para Sistema Óseo (mantener igual)
    buscardata(x, y, z) {
      this.datosC = BuscarExpFisicaDetalleNombre(x, y, z);
    },

    AddAntec(sistema, clase, musculo, detalle) {
      let item = {
        diag_sistema: sistema,
        diag_clase: clase,
        diag_musculo: musculo,
        diag_detalle: detalle,
      };
      this.NewAntec = [...this.NewAntec, item];
      console.log(this.NewAntec);
      this.limpiarcampos();
    },

    eliminaritem(index) {
      console.log(index);
      this.NewAntec.splice(index, 1);
    },

    limpiarcampos() {
      this.tipoclase = "0";
      this.detalle = "";
      this.tipomusculo = "0";
    },

    // Guardar información - Refactorizado para usar datos unificados
    async guardarInfo8() {
      // Construir objeto base con campos obligatorios
      const datosObservacion = {
        idpaciente: this.StateNumRegHC.idpaciente,
        idprofesional: this.StateNumRegHC.idprofesional,
        idips: this.StateNumRegHC.idips,
        idhc: this.StateNumRegHC.idHC,
        fecha: this.StateNumRegHC.fecha,
        bd: this.bd,
      };

      // Agregar observaciones solo si hay contenido
      if (this.evalFisicaObservaciones && this.evalFisicaObservaciones.trim() !== "") {
        datosObservacion.Data_observaciones = this.evalFisicaObservaciones.trim();
      }

      // Agregar sistema óseo solo si hay elementos
      if (this.NewAntec && this.NewAntec.length > 0) {
        datosObservacion.Data_SOseo = this.NewAntec;
      }

      // Construir array de miembro superior solo con articulaciones que tienen movimientos
      const msuperiorData = [];
      ["RAQUISCERVICAL", "RAQUISDORSOLUMBAR", "HOMBRO", "CODO", "MUNECA"].forEach(
        (art) => {
          const movimientos = this.getMovimientosByArticulo(art);
          if (movimientos && movimientos.length > 0) {
            msuperiorData.push({ [art]: movimientos });
          }
        }
      );
      if (msuperiorData.length > 0) {
        datosObservacion.Data_EvalMSuperior = msuperiorData;
      }

      // Construir array de miembro inferior solo con articulaciones que tienen movimientos
      const minferiorData = [];
      ["CADERA", "RODILLA", "TOBILLO", "ART_SUBASTRAGALINA"].forEach((art) => {
        const movimientos = this.getMovimientosByArticulo(art);
        if (movimientos && movimientos.length > 0) {
          minferiorData.push({ [art]: movimientos });
        }
      });
      if (minferiorData.length > 0) {
        datosObservacion.Data_EvalMInferior = minferiorData;
      }

      console.log("Datos a guardar en guardarInfo8:", datosObservacion);
      this.SaveDatos8(datosObservacion);
    },

    getMovimientosByArticulo(articulo) {
      return this.movimientosData.filter((m) => m.articulo === articulo);
    },

    clearCasillas() {
      this.currentMovimiento = "";
      this.currentIzquierdo = "";
      this.currentDerecho = "";
    },
  },
  computed: {
    ...mapState("hc", ["StateNumRegHC"]),
  },
};
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header d-flex justify-content-between">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse8"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapse8"
      >
        Exploracion Fisica
      </button>
      <!--  -->
      <!--         <button class="btn btn-outline-primary btn-sm">save</button> -->
      <!--  -->
    </h2>
    <div id="panelsStayOpen-collapse8" class="accordion-collapse collapse">
      <div class="accordion-body">
        <h6>Inspección y Palpación</h6>
        <p>Evaluación por aparatos y sistemas: Comparando con el lado colateral</p>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-soseo-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-soseo"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="false"
            >
              Sistema Oseo
            </button>

            <button
              class="nav-link"
              id="nav-msuperior-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-msuperior"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Valoracion Rangos de Movimientos
            </button>

            <!--       <button
              class="nav-link"
              id="nav-minferior-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-minferior"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="true"
            >
              Valoracion Rangos de Movimientos (M Inferior)
            </button> -->
          </div>
        </nav>
        <!--  -->
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-soseo"
            role="tabpanel"
            tabindex="0"
          >
            <p>Seleccione y agregue hallazgos</p>

            <div class="row">
              <div class="col-12 col-md-6">
                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="tipoclase"
                  @change="buscardata(tipoclase, data_exp, 'detalle')"
                >
                  <option selected value="0">--seleccione Clase--</option>
                  <option
                    v-for="(item, index) in data_exp"
                    :key="index"
                    :value="item.clase"
                  >
                    {{ item.clase }}
                  </option>
                </select>

                <select
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  v-model="tipomusculo"
                >
                  <option value="0" selected>--Seleccione Tipo musculo--</option>
                  <option v-for="item in datosC" :key="item.id">
                    {{ item }}
                  </option>
                </select>

                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >Detalle</label
                  >
                  <textarea
                    class="form-control form-control-sm"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="detalle"
                  ></textarea>
                </div>

                <div class="row">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    v-if="tipoclase != '0' && tipomusculo != '0' && detalle != ''"
                    @click="AddAntec('Oseo', tipoclase, tipomusculo, detalle)"
                  >
                    agregar
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-header">Registro</div>
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Sistema</th>
                        <th>Clase</th>
                        <th>Musculo</th>
                        <th>Detalle</th>
                        <th>Opc</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in NewAntec" :key="index">
                        <td>{{ item.diag_sistema }}</td>
                        <td>{{ item.diag_clase }}</td>
                        <td>{{ item.diag_musculo }}</td>
                        <td>{{ item.diag_detalle }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="eliminaritem(index)"
                          >
                            <i class="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------------------------------------------------------------- -->
          <div class="tab-pane fade" id="nav-msuperior" role="tabpanel" tabindex="0">
            <div class="row mt-4">
              <h5>Valoracion de rangos de Mov (Miembro Superior e Inferior)</h5>

              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-header bg-info text-white">
                    <strong>Agregar Movimiento</strong>
                  </div>
                  <div class="card-body">
                    <!-- Seleccionar Miembro -->
                    <div class="mb-3">
                      <label class="form-label"><strong>Tipo de Miembro</strong></label>
                      <select
                        class="form-select form-select-sm"
                        v-model="currentMiembro"
                        @change="
                          currentArticulacion = null;
                          currentMovimiento = '';
                          clearMovimientoForm();
                        "
                      >
                        <option value="">--Seleccione Miembro--</option>
                        <option value="Miembro Superior">Miembro Superior</option>
                        <option value="Miembro Inferior">Miembro Inferior</option>
                      </select>
                    </div>

                    <!-- Seleccionar articulación -->
                    <div class="mb-3" v-if="currentMiembro">
                      <label class="form-label"><strong>Articulación</strong></label>
                      <select
                        class="form-select form-select-sm"
                        v-model="currentArticulacion"
                      >
                        <option value="">--Seleccione Articulación--</option>
                        <option
                          v-for="art in availableArticulaciones[currentMiembro]"
                          :key="art"
                          :value="art"
                        >
                          {{ getArticuloLabel(art) }}
                        </option>
                      </select>
                    </div>

                    <!-- Seleccionar movimiento -->
                    <div class="mb-3" v-if="currentArticulacion">
                      <label class="form-label">Movimiento</label>
                      <select
                        class="form-select form-select-sm"
                        v-model="currentMovimiento"
                      >
                        <option value="">--Seleccione Movimiento--</option>
                        <option
                          v-for="mov in availableMovimientos[currentArticulacion]"
                          :key="mov"
                          :value="mov"
                        >
                          {{ mov }}
                        </option>
                      </select>
                    </div>

                    <!-- Campos de evaluación -->
                    <div class="row" v-if="currentMovimiento">
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Izquierdo</label>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          placeholder="Valor numérico"
                          v-model.number="currentIzquierdo"
                          step="0.1"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label">Derecho</label>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          placeholder="Valor numérico"
                          v-model.number="currentDerecho"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <!-- Botón agregar -->
                    <button
                      type="button"
                      class="btn btn-success btn-sm w-100"
                      @click="addMovimiento"
                      v-if="currentMovimiento && currentIzquierdo && currentDerecho"
                    >
                      <i class="bi bi-plus-circle"></i> Agregar
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-header bg-success text-white">
                    <strong
                      >Movimientos Registrados ({{ movimientosData.length }})</strong
                    >
                  </div>
                  <div class="card-body" style="max-height: 450px; overflow-y: auto">
                    <table
                      class="table table-sm table-hover"
                      v-if="movimientosData.length > 0"
                    >
                      <thead class="table-light">
                        <tr>
                          <th style="width: 20%">Miembro</th>
                          <th style="width: 20%">Articulación</th>
                          <th style="width: 20%">Movimiento</th>
                          <th style="width: 12%">Izq</th>
                          <th style="width: 12%">Der</th>
                          <th style="width: 16%">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in movimientosData" :key="index">
                          <td>
                            <small
                              class="badge"
                              :class="
                                item.miembro === 'Miembro Superior'
                                  ? 'bg-info'
                                  : 'bg-warning'
                              "
                            >
                              {{ item.miembro }}
                            </small>
                          </td>
                          <td>
                            <small class="badge bg-primary">{{
                              getArticuloLabel(item.articulo)
                            }}</small>
                          </td>
                          <td>
                            <span class="fw-500">{{ item.movimiento }}</span>
                          </td>
                          <td>
                            <span class="text-muted">{{ item.izquierdo }}</span>
                          </td>
                          <td>
                            <span class="text-muted">{{ item.derecho }}</span>
                          </td>
                          <td>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="deleteMovimiento(index)"
                              title="Eliminar este movimiento"
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else class="alert alert-secondary text-center mb-0">
                      <i class="bi bi-info-circle"></i> No hay movimientos registrados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div class="container-fluid">
          <div class="col-12">
            <textarea
              class="form-control form-control-sm"
              id="exampleFormControlTextarea1"
              placeholder="Observaciones"
              rows="3"
              v-model="evalFisicaObservaciones"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- hc8_expfisica -->
