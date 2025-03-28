<template>
<div class="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-4">
    <div class="col" v-for="(producto, index) in productosFiltrados" :key="index">
        <div class="card vitrinacard">
            <img :src="`${producto.img}`" class="card-img-top imagenservicio" alt="..." />
            <div class="cuerpo">
                <strong>{{ producto.nombre }}</strong>
                <br />
                Precio: <strong>${{ producto.precio }}</strong> <hr>
                <small>{{ producto.desc }}</small>
            </div>
            <div class="pie">
                
                <div class="row">
                    <button type="button" v-on:click="reservaCitasW(producto.nombre, this.telefono1)" class="btn btn-warning btn-sm">
                        <img width="20" height="20" src="https://img.icons8.com/fluency/48/whatsapp.png" alt="whatsapp" />
                        Solicitar
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
    mapState
} from "vuex";

/* import {
    productos
} from '../../firebase/bd' */
export default {
    data: () => ({
        /*    dataproductos: productos, */
        telefono1: "3024708544",
        imagenP: "",
        tituloP: "",
        detalleP: "",
        precioP: "",
    }),
    methods: {
        ...mapActions("vitrina", [
            "load_Vitrina",
            "updateVitrinaP",
            "updateVitrinaS",
            "createEntradaVitrina",
            "DeleteItemVitrina",
            "CambiarEstadoVitrina",
        ]),

        reservaCitasW(link, celular) {
            const url = `https://wa.me/${celular}?text=>%20Hola%20me%20interesa%20informacion%20acerca%20del%20producto%20( ${link} )%20desde%20tu%20pagina%20web%20<`;
            window.open(url);
        },

        detalles(id) {
            this.imagenP = this.dataproductos[id].img;
            this.tituloP = this.dataproductos[id].nombre;
            this.detalleP = this.dataproductos[id].descripcion;
            this.precioP = this.dataproductos[id].precio;
            return;
        },
    },
    computed: {
        ...mapState({
            productosFiltrados: (state) =>
                state.vitrina.entry.filter(
                    (v) => v.tipo === "producto" && v.publicado === true
                ),
        }),
    },
};
</script>
