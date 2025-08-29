<template>
<div>
    {{ dataprofesionales }}
    <div class="container-fluid navbarprof">
        <div class="row">
            <div class="col-5">
                <h5>Agenda del dia</h5>
            </div>
            <div class="col-7" style="text-align: right;">
                Profesional:
                <span v-if="dataprofesionales && dataprofesionales.length">
                    {{ dataprofesionales[0].name1 }} {{ dataprofesionales[0].apell1 }}
                </span>
                <span v-else>
                    Cargando profesional...
                </span>
                <br>
                Consulta
                <span v-if="dataprofesionales && dataprofesionales.length">
                    {{ dataprofesionales[0].tipo }}
                </span>
                <span v-else>
                    ...
                </span>
                / <small> {{ this.fechaHoy }}</small> <br>

            </div>
        </div>
    </div>

    <div class="container-fluid">

 

        <h5 class="card-title">Citas</h5>

        <table class="table table-striped table-sm ">
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
                    <td>{{ cita.telpaciente }} </td>
                    <td><button type="button" class="btn btn-danger btn-sm" @click="ActualizaEstadoCita('NO', cita)"><i class="bi bi-x-circle"></i> No Asistió</button>
                        <router-link :to="{ name: 'hc', params: { idpaciente: cita.numdoc, idprofesional: this.dataprofesionales[0].id, idips: this.idIPS } }">
                            <button type="button" class="btn btn-primary btn-sm" @click="ActualizaEstadoCita('SI', cita)"> <i class="bi bi-check-circle"></i> Asistió</button>
                        </router-link>


                    </td>
                </tr>

            </tbody>
        </table>
      

        <p class="d-inline-flex gap-1">
            <a class="btn btn-primary btn-sm" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Historial diario
            </a>

        </p>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <caption>Citas Asistidas del dia </caption>
                <table class="table table-striped table-sm ">
                    <thead class="table-info">
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Celular</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cita in this.CitasAsistidas" :key="cita.id">
                            <td>{{ cita.hora }}</td>
                            <td>{{ cita.paciente }}</td>
                            <td>{{ cita.telpaciente }}</td>

                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card card-body">
                <caption>Citas NO Asistidas del dia </caption>
                <table class="table table-striped table-sm ">

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
        <br><br>
    </div>

</div>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex';
import moment from "moment";

export default {
    components: {

    },
    data: () => ({

        idIPS: "1",
        fechaHoy: "",
        idProfesional: "-OM_G1R4rWmmq1GMZo1H",
        //se reemplaza por el id del profesional logueado

        idAgenda: "",
        ParamsActualizarCita: "",
        DataPCita: [],
        CitasAsistidas: [],
        CitasNOAsistidas: [],
        CitasAgendadas: [],
        /* ------------------------------ */
        paramsGetAllcitas: [],

    }),
    methods: {
        ...mapActions('Agendas', ['getDatabyParam', 'updateReserva', 'getDatabyKey']),
        async GetAllCitasDia() {
            this.paramsGetAllcitas = [{
                bd: "citas",
                parametro: "fecha",
                valor: this.fechaHoy,
                rta: "setStateCitas",
            }]
            await this.getDatabyParam(this.paramsGetAllcitas)
            this.DataPCita = this.dataCitas.filter(cita => cita.idprofesional == this.idProfesional)

            this.CitasAsistidas = this.DataPCita.filter(cita => cita.estado == "SI");
            this.CitasNOAsistidas = this.DataPCita.filter(cita => cita.estado == "NO");
            this.CitasAgendadas = this.DataPCita.filter(cita => cita.estado == "0");

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
                /* recompilar esto , solo se reuqiere actualizar el estado */
            };

            if (rta == "SI") {
                console.log("cita asistida");
            } else {
                console.log("cita no asistida");
            };

            await this.updateReserva(this.ParamsActualizarCita)
            this.GetAllCitasDia();
        },

        getDataProfesional() {
            this.params = {
                bd: "profesionales",
                clavePrincipal: this.idProfesional,
                rta: "setStateDataProfesional",
            }
            this.getDatabyKey(this.params)
        }

    },
    computed: {
        ...mapState('Agendas', ['dataCitas', 'dataprofesionales']),
        /*     ...mapState('Auth', []),

 */
        diaformatedfecha() {
            return moment(new Date).format('YYYY-MM-DD');
        },

    },

    created() {
        this.fijarfechadia();
        this.GetAllCitasDia();
        this.getDataProfesional();

    }
}
</script>
