<template>
<div>
    <!--  inicio registro de usuario -->
    <div class="container">
        <p>
            Paciente no encontrado, ingrese los siguientes datos para
            registarlo y poder realizar una reserva
        </p>
        <div class="row">
            <div class="col-6">
                <div class="input-group mb-1">
                    <select class="form-select form-select-sm textarea" id="inputGroupSelect01" v-model="tipodoc">
                        <option selected value="">Tipo</option>
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="CE">CE</option>
                        <option value="PA">PASAPORTE</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="numdoc" placeholder="Numero de documento" v-model="numdoc" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="text_1nombre" placeholder="1 Nombre" v-model="name1" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="text_2nombre" placeholder="2 Nombre" v-model="name2" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="text_1apelli" placeholder="1 Apellido" v-model="apell1" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="text_2apell" placeholder="2 Apellido" v-model="apell2" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="number" class="form-control form-control-sm textarea" id="text_tel" placeholder="Telefono" v-model="tel_cel" />
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-1">
                    <input type="text" class="form-control form-control-sm textarea" id="text_direccion" placeholder="Direccion" v-model="direcc" />
                </div>
            </div>
        </div>
        <button class="btn btn-success btn-sm" @click="RegistrarPaciente(PacienteData)">
            Registrar cliente
        </button>
    </div>

    <!-- ------------------------------fin registro usuario -->
</div>
</template>

<script>
export default {
    data: () => ({
        PacienteData: [],
        //datos pacientes
        name1: "",
        name2: "",
        apell1: "",
        apell2: "",
        direcc: "",
        tel_cel: "",
        numdoc: "",
        tipodoc: "",

    }),
    methods: {
        RegistrarPaciente() {
            this.PacienteData.push({
                name1: this.name1,
                name2: this.name2,
                apell1: this.apell1,
                apell2: this.apell2,
                direcc: this.direcc,
                tel_cel: this.tel_cel,
                numdoc: this.numdoc,
                tipodoc: this.tipodoc,

            })
            console.log("registro de paciente", this.PacienteData[0]);
        }
    },

}
</script>

<style lang="">

</style>
