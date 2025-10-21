<script>
import servicios from "./../components/vitrina/servicios.vue";
import rutinas from "./../components/vitrina/rutinas.vue";
import productos from "./../components/vitrina/productos.vue";
import {
    mapActions,
    mapState
} from "vuex";
import {
    LogOut
} from "@iconoir/vue";
import logo from '@/assets/logo.png';

export default {
    components: {
        Servicios: servicios,
        Rutinas: rutinas,
        Productos: productos,
    },
    data() {
        return {
            mostrarservicios: false,
            mostrarclases: false,
            mostrartienda: false,
            paramsPagina: [{
                bd: "datos_pagina",
                parametro: "id_ips",
                valor: "1",
                mutation: "setStatePagina",
            }],
            paramsEmpresa: [{
                bd: "datos_empresa",
                parametro: "id_ips",
                valor: "1",
                mutation: "setStateEmpresa",
            }],
            mensajeRecibido: "",
            logo
        };
    },
    methods: {
        ...mapActions("Auth", ["getDataIPSbyParam"]),
        manejarMensaje(mensaje) {
            // Manejar el mensaje recibido del hijo
            this.mensajeRecibido = mensaje;
            this.celular = this.DataEmpresa[0].wsp;
            const url = `https://wa.me/${this.celular}?text=>>>>%20Hola%20me%20interesa%20reservar%20una%20cita%20de%20( ${this.mensajeRecibido} )%20desde%20tu%20pagina%20web%20<<<<`;
            window.open(url);
        },
        /*     reservaCitasW(link, celular) {
             const url = `https://wa.me/${celular}?text=>>>>%20Hola%20me%20interesa%20reservar%20una%20cita%20de%20( ${link} )%20desde%20tu%20pagina%20web%20<<<<`;
             window.open(url);
           }, */
    },
    created() {
        // Ejecutar en paralelo las que no dependen entre sí
        Promise.all([
            this.getDataIPSbyParam(this.paramsPagina),
            this.getDataIPSbyParam(this.paramsEmpresa),
        ])
    },
    computed: {
        /*  mapstates */
        ...mapState("Auth", [
            "DataPagina", "DataEmpresa"
        ])
    },
};</script>

<template>
<div class="container">

    <div class="container-fluid">
        <div class="row" v-for="(iten, index) in DataEmpresa" :key="index">

            <div class="col-12 col-md-2">
                       
                <img :src="logo" class="img-fluid logobar" />
            </div>
            <div class="col-12 col-md-5">
     <p><strong>Bienvenido al {{iten.nombre}}</strong> </p>
     <hr>
                <p>{{iten.desc}}</p>

            </div>
            <div class="d-none d-sm-none d-md-block col-md-4">
                <p><strong>Contacto</strong> </p>
                <p> Direccion: {{iten.direccion}} <br> Celular:{{iten.celular}}</p>

            </div>

        </div>
    </div>
    <br />
    <div class="container">

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
        <div class="tab-content" id="myTabContent" v-for="(item, index) in DataPagina" :key="index">
            <div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div class="row mt-3">
                    <h4>Nuestros Servicios</h4>

                    <p class="jz">
                        <!--    -->

                        {{item.nuestrosservicios}}
                    </p>
                    <div>
                        <p v-if="mostrarservicios" class="jz">{{ item.nuestrosservicios_lm }}</p>
                        <button class="btn btn-success btn-sm" @click="mostrarservicios = !mostrarservicios">
                            {{ mostrarservicios ? " Leer menos " : "Leer más..." }}
                        </button>
                    </div>
                </div>
                <br />

                <Servicios @mensaje="manejarMensaje" />
            </div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <div class="row mt-3">
                    <h4>Clases y Rutinas</h4>
                </div>

                <p class="jz">
                    {{item.clasesrutinas}}
                    <!-- -->
                </p>
                <div>
                    <p v-if="mostrarclases" class="jz">{{ item.clasesrutinas_lm }}</p>
                    <button class="btn btn-success btn-sm" @click="mostrarclases = !mostrarclases">
                        {{ mostrarclases ? " Leer menos " : "Leer más..." }}
                    </button>
                </div>
                <br />
                <Rutinas @mensaje="manejarMensaje" />
            </div>
            <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">
                <div class="row mt-3">
                    <br />
                    <h4>TiendaOnline</h4>
                </div>

                <p class="jz">
                    <!--    -->
                    {{item.tiendaonline}}
                </p>
                <div>
                    <p v-if="mostrartienda" class="jz">{{ item.tiendaonline_lm }}</p>
                    <button class="btn btn-success btn-sm" @click="mostrartienda = !mostrartienda">
                        {{ mostrartienda ? " Leer menos " : "Leer más..." }}
                    </button>
                </div>
                <br />
                <Productos @mensaje="manejarMensaje" />
                <br />
            </div>
            <br />
            <br />
        </div>
    </div>
</div>
</template>

