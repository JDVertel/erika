<template>
  <div class="row">
    <p class="text-center">
      Ingrese los datos solicitados para registrar un nuevo paciente
    </p>

    <div class="container-fluid">
      <div class="container">
        <form>
          <div class="row">
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_peso"
                  placeholder="1 Nombre"
                  v-model="paciente.nombre1"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_talla"
                  placeholder="2 Nombre"
                  v-model="paciente.nombre2"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_estatura"
                  placeholder="1 Apellido"
                  v-model="paciente.apellido1"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="2 Apellido"
                  v-model="paciente.apellido2"
                />
              </div>
            </div>
            <div class="col-6">
              <select
                class="form-select form-select-sm textarea"
                id="inputGroupSelect01"
                v-model="paciente.s_tipodoc"
              >
                <option selected>Tipo Documento</option>
                <option value="cc">CC</option>
                <option value="ti">TI</option>
                <option value="ce">CE</option>
              </select>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="number"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Numero Documento"
                  v-model="paciente.numdoc"
                />
              </div>
            </div>
            <div class="col-6">
              <select
                class="form-select form-select-sm textarea"
                aria-label="Default select example"
                v-model="paciente.sexo"
              >
                <option selected>Sexo</option>
                <option value="m">M</option>
                <option value="f">F</option>
              </select>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="date"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Fecha de Nacimiento"
                  v-model="paciente.fnacimiento"
                />
              </div>
            </div>
            <div class="col-6">
              <select
                class="form-select form-select-sm textarea"
                aria-label="Default select example"
                v-model="paciente.tiposangre"
              >
                <option selected>Tipo Sangre</option>
                <option value="a+">A+</option>
                <option value="a-">A-</option>
                <option value="b+">B+</option>
                <option value="b-">B-</option>
                <option value="ab+">AB+</option>
                <option value="ab-">AB-</option>
                <option value="o+">O+</option>
                <option value="o-">O-</option>
              </select>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="E Civil"
                  v-model="paciente.ecivil"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Escolaridad"
                  v-model="paciente.escolaridad"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Ocupacion"
                  v-model="paciente.ocupacion"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Direccion"
                  v-model="paciente.direccion"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Telefono"
                  v-model="paciente.tel"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="number"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Celular"
                  v-model="paciente.cel"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-1">
                <input
                  type="mail"
                  class="form-control form-control-sm textarea"
                  id="text_imc"
                  placeholder="Email"
                  v-model="paciente.email"
                />
              </div>
            </div>
          </div>
          <div v-if="origen=='ext'">
       
          </div>
        
        </form>
        <br />
        <div class="row">
          <homeB />
          <div class="col-6">
            <button type="button" class="btn btn-success btn-sm">
              Registrar
            </button>
          </div>
        </div>
        {{ paciente }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import credenciales from "./../hc/credenciales.vue"

let paciente = ref({
  nombre1: "",
  nombre2: "",
  apellido1: "",
  apellido2: "",
  s_tipodoc: "Tipo Documento",
  numdoc: "",
  sexo: "Sexo",
  fnacimiento: "",
  tiposangre: "Tipo Sangre",
  ecivil: "",
  escolaridad: "",
  ocupacion: "",
  direccion: "",
  tel: "",
  cel: "",
  email: "",
  user: "",
  pass:"",
  pass2:"",
});
/* cambio de origen */
let origen = 'ext'
</script>


