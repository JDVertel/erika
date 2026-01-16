<script>
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { createLogger, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      imgDescripcion: "",
      tipoImagenD: "",
      datosImg: [],
      datosEmpresa: [],
      //images
      local_Image: null,
      file: null,
      /* imagenes */
      imagenes: [],
      imagen: null,
      IMG: null,
      p_img: "",
      imagenesParaGuardar: [], // Nueva: array para acumular imágenes
      /*  */
      idPaciente: "111",
      idhc: "1",
      bd: "hc7_imgdiagnosticas",
    };
  },

  mounted() {
    this.idPaciente = this.idpaciente;
    this.idhc = this.idfactura;
  },
  methods: {
    ...mapActions("hc", ["SaveDatos7"]),

    /* -------------------inicio guardar datos empresa ----------------------- */
    //1- cargar imagen y generar miniatura
    /* mostrar la imagen al momento de cargar en el input */
    onSelectImage_s(event) {
      const file = event.target.files[0];
      if (!file) {
        this.file = null;
        return;
      } else {
        const fr = new FileReader();
        fr.onload = () => (this.local_Image = fr.result);
        fr.readAsDataURL(file);
        this.file = file;
        this.imagen = event.target.files[0];
        this.IMG = "ImgDiagnosticas/" + this.imagen.name;
        console.log(this.IMG);
      }
    },
    //2- se sube primero la imagen para generar ruta que se adiciona al conjunto de datos de emprea a guardar
    async uploadImage_p7() {
      // Si no hay imágenes para guardar, no hacer nada
      if (this.imagenesParaGuardar.length === 0) {
        console.log("No hay imágenes para guardar.");
        return;
      }

      try {
        // Guardar todas las imágenes en un solo registro
        if (this.imagenesParaGuardar.length > 0) {
          await this.SaveDatos7({
            idpaciente: this.StateNumRegHC.idpaciente,
            idprofesional: this.StateNumRegHC.idprofesional,
            idips: this.StateNumRegHC.idips,
            idhc: this.StateNumRegHC.idHC,
            fecha: this.StateNumRegHC.fecha,
            bd: this.bd,
            imagenesArray: this.imagenesParaGuardar,
          });
        }
        console.log("Todas las imágenes guardadas exitosamente");
        // Limpiar el array después de guardar
        this.imagenesParaGuardar = [];
      } catch (error) {
        console.error("Error al guardar las imágenes:", error);
        alert("Error al guardar las imágenes");
      }
    },
    //2b- Agregar imagen cargada al array (antes de guardar)
    async agregarImagenAlArray() {
      // Validar si hay imagen cargada
      if (!this.imagen) {
        console.log("No hay imagen cargada.");
        return;
      }

      // Validar que tenga tipo de imagen
      if (!this.tipoImagenD || this.tipoImagenD === "--Seleccione--") {
        alert("Por favor selecciona un tipo de imagen");
        return;
      }

      try {
        const storage = getStorage();
        const storageRef = ref(storage, this.IMG);
        await uploadBytes(storageRef, this.imagen);
        const snapshot = await getDownloadURL(storageRef);
        this.p_img = snapshot;
        console.log(this.p_img);

        console.log("Imagen subida con exito.");
        // Agregar al array
        this.A_agregarImagenAlArray(this.p_img);

        // Limpiar para cargar otra imagen
        this.limpiarFormularioImagen();
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen, el tipo de imagen no es compatible!");
      }
    },
    //3- Agregar imagen al array de imágenes a guardar
    A_agregarImagenAlArray(dataimg) {
      // Validar que al menos tenga tipo de imagen
      if (!this.tipoImagenD || this.tipoImagenD === "--Seleccione--") {
        alert("Por favor selecciona un tipo de imagen");
        return;
      }

      const nuevoRegistroImg = {
        idpaciente: this.StateNumRegHC.idpaciente,
        idprofesional: this.StateNumRegHC.idprofesional,
        idips: this.StateNumRegHC.idips,
        idhc: this.StateNumRegHC.idHC,
        fecha: this.StateNumRegHC.fecha,
        bd: this.bd,
        imgDiag: dataimg,
        tipoimg: this.tipoImagenD,
        descImagen: this.imgDescripcion,
        imgPrevia: this.local_Image, // Guardar previa para mostrar en listado
      };

      this.imagenesParaGuardar.push(nuevoRegistroImg);
      console.log(
        "Imagen agregada al array. Total de imágenes:",
        this.imagenesParaGuardar.length
      );
    },
    //4- Limpiar formulario de imagen
    limpiarFormularioImagen() {
      this.imgDescripcion = "";
      this.tipoImagenD = "";
      this.local_Image = null;
      this.file = null;
      this.imagen = null;
      this.IMG = null;
      this.p_img = "";
      // Limpiar input file
      const fileInput = document.getElementById("ImgDiag");
      if (fileInput) {
        fileInput.value = "";
      }
    },
    //5- Eliminar imagen del array
    eliminarImagenDelArray(index) {
      this.imagenesParaGuardar.splice(index, 1);
      console.log(
        "Imagen eliminada. Total de imágenes:",
        this.imagenesParaGuardar.length
      );
    },
    //5- Guardar todas las imágenes en BD
    async B_guardarTodasLasImagenes() {
      if (this.imagenesParaGuardar.length === 0) {
        console.log("No hay imágenes para guardar.");
        return;
      }

      try {
        // Guardar cada imagen
        for (let img of this.imagenesParaGuardar) {
          await this.SaveDatos7(img);
        }
        console.log("Todas las imágenes guardadas exitosamente");
        // Limpiar el array después de guardar
        this.imagenesParaGuardar = [];
      } catch (error) {
        console.error("Error al guardar las imágenes:", error);
        alert("Error al guardar las imágenes");
      }
    },
    /* ----------------------------------------------------- */
  },
  computed: {
    ...mapState("hc", ["StateNumRegHC"]),
  },
};
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse7"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapse7"
      >
        Pruebas de Imagen o Examenes Complementarios ok
      </button>
    </h2>
    <div id="panelsStayOpen-collapse7" class="accordion-collapse collapse">
      <div class="accordion-body">
        <!--  -->

        <h5>Seleccione el tipo de Imagen</h5>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="tipoImagenD"
        >
          <option selected>--Seleccione--</option>
          <option value="Radiografia">Radiografia</option>
          <option value="Ecografia">Ecografia</option>
          <option value="Resonancia">Resonancia</option>
          <option value="Tag">TAG</option>
          <option value="Otros">Otros</option>
        </select>

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Breve descripcion</label
          >
          <textarea
            class="form-control textarea"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="imgDescripcion"
          ></textarea>
        </div>
        <div class="row">
          <div class="col-8 mb-3">
            <div class="input-group mb-3">
              <input
                type="file"
                class="form-control"
                id="ImgDiag"
                @change="onSelectImage_s($event)"
                accept="image/png,  image/jpeg,  image/jpg "
              />
              <label class="input-group-text" for="logoImg">Imagen Diagnostica</label>
            </div>
          </div>
          <div class="col-4">
            <img
              v-if="local_Image"
              :src="local_Image"
              class="img-thumbnail"
              alt="Imagen para guardar"
              style="max-width: 120px; max-height: 120px; object-fit: cover"
            />
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="mt-3">
          <button class="btn btn-primary" @click="agregarImagenAlArray">
            + Agregar Imagen
          </button>
          <button class="btn btn-info ms-2" disabled>
            Imágenes cargadas: {{ imagenesParaGuardar.length }}
          </button>
        </div>

        <!-- Lista de imágenes a guardar -->
        <div v-if="imagenesParaGuardar.length > 0" class="mt-3">
          <h6>Imágenes cargadas: {{ imagenesParaGuardar.length }}</h6>
          <ul class="list-group">
            <li
              v-for="(img, index) in imagenesParaGuardar"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-center gap-2"
            >
              <div class="d-flex align-items-center gap-2">
                <img
                  v-if="img.imgPrevia"
                  :src="img.imgPrevia"
                  alt="Miniatura"
                  style="
                    max-width: 60px;
                    max-height: 60px;
                    object-fit: cover;
                    border-radius: 4px;
                  "
                />
                <div>
                  <strong>{{ img.tipoimg }}</strong
                  ><br />
                  <small class="text-muted">{{
                    img.descImagen || "Sin descripción"
                  }}</small>
                </div>
              </div>
              <button
                class="btn btn-danger btn-sm"
                @click="eliminarImagenDelArray(index)"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- hc7_pimagenexamencomp -->
