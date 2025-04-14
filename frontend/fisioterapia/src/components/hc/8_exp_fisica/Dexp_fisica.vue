<!-- hc8_expfisica -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header d-flex justify-content-between">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse8" aria-expanded="false" aria-controls="panelsStayOpen-collapse8">
            Exploracion Fisica
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

                <!-- --------------------------------------------------------------------------- -->
                <div class="tab-pane fade" id="nav-msuperior" role="tabpanel" tabindex="0">
                    <div class="row">
                        <h5>Valoracion de rangos de Mov (Miembro Superior)</h5>

                        <div class="col-12 col-md-4">
                            <h6>RAQUIS CERVICAL</h6>
                            <table class="table table-sm table-success">

                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento1" @change="handleSelectChange1">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_RAQUISCERVICAL" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo1" v-if="data_movimiento1!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho1" v-if="data_movimiento1!==''" />
                                        </th>
                                        <th>
                                            <button type="button btn-sm" @click="
                            AddItemArray1(data_movimiento1, data_derecho1, data_izquierdo1)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento1 !== '' &&
                            this.data_izquierdo1 !== '' &&
                            this.data_derecho1 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_RAQUISCERVICAL_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>

                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray1(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>RAQUIS DORSOLUMBAR</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento2" @change="handleSelectChange2">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_RAQUISDORSOLUMBAR" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo2" v-if="data_movimiento2!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho2" v-if="data_movimiento2!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray2(data_movimiento2, data_derecho2, data_izquierdo2)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento2 !== '' &&
                            this.data_izquierdo2 !== '' &&
                            this.data_derecho2 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_RAQUISDORSOLUMBAR_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray2(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-4">
                            <h6>HOMBRO</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento3" @change="handleSelectChange3">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_HOMBRO" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo3" v-if="data_movimiento3!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho3" v-if="data_movimiento3!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray3(data_movimiento3, data_derecho3, data_izquierdo3)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento3 !== '' &&
                            this.data_izquierdo3 !== '' &&
                            this.data_derecho3 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_HOMBRO_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray3(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>

                        <div class="col-12 col-md-4">
                            <h6>CODO</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento4" @change="handleSelectChange4">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_CODO" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo4" v-if="data_movimiento4!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho4" v-if="data_movimiento4!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray4(data_movimiento4, data_derecho4, data_izquierdo4)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento4 !== '' &&
                            this.data_izquierdo4 !== '' &&
                            this.data_derecho4 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_CODO_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray4(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>

                        <div class="col-12 col-md-4">
                            <h6>MUÑECA</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento5" @change="handleSelectChange5">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_MUNECA" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo5" v-if="data_movimiento5!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho5" v-if="data_movimiento5!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray5(data_movimiento5, data_derecho5, data_izquierdo5)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento5 !== '' &&
                            this.data_izquierdo5 !== '' &&
                            this.data_derecho5 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_MUNECA_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray5(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
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
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento6" @change="handleSelectChange6">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_CADERA" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo6" v-if="data_movimiento6!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho6" v-if="data_movimiento6!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray6(data_movimiento6, data_derecho6, data_izquierdo6)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento6 !== '' &&
                            this.data_izquierdo6 !== '' &&
                            this.data_derecho6 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_CADERA_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray6(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>RODILLA</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento7" @change="handleSelectChange7">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_RODILLA" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo7" v-if="data_movimiento7!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho7" v-if="data_movimiento7!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray7(data_movimiento7, data_derecho7, data_izquierdo7)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento7 !== '' &&
                            this.data_izquierdo7 !== '' &&
                            this.data_derecho7 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_RODILLA_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray7(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>TOBILLO</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento8" @change="handleSelectChange8">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_TOBILLO" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo8" v-if="data_movimiento8!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho8" v-if="data_movimiento8!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray8(data_movimiento8, data_derecho8, data_izquierdo8)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento8 !== '' &&
                            this.data_izquierdo8 !== '' &&
                            this.data_derecho8 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_TOBILLO_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray8(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-3">
                            <h6>ART.SUBASTRAGALINA</h6>
                            <table class="table table-sm table-success">
                                <thead>
                                    <tr>
                                        <th>
                                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="data_movimiento9" @change="handleSelectChange9">
                                                <option selected value="">-Seleccione Movimiento-</option>
                                                <option v-for="(item,index) in this.array_ART_SUBASTRAGALINA" :key="index" :value="item">
                                                    {{ item }}
                                                </option>
                                            </select>

                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="-Izquierdo-" v-model="data_izquierdo9" v-if="data_movimiento9!==''" />
                                        </th>
                                        <th>
                                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput2" placeholder="-Derecho-" v-model="data_derecho9" v-if="data_movimiento9!==''" />
                                        </th>
                                        <th>
                                            <button type="button" @click="
                            AddItemArray9(data_movimiento9, data_derecho9, data_izquierdo9)
                          " class="btn btn-warning btn-sm" v-if="
                            this.data_movimiento9 !== '' &&
                            this.data_izquierdo9 !== '' &&
                            this.data_derecho9 !== ''
                          ">
                                                Agregar
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!--  -->
                                    <tr v-for="(item, index) in this.array_ART_SUBASTRAGALINA_Data" :key="index">
                                        <td>{{ item.movimiento }}</td>
                                        <td>
                                            Izq: {{ item.derecho }}
                                        </td>
                                        <td>
                                            Der: {{ item.izquierdo }}
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deleteItemarray9(index, item.movimiento)">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--  -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

       <br>
            <div class="container-fluid">
                <div class="col-12">
                    <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" placeholder="Observaciones" rows="3" v-model="evalFisicaObservaciones"></textarea>
                </div>
            </div>

            <button class="btn btn-sm btn-warning mt-3" @click="guardarInfo">+ Guardar</button>
        </div>
    </div>
</div>
</template>

<script>
import {
    computed
} from "vue";
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
        bd: "hc8_expfisica",
        data_exp: exp_fisica,
        tipoclase: "0",
        tipomusculo: "0",
        detalle: "",
        tipoevaluacion: "0",
        datosC: "",
        observaciones: "",
        evalFisicaObservaciones:"",

        /* 1 */
        array_RAQUISCERVICAL: ["flexion", "extencion", "IncLateral", "rotacionI"],
        array_RAQUISCERVICAL_Data: [],
        /* */
        data_movimiento1: "",
        data_izquierdo1: "",
        data_derecho1: "",

        /* 2 */
        array_RAQUISDORSOLUMBAR: [
            "RD_Flexión",
            "Extención",
            "Inclinación lateral der",
            "Inclinación lateral izq",
            "Rotación Izq",
            "Rotación Der",
        ],
        array_RAQUISDORSOLUMBAR_Data: [],
        /*  */
        data_movimiento2: "",
        data_izquierdo2: "",
        data_derecho2: "",

        /* 3 */
        array_HOMBRO: [
            "Flexión",
            "Extención",
            "Abduccion",
            "Aduccion",
            "Rotación Interna",
            "Rotación Externa",
        ],
        array_HOMBRO_Data: [],
        /*  */
        data_movimiento3: "",
        data_izquierdo3: "",
        data_derecho3: "",

        /* 4 */
        array_CODO: ["Flexión", "Extención", "Pronación", "Supinación"],
        array_CODO_Data: [],
        /*  */
        data_movimiento4: "",
        data_izquierdo4: "",
        data_derecho4: "",

        /* 5 */
        array_MUNECA: ["Flexión", "Extención", "Desviacion radial", "Desviacion cubital"],
        array_MUNECA_Data: [],
        /*  */
        data_movimiento5: "",
        data_izquierdo5: "",
        data_derecho5: "",

        /* 6 */
        array_CADERA: [
            "Flexión",
            "Extensión",
            "Abducción",
            "Aducción",
            "Rotación Interna",
            "Rotación Externa",
        ],
        array_CADERA_Data: [],
        /*  */
        data_movimiento6: "",
        data_izquierdo6: "",
        data_derecho6: "",

        /* 7 */
        array_RODILLA: ["Flexión", "Extención"],
        array_RODILLA_Data: [],
        /*  */
        data_movimiento7: "",
        data_izquierdo7: "",
        data_derecho7: "",

        /* 8 */
        array_TOBILLO: ["Flexión plantar", "Flexión dorsal"],
        array_TOBILLO_Data: [],
        /*  */
        data_movimiento8: "",
        data_izquierdo8: "",
        data_derecho8: "",

        /* 9 */
        array_ART_SUBASTRAGALINA: ["inversion", "Eversión"],
        array_ART_SUBASTRAGALINA_Data: [],
        /*  */
        data_movimiento9: "",
        data_izquierdo9: "",
        data_derecho9: "",

        /* ------------------------------------------ */
        NewAntec: [],
        ArraySaveConsulta: [],
     
    }),
    methods: {
        ...mapActions("Hc", ["SaveDatos8"]),
        /* ------------------------------------------------------------------------------- */
        AddItemArray1(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_RAQUISCERVICAL_Data = [...this.array_RAQUISCERVICAL_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_RAQUISCERVICAL.splice(this.selectedIndex, 1);
            }
            this.clearInput1();
        },
        handleSelectChange1(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput1() {
            this.data_movimiento1 = "";
            this.data_izquierdo1 = "";
            this.data_derecho1 = "";
            this.selectedIndex = "";
        },
        deleteItemarray1(index, item) {
            this.array_RAQUISCERVICAL.push(item);
            this.array_RAQUISCERVICAL_Data.splice(index, 1);
        },
        /* --------------------------------------------------------------------------------- */
        AddItemArray2(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_RAQUISDORSOLUMBAR_Data = [...this.array_RAQUISDORSOLUMBAR_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_RAQUISDORSOLUMBAR.splice(this.selectedIndex, 1);
            }
            this.clearInput2();
        },
        handleSelectChange2(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput2() {
            this.data_movimiento2 = "";
            this.data_izquierdo2 = "";
            this.data_derecho2 = "";
            this.selectedIndex = "";
        },
        deleteItemarray2(index, item) {
            this.array_RAQUISDORSOLUMBAR.push(item);
            this.array_RAQUISDORSOLUMBAR_Data.splice(index, 1);
        },

        /* --------------------------------------------------------------------------------- */
        AddItemArray3(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_HOMBRO_Data = [...this.array_HOMBRO_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_HOMBRO.splice(this.selectedIndex, 1);
            }
            this.clearInput3();
        },
        handleSelectChange3(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput3() {
            this.data_movimiento3 = "";
            this.data_izquierdo3 = "";
            this.data_derecho3 = "";
            this.selectedIndex = "";
        },
        deleteItemarray3(index, item) {
            this.array_HOMBRO.push(item);
            this.array_HOMBRO_Data.splice(index, 1);
        },
        /* ---------------------------------------------------------------------- */
        AddItemArray4(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_CODO_Data = [...this.array_CODO_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_CODO.splice(this.selectedIndex, 1);
            }
            this.clearInput4();
        },
        handleSelectChange4(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput4() {
            this.data_movimiento4 = "";
            this.data_izquierdo4 = "";
            this.data_derecho4 = "";
            this.selectedIndex = "";
        },
        deleteItemarray4(index, item) {
            this.array_CODO.push(item);
            this.array_CODO_Data.splice(index, 1);
        },
        /* --------------------------------------------------------------------------------- */
        AddItemArray5(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_MUNECA_Data = [...this.array_MUNECA_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_MUNECA.splice(this.selectedIndex, 1);
            }
            this.clearInput5();
        },
        handleSelectChange5(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput5() {
            this.data_movimiento5 = "";
            this.data_izquierdo5 = "";
            this.data_derecho5 = "";
            this.selectedIndex = "";
        },
        deleteItemarray5(index, item) {
            this.array_MUNECA.push(item);
            this.array_MUNECA_Data.splice(index, 1);
        },
        /* -------------------------------------------------------------------------------------- */
        /* -------------------------------------------------------------------------------------- */
        AddItemArray6(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_CADERA_Data = [...this.array_CADERA_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_CADERA.splice(this.selectedIndex, 1);
            }
            this.clearInput6();
        },
        handleSelectChange6(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput6() {
            this.data_movimiento6 = "";
            this.data_izquierdo6 = "";
            this.data_derecho6 = "";
            this.selectedIndex = "";
        },
        deleteItemarray6(index, item) {
            this.array_CADERA.push(item);
            this.array_CADERA_Data.splice(index, 1);
        },
        /* -------------------------------------------------------------------------------------- */
        AddItemArray7(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_RODILLA_Data = [...this.array_RODILLA_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_RODILLA.splice(this.selectedIndex, 1);
            }
            this.clearInput7();
        },
        handleSelectChange7(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput7() {
            this.data_movimiento7 = "";
            this.data_izquierdo7 = "";
            this.data_derecho7 = "";
            this.selectedIndex = "";
        },
        deleteItemarray7(index, item) {
            this.array_RODILLA.push(item);
            this.array_RODILLA_Data.splice(index, 1);
        },
        /* -------------------------------------------------------------------------------------- */
        AddItemArray8(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_TOBILLO_Data = [...this.array_TOBILLO_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_TOBILLO.splice(this.selectedIndex, 1);
            }
            this.clearInput8();
        },
        handleSelectChange8(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput8() {
            this.data_movimiento8 = "";
            this.data_izquierdo8 = "";
            this.data_derecho8 = "";
            this.selectedIndex = "";
        },
        deleteItemarray8(index, item) {
            this.array_TOBILLO.push(item);
            this.array_TOBILLO_Data.splice(index, 1);
        },
        /* -------------------------------------------------------------------------------------- */
        AddItemArray9(mov, izq, der) {
            let itemM = {
                movimiento: mov,
                izquierdo: izq,
                derecho: der,
            };
            this.array_ART_SUBASTRAGALINA_Data = [...this.array_ART_SUBASTRAGALINA_Data, itemM];
            if (this.selectedIndex !== -1) {
                this.array_ART_SUBASTRAGALINA.splice(this.selectedIndex, 1);
            }
            this.clearInput9();
        },
        handleSelectChange9(event) {
            this.selectedIndex = event.target.selectedIndex - 1;
        },
        clearInput9() {
            this.data_movimiento9 = "";
            this.data_izquierdo9 = "";
            this.data_derecho9 = "";
            this.selectedIndex = "";
        },
        deleteItemarray9(index, item) {
            this.array_ART_SUBASTRAGALINA.push(item);
            this.array_ART_SUBASTRAGALINA_Data.splice(index, 1);
        },
        /* -------------------------------------------------------------------------------------- */
        async guardarInfo() {
            /* this.ArraySaveConsulta = []; */
            this.datosObservacion = {
                idpaciente: this.idPaciente,
                idhc: this.idhc,
                bd: this.bd,
                Data_observaciones: this.evalFisicaObservaciones,
                Data_SOseo: this.NewAntec,
                Data_EvalMSuperior: [{
                        RAQUISCERVICAL: this.array_RAQUISCERVICAL_Data
                    },
                    {
                        RAQUISDORSOLUMBAR: this.array_RAQUISDORSOLUMBAR_Data
                    },
                    {
                        HOMBRO: this.array_HOMBRO_Data
                    },
                    {
                        CODO: this.array_CODO_Data
                    },
                    {
                        MUNECA: this.array_MUNECA_Data
                    },

                ],

                Data_EvalMInferior: [{
                        CADERA: this.array_CADERA_Data
                    },
                    {
                        RODILLA: this.array_RODILLA_Data
                    },
                    {
                        TOBILLO: this.array_TOBILLO_Data
                    },
                    {
                        ART_SUBASTRAGALINA: this.array_ART_SUBASTRAGALINA_Data
                    },
                ]

            };
            this.SaveDatos8(this.datosObservacion);
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
        },
    },
};
</script>
