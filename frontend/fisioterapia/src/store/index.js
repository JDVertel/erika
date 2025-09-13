import { createStore } from "vuex";
import Auth from "./../components/dashboard/store/auth/index";
import Agendas from "../components/agendas/store/agendas/index";
import Hc  from "../components/hc/store/hc";
import vitrina from './../components/vitrina/store/vitrina/index';

const store = createStore({
  modules: {
    Auth,
    Agendas,
    hc: Hc,
    vitrina
  },
});

export default store;

/*   state: {
    id_ips: "1",
    id_user:"2",
    rol:"admin",
 
  }, */
