<template>
  <div>
    <div class="container mt-3" id="panelbusqueda">
      <!--    <p>IDpaciente: {{ iduser }}</p>
      <p>IDips: {{ idips }}</p>
      <p>IDprof: {{ idprof }}</p> -->

      <div class="row">
        <h3 class="centrarcontenido">Historia Clinica</h3>
      </div>
      <div class="container centrarcontenido">
        <div class="row">
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
                    <option selected value="0">Tipo Doc</option>
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
                <div class="col-2">
                  <button
                    class="btn btn-success btn-sm"
                    @click="BTN_Buscar_paciente(B_tipodoc, B_numdoc)"
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- **************************************************************************************************** -->
    <div id="register" v-if="registrado == '0'">
      <h6 class="display-6 text-center">Paciente no Encontrado !!!</h6>
      <Registro />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-10"><h6 class="display-6">Historias clinicas</h6></div>
        <div class="col-2">
          <router-link to="/hc" tag="button" class="mi-boton"
            ><button type="button btn-sm" class="btn btn-warning">
              + Nuevo
            </button></router-link
          >
        </div>
      </div>
      <!--   <router-link to="/vitrina"
                  ><a class="nav-link-menu" aria-current="page">
                    <h3 style="color: black">Vitrina</h3>
                    <p style="color: black">Gestión de productos y servicios</p>
                  </a></router-link -->

      <hr />
      <h6>Registro</h6>
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
export default {
  data: () => ({
    registrado: "",
    B_tipodoc: "0",
    B_numdoc: "",
    iduser: "",
    response: "",
    responsetable: "",
  }),
  methods: {
    BTN_Buscar_paciente(tipodoc, numdoc) {
      this.iduser = tipodoc + numdoc;
      console.log(this.iduser);
      /* consultar si existe el paciente */
      /* CONSULTA */

      if (this.response) {
        console.log("paciente encontrado");
        /* trae los datos del paciente y consulta el registro de hc */
        /* CONSULTAS */
        /* consulta los registros de hc del paciente */
        this.selectRegHcPac();

        if (this.responsetable) {
          /* renderiza el contenido en la tabla */
        } else {
          /* muestra en pantalla el mensaje sin registros del hc del paciente */
        }
      } else {
        console.log("el paciente no existe");
        /* muestra en pantalla el container son la informacion sin registros  */
      }
    },

    selectRegHcPac() {
      /* si la respuesta es positiva bucar el historial del paciente */
      console.log("consutando historial del paciente");
    },
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
