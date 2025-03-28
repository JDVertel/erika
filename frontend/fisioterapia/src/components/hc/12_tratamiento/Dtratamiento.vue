<!-- hc12_tratamiento -->
<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse12" aria-expanded="false" aria-controls="panelsStayOpen-collapse12">
        Tratamiento
      </button>
    </h2>
    <div id="panelsStayOpen-collapse12" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="mb-3">
          <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="planTratamiento"
            placeholder="plan de tratamiento"></textarea>
        </div>
        <div class="mb-3">
          <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="objetivos"
            placeholder="objetivos"></textarea>
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
      planTratamiento: "",
      objetivos: "",
      ArraySaveConsulta: [],
      idhc: 1,
    };
  },
  methods: {

    ...mapActions("Hc", ["SaveDatos12"]),

    async guardarInfo() {

      this.ArraySaveConsulta = [
        {
          planTratamiento: this.planTratamiento,
          objetivos: this.objetivos,
          bd: "hc12_tratamiento",
          idhc: this.idhc,

        },
      ];
      this.SaveDatos12(this.ArraySaveConsulta[0]);

    },
  },
}; 
</script>
