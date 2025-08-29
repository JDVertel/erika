<!-- hc00_detalle -->
<template>
<div>

    <div class="container-fluid Cont_hc">
        <div class="container-fluid">
            <h6 class="display-6">Registro de consulta del paciente</h6>

            idpaciente: {{ idpaciente }}
            idprofesional: {{ idprofesional }}
            idips: {{ idips }}
            <hr>
            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5>
                        Datos de la Atencion</h5>
                </div>
                <div class="col-6 col-md-2"><strong>Ips:</strong> Ips Erika Jasmin</div>
                <div class="col-6 col-md-2"><strong>Nit:</strong>1234567</div>
                <div class="col-6 col-md-2">
                    <strong>Profesional:</strong> Ramon Vertel
                </div>
                <div class="col-6 col-md-2"><strong>Tipo cita:</strong>Control</div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5> Datos Personales</h5>
                </div>

                <div class="col-6 col-md-2"><strong>Nombres:</strong> juan david</div>
                <div class="col-6 col-md-2">
                    <strong>Apellidos:</strong> vertel holguin
                </div>

                <div class="col-6 col-md-2"><strong>Documento :</strong>13862306</div>
                <div class="col-3 col-md-1"><strong>Sexo:</strong> M</div>
                <div class="col-3 col-md-1"><strong>Edad:</strong> 43</div>
            </div>
        </div>
        <div>
            <button class="btn btn-primary" @click="crearNuevoRegistro">+ Crear nuevo registro en HC</button>
        </div>

        <br />
        <div class="container-fluid" v-if="idpaciente && idprofesional && idips && nuevafact === 0">
            <C_Hc />
        </div>
        <router-link to="/dashboard">Home</router-link>
    </div>

</div>
</template>

<style scoped>
</style>

<script>
import {
    computed
} from "vue";
import HCdetallada from "./h_clinica.vue";

import Registro from "./registroForm.vue";
import {
    mapState
} from "vuex/dist/vuex.cjs.js";

export default {
    data: () => ({
        registrado: 1,
        idpaciente: "",
        idprofesional: "",
        idips: "",
    }),

    components: {
        C_Hc: HCdetallada,
    },
    mounted() {
        // Recuperar el parámetro 'id' de la ruta
        this.idpaciente = this.$route.params.idpaciente;
        this.idips = this.$route.params.idips;
        this.idprofesional = this.$route.params.idprofesional;
    },
    methods: {
        crearNuevoRegistro() {
            let datos = {
                idpaciente: this.idpaciente,
                idprofesional: this.idprofesional,
                idips: this.idips,
            }
        },
    },
    computed: {
        ...mapState(["DataEmpresa"])
    },

    created() {

    },
};
</script>
