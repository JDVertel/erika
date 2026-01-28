<script>
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
export default {
    data() {
        return {
            planTratamiento: "",
            objetivos: "",
            ArraySaveConsulta: {},
            /*  */
            idPaciente: "",
            idhc: "",
            bd: "hc12_tratamiento",
        };
    },

    mounted() {
        this.idPaciente = this.idpaciente;
        this.idhc = this.idfactura;
    },
    methods: {
        ...mapActions("hc", ["SaveDatos12"]),

        async guardarInfo12() {
            this.ArraySaveConsulta = {
                planTratamiento: this.planTratamiento,
                objetivos: this.objetivos,
                idpaciente: this.StateNumRegHC.idpaciente,
                idprofesional: this.StateNumRegHC.idprofesional,
                idips: this.StateNumRegHC.idips,
                idhc: this.StateNumRegHC.idHC,
                fecha: this.StateNumRegHC.fecha,
                bd: this.bd,
            };
            this.SaveDatos12(this.ArraySaveConsulta);
        },
    },
    computed: {
        ...mapState("hc", ["StateNumRegHC"]),
    },
};
</script>

<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse12" aria-expanded="false" aria-controls="panelsStayOpen-collapse12">
            Tratamiento
        </button>
    </h2>
    <div id="panelsStayOpen-collapse12" class="accordion-collapse collapse">
        <div class="accordion-body">
            <div class="mb-3">
                <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="planTratamiento" placeholder="Describa el plan de tratamiento"></textarea>
            </div>
            <div class="mb-3">
                <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="objetivos" placeholder="Describa los objetivos del plan"></textarea>
            </div>
            <!--   <button class="btn btn-warning" @click="guardarInfo12">+ Guardar</button> -->
        </div>
    </div>
</div>
</template>

<!-- hc12_tratamiento -->
