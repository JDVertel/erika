<!-- hc4_evalpostural -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse4" aria-expanded="false" aria-controls="panelsStayOpen-collapse4">
            Evaluacion Postural-ok
        </button>
    </h2>

    <div id="panelsStayOpen-collapse4" class="accordion-collapse collapse">
        <div class="accordion-body">
            <p>Evaluacion de la postura</p>
            <div class="row">
                <div class="col-12 col-md-6">
                    <nav>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <div class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#vanterior" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                    V anterior
                                </button>
                            </div>
                            <div class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#vlateral" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                    V lateral
                                </button>
                            </div>
                            <div class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#vposterior" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                                    V posterior
                                </button>
                            </div>
                        </ul>
                    </nav>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="vanterior" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                            <p>Seleccione y agregue hallazgos anterior</p>
                            <!-- 1 -->
                            <select v-on:change="
                    buscar_detalleN(v_anterior, this.data_v_anterior)
                  " v-model="v_anterior" class="form-select form-select-sm" aria-label="Small select example">
                                <option value="0" selected>
                                    --Seleccione clasificacion--
                                </option>
                                <option v-for="item in this.data_v_anterior" :key="item" :value="item.organo">
                                    {{ item.organo }}
                                </option>
                            </select>
                            <!-- 2 -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="v_anterior_org">
                                <option value="0" selected>
                                    --Seleccione especificacion--
                                </option>
                                <option v-for="(item, index) in this.detalle_rta" :key="index" :value="item">
                                    {{ item }}
                                </option>
                            </select>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Detalle</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="detalle_anterior"></textarea>
                            </div>

                            <button type="button" class="btn btn-primary btn-sm" v-if="
                    v_anterior != '0' &&
                    v_anterior_org != '0' &&
                    detalle_anterior != ''
                  " @click="
                    AddAntec(
                      'anterior',
                      v_anterior,
                      v_anterior_org,
                      detalle_anterior
                    )
                  ">
                                + Agregar
                            </button>
                        </div>
                        <!-- detalle-->
                        <div class="tab-pane fade" id="vlateral" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                            <p>Seleccione y agregue hallazgos lateral</p>
                            <!-- 1 -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-on:change="buscar_detalleN(v_lateral, this.data_v_lateral)" v-model="v_lateral">
                                <option value="0" selected>
                                    -- Seleccione clasificacion--
                                </option>
                                <option v-for="(item, index) in this.data_v_lateral" :key="index" :value="item.organo">
                                    {{ item.organo }}
                                </option>
                            </select>
                            <!-- 2 -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="v_lateral_org">
                                <option value="0" selected>
                                    --Seleccione la especificacion--
                                </option>
                                <option v-for="(it, index) in this.detalle_rta" :key="index" :value="it">
                                    {{ it }}
                                </option>
                            </select>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Detalle</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="detalle_lateral"></textarea>
                            </div>

                            <button type="button" class="btn btn-primary btn-sm" v-if="
                    v_lateral != '0' &&
                    v_lateral_org != '0' &&
                    detalle_lateral != ''
                  " @click="
                    AddAntec(
                      'lateral',
                      v_lateral,
                      v_lateral_org,
                      detalle_lateral
                    )
                  ">
                                + Agregar
                            </button>
                        </div>
                        <!-- --------------------------------------------------------------------------------------------------------------->
                        <div class="tab-pane fade" id="vposterior" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                            <p>Seleccione y agregue hallazgos posterior</p>

                            <!-- 1 -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-on:change="
                    buscar_detalleN(v_posterior, this.data_v_posterior)
                  " v-model="v_posterior">
                                <option value="0" selected>
                                    -- Seleccione clasificacion--
                                </option>
                                <option v-for="item in this.data_v_posterior" :key="item" :value="item.organo">
                                    {{ item.organo }}
                                </option>
                            </select>
                            <!-- 2 -->
                            <select class="form-select form-select-sm" aria-label="Small select example" v-model="v_posterior_org">
                                <option value="0" selected>
                                    --Seleccione la especificacion--
                                </option>
                                <option v-for="(it, index) in this.detalle_rta" :key="index" :value="it">
                                    {{ it }}
                                </option>
                            </select>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Detalle</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="detalle_posterior"></textarea>
                            </div>

                            <button type="button" class="btn btn-primary btn-sm" v-if="
                    v_posterior != '0' &&
                    v_posterior_org != '0' &&
                    detalle_posterior != ''
                  " @click="
                    AddAntec(
                      'posterior',
                      v_posterior,
                      v_posterior_org,
                      detalle_posterior
                    )
                  ">
                                + Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">Registro</div>

                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Vista</th>
                                        <th>Clase</th>
                                        <th>Especificacion</th>
                                        <th>Detalle</th>
                                        <th>Opc</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="(item, index) in NewAntec" :key="index">
                                        <td>{{ item.tipo }}</td>
                                        <td>{{ item.clase }}</td>
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
                    <button class="btn btn-warning mt-3" @click="guardarInfo">
                        + Guardar
                    </button>
                </div>
            </div>
            <br />
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import {
    eval_postural
} from "./../../../firebase/bd.js";
import {
    BuscarDetalles,
    BuscarDetallesNombre,
} from "./../../backend/rutinas.js";
export default {
    data: () => ({
        data_v_anterior: eval_postural.filter((el) => el.clase == "vista anterior"),
        data_v_lateral: eval_postural.filter((el) => el.clase == "vista lateral"),
        data_v_posterior: eval_postural.filter(
            (el) => el.clase == "vista posterior"
        ),
        detalle_rta: "",
        v_anterior: "0",
        v_anterior_org: "0",
        v_lateral: "0",
        v_lateral_org: "0",
        v_posterior: "0",
        v_posterior_org: "0",
        detalle_anterior: "",
        detalle_lateral: "",
        detalle_posterior: "",
        NewAntec: [],
        datosEvalPostural: [],
        /*  */
        idPaciente: "111",
        idhc: "1",
        bd: "hc4_datosevalpostural",
    }),
    methods: {


      ...mapActions("Hc",["SaveDatos4"]),

        buscar_detalle(id, bd) {
            this.detalle_rta = BuscarDetalles(id, bd, "detalle");
        },
        buscar_detalleN(name, bd) {
            this.detalle_rta = BuscarDetallesNombre(name, bd, "detalle");
        },

        AddAntec(tipo, clas, enf, detalle) {
            let item = {
                tipo: tipo,
                clase: clas,
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
            this.v_anterior = "0";
            this.v_anterior_org = "0";
            this.detalle_anterior = "";

            this.v_lateral = "0";
            this.v_lateral_org = "0";
            this.detalle_lateral = "";

            this.v_posterior = "0";
            this.v_posterior_org = "0";
            this.detalle_posterior = "";
        },

        guardarInfo() {
            this.datosEvalPostural = [{
                idpaciente: this.idpaciente,
                idhc: this.idhc,
                bd: this.bd,
                dataeval: this.NewAntec,
            }, ];
            this.SaveDatos4(this.datosEvalPostural[0]);
        },
    },
};
</script>
