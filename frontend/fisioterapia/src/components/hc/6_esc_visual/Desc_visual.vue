<!-- hc6_escvisualdolor -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse6" aria-expanded="false" aria-controls="panelsStayOpen-collapse6">
            Escala Visual Analógica del Dolor
        </button>
    </h2>
    <div id="panelsStayOpen-collapse6" class="accordion-collapse collapse">
        <div class="accordion-body">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-escala" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        Escala
                    </button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-ubicacion" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        Ubicación
                    </button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-semiologia" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                        Semiología
                    </button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <!-- Tab Escala -->
                <div class="tab-pane fade show active" id="nav-escala" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div class="container">
                        <div class="radio-container">
                            <div class="form-check" v-for="n in 11" :key="n">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" :id="'esc_' + (n - 1)" :value="n - 1" v-model="escala" />
                                {{ n - 1 }}
                            </div>
                        </div>
                        <div class="table-container">
                            <table class="default">
                                <tr class="degradado">
                                    <th v-for="n in 10" :key="n">&nbsp;</th>
                                </tr>
                            </table>
                            <div class="container">
                                <div class="row">
                                    <div class="col-4 texttable">0 - Sin dolor</div>
                                    <div class="col-4 texttable">2 - Poco</div>
                                    <div class="col-4 texttable">4 - Moderado</div>
                                    <div class="col-4 texttable">6 - Fuerte</div>
                                    <div class="col-4 texttable">8 - Muy fuerte</div>
                                    <div class="col-4 texttable">10 - Insoportable</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tab Ubicación -->
                <div class="tab-pane fade" id="nav-ubicacion" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <br>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                <div class="image-container" ref="imageContainer1">
                                    <img id="imagen1" src="./../../../assets//images/HC_mapa_calor/cuerpohumano_1.jpeg" alt="Vista frontal" class="logo-img" @click="colocarMarcador($event, 'imagen1')" />
                                    <!-- Marcadores dinámicos -->
                                    <div v-for="(mark, index) in getMarcadoresPorImagen('imagen1')" :key="index" class="pain-marker" :style="getMarkerStyle(mark)" @click.stop="seleccionarMarcador(mark)" :class="{ selected: marcadorSeleccionado === mark }">
                                        X
                                    </div>
                                </div>
                                <div class="controls mt-2">
                                    <button class="btn btn-danger btn-sm" @click="borrarMarcadores('imagen1')" :disabled="!tieneMarcadores('imagen1')">
                                        Borrar marcadores
                                    </button>
                                    <span class="ms-2">{{
                      getMarcadoresPorImagen("imagen1").length
                    }}
                                        marcador(es)</span>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 position-relative">
                                <div class="image-container" ref="imageContainer2">
                                    <img id="imagen2" src="./../../../assets//images/HC_mapa_calor/cuerpohumano_2.jpeg" alt="Vista posterior" class="logo-img" style="text-align:center" @click="colocarMarcador($event, 'imagen2')" />
                                    <!-- Marcadores dinámicos -->
                                    <div v-for="(mark, index) in getMarcadoresPorImagen('imagen2')" :key="index" class="pain-marker" :style="getMarkerStyle(mark)" @click.stop="seleccionarMarcador(mark)" :class="{ selected: marcadorSeleccionado === mark }">
                                        X
                                    </div>
                                </div>
                                <div class="controls mt-2">
                                    <button class="btn btn-danger btn-sm" @click="borrarMarcadores('imagen2')" :disabled="!tieneMarcadores('imagen2')">
                                        Borrar marcadores
                                    </button>
                                    <span class="ms-2">{{
                      getMarcadoresPorImagen("imagen2").length
                    }}
                                        marcador(es)</span>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 position-relative">
                                <div v-if="marcadorSeleccionado" class="marker-info mt-3 p-3 border rounded">
                                                       <h5>Información del marcador</h5>
                                                       <div class="mb-3">
                                                           <label class="form-label">Intensidad del dolor</label>
                                                           <input type="range" class="form-range" min="1" max="10" v-model="marcadorSeleccionado.intensidad" />
                                                           <span class="ms-2">{{ marcadorSeleccionado.intensidad }}/10</span>
                                                       </div>
                                                       <div class="mb-3">
                                                           <label class="form-label">Tipo de dolor</label>
                                                           <select class="form-select" v-model="marcadorSeleccionado.tipoDolor">
                                                               <option value="agudo">Agudo</option>
                                                               <option value="cronico">Crónico</option>
                                                               <option value="punzante">Punzante</option>
                                                               <option value="quemante">Quemante</option>
                                                           </select>
                                                       </div>
                                                       <button class="btn btn-danger btn-sm" @click="eliminarMarcador(marcadorSeleccionado)">
                                                           Eliminar marcador
                                                       </button>
                                                   </div>
                                                   </div>
                        </div>
                      
                        <!-- Panel de información del marcador seleccionado -->
                   
                    </div>
                </div>

                <!-- Tab Semiología -->
                <div class="tab-pane fade" id="nav-semiologia" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                    <br />
                    <p>Detalle el dolor descrito por el Paciente</p>
                    <br />
                    <div class="container">
                        <div class="row ">
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico" rows="2" placeholder="circunstancias" v-model="Circunstancias"></textarea>
                                    <label for="text_diagnosticomedico">Circunstancias</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico2" rows="2" placeholder="Tipo" v-model="Tipo"></textarea>
                                    <label for="text_diagnosticomedico2">Tipo</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico3" rows="2" placeholder="Antiguedad" v-model="Antiguedad"></textarea>
                                    <label for="text_diagnosticomedico3">Antiguedad</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico4" rows="2" placeholder="Localización" v-model="Localización"></textarea>
                                    <label for="text_diagnosticomedico4">Localización</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico5" rows="2" placeholder="Irradiación" v-model="Irradiación"></textarea>
                                    <label for="text_diagnosticomedico5">Irradiación</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico6" rows="2" placeholder="Aumento" v-model="Aumento"></textarea>
                                    <label for="text_diagnosticomedico6">Aumento</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico7" rows="2" placeholder="Atenuación" v-model="Atenuación"></textarea>
                                    <label for="text_diagnosticomedico7">Atenuación</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico8" rows="2" placeholder="Duración" v-model="Duración"></textarea>
                                    <label for="text_diagnosticomedico8">Duración</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control mb-3" id="text_diagnosticomedico9" rows="2" placeholder="Actividades que le cuesta realizar" v-model="Actividades"></textarea>
                                    <label for="text_diagnosticomedico9">Actividades que le cuesta realizar</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <button class="btn btn-warning mt-3" @click="guardarInfo">
                + Guardar
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            escala: null,
            marcadores: [],
            marcadorSeleccionado: null,
            Circunstancias: "",
            Tipo: "",
            Antiguedad: "",
            Localización: "",
            Irradiación: "",
            Aumento: "",
            Atenuación: "",
            Duración: "",
            Actividades: "",

            arrayDataSave: [],
            /*  */
            idPaciente: "111",
            idhc: "1",
            bd: "hc6_escvisualdolor",

            /*  */
            datosEscala: "",
            datosUbicacion: "",
            datosSemiologia: "",
            /*  */

            Circunstancias:"",
            Tipo:"",
            Antiguedad:"",
            Localización:"",
            Irradiación:"",
            Aumento:"",
            Atenuación:"",
            Duración:"",
            Actividader:"",
        };

    },
    methods: {

        ...mapActions("Hc", ["SaveDatos6"]),

        colocarMarcador(event, imagenId) {
            const imagen = event.target;
            const rect = imagen.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            const nuevoMarcador = {
                id: Date.now(),
                imagenId,
                x,
                y,
                intensidad: 5,
                tipoDolor: "agudo",
                timestamp: new Date().toISOString(),
            };

            this.marcadores.push(nuevoMarcador);
            this.marcadorSeleccionado = nuevoMarcador;
        },

        getMarkerStyle(marcador) {
            return {
                left: `${marcador.x}%`,
                top: `${marcador.y}%`,
                backgroundColor: this.getColorPorIntensidad(marcador.intensidad),
            };
        },

        getColorPorIntensidad(intensidad) {
            // Escala de colores del amarillo al rojo según la intensidad
            const hue = Math.max(0, 60 - (intensidad - 1) * 6);
            return `hsl(${hue}, 100%, 50%)`;
        },

        getMarcadoresPorImagen(imagenId) {
            return this.marcadores.filter((m) => m.imagenId === imagenId);
        },

        seleccionarMarcador(marcador) {
            this.marcadorSeleccionado = marcador;
        },

        eliminarMarcador(marcador) {
            const index = this.marcadores.indexOf(marcador);
            if (index > -1) {
                this.marcadores.splice(index, 1);
                this.marcadorSeleccionado = null;
            }
        },

        borrarMarcadores(imagenId) {
            this.marcadores = this.marcadores.filter((m) => m.imagenId !== imagenId);
            if (this.marcadorSeleccionado ?.imagenId === imagenId) {
                this.marcadorSeleccionado = null;
            }
        },

        tieneMarcadores(imagenId) {
            return this.getMarcadoresPorImagen(imagenId).length > 0;
        },

        capturarValores() {
            // Copiar los valores del array semiologia al array valoresCapturados
            this.valoresCapturados = [...this.semiologia];

            // Puedes agregar lógica adicional aquí si necesitas procesar los datos
            console.log('Valores capturados:', this.valoresCapturados);
        },

        guardarInfo() {
            this.datosEscala = {
                escala: this.escala,
            };

            this.datosUbicacion = {
                marcadores: this.marcadores.map((m) => ({
                    imagen: m.imagenId,
                    posicionX: m.x,
                    posicionY: m.y,
                    intensidad: m.intensidad,
                    tipoDolor: m.tipoDolor,
                    timestamp: m.timestamp,
                })),
            };

            this.datosSemiologia = {
                    Circunstancias: this.Circunstancias,
                    Tipo: this.Tipo,
                    Antiguedad: this.Antiguedad,
                    Localización: this.Localización,
                    Irradiación: this.Irradiación,
                    Aumento: this.Aumento,
                    Atenuación: this.Atenuación,
                    Duración: this.Duración,
                    Actividades: this.Actividades,
                },

                this.arrayDataSave = {
                    idpaciente: this.idPaciente,
                    bd: this.bd,
                    idhc: this.idhc,
                    /*  */
                    D_escala: this.datosEscala,
                    D_ubicacion: this.datosUbicacion,
                    D_semiologia: this.datosSemiologia,
                },

                this.SaveDatos6(this.arrayDataSave);

        },
    },
  }
</script>

<style scoped>
.image-container {
    position: relative;
    display: inline-block;
}

.logo-img {
    max-width: 100%;
    height: 30rem;
    cursor: crosshair;
}

.pain-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: black;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

.pain-marker:hover {
    transform: translate(-50%, -50%) scale(1.2);
    z-index: 10;
}

.pain-marker.selected {
    border: 2px solid white;
    box-shadow: 0 0 0 2px black;
    z-index: 11;
}

.marker-info {
    background-color: #f8f9fa;
}

.controls {
    display: flex;
    align-items: center;
}
</style>
