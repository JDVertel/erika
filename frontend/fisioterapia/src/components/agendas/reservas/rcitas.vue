<template>
<div>
    <!--  -------------------------------------------->
    <!--     datos del store auth
    <hr>
    {{ user }}
    <hr>

    <hr>
    id_ips :{{ id_ips }} - id_user: {{ id_user }}- rol: {{ rol }}- info:{{ info }}
    <hr>

    <hr> -->

    <!-- ------------------------------------ -->

    <div class="container">
        <h3>RESERVAR CITAS</h3>
        <p>
            Seleccione la agenda para ver la informacion detallada y reservar sobre el dia
            seleccionado
        </p>
        <!--  -->

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" @click="verListadoReservasByIdAgenda('0')">
                    Fisioterapias
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" @click="verListadoReservasByIdAgenda('0')">
                    Consultas
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" @click="verListadoReservasByIdAgenda('0')">
                    Clases
                </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <br />
                <div class="row">
                    <div class="col-4 col-md-2 mb-3" v-for="reg in filtrado_fisio" :key="reg.id">
                        <div class="card">
                            <button type="button" class="btn btn-sm" :class="{
                    'btn-primary': reg.clase === 'clases',
                    'btn-success': reg.clase === 'fisioterapia',
                    'btn-warning': reg.clase === 'consulta',
                  }" @click="verListadoReservasByIdAgenda(reg)">
                                <hr>
                                <h5>{{ reg.clase }}</h5>
                                <hr>
                                {{ reg.fecha }}
                                <hr />
                                {{ nombreProfesional(reg.id_profesional) }}

                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" v-if="contarCitas(reg.id)">
                                    {{ contarCitas(reg.id) }}
                                    <span class="visually-hidden">Agendados</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <br />
                <div class="row">
                    <div class="col-4 col-md-2 mb-3" v-for="reg in filtrado_consultas" :key="reg.id">
                        <div class="card">
                            <button type="button" class="btn btn-sm" :class="{
                    'btn-primary': reg.clase === 'clases',
                    'btn-success': reg.clase === 'fisioterapia',
                    'btn-warning': reg.clase === 'consulta',
                  }" @click="verListadoReservasByIdAgenda(reg)">
                                <h5>{{ reg.clase }}</h5>
                                <hr>
                                {{ reg.fecha }}
                                <hr>
                                {{ nombreProfesional(reg.id_profesional) }}

                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" v-if="contarCitas(reg.id)">
                                    {{ contarCitas(reg.id) }}
                                    <span class="visually-hidden">Agendados</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <br />
                <div class="row">
                    <div class="col-4 col-md-2 mb-3" v-for="reg in filtrado_clases" :key="reg.id">
                        <div class="card">
                            <button type="button" class="btn btn-sm" :class="{
                    'btn-primary': reg.clase === 'clases',
                    'btn-success': reg.clase === 'fisioterapia',
                    'btn-warning': reg.clase === 'consulta',
                  }" @click="verListadoReservasByIdAgenda(reg)">
                                <h5>{{ reg.clase }}</h5>
                                <hr />
                                {{ reg.fecha }}
                                <hr />
                                {{ nombreProfesional(reg.id_profesional) }}
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" v-if="contarCitas(reg.id)">
                                    {{ contarCitas(reg.id) }}
                                    <span class="visually-hidden">Agendados</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--  -->

        <!--  -->
    </div>

    <br />

    <div class="container">
        <div v-if="sortedListaCitasDia.length > 0">
            <h5>Detalle de Agenda Seleccionada</h5>
        </div>
        <div v-else>
            <h5>Sin registros para mostrar...</h5>
        </div>

        <ol class="list-group list-group" v-for="cita in this.sortedListaCitasDia" :key="cita.id">
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">{{ cita.tipo }} / {{ cita.paciente }}</div>
                    {{ cita.telpaciente }}
                </div>

                <span>
                    <strong>{{ cita.hora }}</strong>
                </span>
            </li>

        </ol>
        <br />
        <div class="container">
            <div class="row mb-3">
                <button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="vaciarformbpaciente()" v-if="clase_agenda !== '' && clase_agenda" :class="[
                        {
                            'btn-primary': clase_agenda === 'clases',
                            'btn-success': clase_agenda === 'fisioterapia',
                            'btn-warning': clase_agenda === 'consulta',
                        },
                    ]">
                    {{ clase_agenda }} ( {{ fecha_agenda }} ) <i class="bi bi-plus-circle"></i> Reservar ó <i class="bi bi-calendar-x"></i> Eliminar
                </button>

            </div>
        </div>

        <!----------------------------- Modal------------------->
        <div class="modal fade" id="exampleModal" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <strong>Realizar una reserva o cancelacion </strong>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.cerrarmodal()"></button>
                    </div>

                    <div class="modal-body">
                        <p class="card-text">Ingrese la identificacion del paciente</p>

                        <div class="row">
                            <div class="col-4 col-md-3">
                                <select class="form-select form-select-sm textarea" id="inputGroupSelect01" v-model="B_tipodoc">
                                    <option selected value="">Tipo Doc</option>
                                    <option value="CC">CC</option>
                                    <option value="TI">TI</option>
                                    <option value="CE">CE</option>
                                    <option value="PA">PAS</option>
                                </select>
                            </div>
                            <div class="col-5 col-md-3">
                                <input type="number" class="form-control form-control-sm textarea" id="text_numdoc" placeholder="# Documento" v-model="B_numdoc" />
                            </div>

                            <div class="col-3 col-md-3">
                                <button class="btn btn-success btn-sm" @click="BTN_Buscar_paciente()" :disabled="BuscarP_isButtonDisabled">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <!-- paciente NO existe -->
                    <div v-if="this.existepaciente == 2">
                        <br />
                        <div class="container">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Registro de nuevo paciente</h5>
                                    <p class="card-text">
                                        Paciente no encontrado, ingrese los siguientes datos para registarlo
                                        y poder realizar una reserva
                                    </p>

                                    <div class="row">
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_1nombre" placeholder="1 Nombre" v-model="name1" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_2nombre" placeholder="2 Nombre" v-model="name2" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_1apelli" placeholder="1 Apellido" v-model="apell1" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_2apell" placeholder="2 Apellido" v-model="apell2" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="number" class="form-control form-control-sm textarea" id="text_tel" placeholder="Celular" v-model="celular" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_direccion" placeholder="Email" v-model="email" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-group mb-1">
                                                <input type="text" class="form-control form-control-sm textarea" id="text_direccion" placeholder="Direccion" v-model="dir" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-group input-group-sm mb-3">
                                                <span class="input-group-text" id="inputGroup-sizing-sm">F Nacimiento:</span>
                                                <input type="date" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="fnacimiento" />
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-warning btn-sm" @click="vaciarformbpaciente()">
                                        Cancelar
                                    </button>
                                    <button class="btn btn-success btn-sm" @click="BTN_registar_Paciente()" :disabled="Guardar_p_isButtonDisabled">
                                        Registrar cliente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- paciente SI existe -->
                    <div class="container" v-if="this.existepaciente == 1">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-3">
                                        <strong>Usuario</strong>

                                        <tr v-for="pac in datapaciente" :key="pac.id">
                                            <div class="row">
                                                {{ pac.numdoc }} <br />{{ pac.name1 }}
                                                {{ pac.apell1 }}
                                            </div>
                                        </tr>
                                    </div>

                                    <div class="col-6">
                                        <div class="row">
                                            <div class="row">
                                                <strong>Tipo / Fecha</strong>{{ clase_agenda }} /
                                                {{ fecha_agenda }}
                                            </div>
                                            <div class="input-group input-group-sm mb-3">
                                                <span class="input-group-text" id="inputGroup-sizing-sm">Hora:</span>
                                                <input type="time" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="listahora" @input="validarCampoTiempo" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-success btn-sm" :disabled="!listahora" @click="BTN_Guardar_cita(clase)">
                                            Guardar cita
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <!--  -->

                            <!--  -->
                            <div class="container">
                                <br />
                                <div>
                                    <h5>Citas Vigentes del Paciente</h5>
                                </div>

                                <table class="table table-sm ">
                                    <thead class="table-warning">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Hora</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Profesional</th>
                                            <th>Opc</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="cita in this.citaspaciente" :key="cita.id">
                                            <td>{{ cita.fecha }}</td>
                                            <td>{{ cita.hora }}</td>
                                            <td>{{ cita.tipo }}</td>
                                            <td>
                                                {{ this.nombreProfesional(cita.idprofesional) }}
                                            </td>
                                            <td>
                                                <button class="btn btn-danger btn-sm" @click="BTN_eliminar_ItemCita(cita.id)">
                                                    x
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <br />
                    </div>
                    <!--  -->
                </div>
            </div>
        </div>

        <!--  -->
    </div>
    <br />

    <div class="container home">
        <router-link to="/dashboard">Home</router-link>
    </div>
