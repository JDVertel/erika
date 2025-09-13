<template>
<div class="dashboard-bg">
    <!-- ...sin tarjetas resumen ni gráfico... -->
    <div class="dashboard-header centrarcontenido">
        <h1 class="dashboard-title">FisioApp</h1>
        <span class="dashboard-menu-label">Menú principal</span>
    </div>
    <div class="dashboard-content container">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <router-link to="/informes" class="dashboard-link-card">
                    <div class="card mb-4 cardDash dashboard-card">
                        <div class="row">
                            <div class="col-3 p-2 dashboard-icon-box">
                                <img src="https://img.icons8.com/dotty/80/overtime.png" class="img_Dashboard dashboard-icon" />
                            </div>
                            <div class="col-9">
                                <div class="col-12 p-2">
                                    <h2 class="dashboard-card-title">Informes</h2>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <strong class="dashboard-card-desc centrarcontenido">Detalle de Procesos</strong>
                    </div>
                </router-link>
            </div>

            <!--  -->

            <div class="col-12 col-md-6 col-lg-4">
                <router-link to="/agendas" class="dashboard-link-card">
                    <div class="card mb-4 cardDash dashboard-card">
                        <div class="row">
                            <div class="col-3 p-2 dashboard-icon-box">
                                <img src="https://img.icons8.com/ios/50/calendar--v1.png" class="img_Dashboard dashboard-icon" />
                            </div>
                            <div class="col-9">
                                <div class="col-12 p-2">
                                    <h2 class="dashboard-card-title">Agendas</h2>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <strong class="dashboard-card-desc centrarcontenido">Programación</strong>
                    </div>
                </router-link>
            </div>
            <!--  -->

            <div class="col-12 col-md-6 col-lg-4">
                <router-link to="/vitrina" class="dashboard-link-card">
                    <div class="card mb-4 cardDash dashboard-card">
                        <div class="row">
                            <div class="col-3 p-2 dashboard-icon-box">
                                <img src="https://img.icons8.com/dotty/80/sell.png" class="img_Dashboard dashboard-icon" />
                            </div>
                            <div class="col-9 p-2">
                                <div class="col-12">
                                    <h2 class="dashboard-card-title">Vitrina</h2>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <strong class="dashboard-card-desc centrarcontenido">Servicios y Productos</strong>
                    </div>
                </router-link>
            </div>
            <!--  -->
            <!--             <div class="col-6 col-md-4">
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
            </div> -->
            <!--  -->
            <div class="col-12 col-md-6 col-lg-4">
                <router-link to="/buscar_hc" class="dashboard-link-card">
                    <div class="card mb-4 cardDash dashboard-card">
                        <div class="row">
                            <div class="col-3 p-2 dashboard-icon-box">
                                <img src="https://img.icons8.com/wired/64/hospital-room.png" class="img_Dashboard dashboard-icon" />
                            </div>
                            <div class="col-9">
                                <div class="col-12 p-2">
                                    <h2 class="dashboard-card-title">H Clínica</h2>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <strong class="dashboard-card-desc centrarcontenido">Registro de actividades</strong>
                    </div>
                </router-link>
            </div>

            <!--  -->

            <div class="col-12 col-md-6 col-lg-4">
                <router-link to="/parametros" class="dashboard-link-card">
                    <div class="card mb-4 cardDash dashboard-card">
                        <div class="row">
                            <div class="col-3 p-2 dashboard-icon-box">
                                <img src="https://img.icons8.com/wired/64/settings.png" class="img_Dashboard dashboard-icon" />
                            </div>
                            <div class="col-9 p-2">
                                <div class="col-12">
                                    <h2 class="dashboard-card-title">Configuración</h2>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <strong class="dashboard-card-desc centrarcontenido">Parámetros del sistema</strong>
                    </div>
                </router-link>
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
    // ...sin mounted ni Chart.js...
};
</script>

<style scoped>
.dashboard-bg {
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f7fa 0%, #f8fafc 100%);
    padding: 0 0 40px 0;
}

.dashboard-header {
    margin-top: 32px;
    margin-bottom: 24px;
}

.dashboard-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #34836e;
    margin-bottom: 8px;
}

.dashboard-menu-label {
    font-size: 1.2rem;
    color: #22604d;
    font-weight: 500;
}

.dashboard-content {
    max-width: 1100px;
    margin: 0 auto;
    padding-top: 0;
}

.dashboard-resumen-row {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.dashboard-resumen-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(44, 118, 97, 0.10);
    padding: 24px 32px;
    min-width: 180px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: #34836e;
    transition: box-shadow 0.2s, transform 0.2s;
}

.dashboard-resumen-card:hover {
    box-shadow: 0 8px 32px rgba(44, 118, 97, 0.18);
    transform: translateY(-2px) scale(1.04);
}

.resumen-title {
    font-size: 1.08rem;
    color: #22604d;
    margin-bottom: 6px;
}

.resumen-value {
    font-size: 1.7rem;
    font-weight: 700;
    color: #34836e;
}

.dashboard-chart-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(44, 118, 97, 0.10);
    padding: 32px 24px;
    margin: 0 auto 32px auto;
    max-width: 600px;
}

.dashboard-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(44, 118, 97, 0.10);
    padding: 6px 6px;
    transition: box-shadow 0.2s, transform 0.2s;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fadeIn 0.7s;
    cursor: pointer;
    margin-bottom: 8px;
}

.dashboard-card:hover {
    box-shadow: 0 8px 32px rgba(44, 118, 97, 0.18);
    transform: translateY(-4px) scale(1.03);
}

.dashboard-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background: linear-gradient(135deg, #e0f7fa 60%, #34836e 100%);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(44, 118, 97, 0.10);
    width: 90px;
    margin: 0 auto;
}

.dashboard-icon {
    width: 54px;
    height: 54px;
    filter: drop-shadow(0 2px 6px rgba(44, 118, 97, 0.18));
}

.dashboard-link-card {
    text-decoration: none !important;
    color: inherit;
    display: block;
}

.dashboard-link-card h2,
.dashboard-link-card strong {
    text-decoration: none !important;
    color: #34836e;
    border-bottom: none !important;
}

.dashboard-link-card:hover .dashboard-card {
    box-shadow: 0 8px 32px rgba(44, 118, 97, 0.18);
    transform: translateY(-4px) scale(1.03);
}

.dashboard-card-title {
    font-size: 1.18rem;
    font-weight: 700;
    margin-bottom: 0;
    color: #34836e;
    transition: color 0.2s;
}

.dashboard-card-desc {
    font-size: 1.05rem;
    color: #22604d;
    margin-top: 8px;
    font-weight: 500;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 900px) {
    .dashboard-content {
        max-width: 100%;
    }

    .dashboard-card {
        min-height: 180px;
        padding: 18px 8px;
    }

    .dashboard-title {
        font-size: 1.5rem;
    }

    .dashboard-resumen-row {
        gap: 12px;
    }

    .dashboard-resumen-card {
        padding: 16px 10px;
        min-width: 120px;
    }

    .dashboard-chart-card {
        padding: 16px 4px;
    }
}
</style>
