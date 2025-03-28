<template>
<div>
    <div class="centrarcontenido">
        <h1>FisioApp</h1> <strong>Menu</strong>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/dotty/80/overtime.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9">
                            <div class="col-12 p-2">
                                <div>
                                    <router-link :to="{ name: 'reservas', params: { id_user: this.id_user } }"><a class="nav-link-menu" aria-current="page">
                                            <h2>Reservas</h2>
                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Asignacion de citas</strong>
                </div>
            </div>

            <!--  -->

            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/ios/50/calendar--v1.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9">
                            <div class="col-12 p-2">
                                <div>
                                    <router-link to="/agendas"><a class="nav-link-menu" aria-current="page">
                                            <h2>Agendas</h2>

                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Programacion</strong>
                </div>
            </div>
            <!--  -->

            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/dotty/80/sell.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9 p-2">
                            <div class="col-12">
                                <div>
                                    <router-link to="/vitrina"><a class="nav-link-menu" aria-current="page">
                                            <h2>Vitrina</h2>
                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Servicios y Productos</strong>
                </div>
            </div>
            <!--  -->
            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/ios/50/money--v1.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9">
                            <div class="col-12 p-2">
                                <div>
                                    <router-link to="/ventas"><a class="nav-link-menu" aria-current="page">
                                            <h2>Ventas</h2>

                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Registro de ventas</strong>
                </div>
            </div>
            <!--  -->
            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/wired/64/hospital-room.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9">
                            <div class="col-12 p-2">
                                <div>
                                    <router-link to="/buscar_hc"><a class="nav-link-menu" aria-current="page">
                                            <h2>H Clinica</h2>

                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Registro de actividades</strong>
                </div>
            </div>

            <!--  -->

            <div class="col-6 col-md-3">
                <div class="card mb-3 cardDash">
                    <div class="row">
                        <div class="col-3 p-2">
                            <img src="https://img.icons8.com/wired/64/settings.png" class="img_Dashboard" />
                        </div>
                        <div class="col-9 p-2">
                            <div class="col-12">
                                <div>
                                    <router-link to="/parametros"><a class="nav-link-menu" aria-current="page">
                                            <h2>Config</h2>

                                        </a></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <strong class="centrarcontenido">Parametros del sistema</strong>
                </div>
            </div>

            <!-- -------------------------------------------------------------------------------------------------------- -->

        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapState,
    mapActions
} from "vuex";

export default {
    components: {},
    data: () => ({}),

    computed: {
        ...mapState("vitrina", ["cant"]),
        ...mapState("Auth", ["auth", "id_ips", "id_user", "rol", "info"]),
        /*         ...mapState('Agendas',['dataprofesionales','dataCitas']) */
    },

    methods: {
        ...mapActions("vitrina", ["load_Vitrina"]),
        /*         ...mapActions('Agendas', ['getDatabyParam', 'loadProfesionales', 'getDataByRangoSuperior', 'createEntradaCitaNueva', 'getDatarCitasFecha', 'getDataUsersbyParam', 'DeleteItem']), */

        /*     BuscarProfesionales() {
                        this.paramsProfesionales = [{
                            bd: "profesionales",
                            parametro: "id_ips",
                            valor: this.id_ips,
                            rta: "setStateProfesionales"
                        }]
                        this.getDataUsersbyParam(this.paramsProfesionales);

                    },

                    filtarFechas() {
                        const fecha = this.fechahoy()
                        this.paramsFechasCitas = [{
                            bd: "agendas",
                            parametro: "fecha",
                            valor: fecha,
                            rta: "setStateCitas"
                        }]
                        this.getDataByRangoSuperior(this.paramsFechasCitas);

                    },

                    fechahoy() {
                        const date = new Date();
                        const options = {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        };
                        const formatter = new Intl.DateTimeFormat('es-ES', options);
                        const formattedDate = formatter.format(date);
                        return formattedDate
                    }, */
    },

    created() {
        this.load_Vitrina();
        /*         this.BuscarProfesionales()
                        this.filtarFechas() */
    },
};
</script>

<style>
a {
    text-decoration: none !important;
}
</style>
