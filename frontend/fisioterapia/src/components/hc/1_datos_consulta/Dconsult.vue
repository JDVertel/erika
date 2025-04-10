<!-- hc1_datosconsulta -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse1" aria-expanded="false" aria-controls="panelsStayOpen-collapse1">
            Datos de Consulta
        </button>
    </h2>
    <div id="panelsStayOpen-collapse1" class="accordion-collapse collapse">
        <div class="accordion-body">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profileA" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">
                        Motivo
                    </button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contactA" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                        S vitales y M fisicas
                    </button>
                    <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabledA" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">
                        Antecedentes
                    </button>
                </div>
            </nav>

            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-profileA" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <br>
                    <div>
                        <div class="form-floating mb-3">
                            <textarea v-model="motivoConsulta" class="form-control textarea" id="text_motivoconsulta" placeholder="Motivo de Consulta" rows="4">
                        </textarea>
                            <label for="text_motivoconsulta">Motivo de Consulta</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea placeholder="Enfermedad actual" v-model="Enfermedad" class="form-control textarea" id="text_diagnosticomedico" rows="4"></textarea>
                            <label for="text_diagnosticomedico">Enfermedad actual</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea placeholder="Tratamientos Previos" v-model="TratPrevios" class="form-control textarea" id="text_tratamientosprevios" rows="4"></textarea>
                            <label for="text_tratamientosprevios">Tratamientos Previos</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea placeholder="Medicamentos Previos" v-model="MedPrevios" class="form-control textarea" id="text_medicamentosprevios" rows="4"></textarea>
                            <label for="text_medicamentosprevios">Medicamentos Previos</label>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="nav-contactA" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                    <div>
                        <br />
                        <div class="row">

                            <div class="col-6">
                                <p>Medidas Fisicas</p>
                                <div>

                                    <div class="input-group mb-1">
                                        <div class="form-floating">
                                            <input type="number" class="form-control form-control-sm textarea" id="text_peso" v-model="peso" placeholder="Peso (kg)" />
                                            <label for="text_peso">Peso (kg)</label>
                                        </div>
                                    </div>
                                    <div class="input-group mb-1">
                                        <div class="form-floating">
                                            <input type="number" class="form-control form-control-sm textarea" id="text_talla" v-model="talla" placeholder="Talla (Cm)" />
                                            <label for="text_talla">talla</label>
                                        </div>
                                    </div>
                                    <div class="input-group mb-1">
                                        <div class="form-floating">
                                            <input type="number" class="form-control form-control-sm textarea" id="text_estatura" v-model="estatura" placeholder="Estatura (Cm)" />
                                            <label for="text_estatura">estatura</label>
                                        </div>
                                    </div>
                                    <div class="input-group mb-1">
                                        <div class="form-floating">
                                            <input type="number" class="form-control form-control-sm textarea" id="text_imc" v-model="imc" placeholder="IMC" />
                                            <label for="text_imc">IMC</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <p>Signos Vitales</p>
                                <div class="mb-1">
                                    <div class="form-floating">
                                        <input type="number" class="form-control form-control-sm textarea" id="text_temp" v-model="temp" placeholder="Temp (C)" />
                                        <label for="text_temp">Temp (C)</label>
                                    </div>
                                </div>

                                <div class="mb-1">
                                    <div class="form-floating">
                                        <input type="number" class="form-control form-control-sm textarea" id="text_fcardiaca" v-model="fcardiaca" placeholder="F.cardiaca" />
                                        <label for="text_fcardiaca">F.cardiaca</label>
                                    </div>
                                </div>
                                <div class="mb-1">
                                    <div class="form-floating">
                                        <input type="number" class="form-control form-control-sm textarea" id="text_frespiratoria" v-model="frespiratoria" placeholder="F.respiraotria" />
                                        <label for="text_frespiratoria">F.respiraotria</label>
                                    </div>
                                </div>
                                <div class="mb-1">
                                    <div class="form-floating">
                                        <input type="number" class="form-control form-control-sm textarea" id="text_tarterial" v-model="tarterial" placeholder="T.Arterial" />
                                        <label for="text_tarterial">T.Arterial</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-disabledA" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">
                    <br />

                    <div class="row">
                        <!-- combo select antecedentes -->
                        <div class="col-12 col-md-6">
                            <!-- ----------------------------------------------------------------------------- -->
                            <div>
                                <div class="mb-1">
                                    <select v-model="tipoAnt" class="form-select form-select-sm textarea" @change="buscar_enfermedad(this.tipoAnt, this.dataBD)" aria-label="Default select example">
                                        <option value="0">--Seleccione--</option>
                                        <option v-for="ant in this.dataBD" :key="ant.id" :value="ant.nombre">
                                            {{ ant.nombre }}
                                        </option>
                                    </select>
                                </div>

                                <select v-model="selectenfermedad" class="form-select form-select-sm textarea" id="selectenfermedad" aria-label="Default select example">
                                    <option value="0">--Seleccione enfermedad--</option>
                                    <option v-for="item in this.enf" :key="item.id" :value="item">
                                        {{ item }}
                                    </option>
                                </select>

                                <div class="mb-1">
                                    <textarea class="form-control form-control-sm textarea" id="DetalleEnf" placeholder="Detalle" v-model="DetalleEnf" rows="2"></textarea>
                                </div>
                                <button class="btn btn-primary btn-sm textarea" v-if="
                      selectenfermedad !== '0' &&
                      DetalleEnf !== '' &&
                      tipoAnt !== '0'
                    " @click="
                      AddAntec(
                        this.tipoAnt,
                        this.selectenfermedad,
                        this.DetalleEnf
                      )
                    ">
                                    + Adicionar
                                </button>
                            </div>
                            <!-- ----------------------------------------------------------------------------- -->
                        </div>
                        <!-- tabla antecedentes  -->
                        <div class="col-12 col-md-6 mt-3">
                            <div v-if="this.NewAntec">
                                <div class="card-header">Nuevos Antecedentes</div>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead class="table-danger">
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Enfermedad</th>
                                                <th>Detalle</th>
                                                <th>Opc</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in this.NewAntec" :key="index">
                                                <td>{{ item.tipo }}</td>
                                                <td>{{ item.enfermedad }}</td>
                                                <td>{{ item.detalleenf }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger" @click="eliminarAnt(index)">
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
                    <div class="card-header">Historial de antecedentes</div>
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead class="table-info">
                                <tr>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Enfermedad</th>
                                    <th scope="col">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button class="btn btn-warning mt-3" @click="guardarInfo()">
                + Guardar
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";

import firebase_api from "@/api/firebaseApi";
import {
    Antecedentes
} from "./../../../firebase/bd.js";

import {
    BuscarAntDetallesNombreEnf
} from "./../../backend/rutinas.js";

export default {
    data: () => ({
        dataBD: Antecedentes,
        datas: "",
        tipoAnt: "0",
        selectenfermedad: "0",
        DetalleEnf: "",
        motivoConsulta: "",
        Enfermedad: "",
        TratPrevios: "",
        MedPrevios: "",
        /*  */
        peso: "",
        talla: "",
        estatura: "",
        imc: "",
        temp: "",
        fcardiaca: "",
        frespiratoria: "",
        tarterial: "",
        /*  */
        ArrayDatosConsulta: [],
        ArraySaveConsulta: [],
        enf: [],
        NewAntec: [],
        regAnt: {},
        /*  */
        idPaciente:"111",
        idhc: "1",
        bd: "hc1_datosconsulta",
    }),

    methods: {
        buscar_enfermedad(nombre, array) {
            this.enf = BuscarAntDetallesNombreEnf(nombre, array, "enfermedades");
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

        eliminarAnt(index) {
            console.log(index);
            this.NewAntec.splice(index, 1);
        },

        limpiarcampos() {
            this.tipoAnt = "0";
            this.selectenfermedad = "0";
            this.DetalleEnf = "";
        },

        ...mapActions("Hc", ["SaveDatos1"]),

        async guardarInfo() {
    
            this.ArrayDatosConsulta = [{
                idpaciente: this.iduser,
                bd: this.bd,
                idhc: this.idhc,
                /*  */
                motivoConsulta: this.motivoConsulta,
                Enfermedad: this.Enfermedad,
                TratPrevios: this.TratPrevios,
                MedPrevios: this.MedPrevios,
                peso: this.peso,
                talla: this.talla,
                estatura: this.estatura,
                imc: this.imc,
                temp: this.temp,
                fcardiaca: this.fcardiaca,
                frespiratoria: this.frespiratoria,
                tarterial: this.tarterial,
                antecedentes: this.NewAntec,
            }, ];

            this.SaveDatos1(this.ArrayDatosConsulta[0]);
        },
    },
    computed: {},
    created() {},
};
</script>
