<!-- hc5_inspdinamica -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse5" aria-expanded="false" aria-controls="panelsStayOpen-collapse5">
            Inspeccion Dinamica
        </button>
    </h2>
    <div id="panelsStayOpen-collapse5" class="accordion-collapse collapse">
        <div class="accordion-body">
            <p>Analisis cualitativo de la Marcha</p>
            <div class="row">
                <div class="col-12 col-md-6">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-homeE" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                Fase de Apoyo
                            </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profileE" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Fase de Balanceo
                            </button>
                            <button class="nav-link" id="nav-evaluacion-tab" data-bs-toggle="tab" data-bs-target="#nav-Evaluacion" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Evaluacion
                            </button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contactE" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                Adaptaciones
                            </button>
                            <button class="nav-link" id="nav-contact-adapt" data-bs-toggle="tab" data-bs-target="#adaptaciones" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                Analisis cuantitativo
                            </button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-homeE" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                            <div class="container">
                                <div class="img-container">
                                    <img src="./../../../assets/images//insp_dinamica//fase_apoyo.jpg" alt="Fase de apoyo" class="img-fluid rounded" />
                                </div>
                            </div>

                            <p>Seleccione y agregue hallazgos</p>
                            <!-- Fase de Apoyo -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="clase_apoyo">
                                <option selected value="">---clasificacion---</option>
                                <option v-for="item in this.data_apoyo.nombre" :key="item.id" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Descripcion fase de apoyo" v-model="detalle_apoyo"></textarea>
                            <button type="button" class="btn btn-primary btn-sm" v-if="clase_apoyo != '0' && detalle_apoyo != ''" @click="AddAntec('apoyo', clase_apoyo, detalle_apoyo)">
                                + Agregar
                            </button>
                        </div>
                        <div class="tab-pane fade" id="nav-profileE" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <div class="container">
                                <div class="img-container">
                                    <img src="./../../../assets/images//insp_dinamica//fase_balanceo.jpg" alt="Fase de balanceo" class="img-fluid rounded" />
                                </div>
                            </div>

                            <p>Seleccione y agregue hallazgos</p>
                            <!-- Fase de Balanceo -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="clase_balanceo">
                                <option value="0" selected>---clasificacion---</option>
                                <option v-for="item in this.data_balanceo.nombre" :key="item.id" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Descripcion fase de balanceo" v-model="detalle_balanceo"></textarea>
                            <button type="button" class="btn btn-primary btn-sm" v-if="clase_balanceo != '0' && detalle_balanceo != ''" @click="AddAntec('balanceo', clase_balanceo, detalle_balanceo)">
                                + Agregar
                            </button>
                        </div>
                        <div class="tab-pane fade" id="nav-Evaluacion" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <select class="form-select form-select-sm" aria-label="Small select example" v-model="eval_select" v-on:change="
                          b_evaluacion(this.eval_select, this.data_marcha, 'nombre')
                        ">
                                            <option value="0" selected>---clasificacion---</option>
                                            <option v-for="item in this.data_marcha" :key="item.id" :value="item.fase">
                                                {{ item.fase }}
                                            </option>
                                        </select>
                                        <select class="form-select form-select-sm" aria-label="Small select example" v-model="detalle_eval">
                                            <option value="0" selected>---clasificacion---</option>
                                            <option v-for="item in this.data_evaluacion" :value="item" :key="item.id">
                                                {{ item }}
                                            </option>
                                        </select>
                                        <button type="button" class="btn btn-primary btn-sm" v-if="eval_select != '0' && detalle_eval != '0'" @click="AddAntec('evaluacion', eval_select, detalle_eval)">
                                            + Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-contactE" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <p>Seleccione y agregue hallazgos</p>
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="clase_adaptaciones">
                                <option value="0">--Seleccione clasificacion--</option>
                                <option v-for="item in this.data_adaptaciones.nombre" :key="item.id" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Descripcion adaptaciones" v-model="detalle_adaptaciones"></textarea>
                            <button type="button" class="btn btn-primary btn-sm" v-if="clase_adaptaciones != '0' && detalle_adaptaciones != ''" @click="
                    AddAntec('adaptaciones', clase_adaptaciones, detalle_adaptaciones)
                  ">
                                + Agregar
                            </button>
                        </div>
                        <div class="tab-pane fade" id="adaptaciones" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Datos a Evaluar</th>
                                        <th scope="col">H</th>
                                        <th scope="col">M</th>
                                        <th scope="col">Derecha</th>
                                        <th scope="col">Izquierda</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr>
                                        <th scope="col">Longitud del paso</th>
                                        <td>79 cm</td>
                                        <td>66 cm</td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="longPaso_d" />
                                        </td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="longPaso_i" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Longitud de la zancada</th>
                                        <td>158 cm</td>
                                        <td>132 cm</td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="longZanc_d" />
                                        </td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="longZanc_i" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Anchura de paso</th>
                                        <td>8.1 cm</td>
                                        <td>7.1 cm</td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="anchPaso_d" />
                                        </td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="anchPaso_i" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Pasos por minuto</th>
                                        <td>117pm</td>
                                        <td>117pm</td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="pasoMin_d" />
                                        </td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="pasoMin_i" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Angulos del pie</th>
                                        <td>7-10°</td>
                                        <td>6°</td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="angPie_d" />
                                        </td>
                                        <td>
                                            <input class="form-control form-control-sm" type="number" v-model="angPie_i" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <button class="btn btn-warning" @click="guardaInfo2('Acuantitativo', clase_adaptaciones, detalle_adaptaciones)"> Guardar</button>

                        </div>
                    </div>
                    <br>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">Registro</div>

                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Fase</th>
                                        <th>Clasificacion</th>
                                        <th>Detalle</th>
                                        <th>Opc</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="(item, index) in NewAntec" :key="index">
                                        <td>{{ item.tipo }}</td>
                                        <td>{{ item.enfermedad }}</td>
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
                 <!--    <button class="btn btn-warning mt-3" @click="guardarInfo5">+ Guardar</button> -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import {
    insp_dinamica
} from "./../../../firebase/bd.js";
import {
    BuscarIsnpDinamicaDetalleNombre
} from "./../../backend/rutinas.js";
export default {
    data: () => ({
        data_evaluacion: "0",
        eval_select: "0",
        detalle_eval: "0",
        data_apoyo: insp_dinamica.filter((el) => el.class === "apoyo")[0],
        data_balanceo: insp_dinamica.filter((el) => el.class === "balanceo")[0],
        data_marcha: insp_dinamica.filter((el) => el.class === "marcha"),
        data_adaptaciones: insp_dinamica.filter((el) => el.class === "adaptaciones")[0],
        clase_apoyo: "",
        detalle_apoyo: "",
        clase_balanceo: "",
        detalle_balanceo: "",
        clase_adaptaciones: "0",
        detalle_adaptaciones: "",
        /*  */
        longPaso_d: "",
        longPaso_i: "",
        longZanc_d: "",
        longZanc_i: "",
        anchPaso_d: "",
        anchPaso_i: "",
        pasoMin_d: "",
        pasoMin_i: "",
        angPie_d: "",
        angPie_i: "",
        NewAntec:[],
/*  */
        Acualitativo: [],
        Acualitativo: [],
        dataInspecDinamica: [],
        /*  */
        idPaciente: "111",
        idhc: "1",
        bd: "hc5_datos_insp_dinamica",
    }),
    methods: {

        ...mapActions("Hc", ["SaveDatos5"]),

        b_evaluacion(x, y, z) {
            this.data_evaluacion = BuscarIsnpDinamicaDetalleNombre(x, y, z);
        },
        AddAntec(tipo, enf, detalle) {
            let item = {
                tipo: tipo,
                enfermedad: enf,
                detalleenf: detalle,
            };
            this.NewAntec = [...this.NewAntec, item];
            this.limpiarcampos();
        },

        eliminaritem(index) {
            console.log(index);
            this.NewAntec.splice(index, 1);
        },
        limpiarcampos() {
            this.clase_apoyo = "0";
            this.detalle_apoyo = "";

            this.clase_balanceo = "0";
            this.detalle_balanceo = "";

            this.eval_select = "0";
            this.detalle_eval = "0";

            this.clase_adaptaciones = "0";
            this.detalle_adaptaciones = "";
        },

        guardarInfo5() {
            this.guardaInfo2(),
                this.dataInspecDinamica = {
                    idpaciente: this.idPaciente,
                    idhc: this.idhc,
                    bd: this.bd,
                    Acualitativo: this.NewAntec,
                    Acuantitativo: this.Acuantitativo,
                };
            this.SaveDatos5(this.dataInspecDinamica);
        },
        guardaInfo2() {
            this.Acuantitativo = {
                longPaso_d: this.longPaso_d,
                longPaso_i: this.longPaso_i,
                /*  */
                longZanc_d: this.longZanc_d,
                longZanc_i: this.longZanc_i,
                /*  */
                anchPaso_d: this.anchPaso_d,
                anchPaso_i: this.anchPaso_i,
                /*  */
                pasoMin_d: this.pasoMin_d,
                pasoMin_i: this.pasoMin_i,
                /*  */
                angPie_d: this.angPie_d,
                angPie_i: this.angPie_i,
            };
        }
    }
};
</script>

<style scoped>
.img-container {
    max-width: 100%;
    margin: 0 auto;
    padding: 1rem;
}

.img-fluid {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 400px;
    border: 1px solid #dee2e6;
}

@media (max-width: 768px) {
    .img-fluid {
        max-height: 300px;
    }
}

@media (max-width: 576px) {
    .img-fluid {
        max-height: 250px;
    }

    .img-container {
        padding: 0.5rem;
    }
}

.tab-content {
    margin-top: 1rem;
}

.container {
    padding: 1rem 0;
}
</style>
