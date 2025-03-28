<script>
import servicios from "./../components/vitrina/servicios.vue";
import rutinas from "./../components/vitrina/rutinas.vue";
import productos from "./../components/vitrina/productos.vue";
import {
    mapActions,
    mapState
} from "vuex";
export default {
    components: {
        Servicios: servicios,
        Rutinas: rutinas,
        Productos: productos,
    },
    data() {
        return {
            mostrarservicios: false,
            textoservicios: "Nuestro equipo altamente calificado proporciona servicios que incluyen fisioterapia deportiva, fisioterapia manual, osteopatía, fisioterapia geriátrica, ortopédica, traumatológica, rehabilitación neurológica, fisioterapia uroginecológica, entre otros. Nos enfocamos en diagnosticar tu condición y lesión para ofrecerte el tratamiento más adecuado, junto con asesoramiento y prescripción de ejercicios personalizados. Nuestro objetivo es ayudarte a recuperarte de lesiones, mejorar tu rendimiento deportivo, prevenir lesiones futuras y mejorar tu calidad de vida. ¡Confía en nosotros para recibir la atención experta y personalizada que necesitas para tu recuperación y bienestar físico!",
            mostrarclases: false,
            textoclases: "Nuestros entrenadores altamente capacitados trabajarán contigo para crear un plan de entrenamiento personalizado que se adapte a tus necesidades y habilidades individuales. Ya sea que estés buscando perder peso, aumentar la fuerza o mejorar tu flexibilidad, nuestras clases de gimnasia personalizadas te ayudarán a alcanzar tus metas de manera efectiva. Además, nuestras clases se llevan a cabo en un ambiente acogedor y motivador, lo que te permitirá disfrutar de tu entrenamiento mientras trabajas en tu cuerpo y mente. ¡Únete a nosotros y comienza tu viaje hacia una vida más saludable y activa hoy mismo!",
            mostrartienda: false,
            textotienda: "Nuestro objetivo es ofrecer soluciones de alta calidad para ayudarte a mejorar tu salud, fortalecer tu cuerpo y potenciar tu rendimiento en el ejercicio. Estamos comprometidos a brindarte un servicio excepcional y personalizado que te ayudará a alcanzar tus objetivos de manera efectiva.",
            /* mostrarMenu: false, */

            paramsEmpresa: [{
                bd: "datos_empresa",
                parametro: "id_ips",
                valor: "1",
                mutation: "setStateEmpresa",
            }],

            paramsPagina: [{
                bd: "datos_pagina",
                parametro: "id_ips",
                valor: "1",
                mutation: "setStatePagina",
            }],

        };
    },
    methods: {
        ...mapActions("vitrina", ["load_Vitrina"]),
        ...mapActions("Auth", ["getDataIPSbyParam"]),
    },

    created() {
        // Ejecutar en paralelo las que no dependen entre sí
        Promise.all([
            this.getDataIPSbyParam(this.paramsEmpresa),
            this.getDataIPSbyParam(this.paramsPagina),

        ])
    },
    computed: {
        /*  mapstates */
    

        ...mapState("Auth", [
            "DataEmpresa",
            "DataPagina",
        ])
    },

};
</script>

<template>
<div class="container">
    <!-- sesion informacion -->
    <div class="container" align="center">
        <!-- <img src="./../assets/images/inicio.jpg" class="imagenvitrina" alt="..." /> -->
    </div>

    <br />

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active titulo" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                <img class="icono" width="25" height="25" src="https://img.icons8.com/ios-filled/50/massage.png" alt="massage" />
                <strong>
                    Servicios
                </strong>

            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                <img class="icono" width="25" height="25" src="https://img.icons8.com/ios-filled/50/yoga.png" alt="yoga" />
                <strong>Clases</strong>

            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">
                <img class="icono" width="25" height="25" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/external-shopping-bag-digital-marketing-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="external-shopping-bag-digital-marketing-yogi-aprelliyanto-glyph-yogi-aprelliyanto" />
                <strong>Tienda</strong>

            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <div class="row mt-3">
                <h4>Nuestros Servicios</h4>

                {{ DataPagina }}
                <p class="jz">
                  <!--   Nuestro servicio de fisioterapia ofrece una amplia gama de
                    tratamientos personalizados para abordar tus necesidades específicas
                    de rehabilitación y bienestar físico. -->
              
                </p>
                <div>
                    <p v-if="mostrarservicios" class="jz">{{ textoservicios }}</p>
                    <button class="btn btn-success btn-sm" @click="mostrarservicios = !mostrarservicios">
                        {{ mostrarservicios ? " Leer menos " : "Leer más..." }}
                    </button>
                </div>
            </div>
            <br />

            <Servicios />
        </div>
        <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <div class="row mt-3">
                <h4>Clases y Rutinas</h4>
            </div>

            <p class="jz">
                Ofrecemos un servicio de clases de gimnasia personalizadas y grupales
                para ayudarte a alcanzar tus objetivos de fitness de manera efectiva y
                segura.
            </p>
            <div>
                <p v-if="mostrarclases" class="jz">{{ textoclases }}</p>
                <button class="btn btn-success btn-sm" @click="mostrarclases = !mostrarclases">
                    {{ mostrarclases ? " Leer menos " : "Leer más..." }}
                </button>
            </div>
            <br />
            <Rutinas />
        </div>
        <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">
            <div class="row mt-3">
                <br />
                <h4>TiendaOnline</h4>
            </div>

            <p class="jz">
                Bienvenidos a nuestra tienda online especializada en productos de
                fisioterapia y gimnasia.
            </p>
            <div>
                <p v-if="mostrartienda" class="jz">{{ textotienda }}</p>
                <button class="btn btn-success btn-sm" @click="mostrartienda = !mostrartienda">
                    {{ mostrartienda ? " Leer menos " : "Leer más..." }}
                </button>
            </div>
            <br />
            <Productos />
            <br />
        </div>
        <br />
        <br />
    </div>
</div>
</template>