</div>
</template>

<!-- --------------------------------------------------------------------------------------------------- -->

<script>
import registroPaciente from "@/components/usuarios/registro.vue";

import {
    mapActions,
    mapState
} from "vuex";
import moment from "moment";
export default {
    data: () => ({
        //Auth
        //parametros de consulta de paciente
        B_tipodoc: "",
        B_numdoc: "",
        id: "",
        //formulario de reservas---
        t_reserva: "",
        p_reserva: "",
        f_reserva: "",
        profactivos: "",

        //-----------------------------
        //  list  -  parametro - valor
        //parametros de consulta pacientes
        paramsPaciente: [],
        //parametros de consulta profesionales
        paramsProfesionales: [],
        //parametros para buscar citas por fechas
        paramsFechasCitas: [],
        //--------------agendamiento
        fechasActivas: "",
        //----------------parametros para guardar citas
        params_GuardarFechaCita: [],
        //---variables de fecha
        paramsDelCitas: [],
        listahora: null,
        //---parametros consulta de tabla de citas del dia seleccionado
        params_citasDia: [],
        ListaCitasDia: [],
        desord_ListaCitasDia: [],
        paramsClear: [],
        //aray de parametros de contedo de citas
        paramsCountAgenda: [],
        // adicionar usuario
        name1: "",
        name2: "",
        apell1: "",
        apell2: "",
        celular: "",
        email: "",
        dir: "",
        fnacimiento: "",
        paramsGuardarPaciente: [],
        paramsClosetModalPac: [],
        paramsCitasPaciente: [],
        citaspaciente: [],
        idpaciente: "",
        valorSeleccionadoSelect: "",
        btnagendar: false,
        id_agenda: "",
        clase_agenda: "",
        fecha_agenda: "",
        nuevoAgendamiento: false,
        dataagenda_fisioterapias: [],
        dataagenda_consultas: [],
        dataagenda_clases: [],

    }),

    /* --------------------------------------------------------------------------- */

    components: {
        registroPaciente,
    },

    /* ------------------------------------------------------------------------ */

    methods: {
        ...mapActions("Agendas", [
            "getDatabyParam",
            "loadProfesionales",
            "getDataByRangoSuperior",
            "createEntradaCitaNueva",
            "getDatarCitasFecha",
            "getDataUsersbyParam",
            "DeleteItem",
            "clearDataStoreA",
            "clearStorePaciente",
            "createEntradanewPaciente",
            "ClosetModalNewPaciente",
            "NewgetDataUsersbyParam",
            "getCountDatabyParam",
        ]),

        /* ---------PACIENTES--------------------------------------------------------------------------- */

        BTN_Buscar_paciente() {
            this.idpaciente = this.B_tipodoc + this.B_numdoc;
            this.paramsPaciente = [{
                bd: "pacientes",
                parametro: "numdoc",
                valor: this.idpaciente,
                rta: "setStatePaciente",
            }, ];
            this.getDataUsersbyParam(this.paramsPaciente);
            /* recargar listado de citas del paciente */
            this.GetAllcitasToPaciente();
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        async BTN_registar_Paciente() {
            this.idpaciente = this.B_tipodoc + this.B_numdoc;
            this.paramsGuardarPaciente = [{
                numdoc: this.idpaciente,
                name1: this.name1,
                name2: this.name2,
                apell1: this.apell1,
                apell2: this.apell2,
                celular: this.celular,
                email: this.email,
                dir: this.dir,
                fnacimiento: this.fnacimento,
                bd: "pacientes",
            }, ];
            await this.createEntradanewPaciente(this.paramsGuardarPaciente[0]);
            this.BTN_Buscar_paciente();
        },

        /* ----------------PROFESIONALES------------------------------------------------------------------- */

        nombreProfesional(dataID) {
            const nombreProf = this.dataprofesionales.filter((prof) => prof.id == dataID);
            const resp = nombreProf[0];
            const nameprofesional = `${resp.name1} ${resp.apell1}`;
            return nameprofesional;
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        BTN_Reservar_BuscarProfesionales() {
            this.btnagendar = true;
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        GetAllProfesionalesToIPS() {
            this.paramsProfesionales = [{
                bd: "profesionales",
                parametro: "id_ips",
                valor: this.id_ips,
                rta: "setStateProfesionales",
            }, ];
            this.getDataUsersbyParam(this.paramsProfesionales);
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        filtarProf() {
            this.profactivos = this.dataprofesionales.filter(
                (profesional) => profesional.tipo == this.t_reserva
            );
            console.log("filtrado de profesionales", this.profactivos);
        },

        /* AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  AGENDAS  */

        filtrarFechasByProf() {
            console.log(" datos agendas cargados", this.dataAgendas);

            this.fechasActivas = this.dataAgendas.filter(
                (registro) =>
                registro.id_profesional === this.p_reserva && registro.clase === this.t_reserva
            );
            console.log("Fechas del profesional activas:", this.fechasActivas[0]);
            this.desord_ListaCitasDia = [];
            this.f_reserva = "";
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        Get_Agendamiento_pacientes_fecha() {
            this.paramsFechasCitas = [{
                bd: "agendas",
                parametro: "fecha",
                valor: this.diaformatedfecha,
                rta: "setStateAgendas",
            }, ];
            this.getDataByRangoSuperior(this.paramsFechasCitas);
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        form_nuevoAgendamiento() {
            this.nuevoAgendamiento = !this.nuevoAgendamiento;
            console.log("mostrando form");
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        verListadoReservasByIdAgenda(agenda) {
            this.id_agenda = agenda.id;
            this.clase_agenda = agenda.clase;
            this.fecha_agenda = agenda.fecha;
            this.idprof_agenda = agenda.id_profesional;
            this.VerListadoCitasAsignadasNew(agenda.id);
        },

        /*  CITAS CITAS   CITAS CITAS   CITAS CITAS   CITAS CITAS   CITAS CITAS   CITAS CITAS   CITAS CITAS  */

        filtrarcitasPaciente_reservadas() {
            console.log("ejecutando filtrocitaspaciente");
            this.citaspaciente = this.dataAllCitas.filter(
                (reg) => reg.numdoc == this.idpaciente
            );
            console.log("citas del paciente ", this.citaspaciente);
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        async BTN_eliminar_ItemCita(id) {
            this.paramsDelCitas = [{
                id: id,
                bd: "citas",
            }, ];
            await this.DeleteItem(this.paramsDelCitas[0]);
            this.GetAllcitasToPaciente();
            this.Get_Citas_pacientes_fecha();
            this.getDataUsersbyParam(this.paramsPaciente);
            this.GetAllcitasToPaciente();
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        async VerListadoCitasAsignadas() {
            this.params_citasDia = [{
                bd: "citas",
                parametro: "id_agenda",
                valor: this.f_reserva,
                rta: "setStateCitas",
            }, ];
            this.desord_ListaCitasDia = await this.getDatabyParam(this.params_citasDia);
            //ordenamos la cita por hora computado
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        async VerListadoCitasAsignadasNew(fechaID) {
            this.params_citasDia = [{
                bd: "citas",
                parametro: "id_agenda",
                valor: fechaID,
                rta: "setStateCitas",
            }, ];
            this.desord_ListaCitasDia = await this.getDatabyParam(this.params_citasDia);
            //ordenamos la cita por hora computado
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        async BTN_Guardar_cita(dataagenda) {
            /* this.capturalabeldeselect(); */
            this.btnagendar = false;

            this.params_GuardarFechaCita = [{
                paciente: this.datapaciente[0].name1 + " " + this.datapaciente[0].apell1,
                numdoc: this.datapaciente[0].numdoc,
                telpaciente: this.datapaciente[0].celular,
                estado: "0",
                hora: this.listahora,
                id_agenda: this.id_agenda, //FALTA
                tipo: this.clase_agenda, //FALTA
                fecha: this.fecha_agenda, //FALTA
                idprofesional: this.idprof_agenda, //FALTA
                bd: "citas",
            }, ];

            await this.createEntradaCitaNueva(this.params_GuardarFechaCita[0]);
            this.GetAllcitasToPaciente();
            this.VerListadoCitasAsignadas();
            this.vaciarcamposReservas();
            this.Get_Citas_pacientes_fecha();
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

        async GetAllcitasToPaciente() {
            console.log("ejecutando buscarallcitas pacientes");
            this.paramsCitasPaciente = [{
                bd: "citas",
                parametro1: "fecha",
                valor1: this.diaformatedfecha,
                rta: "setStateAllCitas",
            }, ];

            await this.NewgetDataUsersbyParam(this.paramsCitasPaciente);
            this.filtrarcitasPaciente_reservadas();
            this.VerListadoCitasAsignadas();
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        Get_Citas_pacientes_fecha() {
            this.paramsFechasCitas = [{
                bd: "citas",
                parametro: "fecha",
                valor: this.diaformatedfecha,
                rta: "setStateAllCitas",
            }, ];
            this.getDataByRangoSuperior(this.paramsFechasCitas);
        },
        /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        contarCitas(data) {
            let cantcitas = this.dataAllCitas.filter((cita) => cita.id_agenda == data);
            let cantidad = cantcitas.length;
            return cantidad;
        },

        /* ------------------SISTEMAS---------------------------------------------------------------------------- */
        capturalabeldeselect() {
            const selectElement = document.getElementById("miSelect");
            this.valorSeleccionadoSelect =
                selectElement.options[selectElement.selectedIndex].textContent;
        },

        DeleteStore() {
            this.paramsClear[{
                ruta: "DeleteStoreM",
            }];
            this.clearDataStoreA(this.paramsClear);
        },
        /*  */
        vaciarcamposReservas() {
            this.f_reserva = "";
            this.p_reserva = "";
            this.t_reserva = "";
            this.listahora = "";
            console.log("vaciando de campos del formulario de reservas");
        },
        /*  */
        vaciarformbpaciente() {
            this.B_tipodoc = "";
            this.B_numdoc = "";
            // No se puede modificar existepaciente directamente, es una propiedad computada
            this.citaspaciente = [];
            /* this.vaciar_store_dataallcitaspaciente(); */
            this.clearStorePaciente();
        },
        cerrarmodal() {
            this.vaciarformbpaciente();
            this.vaciarcamposReservas();
        },

    },
    /* ==================================================================================== */
    computed: {
        ...mapState("Agendas", [
            "datapaciente",
            "existepaciente",
            "dataprofesionales",
            "existeprofesionales",
            "dataCitas",
            "dataAgendas",
            "dataAllCitasPaciente",
            "dataAllCitas",
        ]),
        ...mapState("Auth", ["user", "id_ips", "id_user", "rol", "info"]),

        sortedListaCitasDia() {
            return this.desord_ListaCitasDia.sort((a, b) => {
                const hourA = a.hora.split(":")[0];
                const hourB = b.hora.split(":")[0];
                return hourA - hourB;
            });
        },

        BuscarP_isButtonDisabled() {
            return !this.B_tipodoc || !this.B_numdoc;
        },

        GuardarR_isButtonDisabled() {
            return !this.t_reserva || !this.p_reserva || !this.listahora || !this.f_reserva;
        },

        Guardar_p_isButtonDisabled() {
            return (
                !this.name1 ||
                !this.apell1 ||
                !this.celular ||
                !this.email ||
                !this.dir ||
                !this.fnacimiento
            );
        },

        /*  */
        formattedDate() {
            return moment(this.fecha_agenda).format("YYYY-MM-DD");
        },

        diaformatedfecha() {
            return moment(new Date()).format("YYYY-MM-DD");
        },
        /* Fecha a Dia de semana */

        filtrado_fisio() {
            let rta = this.dataAgendas.filter((reg) => reg.clase == 'fisioterapia');
            return rta
        },

        filtrado_consultas() {
            let rta = this.dataAgendas.filter((reg) => reg.clase == 'consulta');
            return rta
        },

        filtrado_clases() {
            let rta = this.dataAgendas.filter((reg) => reg.clase == 'clases');
            return rta
        },

        /*         async filtrarDataTipoAgendas() {
                    try {
                        // Suponiendo que dataagenda proviene de una función asíncrona
                        const dataagenda = await obtenerDataAgenda(); // Reemplaza con la función real que obtiene los datos

                        this.dataagenda_clases = dataagenda.filter(tipo => tipo.tipo === "clases");
                        this.dataagenda_fisioterapias = dataagenda.filter(tipo => tipo.tipo === "fisioterapia");
                        this.dataagenda_consultas = dataagenda.filter(tipo => tipo.tipo === "consulta");
                        console.log(this.dataagenda_clases);
                        console.log(this.dataagenda_consultas);
                        console.log(this.dataagenda_fisioterapias);
                    } catch (error) {
                        console.error("Error al filtrar datos:", error);
                    }
                } */
    },
    /* ------------------------------------------------------------------------ */

    created() {
        this.DeleteStore();
        this.GetAllProfesionalesToIPS();
        this.Get_Agendamiento_pacientes_fecha();
        this.Get_Citas_pacientes_fecha();

    },
};
</script>

<style>
centrado {
    align-content: center;
}
</style>
