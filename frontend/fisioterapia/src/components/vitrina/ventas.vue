<template>
<div class="container mt-4">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                <i class="bi bi-file-plus"></i> Registrar venta
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                <i class="bi bi-file-earmark-spreadsheet"></i> Historico
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!--  -->

            <div class="card">

                <div v-if="datapaciente.length == 0">
                    <br />
                    <h5><i class="bi bi-person-check"></i> Buscar cliente</h5>
                    <p class="card-text">Ingrese la identificacion del cliente para facturar el producto o servicio</p>

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
                            <button class="btn btn-success btn-sm" @click="BTN_Buscar_paciente()">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="this.existepaciente == 2">
                    <br />

                    <div>
                        <h5 class="card-title">Registro de nuevo cliente</h5>
                        <p class="card-text">
                            Cliente no encontrado, ingrese los siguientes datos para registarlo y
                            poder realizar una factura
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
                                    <input type="date" class="form-control form-control-sm date" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="fnacimiento" />
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-warning btn-sm" @click="cancelar_cerrarmodal()">
                            Cancelar
                        </button>
                        <button class="btn btn-success btn-sm" @click="BTN_registar_Paciente()" :disabled="Guardar_p_isButtonDisabled">
                            <i class="bi bi-person-add"></i> Registrar cliente
                        </button>
                    </div>

                </div>
                <div class="container" v-if="this.existepaciente == 1">
                    <div>
                        <div>
                            <h5><i class="bi bi-cart"></i> Factura de venta</h5>

                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        <th>Nombre</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pac,index) in datapaciente" :key="index">
                                        <td>{{ pac.numdoc }}</td>
                                        <td>
                                            {{ pac.name1 }} {{ pac.name2 }} {{ pac.apell1 }} {{ pac.apell2 }}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="container mt-3" style="
                  background-color:#e8f0a3;
                  border-radius: 5px;
                  padding: 10px;
                ">
                            <div class="row">
                                <h5><i class="bi bi-cash-coin"></i> Facturar</h5>
                                <h6>
                                    Seleccione y agrege los productos o servicios y las cantidades que
                                    desea facturar
                                </h6>
                                <!-- categoria -->
                                <div class="col-6 col-md-3 mb-2">
                                    <label for="inputGroupSelect01">Categoria</label>
                                    <select class="form-select form-select-sm textarea" id="inputGroupSelect01" v-model="select_categ" @change="categSeleccionada(select_categ)">
                                        <option selected value="">---Seleccione---</option>
                                        <option v-for="categoria in categoriasUnicas" :key="categoria" :value="categoria">
                                            {{ categoria }}
                                        </option>
                                    </select>
                                </div>

                                <!--  Articulo/servicio -->
                                <div class="col-6 col-md-3 mb-2">
                                    <label for="inputGroupSelect02">Articulo/Servicio</label>
                                    <select class="form-select form-select-sm textarea" id="inputGroupSelect02" v-model="selec_prod" @change="FiltrarCombos(this.select_categ, this.selec_prod.nombre)">
                                        <option value="">---Seleccione---</option>
                                        <option :value="{ nombre: desc.nombre, precio:desc.precio }" v-for="(desc, index) in filtro" :key="index">
                                            {{ desc.nombre }}
                                        </option>
                                    </select>
                                </div>

                                <!-- combo -->
                                <div class="col-6 col-md-3 mb-2" v-if="
                      this.select_categ == 'clase' ||
                      this.select_categ == 'terapia' ||
                      this.select_categ == 'consulta'
                    ">
                                    <label for="inputGroupSelect03">Paquete</label>
                                    <select class="form-select form-select-sm textarea" id="inputGroupSelect03" v-model="selec_combo">
                                        <option value="">---Seleccione---</option>
                                        <option :value="{ precio: combo.precio, cant:combo.cant }" v-for="(combo, index) in selectcombo" :key="index">
                                            ({{ combo.cant }}) / ${{ combo.precio }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-3 col-md-2">
                                    <label for="input01">Cantidad</label>
                                    <input id="input01" type="number" class="form-control form-control-sm" placeholder="#" v-model="cantFact" />
                                </div>

                                <div class="col-3 col-md-1 mt-3">
                                    <button class="btn btn-warning btn-sm mt-2" @click="AddServicio" v-if="
                        cantFact > 0 &&
                        (select_categ == 'clase' ||
                          select_categ == 'terapia' ||
                          select_categ == 'consulta')
                      ">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                    <button class="btn btn-warning btn-sm mt-2" @click="AddArticulo" v-if="cantFact > 0 && select_categ == 'producto'">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <!--  {{ DataFactura }} -->

                    <strong><i class="bi bi-cart-plus"></i> Listado de articulos y servicios a
                        facturar</strong>

                    <table class="table table-sm table-striped">
                        <thead>
                            <tr>

                                <th>Categoria</th>
                                <th>Nombre/Combo/Valor</th>
                                <th>Cant</th>
                                <th>Subtotal</th>
                                <th>Opc</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in DataFactura" :key="index">

                                <td>{{ item.categoria }}</td>
                                <td v-if="item.categoria !== 'producto'">
                                    {{ item.nombre }}
                                    <hr />
                                    ({{ item.combo }}) / ${{ item.precio }}
                                </td>
                                <td v-if="item.categoria == 'producto'">
                                    {{ item.nombre }}
                                    <hr />
                                    ({{ item.combo }}) / $ ${{ item.precio }}
                                </td>
                                <td>{{ item.cant }}</td>
                                <td>{{ item.subt }}</td>
                                <td>
                                    <button class="btn btn-danger btn-sm" @click="eliminaritem(index)">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <button class="btn btn-warning btn-sm" v-if="totalFactura > 0" style="word-spacing: 20px" @click="crearNuevoRegistroFactura(40)">
                            Total: ${{ totalFactura }} <i class="bi bi-floppy"></i> Facturar
                        </button>
                    </div>
                    <hr />
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
                <br />
                <h2>Facturas Diarias</h2>

                <!-- ---------------------------------- -->
                {{ this.StateFacturasDiarias }}

                
                <!-- ------------------------------------------ -->
             
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
    mapState
} from "vuex";
import moment from "moment";
import {
    createEntradaFactura
} from "./store/vitrina/actions";
export default {
    data: () => ({
        B_tipodoc: "",
        B_numdoc: "",
        selec_prod: "",
        select_categ: "",
        cant: "",
        DataFactura: [],
        /*  */
        idfactura: "",
        idpaciente: "",
        /*  */
        idips: "1",
        /*  */
        paramsInventario: {},
        /* crear pacientte */
        name1: "",
        name2: "",
        apell1: "",
        apell2: "",
        celular: "",
        email: "",
        dir: "",
        fnacimiento: "",
        email: "",
        dir: "",
        f_nacimiento: "",
        paramsPaciente: [],
        Guardar_p_isButtonDisabled: false,
        datapacientenuevo: [],
        filtro: [],
        combos: [],
        selectcombo: [],
        selec_combo: "",
        cantFact: "",
       FacturasDiarias: [],
    }),
    methods: {
        ...mapActions("Agendas", [
            "getDatabyParam",
            "getDataUsersbyParam",
            "DeleteItem",
            "clearDataStoreA",
            "clearStorePaciente",
            "NewgetDataUsersbyParam",
            "createEntradanewPaciente",
        ]),
        ...mapActions("vitrina", ["getDatosVitrinabyParams", "createEntradaFactura", "getListFacturasDia"]),

        /* ----------------------------------------------------------------------------------------------------------- */
        BTN_Buscar_paciente() {
            this.idpaciente = this.B_tipodoc + this.B_numdoc;
            this.paramsPaciente = [{
                bd: "pacientes",
                parametro: "numdoc",
                valor: this.idpaciente,
                rta: "setStatePaciente",
            }, ];
            this.getDataUsersbyParam(this.paramsPaciente);
        },
        /* ----------------------------------------------------------------------------------------------------------- */
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
        AddArticulo() {
            let itemA = {
                idpac: this.idpaciente,
                idfact: this.idfactura,
                idips: this.idips,
                /*  */

                categoria: this.select_categ,
                nombre: this.selec_prod.nombre,
                combo: 1,
                precio: this.selec_prod.precio,
                cant: Number(this.cantFact),
                subt: Number(this.selec_prod.precio * this.cantFact),
                /*  */
                fecha: moment().format("YYYY-MM-DD"),
            };
            this.DataFactura = [...this.DataFactura, itemA];
            this.clearCampos();
        },

        AddServicio() {
            let itemS = {
                idpac: this.idpaciente,
                idfact: this.idfactura,
                idips: this.idips,
                /*  */
                categoria: this.select_categ,
                nombre: this.selec_prod.nombre,
                combo: this.selec_combo.cant,
                precio: this.selec_combo.precio,
                cant: Number(this.cantFact),
                subt: Number(this.cantFact * this.selec_combo.precio),
                /*  */
                fecha: moment().format("YYYY-MM-DD"),
            };
            this.DataFactura = [...this.DataFactura, itemS];
            this.clearCampos();
        },
        clearCampos() {
            this.selec_prod = "";
            this.select_categ = "";
            this.selec_combo = "";
            this.cantFact = "";
        },
        eliminaritem(index) {
            console.log(index);
            this.DataFactura.splice(index, 1);
        },
        GuardarFactura() {},

        categSeleccionada(categoria) {
            console.log("Categoría seleccionada:", categoria);
            console.log("leyendo desde", this.StateInventario[0]);
            this.filtro = this.StateInventario[0].filter(
                (producto) => producto.tipo === categoria
            );
            this.selec_prod = "";
            this.selec_combo = "";
            return;
        },

        FiltrarCombos(opc, id) {
            if (opc !== "producto") {
                console.log("dato consulta combo:", id);
                this.combos = this.StateInventario[0].filter((combo) => combo.nombre === id);
                this.selec_combo = "";
                this.selectcombo = this.combos[0].precios;
                console.log(this.selectcombo);
            }
        },

        cancelar_cerrarmodal() {

            this.name1 = "";
            this.name2 = "";
            this.apell1 = "";
            this.apell2 = "";
            this.celular = "";
            this.email = "";
            this.dir = "";
            this.fnacimiento = "";
            this.B_tipodoc = "";
            this.B_numdoc = "";

            this.vaciarStorePaciente();
        },

        async crearNuevoRegistroFactura(x) {
            // Asigna el nuevo ID a cada elemento
            const registrosActualizados = this.DataFactura.map(item => ({
                ...item,
                idfact: x
            }));
            let factura = {
                idfact: x,
                idpac: this.idpaciente,
                idips: this.idips,
                detalle: registrosActualizados,
                fecha: moment().format("YYYY-MM-DD"),
                total: this.totalFactura,
            };

            await createEntradaFactura(factura);
            this.vaciarformulario();
            this.vaciarStorePaciente()
            this.Alerta_ok()
        },

        Alerta_ok() {
            // Simula un proceso largo
            Swal.fire({
                title: '¡Proceso finalizado!',
                text: 'Venta facturada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        },

        vaciarformulario() {
            this.B_tipodoc = "";
            this.B_numdoc = "";
            this.selec_prod = "";
            this.select_categ = "";
            this.cant = "";
            this.DataFactura = [];
            /*  */
            this.idfactura = "";
            this.idpaciente = "";
            /*  */
            this.idips = "1";
            /*  */
            this.paramsInventario = {};
            /* crear pacientte */
            this.name1 = "";
            this.name2 = "";
            this.apell1 = "";
            this.apell2 = "";
            this.celular = "";
            this.email = "";
            this.dir = "";
            this.fnacimiento = "";
            this.email = "";
        },

        vaciarStorePaciente() {
            this.clearStorePaciente();
        },

        ventasDiarias() {
            let parametros = {
                bd: "facturas",
                parametro: "fecha",
                valor: moment().format("YYYY-MM-DD"),
                mutation: "setStateFacturasDiarias",
            };
            this.getListFacturasDia(parametros);
        },
    },
    computed: {
        ...mapState("Agendas", ["existepaciente", "datapaciente", ]),

        ...mapState("vitrina", ["StateInventario", "StateFacturasDiarias"]),

        categoriasUnicas() {
            if (!this.StateInventario) return [];
            return [...new Set(this.StateInventario[0].map((item) => item.tipo))];
        },

        totalFactura() {
            return this.DataFactura.reduce((acc, item) => acc + item.subt, 0);
        },

        fechaHoy() {
            return moment().format("YYYY-MM-DD");
        },
    },

    created() {
        Promise.all([
            (this.paramsInventario = {
                bd: "vitrina",
                parametro: "id_ips",
                valor: this.idips,
                mutation: "setStateInventario",
            }),
            this.getDatosVitrinabyParams(this.paramsInventario),

            this.ventasDiarias(),
        ]);
    },
};
</script>

<style></style>
