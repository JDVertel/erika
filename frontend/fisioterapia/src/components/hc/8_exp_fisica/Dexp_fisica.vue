<!-- hc8_expfisica -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header d-flex justify-content-between">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse8" aria-expanded="false" aria-controls="panelsStayOpen-collapse8">
            Exploracion Fisica ok
        </button>
        <!--  -->
        <!--         <button class="btn btn-outline-primary btn-sm">save</button> -->
        <!--  -->
    </h2>
    <div id="panelsStayOpen-collapse8" class="accordion-collapse collapse">
        <div class="accordion-body">
            <h6>Inspección y Palpación</h6>
            <p>Evaluación por aparatos y sistemas: Comparando con el lado colateral</p>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-soseo-tab" data-bs-toggle="tab" data-bs-target="#nav-soseo" type="button" role="tab" aria-controls="nav-home" aria-selected="false">
                        Sistema Oseo
                    </button>

                    <button class="nav-link" id="nav-msuperior-tab" data-bs-toggle="tab" data-bs-target="#nav-msuperior" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        Valoracion Rangos de Movimientos (M Superior)
                    </button>

                    <button class="nav-link" id="nav-minferior-tab" data-bs-toggle="tab" data-bs-target="#nav-minferior" type="button" role="tab" aria-controls="nav-contact" aria-selected="true">
                        Valoracion Rangos de Movimientos (M Inferior)
                    </button>
                </div>
            </nav>
            <!--  -->
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-soseo" role="tabpanel" tabindex="0">
                    <p>Seleccione y agregue hallazgos</p>

                    <div class="row">
                        <div class="col-12 col-md-6">
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="tipoclase" @change="buscardata(tipoclase, data_exp, 'detalle')">
                                <option selected value="0">--seleccione Clase--</option>
                                <option v-for="(item, index) in data_exp" :key="index" :value="item.clase">
                                    {{ item.clase }}
                                </option>
                            </select>

                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="tipomusculo">
                                <option value="0" selected>--Seleccione Tipo musculo--</option>
                                <option v-for="item in datosC" :key="item.id">
                                    {{ item }}
                                </option>
                            </select>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Detalle</label>
                                <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3" v-model="detalle"></textarea>
                            </div>

                            <div class="row">
                                <button type="button" class="btn btn-primary btn-sm" v-if="tipoclase != '0' && tipomusculo != '0' && detalle != ''" @click="AddAntec('Oseo', tipoclase, tipomusculo, detalle)">
                                    agregar
                                </button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card">
                                <div class="card-header">Registro</div>
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Sistema</th>
                                            <th>Clase</th>
                                            <th>Musculo</th>
                                            <th>Detalle</th>
                                            <th>Opc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in NewAntec" :key="index">
                                            <td>{{ item.diag_sistema }}</td>
                                            <td>{{ item.diag_clase }}</td>
                                            <td>{{ item.diag_musculo }}</td>
                                            <td>{{ item.diag_detalle }}</td>
                                            <td>
                                                <button class="btn btn-sm btn-danger" @click="eliminaritem(index)">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-msuperior" role="tabpanel" tabindex="0">
                    <div class="row">
                        <h5>Valoracion de rangos de Mov (Miembro Superior)</h5>

                        <div class="col-12 col-md-4">
                            <h6>RAQUIS CERVICAL</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento">
                                                <option selected value="">-Movimiento-</option>
                                                <option v-for="(item, index) in this.array_RAQUISCERVICAL" :key="index" value={item}>{{item}}</option>
                                            </select>
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho" />
                                        </th>
                                        <th>
                                            <button type="button" class="btn btn-warning btn-sm" v-if="this.data_movimiento !== '' && this.data_izquierdo !== '' && this.data_derecho !== ''">+</button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!--  -->
                                    <tr>
                                        <td>Extensión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="RC_extencion_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="RC_extencion_D" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm">x</button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>RAQUIS DORSOLUMBAR</h6>
                            <table class="table table-sm table-info">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                        <th>Opc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>selector</td>
                                        <td>izquierda</td>
                                        <td>deracha</td>
                                    </tr>

                                    <tr>
                                        <td>Extención</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_Extencion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_Extencion_D" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Inclinación lateral der</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_IlateralD_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_IlateralD_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Inclinación lateral izq</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_IlateralI_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_IlateralI_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Izq</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_RotaI_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_RotaI_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Der</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_RotaD_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="RD_RotaD_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>HOMBRO</h6>
                            <table class="table table-sm table-warning">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Flexion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Flexion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extención</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Extencion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Extencion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Abduccion</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Abducion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Abducion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Aduccion</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Aduccion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_Aduccion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Interna</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_RotacionI_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_RotacionI_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Externa</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_RotacionE_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="h_RotacionE_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>CODO</h6>
                            <table class="table table-sm table-primary">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Flexion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Flexion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extención</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Extencionn_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Extencionn_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pronación</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Pronacion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Pronacion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Supinación</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Supinacion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="C_Supinacion_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>MUÑECA</h6>
                            <table class="table table-sm table-danger">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_Flexion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_Flexion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extención</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_Extencion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_Extencion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Desviacion radial</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_DesviacionR_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_DesviacionR_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Desviacion cubital</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_DesviacionC_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="M_DesviacionC_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="tab-pane fade" id="nav-minferior" role="tabpanel" tabindex="0">
                    <h5>Valoracion de rangos de Mov (Miembro Inferior)</h5>
                    <div class="row">
                        <div class="col-12 col-md-3">
                            <h6>CADERA</h6>
                            <table class="table table-sm table-secondary">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Flexion_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" placeholder="DATA" v-model="CAD_Flexion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extensión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" placeholder="DATA" v-model="CAD_Extenci_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Extenci_D" placeholder="DATA" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Abducción</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Abduccion_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Abduccion_D" placeholder="DATA" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Aducción</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Aduccion_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_Aduccion_D" placeholder="DATA" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Interna</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_RotaI_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_RotaI_D" placeholder="DATA" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Rotación Externa</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_RotaE_I" placeholder="DATA" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" v-model="CAD_RotaE_D" placeholder="DATA" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>RODILLA</h6>
                            <table class="table table-sm table-danger">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="ROD_Flexion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="ROD_Flexion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extención</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="ROD_Extencion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="ROD_Extencion_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>TOBILLO</h6>
                            <table class="table table-sm table-warning">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Flexión plantar</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="T_FlexionP_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="T_FlexionP_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Flexión dorsal</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="T_FlexionD_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="T_FlexionD_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>ART.SUBASTRAGALINA</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>Mov</th>
                                        <th>Izq</th>
                                        <th>Der</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Inversion</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="AS_Inversion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="AS_Inversion_D" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Eversión</td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="AS_Eversion_I" />
                                        </td>
                                        <td>
                                            <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="DATA" v-model="AS_Eversion_D" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div class="container">
                <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" placeholder="Observaciones" rows="3" v-model="Exp_Fisica_observaciones"></textarea>
            </div>

            <button class="btn btn-warning mt-3" @click="guardarInfo">+ Guardar</button>
        </div>
    </div>
