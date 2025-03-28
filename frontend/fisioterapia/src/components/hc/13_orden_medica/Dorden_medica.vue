<!-- hc13_ordenmedica -->
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
    Orden medica  ok
      </button>
    </h2>
    <div id="panelsStayOpen-collapse13" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="container">
          <div class="row mt-3">
            <div class="col-3">
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
            <div class="col-3">
              <input
                type="number"
                class="form-control"
                placeholder="cantidad"
                v-model="cantidad"
              />
            </div>
            <div class="col-3">
              <input
                type="number"
                class="form-control"
                placeholder="Frecuencia (dias)"
                v-model="frecuencia"
              />
            </div>
            <div class="col-3">
              <button
                class="btn btn-warning"
                @click="
                  AddAntec(
                    'orden_medica',
                    cupsSeleccionado,
                    cantidad,
                    frecuencia
                  )
                "
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
                <td>{{ item.enfermedad.codigo }}</td>
                <td>{{ item.enfermedad.descripcion }}</td>
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

        <button class="btn btn-warning" @click="guardarInfo">+ Guardar</button>
      </div>
    </div>

    <!-- Modal CUPS -->
    <div class="modal fade" id="modalCUPS" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buscar CUPS</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
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

<script>
// import { Modal } from 'bootstrap'

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
    };
  },
  mounted() {
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("modalCUPS")
    );
  },
  methods: {
    abrirModalCUPS() {
      this.modalInstance.show();
    },
    buscarCUPS() {
      if (this.busquedaCUPS.trim() === "") {
        this.resultadosCUPS = [];
        return;
      }

      // Datos de ejemplo
      const datosPrueba = [
        {
          codigo: "890301",
          descripcion: "Consulta de primera vez por medicina general",
        },
        {
          codigo: "890302",
          descripcion: "Consulta de control por medicina general",
        },
        {
          codigo: "890303",
          descripcion: "Consulta de primera vez por medicina especializada",
        },
        {
          codigo: "890304",
          descripcion: "Consulta de control por medicina especializada",
        },
        { codigo: "931000", descripcion: "Terapia física integral SOD" },
      ];

      this.resultadosCUPS = datosPrueba.filter(
        (item) =>
          item.codigo.includes(this.busquedaCUPS) ||
          item.descripcion
            .toLowerCase()
            .includes(this.busquedaCUPS.toLowerCase())
      );
    },
    seleccionarCUPS(item) {
      this.cupsSeleccionado = item;
      this.modalInstance.hide();
    },
    AddAntec(tipo, enf, cantidad, frecuencia) {
      let item = {
        tipo: tipo,
        enfermedad: enf,
        cantidad: cantidad,
        frecuencia: frecuencia,
      };
      this.NewAntec = [...this.NewAntec, item];
    },
    eliminarOrden(index) {
      this.NewAntec.splice(index, 1);
    },
    guardarInfo() {
      this.ArraySaveConsulta = [];
      const datos = {
        cups: this.cupsSeleccionado,
        cantidad: this.cantidad,
        frecuencia: this.frecuencia,
        ordenes: this.NewAntec,
      };

      for (let propiedad in datos) {
        if (datos[propiedad]) {
          let element = {
            [propiedad]: datos[propiedad],
          };
          this.ArraySaveConsulta = {
            ...this.ArraySaveConsulta,
            ...element,
          };
        }
      }

      console.log("Datos guardados:", this.ArraySaveConsulta);
      console.log("Array de Antecedentes:", this.NewAntec);
    },
  },
};
</script>
