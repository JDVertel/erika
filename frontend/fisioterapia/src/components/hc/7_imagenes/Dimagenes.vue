<!-- hc7_pimagenexamencomp -->
<template>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse7" aria-expanded="false" aria-controls="panelsStayOpen-collapse7">
            Pruebas de Imagen o Examenes Complementarios ok
        </button>
    </h2>
    <div id="panelsStayOpen-collapse7" class="accordion-collapse collapse">
        <div class="accordion-body">
            <!--  -->

            <h5>Seleccione el tipo de Imagen</h5>
            <select class="form-select" aria-label="Default select example" v-model="tipoImagenD">
                <option selected>--Seleccione--</option>
                <option value="Radiografia">Radiografia</option>
                <option value="Ecografia">Ecografia</option>
                <option value="Resonancia">Resonancia</option>
                <option value="Tag">TAG</option>
                <option value="Otros">Otros</option>
            </select>

            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Breve descripcion</label>
                <textarea class="form-control textarea" id="exampleFormControlTextarea1" rows="3" v-model="imgDescripcion"></textarea>
            </div>
            <div class="row">
                <div class="col-8 mb-3">
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="ImgDiag" @change="onSelectImage_s($event)" accept="image/png,  image/jpeg,  image/jpg " />
                        <label class="input-group-text" for="logoImg">Imagen Diagnostica</label>
                    </div>

                </div>
                <div class="col-4">
                    <img :src="local_Image" class="img-thumbnail" alt="Imagen para guardar" />
                </div>
            </div>

            <!--  -->

         <!--    <button class="btn btn-warning mt-3" @click="uploadImage_p7">
                + Guardar
            </button> -->
        </div>
    </div>
</div>
</template>

<script>
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "firebase/storage";
import {
  createLogger,
    mapActions,
    mapState
} from "vuex";

export default {
    data() {
        return {
            imgDescripcion: "",
            tipoImagenD: "",
            datosImg: [],
            datosEmpresa:[],
            //images
            local_Image: null,
            file: null,
            /* imagenes */
            imagenes: [],
            imagen: null,
            IMG: null,
            p_img: "",
            /*  */
            idPaciente: "111",
            idhc: "1",
            bd: "hc7_imgdiagnosticas",
        };
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
            try {
                const storage = getStorage();
                const storageRef = ref(storage, this.IMG);
                await uploadBytes(storageRef, this.imagen);
                const snapshot = await getDownloadURL(storageRef);
                this.p_img = snapshot;
                console.log(this.p_img);
               
                //Añadir retroalimentacion al usuario.
             console.log("Imagen subida con exito.");
             this.B_guardarImgDiag(this.p_img);
            } catch (error) {
                //Añadir retroalimentacion al usuario.
                alert("Error al subir la imagen, el tipo de imagen no es compatible!");
            }
        },
        //3- se guarda la informacion en bd
     async B_guardarImgDiag(dataimg) {
            this.datosImg.push({
                idpaciente: this.idPaciente,
                bd: this.bd,
                idhc: this.idhc,
                imgDiag: dataimg,
                tipoimg: this.tipoImagenD,
                descImagen: this.imgDescripcion,
            });
          await this.SaveDatos7(this.datosImg[0]);
            console.log("guardando exitosamente", this.datosImg);
        },
        /* ----------------------------------------------------- */
    },
}
</script>
