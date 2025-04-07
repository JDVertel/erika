<!-- hc3_inspestatica-->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse3" aria-expanded="false" aria-controls="panelsStayOpen-collapse3">
            Inspeccion Estatica-ok
        </button>
    </h2>
    <div id="panelsStayOpen-collapse3" class="accordion-collapse collapse">
        <div class="accordion-body">
            <p>Evaluacion de la postura:(Comparando con el lado colateral)</p>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            Piel
                        </button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Lesiones
                        </button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            Biotipo
                        </button>
                        <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">
                            Postura
                        </button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active m-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div class="container">
                            <select v-model="i_est_piel" class="form-select form-select-sm textarea" aria-label="Default select example">
                                <option value="0">--Seleccione evaluacion de piel--</option>
                                <option v-for="item in this.data_ie_piel.nombres" :key="item" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <div class="mb-1">
                                <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_piel" rows="2"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" v-if="i_est_piel != '0' && detalle_piel != ''" @click="AddAntec('piel', i_est_piel, detalle_piel)">
                                + Adicionar
                            </button>
                        </div>
                    </div>

                    <div class="tab-pane fade m-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        <div class="container">
                            <select v-model="i_est_lesiones" class="form-select form-select-sm textarea" aria-label="Default select example">
                                <option value="0">
                                    --Seleccione evaluacion de lesiones--
                                </option>
                                <option v-for="item in this.data_ie_lesiones.nombres" :key="item" :value="item">
                                    {{ item }}
                                </option>
                            </select>

                            <div class="mb-1">
                                <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_lesiones" rows="2"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" @click="
                    AddAntec('lesiones', i_est_lesiones, detalle_lesiones)
                  " v-if="i_est_lesiones != '0' && detalle_lesiones != ''">
                                + Adicionar
                            </button>
                        </div>
                    </div>

                    <div class="tab-pane fade m-3" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                        <div class="container">
                            <div class="row g-3 align-items-center">
                                <div class="col-12 col-md-6">
                                    <div class="img-container">
                                        <img id="imagen_postura" src="./../../../assets/images/insp_estatica/imagen_biotipo.png" alt="Imagen biotipo" class="img-fluid rounded" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <select v-model="i_e_biotipo" class="form-select form-select-sm textarea" aria-label="Default select example">
                                        <option value="0">--Seleccione biotipo--</option>
                                        <option v-for="item in this.data_ie_biotipo.nombres" :key="item" :value="item">
                                            {{ item }}
                                        </option>
                                    </select>

                                    <div class="mb-1">
                                        <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_biotipo" rows="2"></textarea>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-sm" @click="AddAntec('biotipo', i_e_biotipo, detalle_biotipo)" v-if="i_e_biotipo != '0' && detalle_biotipo != ''">
                                        + Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade m-3" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">
                        <div class="container">
                            <div class="row g-3 align-items-center">
                                <div class="col-12 col-md-6">
                                    <div class="img-container">
                                        <img id="imagen_postura" src="./../../../assets/images/insp_estatica/imagen_postura.png" alt="Imagen postura" class="img-fluid rounded" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <select v-model="i_e_postura" class="form-select form-select-sm textarea" aria-label="Default select example">
                                        <option value="0">--Seleccione postura--</option>
                                        <option v-for="item in this.data_ie_postura.nombres" :key="item" :value="item">
                                            {{ item }}
                                        </option>
                                    </select>

                                    <div class="mb-1">
                                        <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_postura" rows="2"></textarea>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-sm" @click="AddAntec('postura', i_e_postura, detalle_postura)" v-if="i_e_postura != '0' && detalle_postura != ''">
                                        + Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                    <th>Tipo</th>
                                    <th>Evaluacion</th>
                                    <th>Detalle</th>
                                    <th>Opc</th>
                                </tr>
                            </thead>
                            <tbody>
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
                    <button class="btn btn-warning mt-3" @click="guardarInfo">
                        + Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    insp_estatica
} from "./../../../firebase/bd.js";
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
export default {
    data: () => ({
        data_ie_piel: insp_estatica.filter((el) => el.clas === "piel")[0],
        data_ie_lesiones: insp_estatica.filter((el) => el.clas === "lesiones")[0],
        data_ie_biotipo: insp_estatica.filter((el) => el.clas === "biotipo")[0],
        data_ie_postura: insp_estatica.filter((el) => el.clas === "postura")[0],
        i_est_piel: "0",
        i_est_lesiones: "0",
        i_e_biotipo: "0",
        i_e_postura: "0",
        detalle_piel: "",
        detalle_lesiones: "",
        detalle_biotipo: "",
        detalle_postura: "",
        NewAntec: [],
        ArraySaveConsulta: [],
        tipoAnt: "",
        /*  */
        idPaciente: "111",
        idhc: "1",
        bd: "hc3_inspecionestatica",
    }),

    methods: {
        ...mapActions("Hc", ["SaveDatos3"]),

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
            this.i_est_piel = "0";
            this.detalle_piel = "";
            this.i_est_lesiones = "0";
            this.detalle_lesiones = "";
            this.i_e_biotipo = "0";
            this.detalle_biotipo = "";
            this.i_e_postura = "0";
            this.detalle_postura = "";
        },
        async guardarInfo() {
            /* this.ArraySaveConsulta = []; */
            this.datosObservacion = [{
                idpaciente: this.idpaciente,
                idhc: this.idhc,
                bd: this.bd,
                dataeval: this.NewAntec,
            }, ];
            this.SaveDatos3(this.datosObservacion[0]);
        },
    },
    computed: {},
    created() {},
};
</script>

<style scoped>
.img-container {
    max-width: 100%;
    margin: 0 auto;
}

.img-fluid {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 400px;
}

@media (max-width: 768px) {
    .img-fluid {
        max-height: 300px;
    }
}
</style>
