<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      cupsSeleccionado: null,
      cantidad: "",
      frecuencia: "",
      busquedaCUPS: "",
      resultadosCUPS: [],
      modalInstance: null,
      NewAntec: [],
      ArraySaveConsulta: [],
      /*  */
      idPaciente: "1",
      idhc: "111",
      bd: "hc13_ordenmedica",
    };
  },

  mounted() {
    this.idPaciente = this.idpaciente;
    this.idhc = this.idfactura;
    try {
      const modalElement = document.getElementById("modalCUPS");
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
    } catch (error) {
      console.warn("Modal element not found or already destroyed", error);
    }
  },

  watch: {
    // Observar cambios en el campo de búsqueda para limpiar resultados cuando esté vacío
    busquedaCUPS(newVal) {
      console.log("Watch: busquedaCUPS cambió a:", newVal);
      if (!newVal || newVal.trim() === "") {
        console.log("Watch: Limpiando resultados CUPS");
        // Usar splice para forzar reactividad
        this.resultadosCUPS.splice(0, this.resultadosCUPS.length);
        this.$nextTick(() => {
          this.resultadosCUPS = [];
        });
      }
    },
  },

  methods: {
    ...mapActions("hc", ["SaveDatos13"]),

    abrirModalCUPS() {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    },
    buscarCUPS() {
      console.log("buscarCUPS ejecutado, término:", this.busquedaCUPS);

      // Limpiar resultados si no hay búsqueda o si está vacío
      if (!this.busquedaCUPS || this.busquedaCUPS.trim() === "") {
        console.log("Campo vacío, limpiando resultados CUPS");
        // Forzar limpieza completa con múltiples métodos
        this.resultadosCUPS.splice(0, this.resultadosCUPS.length);
        this.$nextTick(() => {
          this.resultadosCUPS = [];
        });
        return;
      }

      // Validar que Cups existe y es un array
      if (!this.Cups || !Array.isArray(this.Cups) || this.Cups.length === 0) {
        console.warn("Cups no está disponible o está vacío");
        this.resultadosCUPS = [];
        return;
      }

      // Filtrar resultados
      const terminoBusqueda = this.busquedaCUPS.toLowerCase().trim();
      const nuevosResultados = this.Cups.filter(
        (item) =>
          item.codigo.toLowerCase().includes(terminoBusqueda) ||
          item.descripcion.toLowerCase().includes(terminoBusqueda)
      );

      // Limpiar primero y luego asignar nuevos resultados
      this.resultadosCUPS = [];
      this.$nextTick(() => {
        this.resultadosCUPS = nuevosResultados;
      });

      console.log("Resultados CUPS encontrados:", nuevosResultados.length);
    },
    seleccionarCUPS(item) {
      this.cupsSeleccionado = item;
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
    AddAntec(tipo, cups, cantidad, frecuencia) {
      let item = {
        tipo: tipo,
        cups: cups,
        cantidad: cantidad,
        frecuencia: frecuencia,
      };
      this.NewAntec = [...this.NewAntec, item];
      this.limpiarCampos();
    },

    limpiarCampos() {
      this.cupsSeleccionado = null;
      this.busquedaCUPS = "";
      this.cantidad = "";
      this.frecuencia = "";
      this.resultadosCUPS = []; // Limpiar también los resultados de búsqueda
    },
    eliminarOrden(index) {
      this.NewAntec.splice(index, 1);
    },
    guardarInfo13() {
      this.ArraySaveConsulta = {
        idpaciente: this.StateNumRegHC.idpaciente,
        idprofesional: this.StateNumRegHC.idprofesional,
        idips: this.StateNumRegHC.idips,
        idhc: this.StateNumRegHC.idHC,
        fecha: this.StateNumRegHC.fecha,
        bd: this.bd,
        DataOMedica: this.NewAntec,
      };

      this.SaveDatos13(this.ArraySaveConsulta);

      console.log("Datos guardados:", this.ArraySaveConsulta);
    },
  },
  computed: {
    ...mapState("hc", ["StateNumRegHC", "Cups"]),
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
        data-bs-target="#panelsStayOpen-collapse13"
        aria-expanded="false"
      >
        Orden medica CUPS
      </button>
    </h2>
    <div id="panelsStayOpen-collapse13" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="container">
          <div class="row mt-3">
            <div class="col-12 col-md-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  :value="
                    cupsSeleccionado
                      ? `${cupsSeleccionado.codigo} - ${cupsSeleccionado.descripcion}`
                      : ''
                  "
                  placeholder="CUPS"
                  readonly
                />
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  @click="abrirModalCUPS"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div class="col-4 col-md-3">
              <input
                type="number"
                class="form-control"
                placeholder="cantidad"
                v-model="cantidad"
              />
            </div>
            <div class="col-4 col-md-3">
              <input
                type="number"
                class="form-control"
                placeholder="Frecuencia (dias)"
                v-model="frecuencia"
              />
            </div>
            <div class="col-4 col-md-3">
              <button
                class="btn btn-warning"
                @click="AddAntec('orden_medica', cupsSeleccionado, cantidad, frecuencia)"
                :disabled="!cupsSeleccionado"
              >
                agregar
              </button>
            </div>
          </div>

          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Frecuencia</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in NewAntec" :key="index">
                <td>{{ item.cups.codigo }}</td>
                <td>{{ item.cups.descripcion }}</td>
                <td>{{ item.cantidad }}</td>
                <td>{{ item.frecuencia }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminarOrden(index)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--       <button class="btn btn-warning" @click="guardarInfo13">+ Guardar</button> -->
      </div>
    </div>

    <!-- Modal CUPS -->
    <div class="modal fade" id="modalCUPS" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buscar CUPS</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              v-model="busquedaCUPS"
              @input="buscarCUPS"
              placeholder="Buscar procedimiento..."
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
                  <tr v-for="item in resultadosCUPS" :key="item.codigo">
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-primary"
                        @click="seleccionarCUPS(item)"
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

<!-- hc13_ordenmedica -->
