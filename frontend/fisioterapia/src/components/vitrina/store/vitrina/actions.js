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
  const { id_ips, tipo, nombre, desc, precio, cant, publicado, img } = entradas;
  const dataToSave = { id_ips, tipo, nombre, desc, precio, cant, publicado, img };
  const ruta = `/vitrina/${entradas.id}.json`;
  //servicio
  const response = await firebase_api.put(ruta, dataToSave);
  commit("updateDataVitrina", { ...entradas });
};


export const updateVitrinaS = async ({ commit }, entradas) => {
  console.log("variable entradas ", entradas);
  const { id_ips, tipo, nombre, desc, precios, publicado, img } = entradas;
  const dataToSave = { id_ips, tipo, nombre, desc, precios, publicado, img };
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

/******************************************************************/
export const createEntradaFacturaCabecera = async ({ commit }, entradas) => {
  const { idpac, idfact, idips, fecha } = entradas;
  if (idpac && idpac.trim() !== "") {
    const DataToSave = {
      idpac,
      idfact,
      idips,
      fecha,
    };
    const Ruta = `/facturasCabecera.json`;
    try {
      const { data } = await firebase_api.post(Ruta, DataToSave);
      return data; // Retorna la respuesta del servidor si es necesario
    } catch (error) {
      console.error("Error al guardar la factura cabecera:", error);
      throw error; // Re-lanzar el error para que el llamador lo maneje
    }
  } else {
    console.log("No se guardó nada: idpac inválido o vacío en caberera");
    return null;
  }
}
/* *************************************************************/
/* export const createEntradaFacturaDetalle = async ({ commit }, entradas) => {
  console.log("data que llega", entradas);

  const { idpac, idfact, idips, categoria, nombre, combo, precio, cant, subt, fecha } = entradas;

  if (idpac && idpac.trim() !== "") {
    const DataToSave = {
      idpac,
      idfact,
      idips,
      categoria,
      nombre,
      combo,
      precio,
      cant,
      subt,
      fecha
    };

    console.log("ok a guardar", DataToSave);
    const Ruta = `/facturasDetalle.json`;

    try {
      const { data } = await firebase_api.post(Ruta, DataToSave);
      return data; // Retorna la respuesta del servidor si es necesario
    } catch (error) {
      console.error("Error al guardar la factura detalle:", error);
      throw error; // Re-lanzar el error para que el llamador lo maneje
    }
  } else {
    console.log("No se guardó nada: idpac inválido o vacío en detalle");
    return null;
  }
} */
export const createEntradaFacturaDetalle = async ({ commit }, entradas) => {
  console.log("Datos recibidos detalle factura (array de entradas):", entradas);

  try {
    // Array para almacenar todas las promesas de guardado
    const promesasGuardado = entradas.map(async (entrada) => {
      const { idpac, idfact, idips, categoria, nombre, combo, precio, cant, subt, fecha } = entrada;

      if (!idpac || idpac.trim() === "") {
        console.error("Entrada inválida: idpac vacío o no definido", entrada);
        return null;
      }

      const DataToSave = {
        idpac,
        idfact,
        idips,
        categoria,
        nombre,
        combo,
        precio,
        cant: Number(cant),
        subt: Number(subt),
        fecha
      };

      console.log("Guardando entrada:", DataToSave);
      const Ruta = `/facturasDetalle.json`;

      return firebase_api.post(Ruta, DataToSave)
        .then(({ data }) => data)
        .catch(error => {
          console.error("Error en entrada:", error);
          throw { error, entrada }; // Lanza el error con contexto
        });
    });

    // Ejecuta todas las operaciones en paralelo
    const resultados = await Promise.all(promesasGuardado);
    console.log("Todas las entradas guardadas");
    return resultados.filter(r => r !== null); // Filtra entradas inválidas

  } catch (error) {
    console.error("Error global en createEntradaFacturaDetalle:", error);
    throw error; // Propaga el error para manejo superior
  }
};

/* -------------------------------------------------------------- */

/* ----------------------------------------- */

export const getListFacturasDia = async ({ commit }, parametros) => {
  /*  */
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

  }


}
/*  */
export const getDatosVitrinabyParamsDate = async ({ commit }, parametros) => {
  const { bd, parametro, fechaInicio, fechaFin, mutation } = parametros;
  // Usa startAt y endAt para el rango de fechas
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro}"`,
      startAt: `"${fechaInicio}"`,
      endAt: `"${fechaFin}"`,
    },
  });
  const { data } = response;
  const datasalida = [];
  for (let id of Object.keys(data || {})) {
    datasalida.push({
      id,
      ...data[id],
    });
  }
  /*  console.log("busqueda por rango de fechas", fechaInicio, fechaFin, bd, datasalida); */
  if (datasalida.length != 0) {
    commit(`${mutation}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
  }
}


/* -----------------------factura----------------- */

export const getCurrentIdFactura = async ({ commit }, parametros) => {
  const { bd, parametro, valor } = parametros;
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro}"`,
      equalTo: `${valor}`,
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
  let idFactura = datasalida[0].idFact;
  let id = datasalida[0].id;
  return { idFactura, id };
}

export const UpdateNewIdFactura = async ({ commit }, entradas) => {
  const { bd, id, idFact } = entradas;
  const ruta = `/${bd}/${id}.json`;
  const dataToSave = { idFact };
  try {
    const response = await firebase_api.patch(ruta, dataToSave);
    return response.data;
  } catch (error) {
    console.error("Error actualizando factura:", error);
    throw error;
  }
};
