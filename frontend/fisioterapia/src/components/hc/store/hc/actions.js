import firebase_api from "@/api/firebaseApi";

/* hc1 datos de consulta */

export const SaveDatos1 = async ({ commit }, Data) => {
  //desestructurar data
  console.log("llego", Data);
  const {
    idhc,
    motivoConsulta,
    Enfermedad,
    TratPrevios,
    MedPrevios,
    peso,
    talla,
    estatura,
    imc,
    temp,
    fcardiaca,
    frespiratoria,
    tarterial,
    bd,
    ant,
  } = Data;
  //preparar datos de almacenamiento y parametros
  const DatatoSave = {
    idhc,
    motivoConsulta,
    Enfermedad,
    TratPrevios,
    MedPrevios,
    peso,
    talla,
    estatura,
    imc,
    temp,
    fcardiaca,
    frespiratoria,
    tarterial,
    ant,
  };

  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc2 observacion */

export const SaveDatos2 = async ({ commit }, Data) => {
  const { idpaciente, idhc, dataObserv, bd } = Data;
  const DatatoSave = { idpaciente, idhc, dataObserv };
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc3 inspeccion estatica */

export const SaveDatos3 = async ({ commit }, Data) => {
  const { idpaciente, idhc, bd, dataeval } = Data;
  const DatatoSave = { idpaciente, idhc, dataeval };
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc4 evaluacion postural */

export const SaveDatos4 = async ({ commit }, Data) => {
  const {idpaciente,idhc,bd,dataeval} = Data;
  const DatatoSave = {idpaciente,idhc,dataeval};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc5 inspeccion dinamica */

export const SaveDatos5 = async ({ commit }, Data) => {
  const {idpaciente,idhc,bd,Acualitativo,Acuantitativo} = Data;
  const DatatoSave = {idpaciente,idhc,Acualitativo,Acuantitativo};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc6 escala visual */

export const SaveDatos6 = async ({ commit }, Data) => {
  const {idpaciente,bd,idhc,D_escala,D_ubicacion,D_semiologia} = Data;
  const DatatoSave = {idpaciente,idhc,D_escala,D_ubicacion,D_semiologia};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc7 imagenes */

export const SaveDatos7 = async ({ commit }, Data) => {
  const {} = Data;
  const DatatoSave = {};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc8 exploracion fisica */

export const SaveDatos8 = async ({ commit }, Data) => {
  const {idpaciente,idhc,bd,Data_observaciones,Data_SOseo, Data_EvalMSuperior,Data_EvalMInferior} = Data;
  const DatatoSave = {idpaciente,idhc,Data_observaciones,Data_SOseo, Data_EvalMSuperior,Data_EvalMInferior};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc9 sistema muscular */

export const SaveDatos9 = async ({ commit }, Data) => {
  const {} = Data;
  const DatatoSave = {};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc10 analisis */

export const SaveDatos10 = async ({ commit }, Data) => {
  const { analisis, bd, idhc } = Data;
  const DatatoSave = { analisis, idhc };
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc11 diagnostico */

export const SaveDatos11 = async ({ commit }, Data) => {
  const {} = Data;
  const DatatoSave = {};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc12 tratamiento */

export const SaveDatos12 = async ({ commit }, Data) => {
  const { planTratamiento, objetivos, bd, idhc } = Data;
  const DatatoSave = {
    planTratamiento,
    objetivos,
    idhc,
  };
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};

/* hc13 orden medica */

export const SaveDatos13 = async ({ commit }, Data) => {
  const {} = Data;
  const DatatoSave = {};
  const Ruta = `/${bd}.json`;
  const { data } = await firebase_api.post(Ruta, DatatoSave);
  DatatoSave.id = data.name;
  console.log("guardando " + DatatoSave);
};
