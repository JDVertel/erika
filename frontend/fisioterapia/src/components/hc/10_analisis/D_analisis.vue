<!-- hc10_analisis -->
<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse10" aria-expanded="false" aria-controls="panelsStayOpen-collapse10">
        Analisis ok
      </button>
    </h2>
    <div id="panelsStayOpen-collapse10" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="mb-3">
          <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="analisis"
            placeholder="analisis"></textarea>
        </div>
        <button class="btn btn-warning" @click="guardarInfo">+ Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      arrayDatosConsulta: [],
      analisis: "",
      idhc: 1,

    };
  },
  methods: {

    ...mapActions("Hc", ["SaveDatos10"]),
    async guardarInfo() {

      this.arrayDatosConsulta = [
        {
          analisis: this.analisis,
          bd: "hc10_analisis",
          idhc: this.idhc,
        },
      ];
      this.SaveDatos10(this.arrayDatosConsulta[0]);
      console.log("Datos guardados:", this.arrayDatosConsulta);
    },
  },
};
</script>
