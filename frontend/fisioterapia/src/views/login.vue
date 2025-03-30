<template>
<div>
    <div class="container py-5 h-50">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="card card_login p-4 p-lg-5 text-black" style="border-radius: 1rem;">
                <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="centrarcontenido">
                    <img src="https://img.icons8.com/?size=100&id=94&format=png&color=000000" class="img-responsive" alt="Image">
                    </span>
                </div>
                <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Ingreso al sistema</h5>
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" v-model="user" />
                    <label class="form-label" for="form2Example17">Usuario</label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="pass" />
                    <label class="form-label" for="form2Example27">Contraseña</label>
                </div>
                <div class="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        user: "",
        pass: "",
    })

}
</script>

<style >

</style>
