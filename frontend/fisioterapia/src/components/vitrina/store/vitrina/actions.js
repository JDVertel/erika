import firebase_api from "@/api/firebaseApi";


export const load_Vitrina = async ({ commit }) => {
  const response = await firebase_api.get("/vitrina.json");
  const { data } = response;
  const dataentradas = [];
  for (let id of Object.keys(data)) {
    dataentradas.push({
      id,
      ...data[id],
    });
  }

  commit("setVitrina", dataentradas);
}
/*  */
export const getDatosVitrinabyParams = async ({ commit }, parametros) => {
  const { bd, parametro, valor, mutation } = parametros;

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
  console.log("busqueda por parametro", parametro, bd, datasalida);
  if (datasalida.length != 0) {
    commit(`${mutation}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
   /*  const datasalida = 2;
    commit("SetStatenoregistrado", datasalida); */
  }
};


/* ============================================================= */

export const updateVitrinaP = async ({ commit }, entradas) => {
  console.log("variable entradas ", entradas);
  const { id_ips, tipo, nombre, desc, precio, cant, publicado,img } = entradas;
  const dataToSave = { id_ips, tipo, nombre, desc, precio, cant, publicado,img };
  const ruta = `/vitrina/${entradas.id}.json`;
  //servicio
  const response = await firebase_api.put(ruta, dataToSave);
  commit("updateDataVitrina", { ...entradas });
};

export const updateVitrinaS = async ({ commit }, entradas) => {
  console.log("variable entradas ", entradas);
  const { id_ips, tipo, nombre, desc, precios, publicado,img } = entradas;
  const dataToSave = { id_ips, tipo, nombre, desc, precios, publicado,img  };
  const ruta = `/vitrina/${entradas.id}.json`;
  //servicio
  const response = await firebase_api.put(ruta, dataToSave);
  commit("updateDataVitrina", { ...entradas });
};

/* ============================================================= */

export const createEntradaVitrinaS = async ({ commit }, entradas) => {
  const { id_ips, tipo, nombre, desc, precios, cant, img, publicado } = entradas;
  const DataToSave = {
    id_ips,
    tipo,
    nombre,
    desc,
    precios,
    cant,
    img,
    publicado,
  };
  /*  console.log("ok", DataToSave); */
  const Ruta = `/vitrina.json`;
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSave);
  //agregamos el id al array para subirlo al strore
  DataToSave.id = data.name;
  //se llama a la mutacion y s epasa el array como
  commit("newDataVitrina", DataToSave);
};


export const createEntradaVitrina = async ({ commit }, entradas) => {
  const { id_ips, tipo, nombre, desc, precio, cant, img, publicado } = entradas;
  const DataToSave = {
    id_ips,
    tipo,
    nombre,
    desc,
    precio,
    cant,
    img,
    publicado,
  };
  /*  console.log("ok", DataToSave); */
  const Ruta = `/vitrina.json`;
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSave);
  //agregamos el id al array para subirlo al strore
  DataToSave.id = data.name;
  //se llama a la mutacion y se pasa el array como
  commit("newDataVitrina", DataToSave);
};
/* =========================================== */
export const CambiarEstadoVitrina = async ({ commit }, entradas) => {
  /*  */
  const { id_ips, tipo, nombre, desc, precios, cant, publicado, img } = entradas;
  const DataStore = { id_ips, tipo, nombre, desc, precios, cant, publicado, img };
  DataStore.publicado = !publicado;
  console.log(DataStore);
  const ruta = `/vitrina/${entradas.id}.json`;
  entradas.publicado = !entradas.publicado;
  const response = await firebase_api.put(ruta, DataStore);
  commit("updateDataVitrina", { ...entradas });
};


/* ================================================================= */

export const DeleteItemVitrina = async ({ commit }, entradas) => {
  const Ruta = `/vitrina/${entradas}.json`;
  //servicio
  const { data } = await firebase_api.delete(Ruta);
  commit("DeleteItemVitrina", entradas);
};

// acciones asyncronas  que llaman a mutaciones


















/* ======================funcion filtrado x id */
/* const response = await firebase_api.get('/vitrina.json', {
  params: {
    orderBy: '"tipo"',
    equalTo: '"terapia"',
  },
});
 */
