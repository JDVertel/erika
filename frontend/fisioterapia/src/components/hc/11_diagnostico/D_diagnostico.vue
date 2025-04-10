<!-- hc11_diagnostico -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse11" aria-expanded="false">
            Diagnostico ok falta cie-10
        </button>
    </h2>
    <div id="panelsStayOpen-collapse11" class="accordion-collapse collapse">
        <div class="accordion-body">
            <div class="container">
                <div class="row mt-3">
                    <div class="col-4">
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" :value="
                    cie10Seleccionado
                      ? `${cie10Seleccionado.codigo} - ${cie10Seleccionado.descripcion}`
                      : ''
                  " placeholder="CIE-10" readonly />
                            <button class="btn btn-outline-secondary btn-sm" type="button" @click="abrirModalCIE10">
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div class="col-4">
                        <select class="form-select form-select-sm" v-model="tipoDiagnostico">
                            <option value="0">Tipo de Diagnostico</option>
                            <option value="D_Principal">Diagnostico Principal</option>
                            <option value="D_Secundario">Diagnostico Secundario</option>
                            <option value="D_Terciario">Diagnostico Terciario</option>
                            <option value="D_Relacionado">Diagnostico Relacionado</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <button class="btn btn-warning btn-sm" @click="
                  AddAntec('diagnostico', cie10Seleccionado, tipoDiagnostico)
                " :disabled="!cie10Seleccionado || tipoDiagnostico === '0'">
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
                            <td>{{ obtenerTipoDiagnostico(item.detalleenf) }}</td>
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
            <hr />
            <button class="btn btn-warning" @click="guardarInfo">+ Guardar</button>
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
                    <input type="text" class="form-control" v-model="busquedaCIE10" @input="buscarCIE10" placeholder="Buscar diagnóstico..." />
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
                                        <button class="btn btn-sm btn-primary" @click="seleccionarCIE10(item)">
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
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";

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
            idPaciente: "111",
            idhc: "1",
            bd: "hc11_diagnosticos",
            Data_analisis: "{}",
        };
    },
    mounted() {
        this.modalInstance = new bootstrap.Modal(
            document.getElementById("modalCIE10")
        );
    },
    methods: {
        ...mapActions("Hc", ["SaveDatos11"]),

        abrirModalCIE10() {
            this.modalInstance.show();
        },
        buscarCIE10() {
            if (this.busquedaCIE10.trim() === "") {
                this.resultadosCIE10 = [];
                return;
            }

            // Datos de ejemplo
            const datosPrueba = [{
                    codigo: "A00",
                    descripcion: "Cólera"
                },
                {
                    codigo: "A01",
                    descripcion: "Fiebres tifoidea y paratifoidea"
                },
                {
                    codigo: "B01",
                    descripcion: "Varicela"
                },
                {
                    codigo: "C01",
                    descripcion: "Neoplasia maligna de la base de la lengua",
                },
                {
                    codigo: "D01",
                    descripcion: "Carcinoma in situ de otros órganos digestivos",
                },
                {
                    codigo: "E01",
                    descripcion: "Trastornos tiroideos vinculados a deficiencia de yodo",
                },
            ];

            this.resultadosCIE10 = datosPrueba.filter(
                (item) =>
                item.descripcion
                .toLowerCase()
                .includes(this.busquedaCIE10.toLowerCase()) ||
                item.codigo.toLowerCase().includes(this.busquedaCIE10.toLowerCase())
            );
        },
        seleccionarCIE10(item) {
            this.cie10Seleccionado = item;
            this.modalInstance.hide();
        },
        AddAntec(tipo, enf, detalle) {
            let item = {
                tipo: tipo,
                enfermedad: enf,
                detalleenf: detalle,
            };
            this.NewAntec = [...this.NewAntec, item];
        },
        eliminarDiagnostico(index) {
            this.NewAntec.splice(index, 1);
        },
        obtenerTipoDiagnostico(valor) {
            const tipos = {
                1: "Principal",
                2: "Secundario",
                3: "Terciario",
                4: "Relacionado",
            };
            return tipos[valor] || "No especificado";
        },
        guardarInfo() {
            this.ArraySaveConsulta = {
                idPaciente: this.idPaciente,
                idhc: this.idhc,
                bd: this.bd,
                Data_analisis: this.NewAntec,
            };
            this.SaveDatos11(this.ArraySaveConsulta);

        },
    },
};
</script>
