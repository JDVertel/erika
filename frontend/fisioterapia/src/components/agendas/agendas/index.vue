<template>
  <!-- <hr>
    datos de store
{{ id_ips }}-----{{ rol }}---{{ info }}
{{ dataprofesionales }}
<hr>
{{ dataCitas }} -->

  <!-- Para ajustar
dejar vacios los campos tiporeserva y profesional al momento de abrir la pestaña
actualizar agerndas del dia al seleccionar la pestaña tambien ya que nop carga los valores si no actualizas
organizar las fechas(reservar cita)  en orden ya que aparecen desordenadas
-->

  <div class="container">
    <div class="body">
      <div class="container centrado mt-5">
        <h1>Agendamiento</h1>
      </div>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Programadas
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Crear/Eliminar
          </button>
        </li>
      </ul>
      <div class="container">
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
          >
            <!--  -->

            <!--       <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Fecha</span>
                <input
                  type="date"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="FVerAgenda"
                  @change="this.FiltrarAgendaDia()"
                />
              </div> -->

            <br />

            <div class="row">
              <div
                class="col-4 col-md-2 mb-3"
                v-for="reg in this.dataAgendas"
                :key="reg.id"
              >
                <div class="card">
                  <button
                    type="button"
                    class="btn btn-sm"
                    :class="{
                      'btn-primary': reg.clase === 'clases',
                      'btn-success': reg.clase === 'fisioterapia',
                      'btn-warning': reg.clase === 'consulta',
                    }"
                    @click="GetAgendaSelect(reg.id)"
                  >
                    {{ reg.clase }} <br />
                    <small>
                      {{ reg.fecha }}

                      <br />
                      {{ nombreProfesional(reg.id_profesional) }}</small
                    >
                  </button>
                </div>
              </div>
            </div>

            <!--  -->
          </div>
          <div
            class="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            <br />
            <h1 class="display-6">Adicionar un Nueva agenda</h1>
            <div class="container">
              <div class="row">
                <div class="col-6 col-md-3">
                  <select
                    class="form-select form-select-sm"
                    aria-label="Small select example"
                    v-model="t_reserva"
                    @change="filtarProf()"
                  >
                    <option selected value="">Tipo de Reserva</option>
                    <option value="fisioterapia">fisioterapia</option>
                    <option value="consulta">Consulta</option>
                    <option value="clases">Clase</option>
                  </select>
                </div>

                <div class="col-6 col-md-3">
                  <select
                    class="form-select form-select-sm textarea"
                    id="inputGroupSelect02"
                    v-model="p_reserva"
                    @change="filtrarFechasByProf()"
                  >
                    <option selected value="">Profesional</option>
                    <option
                      v-for="profactivo in this.profactivos"
                      :key="profactivo.id"
                      :value="profactivo.id"
                    >
                      {{ profactivo.name1 }} {{ profactivo.apell1 }}
                    </option>
                  </select>
                </div>
                <div class="col-6 col-md-3">
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Fecha</span>
                    <input
                      type="date"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      v-model="fecha_agenda"
                    />
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="GuardarAgenda()"
                    :disabled="isButtonDisabled"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <h3 class="display-6">Listado de agendas del profesional</h3>

            <table class="table table-sm table-striped">
              <thead class="table-danger">
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <!--       <th>Asig</th> -->
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fecha in fechasActivas" :key="fecha.id">
                  <td>{{ fecha.fecha }}</td>
                  <td>{{ fecha.clase }}</td>
                  <!-- <td></td> -->

                  <td>
                    <div
                      class="btn-group btn-group-sm"
                      role="group"
                      aria-label="Small button group"
                    >
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="BTN_eliminar_ItemAgenda(fecha.id)"
                      >
                        X
                      </button>
                      <!--  <button type="button" class="btn btn-warning">Edit</button>
                                        <button type="button" class="btn btn-success">Reasig</button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    </div>
    <br />
    <div class="container home">
      <router-link to="/dashboard">Home</router-link>
    </div>
  </div>
</template>

