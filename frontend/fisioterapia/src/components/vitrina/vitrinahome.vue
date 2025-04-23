<template>
  <div class="container config">
    <div class="container">
      <br />

      <ul
        class="nav nav-tabs nav justify-content-end"
        id="myTab"
        role="tablist"
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Servicios
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Productos
          </button>
        </li>
      </ul>
      <!-- ====================================================================================== -->
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <div class="row mt-3 mb-3">
            <div class="col-6">
              <h6><strong>Clases Consultas y Terapias</strong></h6>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                @click="B_nuevo()"
              >
                + Servicio
              </button>
            </div>
          </div>
          <div class="container">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            fuga nisi sint recusandae odio tempore vitae, quod placeat non ipsa
            quibusdam nihil eaque numquam cupiditate quasi in harum illum eum!
          </div>

          <br />
          <!--  -->
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Detalle</th>
                    <th>Descripcion</th>
                    <th>Opc</th>
                    <th>Precios</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="articulo in vitrinaservicios" :key="articulo.id">
                    <td>
                      <img
                        :src="`${articulo.img}`"
                        alt="imagen producto"
                        style="height: 70px"
                      />
                    </td>

                    <td>
                      <small>Tipo: {{ articulo.tipo }}</small
                      ><br />
                      <small>Nombre: {{ articulo.nombre }}</small>
                    </td>
                    <td>{{ articulo.desc }}</td>
                    <td>
                      <div class="container">
                        <button
                          class="btn btn-primary m-1 btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                          @click="M_editarservicios(articulo)"
                        >
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          class="btn btn-danger m-1 btn-sm"
                          @click="eliminaritem(articulo.id)"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                        <button
                          class="btn btn-warning m-1 btn-sm"
                          @click="cambiarEstadoItem(articulo)"
                          v-if="articulo.publicado == false"
                        >
                          <i class="bi bi-eye-slash-fill"></i>
                        </button>
                        <button
                          class="btn btn-success m-1 btn-sm"
                          @click="cambiarEstadoItem(articulo)"
                          v-if="articulo.publicado == true"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                      </div>
                    </td>
                    <td class="tablaconfig">
                      <table
                        class="table table-sm table-striped table-borderless tablaconfig"
                      >
                        <thead>
                          <tr>
                            <td>Cant</td>
                            <td>Valor</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in articulo.precios"
                            :key="index"
                          >
                            <td>
                              <small>{{ item.cant }}</small>
                            </td>
                            <td>
                              <small>{{ item.precio }}</small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <!-- inicio modal 1  servicios-->
          <div
            class="modal fade"
            id="exampleModal2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel2"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5"
                    id="exampleModalLabel2"
                    v-if="this.modalOption === 'N'"
                  >
                    Agregar nuevo item de servicio
                  </h1>
                  <h1
                    class="modal-title fs-5"
                    id="exampleModalLabel2"
                    v-if="this.modalOption === 'U'"
                  >
                    Editar item de servicio
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <h6><strong>Datos del servicio</strong></h6>

                    <div class="row">
                      <div class="col-8 col-md-9">
                        <div>
                          <div class="col mb-1">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Nombre"
                              v-model="s_nombre"
                            />
                          </div>
                        </div>
                        <div class="col mb-1">
                          <select
                            class="form-select form-select-sm"
                            aria-label="Default select example"
                            v-model="s_tipo"
                          >
                            <option selected value="">Categoria</option>
                            <option value="terapia">Terapia</option>
                            <option value="consulta">Consulta</option>
                            <option value="clase">Clase</option>
                          </select>
                        </div>
                        <div class="col mb-1">
                          <textarea
                            class="form-control"
                            rows="2"
                            placeholder="Detalle"
                            v-model="s_detalle"
                          ></textarea>
                        </div>
                      </div>
                      <div
                        class="col-4 col-md-3"
                        v-if="this.modalOption === 'N'"
                      >
                        <img
                          :src="local_Image"
                          class="img-thumbnail"
                          alt="..."
                        />
                      </div>
                      <div
                        class="col-4 col-md-3"
                        v-if="this.modalOption === 'U'"
                      >
                        <img
                          :src="`${this.s_img}`"
                          alt="imagen producto"
                          style="height: 100px"
                          class="img-thumbnail"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          @change="onSelectImage_s($event)"
                          accept="image/png,  image/jpeg,  image/jpg"
                          v-if="this.modalOption === 'N'"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-6">
                        <strong>Listado de precios</strong>
                      </div>
                      <div class="col-6">
                        <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          @click="cargarcampositem()"
                          v-if="!NewModal"
                        >
                          + Nuevo
                        </button>
                      </div>
                    </div>
                    <div class="container" v-if="NewModal">
                      <div class="row mt-3">
                        <div class="col-5">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Cant"
                            v-model="cant"
                          />
                        </div>
                        <div class="col-5">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Precio"
                            v-model="precio"
                          />
                        </div>
                        <div class="col-2">
                          <button
                            v-if="this.modalOption === 'N'"
                            type="button"
                            class="btn btn-warning btn-sm"
                            @click="agregaritemlistN(cant, precio)"
                          >
                            +
                          </button>
                          <button
                            v-if="this.modalOption === 'U'"
                            type="button"
                            class="btn btn-warning btn-sm"
                            @click="agregaritemlistU(cant, precio)"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <table class="table" v-if="this.modalOption === 'N'">
                      <thead>
                        <tr>
                          <th scope="col">Cant</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Opc</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(itemN, index) in ArrayPrecios" :key="index">
                          <td>{{ itemN.cant }}</td>
                          <td>{{ itemN.precio }}</td>
                          <td>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="eliminaritemArrayN(index)"
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table" v-if="this.modalOption === 'U'">
                      <thead>
                        <tr>
                          <th scope="col">Cant</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Opc</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(itemU, index) in s_precios" :key="index">
                          <td>{{ itemU.cant }}</td>
                          <td>{{ itemU.precio }}</td>
                          <td>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="eliminaritemArrayU(index)"
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="limpiarmodal()"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    v-if="modalOption == 'U'"
                    class="btn btn-primary"
                    v-on:click="BM_updateServicios()"
                    data-bs-dismiss="modal"
                  >
                    <!-- SERVICIOS -->
                    Actualizar
                  </button>

                  <button
                    type="submit"
                    v-if="modalOption == 'N'"
                    class="btn btn-primary"
                    v-on:click="crearServicio()"
                    data-bs-dismiss="modal"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- fin modal servicios-->
        <!-- ============================================================================================================================ -->
        <!-- ============================================================================================================================ -->
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <!-- Button modal 2  articulos -->
          <div class="row mt-3 mb-3">
            <div class="col-6">
              <h6><strong>Articulos de la tienda</strong></h6>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="B_nuevo()"
              >
                + Producto
              </button>
            </div>
          </div>
          <div class="container mb-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            fuga nisi sint recusandae odio tempore vitae, quod placeat non ipsa
            quibusdam nihil eaque numquam cupiditate quasi in harum illum eum!
          </div>

          <!--  -->
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Detalle</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in productosFiltrados" :key="item.id">
                    <td>
                      <div class="container centrarcontenido">
                        <img
                          :src="`${item.img}`"
                          alt="imagen producto"
                          style="height: 70px"
                        />
                      </div>
                    </td>

                    <td>
                      Cantidad: {{ item.cant }} <br />
                      nombre: {{ item.nombre }}
                      <!--         <br>publicado: {{item.publicado}}
                                         Id: {{item.id}} -->
                      <br />
                    </td>
                    <td>
                      {{ item.precio }}
                    </td>
                    <td>
                      <button
                        class="btn btn-primary btn-sm m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="M_editarproductos(item)"
                      >
                        <i class="bi bi-pen"></i>
                      </button>
                      <button
                        class="btn btn-danger btn-sm m-1"
                        @click="eliminaritem(item.id)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                      <button
                        class="btn btn-warning btn-sm m-1"
                        @click="cambiarEstadoItem(item)"
                        v-if="item.publicado == false"
                      >
                        <i class="bi bi-eye-slash-fill"></i>
                      </button>
                      <button
                        class="btn btn-success btn-sm m-1"
                        @click="cambiarEstadoItem(item)"
                        v-if="item.publicado == true"
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--INICIO  Modal 2  productos-->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Agregar nuevo articulo a la tienda
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <br />
                    <h6>Ingrese los datos para crear un nuevo articulo</h6>
                    <br />
                    <div class="row">
                      <div class="col-8 col-md-9">
                        <div class="col">
                          <div>
                            <div class="col">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Nombre"
                                v-model="p_nombre"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col">
                          <textarea
                            class="form-control"
                            rows="2"
                            placeholder="Detalle"
                            v-model="p_detalle"
                          ></textarea>
                        </div>

                        <div class="col">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Precio"
                            v-model="p_precio"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Cantidad"
                            v-model="p_cant"
                          />
                        </div>
                        <div class="col"></div>
                      </div>
                      <div
                        class="col-4 col-md-3"
                        v-if="this.modalOption === 'N'"
                      >
                        <img
                          :src="local_Image"
                          class="img-thumbnail"
                          alt="..."
                        />
                      </div>
                      <div
                        class="col-4 col-md-3"
                        v-if="this.modalOption === 'U'"
                      >
                        <img
                          :src="`${this.p_img}`"
                          alt="imagen producto"
                          style="height: 100px"
                          class="img-thumbnail"
                        />
                      </div>
                      <div class="row">
                        <div class="mb-3">
                          <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            @change="onSelectImage_p"
                            accept="image/png,  image/jpeg,  image/jpg"
                            v-if="this.modalOption === 'N'"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="limpiarmodal()"
                  >
                    Close
                  </button>
                  <!--  -->
                  <button
                    type="button"
                    v-if="modalOption == 'U'"
                    class="btn btn-primary"
                    v-on:click="BM_updateProductos()"
                    data-bs-dismiss="modal"
                  >
                    <!-- productos -->
                    Actualizar
                  </button>
                  <!--  -->
                  <button
                    type="button"
                    v-if="modalOption == 'N'"
                    class="btn btn-primary"
                    v-on:click="uploadImage_p()"
                    data-bs-dismiss="modal"
                  >
                    Guardar
                  </button>
                  <!--  -->
                </div>
              </div>
            </div>
          </div>
          <!-- fin modal1 productos-->
        </div>
      </div>

      <router-link to="/dashboard">Home</router-link>
    </div>
  </div>
