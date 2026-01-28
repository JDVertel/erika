<script>
import HCdetallada from "./h_clinica.vue";

import {
    mapState,
    mapActions
} from "vuex/dist/vuex.cjs.js";

export default {
    data: () => ({
        idpaciente: "",
        idips: "",
        idprofesional: "",
        tipoC: "",
    }),

    components: {
        C_Hc: HCdetallada,
    },
    mounted() {
        // Recuperar el parámetro 'id' de la ruta
        this.idpaciente = this.$route.params.idpaciente;
        this.idips = this.$route.params.idips;
        this.idprofesional = this.$route.params.idprofesional;
        this.tipoC = this.$route.params.tipoC;
    },
    methods: {
        ...mapActions("hc", ["SaveHCcabecera","loadCIE10","loadCUPS"]),

        crearNuevoRegistro() {
            const datos = {
                idpaciente: this.idpaciente,
                idprofesional: this.idprofesional,
                idips: this.idips,
                tipoC: this.tipoC || "",
                fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
            };

            this.SaveHCcabecera(datos);
        },

    },
    computed: {
        ...mapState("hc", ["StateNumRegHC"]),
        ...mapState("Auth", ["DataPagina","cie10","Cups"]),

        idfactura() {
            const reg = this.StateNumRegHC;
            if (!reg) return null;
            if (Array.isArray(reg)) {
                return reg.length > 0 && reg[0] && reg[0].idHC ? reg[0].idHC : null;
            }
            return reg.idHC ? reg.idHC : null;
        },
    },

    created() {
        this.loadCIE10();
        this.loadCUPS();
    },
};
</script>

<template>
<div>
    <div class="container-fluid Cont_hc">
        <div class="container-fluid">
            <h6 class="display-6">Registrar actividades realizadas al paciente</h6>

            idpaciente: {{ idpaciente }} idprofesional: {{ idprofesional }} idips: {{ idips }}
            <hr />
            idHC: {{ idfactura }}
            <hr />

            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5>Datos de la Atencion</h5>
                </div>
                <div class="col-6 col-md-2"><strong>Ips:</strong> {{ idips }}</div>
                <div class="col-6 col-md-2"><strong>Nit:</strong></div>
                <div class="col-6 col-md-2">
                    <strong>Profesional:</strong> {{ idprofesional }}
                </div>
                <div class="col-6 col-md-2"><strong>Tipo cita:</strong> {{ tipoC }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5>Datos Personales</h5>
                </div>

                <div class="col-6 col-md-2"><strong>Nombres:</strong></div>
                <div class="col-6 col-md-2">
                    <strong>Apellidos:</strong>
                </div>

                <div class="col-6 col-md-2"><strong>Documento :</strong></div>
                <div class="col-3 col-md-1"><strong>Sexo:</strong></div>
                <div class="col-3 col-md-1"><strong>Edad:</strong></div>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-3">
                <button class="btn btn-warning" @click="cerrar" v-if="!this.StateNumRegHC">
                    Cerrar sin crear registro HC
                </button>
            </div>
            <div class="col-9">
                <button class="btn btn-primary" @click="crearNuevoRegistro" v-if="!this.StateNumRegHC">
                    + Crear nuevo registro en la Historia Clinica
                </button>
            </div>
        </div>

        <br />
        <div class="container-fluid" v-if="idpaciente && idprofesional && idips && this.StateNumRegHC">
            <C_Hc />
        </div>
    </div>
</div>
</template>

<style scoped></style>

<!-- hc00_detalle -->
