<template>
<div class="container mt-4">

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">+ Registrar venta</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Historico</button>
        </li>

    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!--  -->

            <div class="card mb-2 mt-2">
                <div class="card-body">
                    <h5>Registrar una venta </h5>
                    <p class="card-text">Ingrese la identificacion del cliente</p>

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

                        <div class="col-3 col-md-3 ">
                            <button class="btn btn-success btn-sm" @click=" BTN_Buscar_paciente()" :disabled="BuscarP_Disabled">Buscar</button>
                        </div>

                    </div>

                </div>
            </div>

            <div v-if="this.existepaciente == 2">
                <br>
                <div class="container">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Registro de nuevo cliente</h5>
                            <p class="card-text">Cliente no encontrado, ingrese los siguientes datos para
                                registarlo y poder realizar una venta</p>

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
                                        <input type="date" class="form-control  form-control-sm date" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="fnacimiento">
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-warning btn-sm" @click=" cancelar_cerrarmodal()">
                                Cancelar
                            </button>
                            <button class="btn btn-success btn-sm" @click=" BTN_registar_Paciente()" :disabled="Guardar_p_isButtonDisabled">
                                Registrar cliente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container" v-if="this.existepaciente == 1">
                <div class="card">
                    <div class="card-body">
                        <div>
                            <h5>Factura de venta</h5>

                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        <th>Nombre</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="pac in datapaciente" :key="pac.id">
                                        <td>{{pac.numdoc}}</td>
                                        <td>{{pac.name1}} {{pac.name2}} {{pac.apell1}} {{pac.apell2}}</td>
                                        <td> <button class="btn btn-success btn-sm" @click=" BTN_Reservar_BuscarProfesionales">Facturar</button> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div class="container mt-3" style="background-color:lightsteelblue; border-radius:5px; padding:10px">

                                <div class="row">
                                    <p> <strong>Seleccione y agrege los articulos y cantidades que desea facturar </strong></p>
                                    <div class="col-6 col-md-3 mb-2">
                                        <select class="form-select form-select-sm textarea" id="inputGroupSelect01">
                                            <option selected>Seleccione categoria</option>
                                            <option value="cc">Terapia</option>
                                            <option value="ti">Consulta</option>
                                            <option value="ti">Clase</option>

                                        </select>
                                    </div>
                                    <div class="col-6 col-md-3 mb-2">

                                        <select class="form-select form-select-sm textarea" id="inputGroupSelect01">
                                            <option selected>Seleccione producto</option>
                                            <option value="cc">Terapia</option>
                                            <option value="ti">Consulta</option>
                                            <option value="ti">Clase</option>

                                        </select>
                                    </div>
                                    <div class="col-4 col-md-2"><input type="number" class="form-control form-control-sm" placeholder="cantidad"> </div>
                                    <div class="col-4 col-md-2">
                                        <p class="m-2">Subtotal: <strong> $10.000</strong> </p>
                                    </div>
                                    <div class="col-4 col-md-2"><button class="btn btn-warning btn-sm">+ Agregar </button></div>
                                  
                       
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="container">
                        <p>Carrito de compras</p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Cant</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Opc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td><button class="btn btn-danger btn-sm Bredondo">-</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td><button class="btn btn-danger btn-sm Bredondo">-</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td><button class="btn btn-danger btn-sm Bredondo">-</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-success btn-sm">Registrar Venta</button>
                    </div>

                </div>
                </div>
            </div>

        </div>

        <!--  -->
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
        <!--  -->
        <div class="col-sm-6 col-md-8">
            <div class="container">
                <strong>Registros de ventas diarias</strong>
                <br>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">factura</th>
                                <th scope="col">Articulo</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Otto</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@twitter</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <!--  -->
    </div>

</div>

<!-- ---------------------------------------------------------------------------------------- -->
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';
import moment from 'moment';
export default {
    data: () => ({
        B_tipodoc: "",
        B_numdoc: "",

    }),
    methods: {

        ...mapActions('Agendas', ['getDatabyParam', 'getDataUsersbyParam', 'DeleteItem', 'clearDataStoreA', 'NewgetDataUsersbyParam']),
        /* ----------------------------------------------------------------------------------------------------------- */
        BTN_Buscar_paciente() {
            this.idpaciente = this.B_tipodoc + this.B_numdoc;
            this.paramsPaciente = [{
                bd: "pacientes",
                parametro: "numdoc",
                valor: this.idpaciente,
                rta: "setStatePaciente"
            }]
            this.getDataUsersbyParam(this.paramsPaciente);

        },
    },
    computed: {
        ...mapState('Agendas', ['datapaciente', 'existepaciente', 'dataprofesionales', 'existeprofesionales', 'dataCitas', 'dataAgendas', 'dataAllCitasPaciente']),

        BuscarP_Disabled() {
            return !this.B_tipodoc || !this.B_numdoc;
        },
    },

}
</script>

<style >

</style>
