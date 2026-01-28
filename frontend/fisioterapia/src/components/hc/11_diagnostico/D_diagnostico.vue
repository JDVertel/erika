<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      cie10Seleccionado: null,
      tipoDiagnostico: "0",
      busquedaCIE10: "",
      resultadosCIE10: [],
      modalInstance: null,
      NewAntec: [],
      ArraySaveConsulta: {},
      /*  */
      bd: "hc11_diagnosticos",
      Data_analisis: "{}",
    };
  },

  computed: {
    ...mapState("hc", ["StateNumRegHC", "Cie10"]),
  },

  watch: {
    // Observar cambios en el campo de búsqueda para limpiar resultados cuando esté vacío
    busquedaCIE10(newVal) {
      console.log("Watch: busquedaCIE10 cambió a:", newVal);
      if (!newVal || newVal.trim() === "") {
        console.log("Watch: Limpiando resultados");
        // Usar splice para forzar reactividad
        this.resultadosCIE10.splice(0, this.resultadosCIE10.length);
        this.$nextTick(() => {
          this.resultadosCIE10 = [];
        });
      }
    },
  },

  mounted() {
    try {
      const modalElement = document.getElementById("modalCIE10");
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
    } catch (error) {
      console.warn("Modal element not found or already destroyed", error);
    }
    // Validar que StateNumRegHC sea un objeto antes de acceder a sus propiedades
    if (
      this.StateNumRegHC &&
      typeof this.StateNumRegHC === "object" &&
      this.StateNumRegHC.idpaciente
    ) {
      this.idPaciente = this.StateNumRegHC.idpaciente;
    }
    this.idhc = this.idfactura;
  },

  methods: {
    ...mapActions("hc", ["SaveDatos11"]),

    abrirModalCIE10() {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    },
    buscarCIE10() {
      console.log("buscarCIE10 ejecutado, término:", this.busquedaCIE10);

      // Limpiar resultados si no hay búsqueda o si está vacío
      if (!this.busquedaCIE10 || this.busquedaCIE10.trim() === "") {
        console.log("Campo vacío, limpiando resultados");
        // Forzar limpieza completa con múltiples métodos
        this.resultadosCIE10.splice(0, this.resultadosCIE10.length);
        this.$nextTick(() => {
          this.resultadosCIE10 = [];
        });
        return;
      }

      // Validar que Cie10 existe y es un array
      if (!this.Cie10 || !Array.isArray(this.Cie10) || this.Cie10.length === 0) {
        console.warn("Cie10 no está disponible o está vacío");
        this.resultadosCIE10 = [];
        return;
      }

      // Filtrar resultados
      const terminoBusqueda = this.busquedaCIE10.toLowerCase().trim();
      const nuevosResultados = this.Cie10.filter(
        (item) =>
          item.descripcion.toLowerCase().includes(terminoBusqueda) ||
          item.codigo.toLowerCase().includes(terminoBusqueda)
      );

      // Limpiar primero y luego asignar nuevos resultados
      this.resultadosCIE10 = [];
      this.$nextTick(() => {
        this.resultadosCIE10 = nuevosResultados;
      });

      console.log("Resultados encontrados:", nuevosResultados.length);
    },
    seleccionarCIE10(item) {
      this.cie10Seleccionado = item;
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },

    AddAntec(tipoAct, enf, tdiagnostico) {
      let item = {
        tipoActividad: tipoAct,
        enfermedad: enf,
        tdiagnostico: tdiagnostico,
      };
      this.NewAntec = [...this.NewAntec, item];
      this.limpiarCampos();
    },
    eliminarDiagnostico(index) {
      this.NewAntec.splice(index, 1);
    },

    limpiarCampos() {
      this.cie10Seleccionado = null;
      this.tipoDiagnostico = "0";
      this.busquedaCIE10 = "";
      this.resultadosCIE10 = []; // Limpiar también los resultados de búsqueda
    },
    guardarInfo11() {
      this.ArraySaveConsulta = {
        idpaciente: this.StateNumRegHC.idpaciente,
        idprofesional: this.StateNumRegHC.idprofesional,
        idips: this.StateNumRegHC.idips,
        idhc: this.StateNumRegHC.idHC,
        fecha: this.StateNumRegHC.fecha,
        bd: this.bd,
        Data_analisis: this.NewAntec,
      };
      this.SaveDatos11(this.ArraySaveConsulta);
    },
  },
  computed: {
    ...mapState("hc", ["StateNumRegHC", "Cie10", "Cups"]),
  },
};
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse11"
        aria-expanded="false"
      >
        Diagnostico CIE-10
      </button>
    </h2>
    <div id="panelsStayOpen-collapse11" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="container">
          <div class="row mt-3">
            <div class="col-12 col-md-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  :value="
                    cie10Seleccionado
                      ? `${cie10Seleccionado.codigo} - ${cie10Seleccionado.descripcion}`
                      : ''
                  "
                  placeholder="--CIE-10--"
                  readonly
                />
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  @click="abrirModalCIE10"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <select class="form-select form-select-sm" v-model="tipoDiagnostico">
                <option value="0">--Tipo de Diagnostico--</option>
                <option value="Principal">Diagnostico Principal</option>
                <option value="Confirmado">Diagnostico Confirmado</option>
                <option value="Imp_Diagnostiva">Impresion Diagnostica</option>
                <option value="Relacionado">Diagnostico Relacionado</option>
              </select>
            </div>
            <div class="col-6 col-md-4">
              <button
                class="btn btn-warning btn-sm"
                @click="AddAntec('diagnostico', cie10Seleccionado, tipoDiagnostico)"
                :disabled="!cie10Seleccionado || tipoDiagnostico === '0'"
              >
                Agregar
              </button>
            </div>
          </div>

          <!-- Tabla de diagnósticos -->
          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th>Tipo diagnóstico</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in NewAntec" :key="index">
                <td>{{ item.tdiagnostico }}</td>
                <td>{{ item.enfermedad.codigo }}</td>
                <td>{{ item.enfermedad.descripcion }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminarDiagnostico(index)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <!--             <button class="btn btn-warning" @click="guardarInfo11">+ Guardar</button> -->
      </div>
    </div>

    <!-- Modal CIE-10 -->
    <div class="modal fade" id="modalCIE10" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buscar CIE-10</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              v-model="busquedaCIE10"
              @input="buscarCIE10"
              placeholder="Buscar diagnóstico..."
            />
            <div class="table-responsive mt-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultadosCIE10" :key="item.codigo">
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-primary"
                        @click="seleccionarCIE10(item)"
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- hc11_diagnostico -->
