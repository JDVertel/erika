<template>
<div>
    <div class="container mt-3" id="panelbusqueda">
        <!--    <p>IDpaciente: {{ iduser }}</p>
      <p>IDips: {{ idips }}</p>
      <p>IDprof: {{ idprof }}</p> -->

        <h4>Historia Clinica</h4>

        <div class="container">

            <div class="container" v-if="datapaciente.length < 0 || existepaciente === ''">
                <h6 class="small">Ingrese la identificacion del paciente a consultar</h6>
                <div class="row">
                    <div class="col-4">
                        <select class="form-select form-select-sm textarea" id="inputGroupSelect01" v-model="B_tipodoc">
                            <option selected value="">Tipo Doc</option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                            <option value="PA">PAS</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <input type="number" class="form-control form-control-sm textarea" id="text_numdoc" placeholder="# Documento" v-model="B_numdoc" />
                    </div>
                    <div class="col-2">
                        <button class="btn btn-success btn-sm mt-2" @click="BTN_Buscar_paciente(B_tipodoc, B_numdoc)" v-if="B_tipodoc !== '' && B_numdoc !== ''">
                            Buscar
                        </button>
                    </div>
                </div>

                <br />

            </div>
            <div class="col-12" v-if="datapaciente.length > 0">
                <p> <strong>Datos del paciente</strong></p>
                <div class="row">
                    <div class="col-1">
                        <h2>
                            <i class="bi bi-person-check fs-1"></i>
                        </h2>

                    </div>
                    <div class="col-4"><strong>Nombre: <br></strong> {{ datapaciente[0].name1 }} {{ datapaciente[0].apell1 }}
                    </div>
                    <div class="col-4"><strong>F Nacimiento:<br></strong> {{ datapaciente[0].fnacimeinto }}</div>
                    <div class="col-3"><strong>Documento:<br></strong> {{ datapaciente[0].numdoc }}</div>

                    <div class="col-12">

                        <router-link :to="{ name: 'hc', params: { idpaciente: datapaciente[0].numdoc, idprofesional: '1', idips: '1' } }">
                            <button class="btn btn-warning btn-sm mt-2" @click="abrirHC(datapaciente[0]['numdoc'])">
                                + Adicionar
                            </button>
                        </router-link>

                    </div>
                </div>

            </div>

        </div>
    </div>

    <!-- **************************************************************************************************** -->
    <div id="register" v-if="existepaciente === 2">
        <h6 class="display-6 text-center"> <i class="bi bi-person-x-fill  fs-1"></i> Paciente no Encontrado !!!</h6>
        <Registro />
    </div>

    <div class="container" v-if="existepaciente === 1">

        <div class="row">
            <div class="col-10">
                <h5>Registros del paciente</h5>
            </div>
            <div class="col-2">

            </div>
        </div>

        <hr />
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Fecha consulta</th>
                        <th>Diagostico</th>
                        <th>Tipo consulta</th>
                        <th>Profesional</th>
                        <th>Opc</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <td>vv</td>
                        <td>vv</td>
                        <td>vv</td>
                        <td>ramon vertel</td>
                        <td>
                            <button class="btn btn-sm btn-danger">ver</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import HCdetallada from "./h_clinica.vue";

import Registro from "./registroForm.vue";
import {
    mapActions,
    mapState
} from "vuex";
export default {
    components: {
        Registro,
        HCdetallada,
    },
    data: () => ({
        registrado: "",
        B_tipodoc: "0",
        B_numdoc: "",
        iduser: "",
        response: "",
        responsetable: "",
        selectedRegistro: null,
    }),
    methods: {
        ...mapActions("Agendas", ["getDataUsersbyParam"]),

        BTN_Buscar_paciente(tipodoc, numdoc) {
            let idpaciente = tipodoc + numdoc;
            let paramsPaciente = [{
                bd: "pacientes",
                parametro: "numdoc",
                valor: idpaciente,
                rta: "setStatePaciente",
            }, ];
            this.getDataUsersbyParam(paramsPaciente);
        },

        selectRegHcPac(reg) {
            /* si la respuesta es positiva bucar el historial del paciente */
            this.selectedRegistro = reg;
            console.log("registro seleccionado:", reg);
            // Aquí puedes abrir el detalle o navegar a otra vista según sea necesario
        },

        abrirHC(numdoc) {
            console.log(numdoc);
        },
    },

    computed: {
        ...mapState("Agendas", ["datapaciente", "existepaciente"]),
    },
    created() {
        // Recuperar el parámetro 'id' de la ruta
        this.iduser = this.$route.params.idpaciente || "13862306";
        this.idips = this.$route.params.idips || "1";
        this.idprof = this.$route.params.idprof || "2";
    },
};
</script>

<style></style>
