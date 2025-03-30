<template>
<div id="app">
    <SidebarLayout :params = DataEmpresa>
        <router-view></router-view>
    </SidebarLayout>
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
  mapActions,
  mapState
} from "vuex";

import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/style.css";
import SidebarLayout from "./layouts/SidebarLayout.vue";

export default {
  name: "App",
  components: {
    SidebarLayout,
  },
  data() {
    return {
   
      paramsEmpresa: [{
        bd: "datos_empresa",
        parametro: "id_ips",
        valor: "1",
        mutation: "setStateEmpresa",
      }],
    }
  },
  methods:{
    ...mapActions("Auth",[
      "getDataIPSbyParam"
    ])
  },
  computed:{
    ...mapState("Auth",["DataEmpresa"])
  },
  created(){

    Promise.all([
      this.getDataIPSbyParam(this.paramsEmpresa),
    ])
 
  }
}
</script>


<style>
#app {
    min-height: 100vh;
}
</style>
