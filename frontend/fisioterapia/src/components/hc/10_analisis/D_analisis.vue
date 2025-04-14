<!-- hc10_analisis -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse10" aria-expanded="false" aria-controls="panelsStayOpen-collapse10">
            Analisis
        </button>
    </h2>
    <div id="panelsStayOpen-collapse10" class="accordion-collapse collapse">
        <div class="accordion-body">
            <div class="mb-3">
                <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="Data_analisis" placeholder="Detalle el analisis de la consulta"></textarea>
            </div>
            <button class="btn btn-warning" @click="guardarInfo">+ Guardar</button>
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
            /*  */
            idPaciente: "111",
            idhc: "1",
            bd: "hc10_analisis",
            Data_analisis: "",

        };
    },
    methods: {

        ...mapActions("Hc", ["SaveDatos10"]),
        async guardarInfo() {

            this.arrayDatosConsulta = [{
                idpaciente: this.idPaciente,
                idhc: this.idhc,
                bd: this.bd,
                Data_analisis: this.Data_analisis,
            }, ];
            this.SaveDatos10(this.arrayDatosConsulta[0]);
            console.log("Datos guardados:", this.arrayDatosConsulta);
        },
    },
};
</script>
