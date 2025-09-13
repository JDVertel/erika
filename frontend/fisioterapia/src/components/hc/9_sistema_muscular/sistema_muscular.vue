<!-- hc9_expmuscular -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse9" aria-expanded="false" aria-controls="panelsStayOpen-collapse9">
            Exploracion Muscular
        </button>
    </h2>
    <div id="panelsStayOpen-collapse9" class="accordion-collapse collapse">
        <div class="accordion-body">
            <small>
                Procedimiento actual diagnostico(funcional)fisioterapéutico pronóstico
                de enfermedad objetivos del tratamiento (generales y específicos) plan
                de atención y tratamientos observaciones.
            </small>

            <!--  -->

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-sist-muscular" data-bs-toggle="tab" data-bs-target="#nav-smuscular" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        Sistema Muscular
                    </button>
                    <button class="nav-link" id="nav-sist-muscular-general" data-bs-toggle="tab" data-bs-target="#nav-smusculargen" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        Eval Musc General
                    </button>
                    <button class="nav-link" id="nav-sist-muscular-detalle" data-bs-toggle="tab" data-bs-target="#nav-smusculardetall" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                        Eval Musc Detallada
                    </button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-smuscular" role="tabpanel" aria-labelledby="nav-sist-muscular" tabindex="0">
                    <br />
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="mb-1">
                                <!--  -->
                                <select v-model="tipoevaluacionM" class="form-select form-select-sm textarea" id="tipoevaluacionM" @change="
                      busquedamuscular(
                        tipoevaluacionM,
                        data_smuscular,
                        'detalle'
                      )
                    " aria-label="Default select example">
                                    <option value="0">--Seleccione tipo de evaluacion--</option>
                                    <option v-for="item in data_smuscular" :key="item.id" :value="item.clase">
                                        {{ item.clase }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="mb-1">
                                <!--  -->
                                <select v-model="caracteristicaM" class="form-select form-select-sm textarea" id="gmuscular" aria-label="Default select example">
                                    <option value="0">--Seleccione caracteristica--</option>
                                    <option v-for="i in consultamusc" :key="i.id" :value="i">
                                        {{ i }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mb-1">
                        <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalleM"></textarea>
                    </div>

                    <button type="button" class="btn btn-primary btn-sm" v-if="
                tipoevaluacionM != '0' &&
                caracteristicaM != '0' &&
                detalleM != ''
              " @click="AddAntec()">
                        + Agregar
                    </button>

                    <div class="card">
                        <div class="card-header">Registro</div>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Sistema</th>
                                    <th>Evaluacion</th>
                                    <th>Caracteristica</th>
                                    <th>Detalle</th>
                                    <th>Opc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in NewAntec" :key="index">
                                    <td>{{ item.sistema }}</td>
                                    <td>{{ item.tipoEvaluacion }}</td>
                                    <td>{{ item.caracteristica }}</td>
                                    <td>{{ item.detalleenf }}</td>
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
                <!-- comienza aca -->
                <div class="tab-pane fade" id="nav-smusculargen" role="tabpanel" aria-labelledby="nav-sist-muscular-general" tabindex="0">
                    <br />
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <div class="mb-1">
                                <select class="form-select form-select-sm textarea" id="emuscular" aria-label="Small select example" v-model="emuscular" @change="evalmuscular(emuscular, data_emuscular, 'musculo')">
                                    <option value="0">--Seleccione clase--</option>
                                    <option v-for="item in data_emuscular" :key="item.id" :value="item.clase">
                                        {{ item.clase }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="mb-1">
                                <select class="form-select form-select-sm textarea" id="emuscular_musc" aria-label="Small select example" v-model="musculo">
                                    <option value="0">--Seleccione musculo--</option>
                                    <option v-for="ite in evalmusc" :key="ite.id" :value="ite">
                                        {{ ite }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-6 col-md-2">
                            <div class="mb-1">
                                <select v-model="eval_grado" class="form-select form-select-sm textarea" id="Ggmuscular" aria-label="Small select example">
                                    <option value="0">--Grado--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-2">
                            <button type="button" class="btn btn-primary btn-sm" v-if="emuscular != '0' && musculo != '0' && eval_grado != '0'" @click="Addevalcuacion()">
                                + Agregar
                            </button>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-header">Registro</div>

                                    <table class="table table-sm table-success">
                                        <thead>
                                            <tr>
                                                <th>Eval</th>
                                                <th>Clase</th>
                                                <th>Musculo</th>
                                                <th>Grado</th>
                                                <th>Opc</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(ite, index) in NewAntec2" :key="index">
                                                <td>{{ ite.sistema }}</td>
                                                <td>{{ ite.clase }}</td>
                                                <td>{{ ite.musculo }}</td>
                                                <td>{{ ite.grado }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger" @click="eliminaritemeval(index)">
                                                        <i class="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="col-12 col-md-6">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-header">Registro 1</div>
                                            <table class="table table-sm table-warning">
                                                <thead>
                                                    <tr>
                                                        <th>Eval</th>
                                                        <th>Clase</th>
                                                        <th>Musculo</th>
                                                        <th>Grado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Mark</td>
                                                        <td>1</td>
                                                        <td>Mark</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-header">Registro 2</div>
                                            <table class="table table-sm table-warning">
                                                <thead >
                                                    <tr>
                                                        <th>Eval</th>
                                                        <th>Clase</th>
                                                        <th>Musculo</th>
                                                        <th>Grado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                        <td>Jacob</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-smusculardetall" role="tabpanel" aria-labelledby="nav-sist-muscular-detalle" tabindex="0">
                    <br />
                    <div class="row">
                        <div class="col-6 col-md-3">
                            <div class="mb-1">
                                <select class="form-select form-select-sm textarea" id="emusc_organo" aria-label="Small select example" v-model="emusc_organo" @change="
                      evalmuscularD(
                        emusc_organo,
                        data_evalmuscular,
                        'movimiento'
                      )
                    ">
                                    <option value="0">--Organo--</option>
                                    <option v-for="item in data_evalmuscular" :key="item.id" :value="item.organo">
                                        {{ item.organo }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="mb-1">
                                <select class="form-select form-select-sm textarea" id="emuscular_musc" aria-label="Small select example" v-model="movimiento">
                                    <option value="0">--Movimiento--</option>
                                    <option v-for="ite in evalmuscD" :key="ite.id" :value="ite">
                                        {{ ite }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-2">
                            <input v-model="eIzquierdo" type="number" placeholder="Izquierdo" class="form-control" />
                        </div>
                        <div class="col-6 col-md-2">
                            <input v-model="eDerecho" type="number" placeholder="Derecho" class="form-control" />
                        </div>
                        <div class="col-6 col-md-2">
                            <button type="button" class="btn btn-primary btn-sm" v-if="
                    emusc_organo != '' &&
                    movimiento != '' &&
                    eIzquierdo != '' &&
                    eDerecho != ''
                  " @click="AddevalcuacionDetallada()">
                                + Agregar
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class="card">
                        <div class="card-header">Registro</div>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Sistema</th>
                                    <th>Musculo</th>
                                    <th>Movimiento</th>
                                    <th>Izquierda</th>
                                    <th>Derecha</th>
                                    <th>Opc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(itee, index) in NewAntec3" :key="index">
                                    <td>{{ itee.sistema }}</td>
                                    <td>{{ itee.organo }}</td>
                                    <td>{{ itee.movimiento }}</td>
                                    <td>{{ itee.izquierdo }}</td>
                                    <td>{{ itee.derecho }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-danger" @click="eliminaritemevaldeta(index)">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Botón Guardar -->
         <!--    <button class="btn btn-warning mt-3" @click="guardarInfo9">
                + Guardar
            </button> -->
        </div>
    </div>
</div>
</template>

<script>
import {
    evaluacion_muscular,
    sistema_muscular,
    evalmuscular,
} from "./../../../firebase/bd.js";
import {
    BuscarExpMuscularDetalleNombre,
    BuscarExpFisicaDetalleNombre,
    BuscarEvalMuscularDetalleNombre,
} from "./../../backend/rutinas.js";
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
export default {
    data: () => ({
        data_smuscular: sistema_muscular,
        data_emuscular: evaluacion_muscular,
        data_evalmuscular: evalmuscular,
        emuscular: "0",
        emusc_organo: "0",
        tipoevaluacionM: "0",
        caracteristicaM: "0",
        musculo: "0",
        movimiento: "0",
        eDerecho: "",
        eIzquierdo: "",
        consultamusc: [],
        evalmusc: [],
        evalmuscD: [],
        eval_grado: "0",
        detalleM: "",
        NewAntec: [],
        NewAntec2: [],
        NewAntec3: [],
        datosObservacion:[],
        /*  */
        idPaciente: "111",
        idhc: "1",
        bd: "hc9_expmuscular",
    }),
    methods: {

      ...mapActions("hc", ["SaveDatos9"]),


        busquedamuscular(x, y, z) {
            this.consultamusc = BuscarExpFisicaDetalleNombre(x, y, z);
        },

        evalmuscular(x, y, z) {
            this.evalmusc = BuscarExpMuscularDetalleNombre(x, y, z);
        },

        evalmuscularD(x, y, z) {
            this.evalmuscD = BuscarEvalMuscularDetalleNombre(x, y, z);
        },
        /* -------------- */
        AddAntec() {
            let item = {
                sistema: "sistema muscular",
                tipoEvaluacion: this.tipoevaluacionM,
                caracteristica: this.caracteristicaM,
                detalleenf: this.detalleM,
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
            this.tipoevaluacionM = "0";
            this.caracteristicaM = "0";
            this.detalleM = "";
        },
        /* ------------------------------ */
        Addevalcuacion() {
            let item = {
                sistema: "Evaluacion Muscular General",
                clase: this.emuscular,
                musculo: this.musculo,
                grado: this.eval_grado,
            };
            this.NewAntec2 = [...this.NewAntec2, item];
            console.log(this.NewAntec2);
            this.limpiarcamposeval();
        },

        eliminaritemeval(index) {
            console.log(index);
            this.NewAntec2.splice(index, 1);
        },
        limpiarcamposeval() {
            this.emuscular = "0";
            this.musculo = "0";
            this.eval_grado = "0";
        },

        /* -------------------- */

        AddevalcuacionDetallada() {
            let item = {
                sistema: "Evaluacion Muscular Detallada",
                organo: this.emusc_organo,
                movimiento: this.movimiento,
                derecho: this.eDerecho,
                izquierdo: this.eIzquierdo,
            };
            this.NewAntec3 = [...this.NewAntec3, item];
            console.log(this.NewAntec3);
            this.limpiarcamposeval3();
        },

        eliminaritemevaldeta(index) {
            console.log(index);
            this.NewAntec3.splice(index, 1);
        },
        limpiarcamposeval3() {
            this.movimiento = "0";
            this.eIzquierdo = "0";
            this.eDerecho = "0";
        },
        /*----------------------------  */
        guardarInfo9() {
          this.datosObservacion = {
                idpaciente: this.idPaciente,
                idhc: this.idhc,
                bd: this.bd,
                dataSistMuscular: this.NewAntec,
                dataEvalMuscularGeneral: this.NewAntec2,
                dataEvalMuscDetallada: this.NewAntec3,
            };

            this.SaveDatos9(this.datosObservacion);
        },
    },
};
</script>

