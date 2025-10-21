<template>
<div>
    <div class="layout-wrapper" v-for="(item,index) in params" :key="index">
        <!-- Overlay -->
        <div v-if="isNavbarOpen" class="sidebar-overlay" @click="toggleNavbar"></div>

        <!-- Sidebar -->
        <nav id="sidebar" :class="{ active: isNavbarOpen }">
            <div class="sidebar-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h3>FisioApp</h3>
                    <button class="btn-close btn-close-white" @click="toggleNavbar"></button>
                </div>

            </div>

            <ul class="list-unstyled components">
                <li>
                    <router-link to="/" @click="toggleNavbar" class="nav-link">
                        <img class="icono" width="18" height="18" src="https://img.icons8.com/ios-filled/50/home.png" alt="home" />
                        <span>Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/quienes_somos" @click="toggleNavbar" class="nav-link">
                        <img class="icono" width="18" height="18" src="https://img.icons8.com/?size=100&id=77&format=png&color=000000" alt="info" />
                        <span>Quienes somos</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/login" @click="toggleNavbar" class="nav-link">
                        <img class="icono" width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/key--v1.png" alt="key--v1" />
                        <span>Login</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/about" @click="toggleNavbar" class="nav-link">
                        <img class="icono" width="18" height="18" src="https://img.icons8.com/?size=100&id=3439&format=png&color=000000" alt="info" />
                        <span>About</span>
                    </router-link>
                </li>

                <div v-if="this.rol=='admin'">

                    <li>
                        <router-link to="/reservas/:id_user" @click="toggleNavbar" class="nav-link">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/?size=100&id=78945&format=png&color=000000" alt="profesional" />
                            <span>Reservas</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/ventas" @click="toggleNavbar" class="nav-link">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/?size=100&id=100257&format=png&color=000000" alt="profesional" />
                            <span>Facturar</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/profesional" @click="toggleNavbar" class="nav-link">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/64/external-11-disaster-febrian-hidayat-glyph-febrian-hidayat.png" alt="profesional" />
                            <span>Profesional</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard" @click="toggleNavbar" class="nav-link">
                            <img class="icono" width="18" height="18" src="https://img.icons8.com/ios/50/settings-3--v1.png" alt="settings" />
                            <span>Admin</span>
                        </router-link>
                    </li>
                </div>

            </ul>

        </nav>

        <!-- Main Content -->
        <div id="content">
            <!-- Top Navigation -->
            <nav class="navbar navbar-expand-lg" style="background-color: #34836e">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn" @click="toggleNavbar">
                        <span class="navbar-toggler-icon">
                        </span>
                    </button>

                    <!-- <span class="navbar-text"> {{item.nombre}}</span> -->
                    <span class="navbar-text">Tu recuperación es nuestro objetivo !</span>
                </div>
            </nav>

            <!-- Main Content -->
            <div class="content-body">
                <slot></slot>
            </div>

            <!-- Footer -->
            <footer-component />
        </div>
    </div>

</div>
</template>

<script>
import FooterComponent from "../views/footer.vue";
import {
    mapState
} from "vuex";

export default {
    name: "SidebarLayout",
    components: {
        FooterComponent,
    },
    props: {
        params: {
            type: Array,
            default: () => [], // Valor por defecto si no se pasa nada
        },
    },
    data() {
        return {
            isNavbarOpen: false,
            imagenlogo: "./../assets/logo.png",
        };
    },
    methods: {
        mapAction() {
            // Completar acción según necesidad
        },
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen;
        },
        toggleNavbarCloset() {
            this.isNavbarOpen = false;
        },
    },
    computed: {
        ...mapState("Auth", ["rol", "id_ips", "id_user"]),
    },
};
</script>

<style scoped>
.layout-wrapper {
    position: relative;
    min-height: 100vh;
}

/* Overlay */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
}

#sidebar {
    min-width: 170px;
    max-width: 220px;
    background: #34836e;
    color: #fff;
    transition: all 0.3s ease-in-out;
    position: fixed;
    height: 100vh;
    left: -250px;
    top: 0;
    z-index: 1050;
    box-shadow: 2px 0 16px 0 rgba(44, 118, 97, 0.12);
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
}

#sidebar.active {
    left: 0;
}

.sidebar-header {
    padding: 20px;
    background: #2c7661;
}

.sidebar-header h3 {
    color: #fff;
    margin: 0;
    padding: 10px 0;
}

.logobar {
    max-width: 150px;
    height: auto;
}

#sidebar ul {
    padding: 0;
    list-style: none;
}

#sidebar ul li {
    margin-bottom: 6px;
}

#sidebar ul li a {
    padding: 13px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.05rem;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(44, 118, 97, 0.08);
    transition: background 0.2s, box-shadow 0.2s;
}

#sidebar ul li a:hover {
    background: #2c7661;
    box-shadow: 0 4px 16px rgba(44, 118, 97, 0.18);
}

.icono {
    filter: invert(1);
}

#content {
    width: 100%;
    min-height: 100vh;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
}

#sidebarCollapse {
    background-color: transparent;
    border: none;
    color: white;
}

#sidebarCollapse:hover {
    background-color: #2c7661;
}

.navbar-text {
    color: #fff;
}

.content-body {
    padding: 20px;
    flex: 1;
}

.btn-close {
    padding: 0.5rem;
}

@media (max-width: 768px) {
    .layout-wrapper {
        overflow-x: hidden;
    }

    #sidebar {
        width: 100%;
        /* max-width: 300px; */
    }
}
</style>
