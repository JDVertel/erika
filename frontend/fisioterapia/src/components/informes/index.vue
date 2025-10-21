<template>
<div>
    <br>
    <h4>Informes FisioApp</h4>
    <br>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Facturacion</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Agendamiento</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Asistencias</button>
        </li>
        <!--         <li class="nav-item" role="presentation">
              <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled>Disabled</button>
            </li> -->
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!-- -----------------------------------------SERVICIOS--------------------------------------------------------- -->
            <h4>Seleccione el rango de fechas desde los cuales desee generar el informe</h4>
            <div class="container-fluid mt-2">
                <div class="row">
                      <div class="col-3">
                     <label  class="form-label">Tipo</label>
                        <select class="form-select form-select" aria-label="Small select example">
                            <option selected>---Seleccione---</option>
                            <option value="1">Servicio</option>
                            <option value="2">Clases</option>
                            <option value="3">Articulos</option>
                        </select>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio" v-model="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin" v-model="fechafin">
                        </div>
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-primary btn-sm" @click="generarReporte">Generar</button></div>
                </div>

                <!--  {{ StateQueryFacturas }} -->
                <div class="row">
                    <div class="col-12 

                    ">

                        <br>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
        <!-- ----------------------------------------------CLASES-------------------------------------------------------- -->
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <div class="container-fluid mt-2">
                <h4>Seleccione el rango de fechas y profesional desde los cuales desee generar el informe</h4>
                <div class="row">
                    <div class="col-3">
                     <label  class="form-label">Profesional</label>
                        <select class="form-select form-select" aria-label="Small select example">
                            <option selected>---Seleccione---</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin">
                        </div>
                    </div>

                    <div class="col-3">
                    <button type="button" class="btn btn-primary btn-sm">Generar</button></div>
                </div>
                <div class="row">
                    <div class="col-12"> <strong>informe de eventos agendados </strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
        <!-- ------------------------------------------TIENDA----------------------------------------------->
        <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechainicio" class="form-label">Fecha Inicio</label>
                            <input type="date" class="form-control" id="fechainicio">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label for="fechafin" class="form-label">Fecha fin</label>
                            <input type="date" class="form-control" id="fechafin">
                        </div>
                    </div>
                    <div class="col-3"><button type="button" class="btn btn-primary btn-sm">Generar</button></div>
                </div>
                <div class="row">
                    <div class="col-12"> <strong>Productos Facturados</strong>
                        <br>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
        <!--       <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...</div> -->
    </div>

</div>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex';
export default {
    data() {
        return {
            fechainicio: null,
            fechafin: null,
            QueryFacturasClase: [],
            QueryFacturasServicio: [],
            QueryFacturasProductos: [],
        };

    },
    methods: {
        ...mapActions("vitrina", ['getDatosVitrinabyParamsDate']),
        async generarReporte() {
            const params = {
                bd: 'facturas',
                parametro: "fecha",
                fechaInicio: this.fechainicio,
                fechaFin: this.fechafin,
                mutation: 'setStateQueryFacturas',
            };

            // Asegúrate de esperar a que getDatosVitrinabyParamsDate termine
            await this.getDatosVitrinabyParamsDate(params);
            this.procesarDatosClases();
        },

        procesarDatosClases() {
            // Verifica si this.StateQueryFacturas tiene datos antes de intentar acceder al primer elemento
            if (this.StateQueryFacturas && this.StateQueryFacturas.length > 0 && Array.isArray(this.StateQueryFacturas[0])) {
                const registrosInternos = this.StateQueryFacturas[0];
                const registrosFiltrados = registrosInternos.filter(registro => {
                    return Array.isArray(registro.detalle) && registro.detalle.some(item => item && item.categoria === 'clase');
                });
                this.QueryFacturasClase = [registrosFiltrados];
                console.log(JSON.stringify(this.QueryFacturasClase, null, 2));
            } else {
                console.warn("No se encontraron datos en StateQueryFacturas o el formato es incorrecto.");
                this.QueryFacturasClase = []; // Inicializa para evitar errores posteriores
            }
            // No es necesario un 'return' aquí si la función solo tiene efectos secundarios
        },
    },
    computed: {
        ...mapState("vitrina", ["StateQueryFacturas"]),

        DataServicios: {
            get() {
                return this.StateQueryFacturas[0].filter((item) => item.categoria === 'servicio');
            },
            set(value) {
                this.QueryFacturasServicio = value;
            }
        },
        DataArticulos: {
            get() {
                return this.StateQueryFacturas[0].filter((item) => item.categoria === 'producto');
            },
            set(value) {
                this.QueryFacturasProductos = value;
            }
        },

    }

}
</script>

<style>

</style>