<!-- ======================================================================================== -->

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
import firebase_api from "@/api/firebaseApi";
export default {
  /* --------------------------------------------------------------------------------------------------- */
  data: () => ({
    t_reserva: "",
    profactivos: "",
    paramsgetAllAgendas: [],
    p_reserva: "",
    fechasActivas: "",
    fecha_agenda: "",
    params_GuardarFechaAgenda: [],
    params_Agendas_Dia: [],
    paramsFechasAgendas: [],
    AgendasOrdenadas: [],
    FVerAgenda: "",
    ListVerAgenda: [],
    CantAgendadDia: "",
    paramsDelAgendas: [],
    paramsAgenda: [],
    // -------------------------------
    reservadas: "",
    asistidas: "",
    noasistidas: "",
  }),
  /* --------------------------------------------------------------------------------------------------- */

  methods: {
    ...mapActions("Agendas", [
      "getDataUsersbyParam",
      "getDataByRangoSuperior",
      "CreateAgendaNueva",
      "getDatabyParam",
      "DeleteItem",
      "GetAgendasSelectAct",
    ]),

    async BuscarProfesionales() {
      this.paramsProfesionales = [
        {
          bd: "profesionales",
          parametro: "id_ips",
          valor: this.id_ips,
          rta: "setStateProfesionales",
        },
      ];
      this.getDataUsersbyParam(this.paramsProfesionales);
      await this.GetListadoAgendas();
      this.fijarfechadia();
      await this.FiltrarAgendaDia();
    },

    async GetCitasAgendaSeleccionada(id) {
      this.paramsAgenda = [
        {
          bd: "citas",
          param: id_agenda,
          valor: id,
        },
      ];
      await this.getDatabyParam(this.paramsAgenda);
    },

    async GetListadoAgendas() {
      const fecha = this.diaformatedfecha;
      console.log(fecha);
      this.paramsFechasAgendas = [
        {
          bd: "agendas",
          parametro: "fecha",
          valor: fecha,
          rta: "setStateAgendas",
        },
      ];
      await this.getDataByRangoSuperior(this.paramsFechasAgendas);
      this.filtrarFechasByProf();
    },

    filtarProf() {
      console.log(this.t_reserva);
      this.profactivos = this.dataprofesionales.filter(
        (profesional) => profesional.tipo == this.t_reserva
      );
      console.log(this.profactivos);
    },
    /* ---------------------------------------------------------- */

    async filtrarFechasByProf() {
      this.fechasActivas = this.dataAgendas.filter(
        (registro) =>
          registro.id_profesional === this.p_reserva && registro.clase === this.t_reserva
      );
      console.log("Fechas Activas:", this.fechasActivas);
    },
    /* -------------------------------------------------------------------------------------------------------------------------------------- */
    async GuardarAgenda() {
      this.params_GuardarFechaAgenda = [
        {
          id_profesional: this.p_reserva,
          fecha: this.formattedDate,
          id_ips: this.id_ips,
          clase: this.t_reserva,
          bd: "agendas",
          /*        rta: "UpdateStateCitas" */
        },
      ];
      (this.fecha_agenda = ""),
        await this.CreateAgendaNueva(this.params_GuardarFechaAgenda[0]);
      this.GetListadoAgendas();
    },

    fijarfechadia() {
      const ListAgendas = this.diaformatedfecha;
      this.FVerAgenda = ListAgendas;
      return ListAgendas;
    },

    FiltrarAgendaDia() {
      let rta = this.dataAgendas.filter((agenda) => agenda.fecha == this.FVerAgenda);
      this.ListVerAgenda = rta;
      console.log("estos son mis datos", this.ListVerAgenda);
      return rta;
    },

    nombreProfesional(dataID) {
      const nombreProf = this.dataprofesionales.filter((prof) => prof.id == dataID);
      return nombreProf[0].name1 + " " + nombreProf[0].apell1;
    },

    async BTN_eliminar_ItemAgenda(id) {
      this.paramsDelAgendas = [
        {
          id: id,
          bd: "agendas",
        },
      ];
      await this.DeleteItem(this.paramsDelAgendas[0]);
      this.GetListadoAgendas();
    },

    async GetAgendaSelect(value) {
      const bd = "citas";
      const parametro = "id_agenda";
      const datasalida = [];
      const response = await firebase_api.get(`/${bd}.json`, {
        params: {
          orderBy: `"${parametro}"`,
          equalTo: `"${value}"`,
        },
      });

      const { data } = response;

      for (let id of Object.keys(data)) {
        datasalida.push({
          id,
          ...data[id],
        });
      }
      this.calculos(datasalida);
    },
  },

  /* --------------------------------------------------------------------------------------------------- */
  computed: {
    ...mapState("Auth", ["user", "id_ips", "rol", "info"]),
    ...mapState("Agendas", ["dataprofesionales", "dataAgendas"]),

    formattedDate() {
      return moment(this.fecha_agenda).format("YYYY-MM-DD");
    },

    diaformatedfecha() {
      return moment(new Date()).format("YYYY-MM-DD");
    },

    isButtonDisabled() {
      return !this.t_reserva || !this.p_reserva || !this.fecha_agenda;
    },
    sortedListaAgendasProfesional() {
      this.fechasActivas.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    cantAgendasDia() {
      const cant = this.ListVerAgenda.length;
      return cant;
    },

    calculos(datasalida) {
      this.reservadas = datasalida.filter((elemento) => elemento.estado === "0").length;
      this.asistidos = datasalida.filter((elemento) => elemento.estado === "SI").length;
      this.noasistidos = datasalida.filter((elemento) => elemento.estado === "NO").length;
      return reservadas, no_asistidos, si_asistidos;
    },
  },
  /* --------------------------------------------------------------------------------------------------- */
  created() {
    this.BuscarProfesionales();
  },
  /* --------------------------------------------------------------------------------------------------- */
};
</script>

<style></style>