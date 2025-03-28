<template>
  <div class="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-4">
    <div
      class="col"
      v-for="servicio in serviciosFiltrados"
      :key="servicio.nombre"
    >
      <div class="card vitrinacard">
        <img
          :src="`${servicio.img}`"
          class="card-img-top imagenservicio"
          alt="..."
        />

        <div class="cuerpo">
          <h5 class="card-title">
            <strong>{{ servicio.nombre }}</strong>
          </h5>
          <small>{{ servicio.desc }}.</small>
        </div>

        <div class="pie">
          <div class="row">
            <button
              type="button"
              class="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#ModalProducto"
              @click="ModalServicios(servicio)"
            >
        + Mas Informacion
            </button>
          </div>
        </div>
      </div>
      <!-- MODAL -->
      <div
        class="modal fade"
        id="ModalProducto"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="ModalProductoLabel"
        aria-hidden="false"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ModalProductoLabel">
                <strong>Planes y Precios -- {{ t_nombre }}</strong>
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-5">
                  <div class="row">
                    <img
                      :src="`${t_img}`"
                      class="card-img-top imagenservicio"
                      alt="..."
                    />
                  </div>
                </div>

                <div class="col-7">
                  <table class="table table-sm tabla-compacta">
                    <thead>
                      <tr>
                        <th scope="col">Cant</th>
                        <th scope="col">Valor</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) in t_precios" :key="index">
                      <tr>
                        <td>X {{ item.cant }}</td>
                        <td>$ {{ item.precio }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="row">
                <div class="col-7">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm btn-sm"
                    v-on:click="reservaCitasW(servicio.nombre, this.telefono1)"
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/fluency/48/whatsapp.png"
                      alt="whatsapp"
                    />
                    Solicitar
                  </button>
                </div>
                <div class="col-5">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import {
    servicios
} from "../../firebase/bd"; */

import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    /*   dataservicios: servicios, */
    telefono1: "3024708544",
    t_nombre: "",
    t_img: "",
    t_desc: "",
    t_precios: {},
    data: {},
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

    ModalServicios(data) {
      this.t_nombre = data.nombre;
      this.t_img = data.img;
      this.t_desc = data.desc;
      this.t_precios = data.precios;
    },

    reservaCitasW(link, celular) {
      const url = `https://wa.me/${celular}?text=>>>>%20Hola%20me%20interesa%20reservar%20una%20cita%20de%20( ${link} )%20desde%20tu%20pagina%20web%20<<<<`;
      window.open(url);
    },
  },

  computed: {
    ...mapState({
      serviciosFiltrados: (state) =>
        state.vitrina.entry.filter(
          (v) =>
            (v.tipo == "terapia" || v.tipo == "consulta") && v.publicado == true
        ),
    }),
  },

  created() {
    this.load_Vitrina();
  },
};
</script>
