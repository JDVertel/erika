<!-- hc2_observacion -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse2" aria-expanded="false" aria-controls="panelsStayOpen-collapse2">
            Observacion_ok
        </button>
    </h2>
    <div id="panelsStayOpen-collapse2" class="accordion-collapse collapse">
        <div class="accordion-body">
            <p>
                Inventario general y sistematico a nivel corporal, emocional,personal
                y social desde el primer contacto visual con la persona que asiste
            </p>
            <br />

            <div class="row">
                <div class="col-12 col-md-6">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-homeB" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                Marcha/Deambulacion
                            </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profileB" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                Movilidad/Traslados
                            </button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-homeB" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                            <div class="container">
                                <br />

                                <select v-model="obs_marcha" class="form-select form-select-sm textarea" aria-label="Default select example">
                                    <option value="0">--Seleccione marcha--</option>
                                    <option v-for="item in this.data_marcha" :key="item.id" :value="item">
                                        {{ item.nombre }}
                                    </option>
                                </select>

                                <div class="mb-1">
                                    <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_marcha" rows="2"></textarea>
                                </div>

                                <button type="button" class="btn btn-primary" @click="AddOb('marcha', obs_marcha, detalle_marcha)" v-if="obs_marcha !== '0' && detalle_marcha !== ''">
                                    + Adicionar
                                </button>
                            </div>
                            <br />
                        </div>
                        <div class="tab-pane fade" id="nav-profileB" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <div class="container">
                                <br />

                                <select v-model="obs_tipo" class="form-select form-select-sm textarea" aria-label="Default select example">
                                    <option value="0">--Seleccione tipo--</option>
                                    <option v-for="item in this.data_movilidad" :key="item.id" :value="item">
                                        {{ item.nombre }}
                                    </option>
                                </select>

                                <div class="mb-1">
                                    <textarea class="form-control form-control-sm textarea" id="exampleFormControlTextarea1" placeholder="Detalle" v-model="detalle_movilidad" rows="2"></textarea>
                                </div>

                                <button type="button" class="btn btn-primary" @click="AddOb('movilidad', obs_tipo, detalle_movilidad)" v-if="obs_tipo !== '0' && detalle_movilidad !== ''">
                                    + Adicionar
                                </button>
                            </div>
                            <br />
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
                                        <th>item</th>
                                        <th scope="col">movilidad/traslados</th>
                                        <th>Marcha</th>
                                        <th>observacion</th>
                                        <th>Opc</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="(item, index) in NewAntec" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ item.tipo }}</td>
                                        <td>{{ item.observacion.nombre }}</td>
                                        <td>{{ item.detalleobs }}</td>
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
                    <br />
                    <button class="btn btn-warning" @click="guardarInfo">
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
    mapActions,
    mapGetters,
    mapState
} from "vuex";
import {
    observacion_marcha,
    observacion_movilidad,
} from "./../../../firebase/bd.js";

export default {
    data: () => ({
        data_marcha: observacion_marcha,
        data_movilidad: observacion_movilidad,
        obs_marcha: "0",
        obs_tipo: "0",
        detalle_marcha: "",
        detalle_movilidad: "",
        NewAntec: [],
        ArraySaveConsulta: [],
        tipoAnt: "",
        /*  */
        idPaciente: "111",
        idhc: "1",
        bd: "hc2_datosobservacion",
    }),

    methods: {
        ...mapActions("Hc", ["SaveDatos2"]),

        /*  */
        AddOb(tipo, obs, detalle) {
            let item = {
                tipo: tipo,
                observacion: obs,
                detalleobs: detalle,
            };
            this.NewAntec = [...this.NewAntec, item];
            this.limpiarcampos();
        },
        limpiarcampos() {
            this.obs_marcha = "0";
            this.detalle_marcha = "";
            this.obs_tipo = "0";
            this.detalle_movilidad = "";
        },
        eliminaritem(index) {
            console.log(index);
            this.NewAntec.splice(index, 1);
        },

        /*  */
        async guardarInfo() {
            this.datosObservacion = [{
                idpaciente: this.iduser,
                bd: this.bd,
                idhc: this.idhc,
                dataObserv: this.NewAntec,
            }, ];

            this.SaveDatos2(this.datosObservacion[0]);
        },
    },
};
</script>
