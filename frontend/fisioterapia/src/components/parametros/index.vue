<template>
<div>
    <h2>Configuracion de App</h2>

    <div class="container-fluid">
        <div class="accordion  accordion-flush" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Usuarios del Sistema ({{ existeusuarios }})
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-8">
                                <h6>Usuarios registrados en el sistema</h6>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-warning btn-sm" @click="btn_adduser">
                                    + Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="container" v-if="this.form_user">
                            <div>
                                <h6><strong>Registro de nuevo usuario</strong></h6>
                            </div>
                            <div class="row">
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <select class="form-select" aria-label="Default select example" v-model="user_tipodoc">
                                            <option value="" selected>Seleccione Tipo de Doc</option>
                                            <option value="CC">Cedula</option>
                                            <option value="TI">T Identidad</option>
                                            <option value="PA">Pasaporte</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="number" class="form-control" placeholder="# Documento" v-model="user_numdoc" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="Nombre" v-model="user_nombre" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <select class="form-select" aria-label="Default select example" v-model="user_rol">
                                            <option value="">Seleccione Rol</option>
                                            <option value="admin">Administrador</option>
                                            <option value="registro">Registro</option>
                                            <option value="prof">Profesional</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <h6>
                                            <strong>Nota: </strong>Los nuevos usuarios se crean con la
                                            contraseña <strong>12345</strong> al ingresar deberan asignar una
                                            nueva
                                        </h6>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <button class="btn btn-success btn-sm" @click="adduser" v-if="
                                                this.user_tipodoc !== '' &&
                                                this.user_numdoc !== '' &&
                                                this.user_nombre !== '' &&
                                                this.user_rol !== ''
                                            ">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Estado</th>
                                    <th>Opc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in datausuarios" :key="user.id">
                                    <th>{{ user.rol }}</th>
                                    <td>{{ user.nombre }}</td>
                                    <td>{{ user.doc }}</td>
                                    <td>{{ user.estado }}</td>
                                    <td>
                                        <button class="btn btn-danger m-1 btn-sm" @click="eliminaritemU(user.id)">
                                            <i class="bi bi-trash3-fill"></i>
                                        </button>
                                        <button class="btn btn-warning m-1 btn-sm">
                                            <i class="bi bi-key"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- ----------------------------------- -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Profesionales ( {{ existeprofesionales }} )
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-8">
                                <h6>Profesionales registrados en el sistema</h6>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-warning btn-sm" @click="btn_addprof">
                                    + Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="container" v-if="this.form_prof">
                            <div><strong>Registro de profesionales</strong></div>
                            <br />
                            <div class="row">
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <select class="form-select" aria-label="Default select example" v-model="pro_tipodoc">
                                            <option value="">Seleccione Tipo de Doc</option>
                                            <option value="CC">Cedula</option>
                                            <option value="TI">T Identidad</option>
                                            <option value="PA">Pasaporte</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="number" class="form-control" placeholder="# Documento" v-model="pro_numdoc" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder=" 1er Nombre" v-model="pro_name1" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="2do Nombre" v-model="pro_name2" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="1er Apellido" v-model="pro_apell1" />
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="2do Apellido" v-model="pro_apell2" />
                                    </div>
                                </div>

                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="email" class="form-control" placeholder="Email" v-model="pro_correo" />
                                    </div>
                                </div>

                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="number" class="form-control" placeholder="#Celular" v-model="pro_celular" />
                                    </div>
                                </div>

                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="Reg Medico" v-model="pro_reg_medico" />
                                    </div>
                                </div>

                                <div class="col-6 col-md-4">
                                    <div class="mb-3">
                                        <select class="form-select" aria-label="Default select example" v-model="pro_tipo">
                                            <option value="">Seleccione Tipo Profesional</option>
                                            <option value="fisioterapia">Fisioterapia</option>
                                            <option value="consulta">Consulta</option>
                                            <option value="clases">Clases</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <button class="btn btn-success btn-sm" @click="addprof" v-if="
                                            this.pro_tipodoc !== '' &&
                                            this.pro_numdoc !== '' &&
                                            this.pro_name1 !== '' &&
                                            this.pro_apell1 !== '' &&
                                            this.pro_email !== '' &&
                                            this.pro_celular !== '' &&
                                            this.pro_reg_medico !== '' &&
                                            this.pro_tipo !== '' &&
                                            this.pro_correo !== ''
                                        ">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">tipo</th>
                                    <th scope="col">nombre</th>
                                    <th scope="col">cel</th>
                                    <th scope="col">opc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prof in dataprofesionales" :key="prof.id">
                                    <th>{{ prof.tipo }}</th>
                                    <td>{{ prof.name1 }} {{ prof.apell1 }}</td>
                                    <td>{{ prof.cel }}</td>
                                    <td>
                                        <button class="btn btn-warning m-1 btn-sm">
                                            <i class="bi bi-key"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- ----------------------------------- -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Datos Empresa
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="container" v-if="stateEmpresa == 'ver'">
                                    <div class="row">
                                        <div class="col-12 col-md-9 mb-2">
                                            <div class="row" v-for="(item, index) in DataEmpresa" :key="index">
                                                <div class="col-6"><strong>Nombre IPS: </strong>{{ item.nombre }}
                                                </div>
                                                <div class="col-6"><strong>Nit:</strong>{{ item.nit }}</div>
                                                <div class="col-12"><strong>Descripcion:</strong>{{ item.desc }}</div>
                                                <div class="col-6"><strong>Celular:</strong>{{ item.celular }}</div>
                                                <div class="col-6"><strong>Wsp:</strong>{{ item.wsp }}</div>
                                                <div class="col-6"><strong>Direccion:</strong>{{ item.direccion }}
                                                </div>
                                                <div class="col-6" style="display: none;">
                                                    <strong>ID:</strong>{{ item.id }}</div>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-3 mb-2">
                                            <p> <strong>Logo de la empresa</strong></p>
                                            <div v-for="(item, index) in DataEmpresa" :key="index">
                                                <img :src="`${item.logo}`" alt="Cargando imagen" style="height: 70px" />
                                            </div>

                                            <br>
                                            <button type="button" class="btn btn-warning btn-sm" @click="CargarParaActualizarEmpresa()">
                                                Actualizar Datos Empresa
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <!-- ------------------------------------------------------------------------------------------------------------------------------------ -->
                                <div class="container" v-if="stateEmpresa == 'crear' || stateEmpresa == 'editar'">

                                    <div class="col-12 col-md-10">
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Nombre
                                                        Ips</span>
                                                    <input type="text" class="form-control" placeholder="Sin datos" aria-label="nombreips" aria-describedby="basic-addon1" v-model="nombreips" />
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Nit</span>
                                                    <input type="text" class="form-control" placeholder="Sin datos" aria-label="nit" aria-describedby="basic-addon1" v-model="nit" />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Descripcion</span>
                                                    <textarea class="form-control" aria-label="desc" v-model="desc" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"> Celular</span>
                                                        <input type="number" class="form-control"
                                                            placeholder="Sin datos" aria-label="cel"
                                                            aria-describedby="basic-addon1" v-model="cel" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1">WhatsApp</span>
                                                        <input type="number" class="form-control"
                                                            placeholder="Sin datos" aria-label="wsp"
                                                            aria-describedby="basic-addon1" v-model="wsp" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text"
                                                            id="basic-addon1">Direccion</span>
                                                        <input type="text" class="form-control" placeholder="Sin datos"
                                                            aria-label="direccion" aria-describedby="basic-addon1"
                                                            v-model="direccion" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6" style="display: none;">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1">Id_e</span>
                                                        <input type="text" class="form-control" placeholder="Sin datos"
                                                            aria-label="direccion" aria-describedby="basic-addon1"
                                                            v-model="id_E" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6" style="display: none;">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1">URL Logo</span>
                                                        <input type="text" class="form-control" placeholder="Sin datos"
                                                            aria-label="direccion" aria-describedby="basic-addon1"
                                                            v-model="url_logo" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6" v-if="stateEmpresa == 'crear'">
                                                    <div class="input-group mb-3">
                                                        <input type="file" class="form-control" id="logoImg"
                                                            @change="onSelectImage_s($event)"
                                                            accept="image/png,  image/jpeg,  image/jpg" />
                                                        <label class="input-group-text" for="logoImg">Upload
                                                            Logo</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-2">
                                            <div class="row">
                                                <div class="col" v-if="stateEmpresa == 'crear'">
                                                    <img :src="local_Image" class="img-thumbnail"
                                                        alt="Imagen para guardar" />

                                                </div>
                                                <div class="col" v-if="stateEmpresa == 'editar'">
                                                    <img :src="this.logo" class="img-thumbnail"
                                                        alt="Imagen para guardar" />

                                                </div>

                                                <div class="col">
                                                    <button type="button" class="btn btn-warning btn-sm"
                                                        @click="uploadImage_p()" v-if="stateEmpresa == 'crear'">
                                                        Crear
                                                    </button>

                                                    <button type="button" class="btn btn-warning btn-sm"
                                                        @click="updateEmpresa()" v-if="stateEmpresa == 'editar'">
                                                        Actualizar
                                                    </button>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                            Personalizar Informacion de Pagina
                        </button>
                    </h2>
                    <div id="collapse4" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">

                            <div class="container" v-if="statePagina == 'ver'">

                                <button type="button" class="btn btn-warning btn-sm mb-3"
                                    @click="CargarParaActualizarPagina()">
                                    Actualizar Datos Pagina
                                </button>

                                <div class="row" v-for="(item, index) in DataPagina" :key="index">
                                    <div class="col-12 col-md-6">
                                        <strong>Quienes Somos:</strong><br>
                                        {{ item.quienessomos }}
                                    </div>

                                    <div class=" col-12 col-md-6"><strong>Mision:</strong> <br> {{ item.mision }} </div>
                                    <hr>

                                    <div class="col-12 col-md-6"> <strong>Vision:</strong> <br> {{ item.vision }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Nuestros servicios:</strong> <br>
                                        {{ item.nuestrosservicios }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Nuestros servicios LM</strong> <br>
                                        {{ item.nuestrosservicios_lm }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Clases y rutinas</strong> <br>
                                        {{ item.clasesrutinas }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Clases y rutinas LM </strong><br>
                                        {{ item.clasesrutinas_lm }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Tienda Online</strong> <br>
                                        {{ item.tiendaonline }}</div>

                                    <hr>
                                    <div class="col-12 col-md-6"> <strong>Tienda Online LM</strong> <br>
                                        {{ item.tiendaonline_lm }}</div>
                                    <div class="col-12 col-md-6" style="display: none;"> <strong>id</strong> <br>
                                        {{ item.id }}</div>
                                </div>

                                <br>
                                <br>
                                <br>
                            </div>

                            <div class="container" v-if="statePagina == 'crear' || statePagina == 'editar'">
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-text">Quienes somos</span>
                                            <textarea class="form-control" aria-label="With textarea"
                                                placeholder="Sin datos" v-model="quienessomos"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Mision</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="mision"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">vision</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="vision"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Nuestros Servicios </span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="nuestrosservicios"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Nuestros Servicios Lm</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="nuestrosservicios_lm"></textarea>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Clases Rutinas </span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="clasesrutinas"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Clases Rutinas Lm</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="clasesrutinas_lm"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Tienda Online </span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="tiendaonline"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text">Tienda Online Lm</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="tiendaonline_lm"></textarea>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-6" style="display: none;">
                                                <div class="input-group">
                                                    <span class="input-group-text">id</span>
                                                    <textarea class="form-control" aria-label="With textarea" placeholder="Sin datos" v-model="id_P"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="container">
                                                    <button type="button" class="btn btn-warning btn-sm" @click="Create_datosPagina()" v-if="stateEmpresa == 'crear'">
                                                        Crear
                                                    </button>
                                                    <button type="button" class="btn btn-warning btn-sm" @click="Update_datosPagina()" v-if="statePagina == 'editar'">
                                                        Actualizar
                                                    </button>
                                                </div>
                                            </div>
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
import {
    storage
} from "./../../api/fire";

import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "firebase/storage";
import {
    mapActions,
    mapState
} from "vuex";
export default {
    data: () => ({
        form_user: false,
        form_prof: false,
        logo: "",
        Datanewuser: [],
        DataDeleteU: [],
        /*  */
        Datanewprof: [],
        DataDeleteP: [],
        user_tipodoc: "",
        user_rol: "",
        pro_tipodoc: "",
        pro_tipo: "",
        formularioValidoU: false,
        formularioValidoP: false,

        /* ---------- */
        dataempresa: [],
        Data_Empresa: [],
        //images
        local_Image: null,
        file: null,
        /* imagenes */
        imagenes: [],
        imagen: null,
        IMG: null,

        /*  */
        id: "",
        nombreips: "",
        nit: "",
        desc: "",
        cel: "",
        wsp: "",
        direccion: "",
        id_E: "",
        id_P: "",
        url_logo: "",

        datosEmpresa: [],
        Data_Pagina: [],
        ParamschangeState: [],
        dataPagina: [],
        quienessomos: "",
        mision: "",
        vision: "",
        nuestrosservicios: "",
        nuestrosservicios_lm: "",
        clasesrutinas: "",
        clasesrutinas_lm: "",
        tiendaonline: "",
        tiendaonline_lm: "",

        /* ---------valores quemados para consultas iniciales estos alimentan el store GET------- */
        paramsProfesionales: [{
            bd: "profesionales",
            parametro: "id_ips",
            valor: 1,
            rta: "setStateProfesionales",
        }, ],

        paramsUsuarios: [{
            bd: "usuarios",
            parametro: "id_ips",
            valor: "1",
            rta: "setStateUsuarios",
        }, ],

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
    }),

    /* --------------------------------------------------------------------------------------------------- */

    methods: {
        /*   mapactions   */
        ...mapActions("Auth", [
            "Action_createDataEmpresa",
            "Action_update_Empresa",
            "Action_createDataPagina",
            "Action_update_Pagina",
            "Action_updateDataPagina",
            /*  */
            "getDataIPSbyParam",
            "ChangeState",
        ]),

        ...mapActions("Agendas", [
            "getDatabyParam",
            "createEntradaUser",
            "createEntradaProf",
            "DeleteItem",
        ]),

        clearform_user() {
            this.user_tipodoc = "";
            this.user_numdoc = "";
            this.user_nombre = "";
            this.user_rol = "";
        },
        clearform_prof() {
            this.pro_numdoc = "";
            this.pro_apell1 = "";
            this.pro_apell2 = "";
            this.pro_name1 = "";
            this.pro_name2 = "";
            this.pro_reg_medico = "";
            this.pro_celular = "";
            this.pro_correo = "";
            this.pro_tipo = "";
        },

        btn_adduser() {
            this.form_user = !this.form_user;
            console.log("ejecutandometodo add user", this.form_user);
            this.clearform_user();
        },

        btn_addprof() {
            this.form_prof = !this.form_prof;
            console.log("ejecutandometodo add prof", this.form_prof);
            this.clearform_prof();
        },
        btn_addtipocita() {
            this.form_tipocita = !this.form_tipocita;

            /*  this.clearform_user(); */
        },

        async adduser() {
            this.Datanewuser.push({
                estado: true,
                id_ips: "1",
                doc: this.user_tipodoc + this.user_numdoc,
                nombre: this.user_nombre,
                pass: "12345",
                rol: this.user_rol,
                bd: "usuarios",
            });
            try {
                this.btn_adduser();
                await this.createEntradaUser(this.Datanewuser[0]);
                this.Datanewuser = [];
                await this.getDatabyParam(this.paramsUsuarios);
                console.log("Usuario creado exitosamente.");
            } catch (error) {
                // Manejar errores (¡fundamental!)
                console.error("Error al crear el usuario:", error);
                // Aquí podrías mostrar un mensaje al usuario o tomar otras acciones
            }
        },

        async addprof() {
            this.Datanewprof.push({
                id_ips: "1",
                estado: true,
                doc: this.pro_tipodoc + this.pro_numdoc,
                name1: this.pro_name1,
                name2: this.pro_name2,
                apell1: this.pro_apell1,
                apell2: this.pro_apell2,
                cel: this.pro_celular,
                reg_medico: this.pro_reg_medico,
                tipo: this.pro_tipo,
                correo: this.pro_correo,
                pass: "12345",
                bd: "profesionales",
            });
            try {
                this.btn_addprof();
                await this.createEntradaProf(this.Datanewprof[0]);
                this.Datanewprof = [];
                await this.getDatabyParam(this.paramsProfesionales);
            } catch (error) {
                // Manejar errores (¡fundamental!)
                console.error("Error al crear el profesional:", error);
                // Aquí podrías mostrar un mensaje al usuario o tomar otras acciones
            }
        },

        /* _---------------------------------------------------------------------------- */
        //cambiar metodo por update y cambiar estado de profesional
        async eliminaritemP(id) {
            console.log("eliminanfo prof" + id);
            this.DataDeleteP.push({
                id: id,
                bd: "profesionales",
            });
            try {
                await this.DeleteItem(this.DataDeleteP[0]);
                this.DataDeleteP = [];
                await this.getDatabyParam(this.paramsProfesionales);
            } catch (error) {
                // Manejar errores (¡fundamental!)
                console.error("Error al eliminar el registro", error);
                // Aquí podrías mostrar un mensaje al usuario o tomar otras acciones
            }
        },

        async eliminaritemU(id) {
            this.DataDeleteU.push({
                id: id,
                bd: "usuarios",
            });
            this.DeleteItem(this.DataDeleteU[0]);
            try {
                await this.getDatabyParam(this.paramsUsuarios);
                this.DataDeleteU = [];
                await this.getDatabyParam(this.paramsUsuarios);
            } catch (error) {
                // Manejar errores (¡fundamental!)
                console.error("Error al eliminar el registro", error);
                // Aquí podrías mostrar un mensaje al usuario o tomar otras acciones
            }
        },

        /* -------------------inicio guardar datos empresa ----------------------- */
        //1- cargar imagen y generar miniatura
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
                this.IMG = "empresa/" + this.imagen.name;
                console.log(this.IMG);
            }
        },
        //2- se sube primero la imagen para generar ruta que se adiciona al conjunto de datos de emprea a guardar
        async uploadImage_p() {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, this.IMG);
                await uploadBytes(storageRef, this.imagen);
                const snapshot = await getDownloadURL(storageRef);
                this.p_img = snapshot;
                console.log("Image uploaded successfully!");
                console.log(this.p_img);
                this.B_guardarEmpresa(this.p_img);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        },
        //3- se guarda la informacion en bd
        async B_guardarEmpresa(dataimg) {
            this.datosEmpresa.push({
                id_ips: "1",
                nombre: this.nombreips,
                nit: this.nit,
                desc: this.desc,
                direccion: this.direccion,
                celular: this.cel,
                wsp: this.wsp,
                logo: dataimg,
                bd: "datos_empresa",
            });

            try {
                await this.Action_createDataEmpresa(this.datosEmpresa[0]);
                console.log("Registro guardado con éxito", this.datosEmpresa);
                // Limpiar los campos después de agregar la empresa
                this.nombreips = '';
                this.nit = '';
                this.desc = '';
                this.direccion = '';
                this.cel = '';
                this.wsp = '';
            } catch (error) {
                console.error('Error al guardar datos:', error);
                // Opcionalmente, muestra un mensaje al usuario
                this.$toast.error('Error al guardar datos. Por favor, inténtalo de nuevo.');
            }

            try {
                await this.getDataIPSbyParam(this.paramsEmpresa);
                console.log("Datos obtenidos con éxito");
            } catch (error) {
                console.error('Error al obtener datos:', error);
                // Opcionalmente, muestra un mensaje al usuario
                this.$toast.error('Error al obtener datos. Por favor, inténtalo de nuevo.');
            }
        },

        CargarParaActualizarEmpresa() {
            this.ParamschangeState = [],
                this.ParamschangeState.push({
                    state: "stateEmpresa",
                    value: "editar",
                    mutation: "muta_setNewState",
                })

            console.log("cambiando estado en el store", this.ParamschangeState[0].value);
            this.ChangeState(this.ParamschangeState[0]);
            this.obtenerDatosEmpresa();

        },

        /* -------------------fin guardar datos empresa ----------------------- */

        /* -----------------------inicio Update empresa------------------------- */
        async updateEmpresa() {
            // Reemplaza el array en lugar de hacer push (evita acumulación)
            this.Data_Empresa = [{
                id_ips: "1",
                nombre: this.nombreips,
                nit: this.nit,
                desc: this.desc,
                direccion: this.direccion,
                celular: this.cel,
                wsp: this.wsp,
                logo: this.logo,
                id: this.id_E,
                bd: "datos_empresa",
                rta: "muta_UpdateDataEmpresa",
            }];

            try {
                await this.UpdateData_Empresa(); // Usar await para esperar la promesa
                /* this.limpiarmodalEMpresa(); */ // Descomenta si es necesario
            } catch (error) {
                console.error('Error en updateEmpresa:', error);
                this.$toast.error('Error al actualizar la empresa');
            }
        },

        async UpdateData_Empresa() {
            try {
                // Asegurar que Action_update_Empresa es asíncrono/retorna promesa
                await this.Action_update_Empresa(this.Data_Empresa[0]);
                console.log("Actualizando empresa", this.Data_Empresa[0]);

                // Esperar la obtención de datos actualizados
                const datosActualizados = await this.getDataIPSbyParam(this.paramsEmpresa);
                console.log("Datos obtenidos con éxito", datosActualizados);

                return datosActualizados; // Opcional: retornar los datos obtenidos

            } catch (error) {
                console.error('Error en UpdateData_Empresa:', error);
                this.$toast.error('Error al procesar la solicitud');
                throw error; // Relanzar el error para manejo superior
            }
        },

        /* --------------------fin update datos empresas--------------------- */

        /* -----------inicio guardad datos pagina----------------- */

        async Create_datosPagina() {
            this.dataPagina.push({
                quienessomos: this.quienessomos,
                mision: this.mision,
                vision: this.vision,
                nuestrosservicios: this.nuestrosservicios,
                nuestrosservicios_lm: this.nuestrosservicios_lm,
                clasesrutinas: this.clasesrutinas,
                clasesrutinas_lm: this.clasesrutinas_lm,
                tiendaonline: this.tiendaonline,
                tiendaonline_lm: this.tiendaonline_lm,
                id_ips: "1",
                bd: "datos_pagina",
            });

            try {
                await this.Action_createDataPagina(this.dataPagina[0]);
                console.log("Registro guardado con éxito", this.dataPagina);
                // Limpiar los campos después de agregar la empresa
                this.quienessomos = '';
                this.mision = '';
                this.vision = '';
                this.nuestrosservicios = '';
                this.nuestrosservicios_lm = '';
                this.clasesrutinas = '';
                this.clasesrutinas_lm = '';
                this.tiendaonline = '';
                this.tiendaonline_lm = '';
            } catch (error) {
                console.error('Error al guardar datos:', error);
                // Opcionalmente, muestra un mensaje al usuario
                this.$toast.error('Error al guardar datos. Por favor, inténtalo de nuevo.');
            }

            try {
                await this.getDataIPSbyParam(this.paramsPagina);
                console.log("Datos obtenidos con éxito");
            } catch (error) {
                console.error('Error al obtener datos:', error);
                // Opcionalmente, muestra un mensaje al usuario
                this.$toast.error('Error al obtener datos. Por favor, inténtalo de nuevo.');
            }
        },

        /* -----------fin guardar datos pagina----------------- */

        CargarParaActualizarPagina() {
            this.ParamschangeState = [],
                this.ParamschangeState.push({
                    state: "statePagina",
                    value: "editar",
                    mutation: "muta_setNewState",
                })

            console.log("cambiando estado en el store");
            this.ChangeState(this.ParamschangeState[0]);
            this.obtenerDatosPagina();

        },
        /* -----------------------inicio Update pagina------------------------- */
        async Update_datosPagina() {
            // Reemplaza push por asignación para evitar acumulación
            this.Data_Pagina = [{
                id_ips: "1",
                quienessomos: this.quienessomos,
                mision: this.mision,
                vision: this.vision,
                nuestrosservicios: this.nuestrosservicios,
                nuestrosservicios_lm: this.nuestrosservicios_lm,
                clasesrutinas: this.clasesrutinas,
                clasesrutinas_lm: this.clasesrutinas_lm,
                tiendaonline: this.tiendaonline,
                tiendaonline_lm: this.tiendaonline_lm,
                id: this.id_P,
                bd: "datos_pagina",
                rta: "muta_UpdateDataPagina",
            }];

            try {
                await this.UpdateData_Pagina(); // Usar await para esperar
                /* this.limpiarmodalEmpresa(); */ // Descomentar si es necesario
            } catch (error) {
                console.error('Error en Update_datosPagina:', error);
                this.$toast.error('Error al actualizar los datos');
            }
        },

        async UpdateData_Pagina() {
            try {
                await this.Action_update_Pagina(this.Data_Pagina[0]);
                console.log("Actualizando datos página", this.Data_Pagina[0]);

                const datosActualizados = await this.getDataIPSbyParam(this.paramsPagina);
                console.log("Datos obtenidos con éxito", datosActualizados);

                return datosActualizados;
            } catch (error) {
                console.error('Error en UpdateData_Pagina:', error);
                this.$toast.error('Error al procesar la solicitud');
                throw error; // Propagar el error para manejo superior
            }
        },

        /* --------------------fin update datos pagina--------------------- */

        obtenerDatosPagina() {
            this.quienessomos = this.DataPagina[0].quienessomos;
            this.mision = this.DataPagina[0].mision;
            this.vision = this.DataPagina[0].vision;
            this.nuestrosservicios = this.DataPagina[0].nuestrosservicios;
            this.nuestrosservicios_lm = this.DataPagina[0].nuestrosservicios_lm;
            this.clasesrutinas = this.DataPagina[0].clasesrutinas;
            this.clasesrutinas_lm = this.DataPagina[0].clasesrutinas_lm;
            this.tiendaonline = this.DataPagina[0].tiendaonline;
            this.tiendaonline_lm = this.DataPagina[0].tiendaonline_lm;
            this.id_P = this.DataPagina[0].id;

        },

        obtenerDatosEmpresa() {
            this.nombreips = this.DataEmpresa[0].nombre;
            this.nit = this.DataEmpresa[0].nit;
            this.desc = this.DataEmpresa[0].desc;
            this.cel = this.DataEmpresa[0].celular;
            this.wsp = this.DataEmpresa[0].wsp;
            this.direccion = this.DataEmpresa[0].direccion;
            this.logo = this.DataEmpresa[0].logo;
            this.id_E = this.DataEmpresa[0].id;
        },

    },
    computed: {
        /*  mapstates */
        ...mapState("Agendas", [
            "dataprofesionales",
            "existeprofesionales",
            "datausuarios",
            "existeusuarios",

        ]),

        ...mapState("Auth", [
            "DataEmpresa",
            "DataPagina",
            "actualizarEmp",
            "actualizarPag",
            "statePagina",
            "stateEmpresa",
        ])
    },

    created() {
        // Ejecutar en paralelo las que no dependen entre sí
        Promise.all([
            this.getDatabyParam(this.paramsUsuarios),
            this.getDatabyParam(this.paramsProfesionales),
            this.getDataIPSbyParam(this.paramsEmpresa),
            this.getDataIPSbyParam(this.paramsPagina),

        ])
    },

};
</script>
