<template>
<nav class="navbar  navbar-expand-lg " style="background-color: #34836E;">
    <div class="container-fluid">
        <div >
            <a class="navbar-brand" href="#">
              <router-link to="/" @click="toggleNavbarCloset">
                <img src="./../assets/logo.png" class="logobar">
              </router-link>
            </a>
            <a class="navbar-brand">FisioApp</a>
        </div>
        <router-link to="/" @click="toggleNavbarCloset">
        <span class="navbar-text">Clinica de rehabilitacion Erika Jasmin Vertel</span>
      </router-link>
        <button class="navbar-toggler" type="button" @click="toggleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }">
            <br>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                    <router-link to="/login" @click="toggleNavbar">
                        <a class="nav-link" aria-current="page">
                            <img class="icono" width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/key--v1.png" alt="key--v1" /> Login
                        </a>
                    </router-link>
                </li>
        
                <li>
                    <router-link to="/" @click="toggleNavbar">
                        <a class="nav-link" aria-current="page">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/ios-filled/50/home.png" alt="home" /> Home
                        </a>
                    </router-link>
                </li>
         
                <li>
                    <router-link to="/profesional" @click="toggleNavbar">
                        <a class="nav-link" aria-current="page">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/64/external-11-disaster-febrian-hidayat-glyph-febrian-hidayat.png" alt="external-11-disaster-febrian-hidayat-glyph-febrian-hidayat" /> Profesional
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link to="/dashboard" @click="toggleNavbar">
                        <a class="nav-link" aria-current="page">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/ios/50/settings-3--v1.png" alt="settings-3--v1" /> Admin
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link to="/about" @click="toggleNavbar">
                        <a class="nav-link" aria-current="page">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/ios/50/info--v1.png" alt="info--v1" /> About
                        </a>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            isNavbarOpen: false
        };
    },
    methods: {
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen;
        },
        toggleNavbarCloset() {
            this.isNavbarOpen =false;
        }
    }
};
</script>

<style scoped>

</style>
