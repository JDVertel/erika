<script>
import { mapActions, mapState } from "vuex";
import { getCachedUserProfile } from "@/security/accessControl";
import moment from "moment";

export default {
  components: {},
  data: () => ({
    fechaHoy: "",
    idAgenda: "",
    ParamsActualizarCita: "",
    DataPCita: [],
    CitasAsistidas: [],
    CitasNOAsistidas: [],
    CitasAgendadas: [],
    /* ------------------------------ */
    paramsGetAllcitas: [],
    tipoC: "",
    isLoading: true,
  }),
  methods: {
    ...mapActions("Agendas", ["getDatabyParam", "updateReserva"]),

    async GetAllCitasDia() {
      this.paramsGetAllcitas = [
        {
          bd: "citas",
          parametro: "fecha",
          valor: this.fechaHoy,
          rta: "setStateCitas",
        },
      ];
      const result = await this.getDatabyParam(this.paramsGetAllcitas);
      const citas = Array.isArray(result) ? result : [];
      this.DataPCita = citas.filter(
        (cita) => cita.idprofesional === this.idprofesionalLogueado
      );

      this.CitasAsistidas = this.DataPCita.filter((cita) => cita.estado == "SI");
      this.CitasNOAsistidas = this.DataPCita.filter((cita) => cita.estado == "NO");
      this.CitasAgendadas = this.DataPCita.filter((cita) => cita.estado == "0");
    },

    fijarfechadia() {
      const ListAgendas = this.diaformatedfecha;
      this.fechaHoy = ListAgendas;
    },

    async ActualizaEstadoCita(rta, Dcita) {
      this.ParamsActualizarCita = {
        id: Dcita.id,
        estado: rta,
        bd: "citas",
      };

      await this.updateReserva(this.ParamsActualizarCita);
      this.GetAllCitasDia();
    },

    async GetAllAgendas() {
      // Obtiene todas las agendas asignadas al profesional logueado
      const paramsAgendas = [
        {
          bd: "agendas",
          parametro: "id_profesional",
          valor: this.idprofesionalLogueado,
          rta: "setStateAgendas",
        },
      ];
      await this.getDatabyParam(paramsAgendas);
    },
  },
  computed: {
    ...mapState("Agendas", ["dataCitas", "dataAgendas"]),
    ...mapState("Auth", ["id_ips"]),

    // Perfil del usuario logueado desde caché
    perfilLogueado() {
      return getCachedUserProfile() || {};
    },

    // UID del profesional logueado (desde el perfil cacheado)
    idprofesionalLogueado() {
      return this.perfilLogueado.uid || "";
    },

    // Nombre completo del profesional logueado
    nombreProfesional() {
      const nombre = this.perfilLogueado.nombre || "";
      const apellido = this.perfilLogueado.apellido || "";
      return `${nombre} ${apellido}`.trim() || "Profesional";
    },

    // Tipo de consulta del profesional logueado
    tipoCita() {
      return this.perfilLogueado.tipo_consulta || "";
    },

    rolUsuario() {
      return this.perfilLogueado.rol || "";
    },

    idIPS() {
      return this.perfilLogueado.id_ips || this.id_ips || "1";
    },

    diaformatedfecha() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },

  created() {
    this.fijarfechadia();
    Promise.all([this.GetAllCitasDia(), this.GetAllAgendas()]).then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<template>
  <div>
    <!-- {{ dataprofesionales }} -->
    <div class="container-fluid navbarprof">
      <div class="row">
        <div class="col-5">
          <h5>Agenda del dia</h5>
        </div>
        <div class="col-7" style="text-align: right">
          Profesional:
          <span>{{ nombreProfesional }}</span>
          <br />
          Consulta
          <span>{{ tipoCita || "—" }}</span>
          / <small> {{ fechaHoy }}</small> <br />
          <small>Rol: {{ rolUsuario }}</small> &nbsp; <small>IPS: {{ idIPS }}</small>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <h5 class="card-title">Citas</h5>

      <div v-if="isLoading" class="alert alert-info">Cargando citas...</div>

      <table v-else class="table table-striped table-sm">
        <thead class="table-dark">
          <tr>
            <th scope="col">Hora</th>
            <th scope="col">Paciente</th>
            <th scope="col">Celular</th>
            <th scope="col">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in this.CitasAgendadas" :key="cita.id">
            <td>{{ cita.hora }}</td>
            <td>{{ cita.paciente }}</td>
            <td>{{ cita.telpaciente }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="ActualizaEstadoCita('NO', cita)"
              >
                <i class="bi bi-x-circle"></i> No Asistió
              </button>
              <router-link
                :to="{
                  name: 'hc',
                  params: {
                    idpaciente: cita.numdoc,
                    idprofesional: idprofesionalLogueado,
                    idips: idIPS,
                    tipoC: tipoCita,
                  },
                }"
              >
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="ActualizaEstadoCita('SI', cita)"
                >
                  <i class="bi bi-check-circle"></i> Asistió
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="d-inline-flex gap-1">
        <a
          class="btn btn-primary btn-sm"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Historial diario
        </a>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <caption>
            Asistencias
          </caption>
          <table class="table table-striped table-sm">
            <thead class="table-info">
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Paciente</th>
                <th scope="col">Celular</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in this.CitasAsistidas" :key="cita.id">
                <td>{{ cita.hora }}</td>
                <td>{{ cita.paciente }}</td>
                <td>{{ cita.telpaciente }}</td>
                <td>{{ cita.estado }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card card-body">
          <caption>
            Inasistencias
          </caption>
          <table class="table table-striped table-sm">
            <thead class="table-danger">
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Paciente</th>
                <th scope="col">Celular</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in this.CitasNOAsistidas" :key="cita.id">
                <td>{{ cita.hora }}</td>
                <td>{{ cita.paciente }}</td>
                <td>{{ cita.telpaciente }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br /><br />

      <h5 class="card-title">Agendas Asignadas</h5>
      <div v-if="dataAgendas && dataAgendas.length > 0" class="table-responsive">
        <table class="table table-striped table-sm">
          <thead class="table-secondary">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Horario</th>
              <th scope="col">Tipo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agenda in dataAgendas" :key="agenda.id">
              <td>{{ agenda.fecha }}</td>
              <td>{{ agenda.horainicio }} - {{ agenda.horafinal }}</td>
              <td>{{ agenda.tipo }}</td>
              <td>
                <span v-if="agenda.estado === 'activa'" class="badge bg-success">Activa</span>
                <span v-else-if="agenda.estado === 'inactiva'" class="badge bg-danger">Inactiva</span>
                <span v-else class="badge bg-secondary">{{ agenda.estado }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="alert alert-info">No hay agendas asignadas</div>
      <br /><br />
    </div>
  </div>
</template>
