// acciones asyncronas  que llaman a mutaciones

/* --------------------------DATOSEMPRESA--------------------- */
import firebase_api from "@/api/firebaseApi";
/* crear Data*/
export const Action_createDataEmpresa = async ({ commit }, entradasE) => {
  const { id_ips, nombre, nit,desc, direccion, celular, wsp, logo, bd } = entradasE;
  const DataToSaveE = {
    id_ips,
    nombre,
    nit,
    desc,
    direccion,
    celular,
    wsp,
    logo,
    bd,
  };
  const Ruta = `/${bd}.json`;
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSaveE);
};

/*------------------------------------------  */

export const Action_update_Empresa = async ({ commit }, entradasE) => {
  console.log("variable entradas empresa", entradasE);
  const { id_ips, nombre, nit,desc, direccion, celular, wsp, bd, rta, logo, id } =
    entradasE;
  const dataToUpdateE = { id_ips, nombre, nit,desc, direccion, celular, wsp, logo };
  const rutaE = `/${bd}/${entradasE.id}.json`;
  //servicio
  const response = await firebase_api.put(rutaE, dataToUpdateE);
  commit(rta, { ...entradasE });
};

/* ========================================================================================= */

/* ---------------------------------DATOS PAGINA-------------------- */
export const Action_createDataPagina = async ({ commit }, entradasP) => {
  const {
    quienessomos,
    mision,
    vision,
    nuestrosservicios,
    nuestrosservicios_lm,
    clasesrutinas,
    clasesrutinas_lm,
    tiendaonline,
    tiendaonline_lm,
    /* parametros */
    bd,
    id_ips,
  } = entradasP;

  const DataToSaveP = {
    quienessomos,
    mision,
    vision,
    nuestrosservicios,
    nuestrosservicios_lm,
    clasesrutinas,
    clasesrutinas_lm,
    tiendaonline,
    tiendaonline_lm,
    /* parametros */
    bd,
    id_ips,
  };
  console.log("ok", DataToSaveP);
  const Ruta = `/${bd}.json`;
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSaveP);
};

/* ---------------------------------------------------------- */
export const Action_update_Pagina = async ({ commit }, entradasP) => {
  console.log("variable entradas pagina ", entradasP);
  const {
    quienessomos,
    mision,
    vision,
    nuestrosservicios,
    nuestrosservicios_lm,
    clasesrutinas,
    clasesrutinas_lm,
    tiendaonline,
    tiendaonline_lm,
    id,
    id_ips,
    rta,
    bd,
  } = entradasP;
  const dataToUpdateP = {
    quienessomos,
    mision,
    vision,
    nuestrosservicios,
    nuestrosservicios_lm,
    clasesrutinas,
    clasesrutinas_lm,
    tiendaonline,
    tiendaonline_lm,
    id_ips,
  };

  /*  const dataToUpdateP = { ...entradasP }; */

  console.log("imprimiendo la variable", entradasP.id);
  const rutaP = `/${bd}/${entradasP.id}.json`;
  //servicio
  const response = await firebase_api.put(rutaP, dataToUpdateP);
  commit(rta, { ...entradasP });
};

/* ---------------------------CARGAR DATOS AL INICIO  ------------------------ */

export const getDataIPSbyParam = async ({ commit }, parametros) => {
  const [{ bd, parametro, valor, mutation }] = parametros;
  //consulta + parametros de la misma
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro}"`,
      equalTo: `"${valor}"`,
    },
  });
  const { data } = response;
  const datasalida = [];
  for (let id of Object.keys(data)) {
    datasalida.push({
      id,
      ...data[id],
    });
  }
  console.log(
    "data consulta por parametros",
    bd,
    "por",
    parametro,

    "mutation",
    mutation,
    "rta:",
    datasalida
  );
  if (datasalida.length != 0) {
    commit(`${mutation}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
  }
  return datasalida;
};
/* -------------------------------------------- */

export const ChangeState = async ({ commit }, parametros) => {
  const { state, value, mutation } = parametros;
  const dataParams = {
    state,
    value,
  };
  commit(`${mutation}`, dataParams);
};
