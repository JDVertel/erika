<!-- hc00_detalle -->
<template>
<div>

    <div class="container-fluid Cont_hc">
        <div class="container-fluid">
            <h6 class="display-6">Registrar actividades realizadas al paciente</h6>

            idpaciente: {{ idpaciente }}
            idprofesional: {{ idprofesional }}
            idips: {{ idips }}
            <hr>
            idfactura: {{ idfactura }}
            <hr>

            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5>
                        Datos de la Atencion</h5>
                </div>
                <div class="col-6 col-md-2"><strong>Ips:</strong> {{ idips }}</div>
                <div class="col-6 col-md-2"><strong>Nit:</strong></div>
                <div class="col-6 col-md-2">
                    <strong>Profesional:</strong> {{ idprofesional }}
                </div>
                <div class="col-6 col-md-2"><strong>Tipo cita:</strong></div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 col-md-2 relleno1">
                    <h5> Datos Personales</h5>
                </div>

                <div class="col-6 col-md-2"><strong>Nombres:</strong> </div>
                <div class="col-6 col-md-2">
                    <strong>Apellidos:</strong> 
                </div>

                <div class="col-6 col-md-2"><strong>Documento :</strong></div>
                <div class="col-3 col-md-1"><strong>Sexo:</strong> </div>
                <div class="col-3 col-md-1"><strong>Edad:</strong> </div>
            </div>
        </div>
        <div>
            <button class="btn btn-primary" @click="crearNuevoRegistro" v-if="! this.StateNumRegHC">+ Crear nuevo registro en HC</button>
        </div>

        <br />
        <div class="container-fluid" v-if="idpaciente && idprofesional && idips && this.StateNumRegHC ">
            <C_Hc :idpaciente="idpaciente" :idprofesional="idprofesional" :idips="idips" :idfactura="idfactura" />
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
    mapState,
    mapActions
} from "vuex/dist/vuex.cjs.js";

export default {
    data: () => ({
      /*   registrado: 1, */
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
        ...mapActions("hc", ["SaveHCcabecera"]),

        crearNuevoRegistro() {

            let datos = {
                idpaciente: this.idpaciente,
                idprofesional: this.idprofesional,
                idips: this.idips,
            }

            this.SaveHCcabecera(datos);
        },
    },
    computed: {
        ...mapState("hc", ["StateNumRegHC"]),
        ...mapState("Auth", [
            "DataPagina"
        ]),

        idfactura() {
            return this.StateNumRegHC && this.StateNumRegHC[0].idHC ? this.StateNumRegHC[0].idHC : null;
        }

    },

    created() {

    },
};
</script>