</div>
</template>

<script>
import {
    exp_fisica
} from "./../../../firebase/bd.js";
import {
    BuscarDetalles,
    BuscarExpFisicaDetalleNombre
} from "./../../backend/rutinas.js";
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";

export default {
    data: () => ({
        idPaciente: "111",
        idhc: "1",
        bd: "hc3_inspecionestatica",
        /*  */
        data_exp: exp_fisica,
        tipoclase: "0",
        tipoevaluacion: "0",
        tipomusculo: "0",
        datosC: "",
        detalle: "",
        observaciones: "",
        /*  */

        array_RAQUISCERVICAL: ["flexion", "extencion", "IncLateral", "rotacionI"],
        array_RAQUISCERVICAL_Data: [],

        array_RAQUISDORSOLUMBAR: [
            "RD_Flexión",
            "Extención",
            "Inclinación lateral der",
            "Inclinación lateral izq",
            "Rotación Izq",
            "Rotación Der",
        ],
        array_RAQUISDORSOLUMBAR_Data: [],

        array_HOMBRO: [
            "Flexión",
            "Extención",
            "Abduccion",
            "Aduccion",
            "Rotación Interna",
            "Rotación Externa",
        ],
        array_HOMBRO_Data: [],

        array_CODO: ["Flexión", "Extención", "Pronación", "Supinación"],
        array_CODO_Data: [],

        array_MUÑECA: ["Flexión", "Extención", "Desviacion radial", "Desviacion cubital"],
        array_MUÑECA_Data: [],

        /*  */

        array_CADERA: [
            "Flexión",
            "Extensión",
            "Abducción",
            "Aducción",
            "Rotación Interna",
            "Rotación Externa",
        ],
        array_CADERA_Data: [],

        array_RODILLA: ["Flexión", "Extención"],
        array_RODILLA_Data: [],

        array_TOBILLO: ["Flexión plantar", "Flexión dorsal"],
        array_TOBILLO_Data: [],

        array_ART_SUBASTRAGALINA: ["inversion", "Eversión"],
        array_ART_SUBASTRAGALINA_Data: [],

        data_movimiento: "",
        data_izquierdo: "",
        data_derecho: "",
        NewAntec: [],
        ArraySaveConsulta: [],
    }),
    methods: {
        ...mapActions("Hc", ["SaveDatos8"]),
        async guardarInfo() {
            /* this.ArraySaveConsulta = []; */
            this.datosObservacion = [{
                idpaciente: this.idpaciente,
                idhc: this.idhc,
                bd: this.bd,
                dataeval: this.rangosMovimientos,
                dataeval2: this.NewAntec,
            }, ];
            this.SaveDatos8(this.datosObservacion[0]);
        },

        buscardata(x, y, z) {
            this.datosC = BuscarExpFisicaDetalleNombre(x, y, z);
        },

        AddAntec(sistema, clase, musculo, detalle) {
            let item = {
                diag_sistema: sistema,
                diag_clase: clase,
                diag_musculo: musculo,
                diag_detalle: detalle,
            };
            this.NewAntec = [...this.NewAntec, item];
            console.log(this.NewAntec);
            this.limpiarcampos();
        },

        eliminaritem(index) {
            console.log(index);
            this.NewAntec.splice(index, 1);
        },
        limpiarcampos() {
            this.tipoclase = "0";
            this.detalle = "";
            this.tipomusculo = "0";
        },

        clearCasillas() {
            data_movimiento = "";
            data_izquierdo = "";
            data_derecho = "";
        }
    },
};
</script>