</template>

<script>
import { storage } from "./../../api/fire";

import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    //Articulos
    p_nombre: "",
    p_detalle: "",
    p_precio: "",
    p_cant: "",
    p_tipo: "",
    P_image: null,
    Productos: [],

    //servicios
    s_nombre: "",
    s_categoria: "",
    s_detalle: "",
    s_precio: "",
    s_image: null,
    Servicios: [],
    s_tipo: "",
    //swiches
    modalOption: "",
    //images
    local_Image: null,
    file: null,
    /* imagenes */
    imagenes: [],
    imagen: null,
    IMG: null,

    NewModal: false,
    ArrayPrecios: [],
  }),

  methods: {
    ...mapActions("vitrina", [
      "load_Vitrina",
      "updateVitrinaP",
      "updateVitrinaS",
      "createEntradaVitrina",
      "createEntradaVitrinaS",
      "DeleteItemVitrina",
      "CambiarEstadoVitrina",
    ]),

    B_nuevo() {
      this.limpiarmodal(), (this.modalOption = "N");
    },

    limpiarmodal() {
      /* limpia los campos de los modales de la vitrina */
      this.p_id = "";
      this.p_id_ips = "";
      this.p_tipo = "";
      this.p_nombre = "";
      this.p_detalle = "";
      this.p_precio = "";
      this.p_cant = "";
      this.p_publicado = "";

      this.s_id = "";
      this.s_id_ips = "";
      this.s_nombre = "";
      this.s_detalle = "";
      this.s_tipo = "";
      this.s_precio = "";
      this.s_cant = "";
      this.s_publicado = "";

      this.Servicios = [];
      this.Productos = [];
      this.Opc = "";
      this.local_Image = null;
      this.data = null;
      this.modalOption = "";
      this.file = null;
      this.ArrayPrecios= [];
    },

    //----------SERVICIOS-----------------------------------------
    B_guardarServicios() {
      this.modalOption = "N";
      this.Servicios.push({
        id_ips: "1",
        //cambia a variable de sesion en produccion
        nombre: this.s_nombre,
        tipo: this.s_tipo,
        desc: this.s_detalle,
        precios: this.ArrayPrecios,
        img: this.s_img,
        publicado: true,
      });
      // Limpiar los campos después de agregar la persona
      this.createEntradaVitrinaS(this.Servicios[0]);
      console.log("guardando servicio", this.Servicios[0]);
      this.limpiarmodal();
    },

    M_editarservicios(data) {
      this.modalOption = "U";
      this.s_id = data.id;
      this.s_id_ips = data.id_ips;
      this.s_publicado = data.publicado;
      this.s_tipo = data.tipo;
      //
      this.s_nombre = data.nombre;
      this.s_detalle = data.desc;
      this.s_precios = data.precios;
      this.s_img = data.img;
    },

    BM_updateServicios() {
      this.Servicios.push({
        id: this.s_id,
        id_ips: this.s_id_ips,
        tipo: this.s_tipo,
        publicado: this.s_publicado,
        nombre: this.s_nombre,
        desc: this.s_detalle,
        precios: this.s_precios,
        img: this.s_img,
      });
      this.saveVitrinaS();
      this.limpiarmodal();
    },

    async saveVitrinaS() {
      this.updateVitrinaS(this.Servicios[0]);
      /* console.log(this.Productos); */
    },

    //-----------PRODUCTOS-----------------------------------------

    B_guardarProductos() {
      this.modalOption = "N";
      this.Productos.push({
        id_ips: "1",
        //cambia a variable de sesion en produccion
        tipo: "producto",
        nombre: this.p_nombre,
        desc: this.p_detalle,
        precio: this.p_precio,
        cant: this.p_cant,
        img: this.p_img,
        publicado: true,
      });
      // Limpiar los campos después de agregar la persona
      this.createEntradaVitrina(this.Productos[0]);
      console.log("guardando el producto", this.Productos);
      this.limpiarmodal();
    },

    /* ---------------------------------------------------------------- */

    M_editarproductos(data) {
      this.modalOption = "U";
      this.p_id = data.id;
      this.p_id_ips = data.id_ips;
      this.p_tipo = data.tipo;
      this.p_publicado = data.publicado;

      this.p_nombre = data.nombre;
      this.p_detalle = data.desc;
      this.p_precio = data.precio;
      this.p_cant = data.cant;
      this.p_img = data.img;
    },
    /* ------------------------------------------------------------------ */

    BM_updateProductos() {
      this.Productos.push({
        id: this.p_id,
        id_ips: this.p_id_ips,
        tipo: this.p_tipo,
        publicado: this.p_publicado,

        nombre: this.p_nombre,
        desc: this.p_detalle,
        precio: this.p_precio,
        cant: this.p_cant,
        img: this.p_img,
      });

      //llamado al action
      this.saveVitrinaP();
      this.limpiarmodal();
    },
    /* -------------------------------------------------------------------- */
    async saveVitrinaP() {
      this.updateVitrinaP(this.Productos[0]);
      /* console.log(this.Productos); */
    },

    //--------ITEMS-----------------------------------------

    eliminaritem(item) {
      this.DeleteItemVitrina(item);
      console.log(item);
    },

    /* -------------------------------- */

    cambiarEstadoItem(item) {
      this.CambiarEstadoVitrina(item);
    },
    /* item de precios en modal servicios */
    cargarcampositem() {
      this.NewModal = true;
    },
    /* ----ITEMS DE PRECIOS------------------------------------------  */
    agregaritemlistN(cant, precio) {
      this.NewModal = false;
      let item = {
        cant: cant,
        precio: precio,
      };
      this.ArrayPrecios = [...this.ArrayPrecios, item];
      this.clearFormItem();
    },
    agregaritemlistU(cant, precio) {
      this.NewModal = false;
      let item = {
        cant: cant,
        precio: precio,
      };
      this.s_precios = [...this.s_precios, item];
      this.clearFormItem();
    },
    clearFormItem() {
      this.cant = "";
      this.precio = "";
    },

    eliminaritemArrayN(index) {
      console.log(index);
      this.ArrayPrecios.splice(index, 1);
    },
    eliminaritemArrayU(index) {
      console.log(index);
      this.s_precios.splice(index, 1);
    },
    //----- IMAGEN-------------------------------------------
    /* mostrar la imagen al momento de cargar en el input */
    onSelectImage_s(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
        this.file = null;
      } else {
        const fr = new FileReader();
        fr.onload = () => (this.local_Image = fr.result);
        fr.readAsDataURL(file);
        this.file = file;
        this.imagen = event.target.files[0];
        this.IMG = "servicios/" + this.imagen.name;
        console.log(this.IMG);
      }
    },

    onSelectImage_p(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
        this.file = null;
      } else {
        const fr = new FileReader();
        fr.onload = () => (this.local_Image = fr.result);
        fr.readAsDataURL(file);
        this.file = file;
        this.imagen = event.target.files[0];
        this.IMG = "productos/" + this.imagen.name;
        console.log(this.IMG);
      }
    },

    async crearServicio() {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, this.IMG);
        await uploadBytes(storageRef, this.imagen);

        const snapshot = await getDownloadURL(storageRef);
        this.s_img = snapshot;

        console.log("Image uploaded successfully!");
        console.log(this.s_img);

        this.B_guardarServicios();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },

    async uploadImage_p() {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, this.IMG);
        await uploadBytes(storageRef, this.imagen);

        const snapshot = await getDownloadURL(storageRef);
        this.p_img = snapshot;

        console.log("Image uploaded successfully!");
        console.log(this.p_img);

        this.B_guardarProductos();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },

    //===================================================================
  },
  computed: {
    ...mapState({
      vitrinaservicios: (state) =>
        state.vitrina.entry.filter((v) => v.tipo != "producto"),
    }),

    ...mapState({
      productosFiltrados: (state) =>
        state.vitrina.entry.filter((v) => v.tipo === "producto"),
    }),
  },

  //=====================================================================
  created() {
    this.load_Vitrina();
  },
};
</script>
<!-- -->
