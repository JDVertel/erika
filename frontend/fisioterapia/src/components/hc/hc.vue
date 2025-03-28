<!-- hc00_detalle -->
<template>
  <div>
    <!--     <div class="container mt-3" id="panelbusqueda" v-if="registrado == 1">
      <p>IDpaciente: {{ iduser }}</p>
      <p>IDips: {{ idips }}</p>
      <p>IDprof: {{ idprof }}</p>

      <div class="row">
        <h3 class="centrarcontenido">Historia Clinica</h3>
      </div>
      <div class="container centrarcontenido" v-if="this.iduser == ''">
        <div class="row">
          <div class="col-2">
            <p>logo buscar</p>
          </div>
          <div class="col-10">
            <div class="container">
              <h5>Ingrese la identificacion del paciente a consultar</h5>
              <div class="row">
                <div class="col-5">
                  <select
                    class="form-select form-select-sm textarea"
                    id="inputGroupSelect01"
                    v-model="B_tipodoc"
                  >
                    <option selected value="">Tipo Doc</option>
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                    <option value="PA">PAS</option>
                  </select>
                </div>
                <div class="col-5">
                  <input
                    type="number"
                    class="form-control form-control-sm textarea"
                    id="text_numdoc"
                    placeholder="# Documento"
                    v-model="B_numdoc"
                  />
                </div>
              </div>
              <br />
              <button
                class="btn btn-success btn-sm"
                @click="BTN_Buscar_paciente()"
                :disabled="BuscarP_isButtonDisabled"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- **************************************************************************************************** -->
    <!--     <div id="register" v-if="registrado == 0">
      <h6 class="display-6 text-center">Paciente no Encontrado !!!</h6>
      <Registro />
    </div> -->

    <!-- **************************************************************************************************** -->
    <div class="container-fluid Cont_hc">
      <div class="container-fluid">
        <h6 class="display-6">Registro de consulta del paciente</h6>
      
      <div class="row">
        <div class="col-12 col-md-2 relleno1">
          <h4>
          Datos de la Atencion</h4>
        </div>
        <div class="col-6 col-md-2"><strong>Ips:</strong> Ips Erika Jasmin</div>
        <div class="col-6 col-md-2"><strong>Nit:</strong>1234567</div>
        <div class="col-6 col-md-2">
          <strong>Profesional:</strong> Ramon Vertel
        </div>
        <div class="col-6 col-md-2"><strong>Tipo cita:</strong>Control</div>
      </div>
      <div class="row">
        <div class="col-12 col-md-2 relleno1">
          <h4> Datos Personales</h4>
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
      <br />

      <C_Hc />
    </div>

    <router-link to="/dashboard">Home</router-link>
  </div>
</template>

<style scoped>
</style>

<script>
import HCdetallada from "./h_clinica.vue";

import Registro from "./registroForm.vue";

export default {
  data: () => ({
    registrado: 1,
  }),

  components: {
    C_Hc: HCdetallada,
  },

  created() {
    // Recuperar el parámetro 'id' de la ruta
    this.iduser = this.$route.params.idpaciente;
    this.idips = this.$route.params.idips;
    this.idprof = this.$route.params.idprof;
  },
};
</script>
