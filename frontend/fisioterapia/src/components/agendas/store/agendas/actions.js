import firebase_api from "@/api/firebaseApi";

/* -----------------------AGENDAS----------------------------------------- */
export const getDatabyParam = async ({ commit }, parametros) => {
  console.log(parametros);
  const [{ bd, parametro, valor, rta }] = parametros;
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
    "rta:",
    datasalida
  );
  if (datasalida.length != 0) {
    commit(`${rta}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
  }
  return datasalida;
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export const getDataByRangoSuperior = async ({ commit }, parametros) => {
  const [{ bd, parametro, valor, rta }] = parametros;
  /*  console.log("parametros consulta por rango superior", bd,parametro, ">",valor); */
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro}"`,
      startAt: `"${valor}"`,
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
  datasalida.sort((a, b) => {
    if (a.fecha < b.fecha) return -1;
    if (a.fecha > b.fecha) return 1;
    return 0;
  });
  console.log(
    "datos de consulta de",
    bd,
    " rango mayor a :",
    valor,
    datasalida
  );
  if (datasalida.length != 0) {
    commit(`${rta}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
  }
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export const CreateAgendaNueva = async ({ commit }, entradas) => {
  const { id_profesional, fecha, id_ips, clase, bd } = entradas;
  const D_Save = {
    id_profesional,
    fecha,
    id_ips,
    clase,
  };
  console.log("ok entrada guardar datos", entradas);
  const Ruta = `/${bd}.json`;
  /*    console.log(Ruta) */
  //servicio
  const { data } = await firebase_api.post(Ruta, D_Save);
  //agregamos el id al array para subirlo al strore
  D_Save.id = data.name;
  //se llama a la mutacion y s epasa el array como
  console.log(D_Save);
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export const GetAgendasSelectAct = async ({ commit }, entradas) => {
  const [{ bd, parametro, valor }] = parametros;
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
  console.log("data consulta por parametros", bd, "por", parametro);
  if (datasalida.length != 0) {
    /* commit(`${rta}`, datasalida); */
  } else {
    console.log("sin datos en la consulta");
  }
  return datasalida;
};

/* -----------------------CITAS----------------------------------------- */

export const getDataUsersbyParam = async ({ commit }, parametros) => {
  const [{ bd, parametro, valor, rta }] = parametros;

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
    commit(`${rta}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
    const datasalida = 2;
    commit("SetStatenoregistrado", datasalida);
  }
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export const createEntradaCitaNueva = async ({ commit }, entradas) => {
  const {
    paciente,
    numdoc,
    telpaciente,
    estado,
    hora,
    id_agenda,
    tipo,
    fecha,
    idprofesional,
    bd,
  } = entradas;
  const DataToSave = {
    paciente,
    numdoc,
    telpaciente,
    estado,
    hora,
    id_agenda,
    tipo,
    fecha,
    idprofesional,
  };

  console.log("guardando cita",DataToSave);

  const Ruta = `/${bd}.json`;
  console.log("se guardara:", entradas, "en bd", bd, "ruta:", Ruta);
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSave);
  //agregamos el id al array para subirlo al strore
  DataToSave.id = data.name;
  //se llama a la mutacion y s epasa el array como
  console.log(DataToSave);
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export const createEntradanewPaciente = async ({ commit }, entradas) => {
  const {
    numdoc,
    name1,
    name2,
    apell1,
    apell2,
    celular,
    email,
    dir,
    fnacimiento,
    bd,
  } = entradas;
  const DataToSave = {
    numdoc,
    name1,
    name2,
    apell1,
    apell2,
    celular,
    email,
    dir,
    fnacimiento,
  };
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DataToSave);
  DataToSave.id = data.name;
  console.log("paciente guardado exitosamente", +data.name);
};
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export const ClosetModalNewPaciente = async ({ commit }) => {
  commit("ClosetModalP");
};
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export const NewgetDataUsersbyParam = async ({ commit }, parametros) => {
  const [{ bd, parametro1, valor1, rta }] = parametros;
  console.log("action", parametros);
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro1}"`,
      startAt: `"${valor1}"`,
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
  if (datasalida.length != 0) {
    commit(`${rta}`, datasalida);
    console.log("data de citas activas paciente", datasalida);
  } else {
    console.log("sin datos en la consulta");
  }
};

/* ---------------------PARAMETROS--------------------------------- */

export const createEntradaUser = async ({ commit }, entradas) => {
  const { id_ips, estado, nombre, pass, rol, doc, bd } = entradas;
  const DataToSave = { id_ips, estado, doc, nombre, pass, rol };
  const Ruta = `/${bd}.json`;
  /*   console.log(Ruta) */
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSave);
  //agregamos el id al array para subirlo al strore
  DataToSave.id = data.name;
  //se llama a la mutacion y s epasa el array como
  console.log(DataToSave);
  /*     commit("newDataVitrina", DataToSave); */
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export const createEntradaProf = async ({ commit }, entradas) => {
  const {
    id_ips,
    estado,
    doc,
    name1,
    name2,
    apell1,
    apell2,
    cel,
    reg_medico,
    tipo,
    correo,
    bd,
  } = entradas;
  const DataToSave = {
    id_ips,
    estado,
    doc,
    name1,
    name2,
    apell1,
    apell2,
    cel,
    reg_medico,
    tipo,
    correo,
  };
  console.log("ok", entradas);
  const Ruta = `/${bd}.json`;
  console.log(Ruta);
  //servicio
  const { data } = await firebase_api.post(Ruta, DataToSave);
  //agregamos el id al array para subirlo al strore
  DataToSave.id = data.name;
  //se llama a la mutacion y s epasa el array como
  console.log(DataToSave);
  /*     commit("newDataVitrina", DataToSave); */
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export const DeleteItem = async ({ commit }, entradas) => {
  const { id, bd } = entradas;
  const Ruta = `/${bd}/${id}.json`;
  console.log(Ruta);
  //servicio
  const { data } = await firebase_api.delete(Ruta);
  /*   commit("DeleteItemVitrina", entradas); */
};
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

export const clearDataStoreA = async ({ commit }) => {
  commit("ClearStoreM");
};

export const clearStorePaciente = async ({commit})=>{
  commit("ClearStorePaciente")
}

/* ----------------PROFESIONAL-------------------------------------------- */

export const updateReserva = async ({ commit }, entradas) => {
  console.log("variable entradas ", entradas);
  const {
    id,
    estado,
    fecha,
    hora,
    id_agenda,
    idprofesional,
    numdoc,
    paciente,
    telpaciente,
    tipo,
    bd,
  } = entradas;
  const dataToSave = {
    id,
    estado,
    fecha,
    hora,
    id_agenda,
    idprofesional,
    numdoc,
    paciente,
    telpaciente,
    tipo,
    bd,
  };
  const Ruta = `/${bd}/${id}.json`;
  //servicio
  const response = await firebase_api.put(Ruta, dataToSave);
  /* commit("updateDataVitrina", { ...entradas }); */
};

/* ------------------Contar Elementos de un listado------------- */
export const getCountDatabyParam = async ({ commit }, parametros) => {
  console.log(parametros);
  const [{ bd, parametro, valor }] = parametros;
  const response = await firebase_api.get(`/${bd}.json`, {
    params: {
      orderBy: `"${parametro}"`,
      equalTo: `"${valor}"`,
    },
  });
  const { data } = response;
  const datasalida = [];
  const rta= datasalida.count
  /*
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
    "rta:",
    datasalida
  ); 
  if (datasalida.length != 0) {
    commit(`${rta}`, datasalida);
  } else {
    console.log("sin datos en la consulta");
  } */
  return rta;
};