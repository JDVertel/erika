/* RUTINA PARA CONSULTAR DATOS DE UN SEGUNDO COMBO DEPENDENTE DE UN PRIMERO POR ID */
// (ide: llave del primer combo  - array de la data - propiedad resultado)

export function BuscarDetalles(ide, array, resultado) {
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === ide) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

/* RUTINA PARA CONSULTAR DATOS DE UN SEGUNDO COMBO DEPENDENTE DE UN PRIMERO POR NOMBRE  */
// (nombre  - array de la data - propiedad resultado)

export function BuscarDetallesNombre(name, array, resultado) {
  console.log("ejecutando!!");
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].organo === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

/* ---------------------------------------------------------- */

export function BuscarAntDetallesNombreEnf(name, array, resultado) {
  console.log("ejecutando!!");
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].nombre === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

export function BuscarIsnpDinamicaDetalleNombre(name, array, resultado) {
  console.log("ejecutando!!");
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].fase === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

export function BuscarExpFisicaDetalleNombre(name, array, resultado) {
  console.log("ejecutando!!");
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].clase === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

export function BuscarExpMuscularDetalleNombre(name, array, resultado) {
  console.log("ejecutando lista real!!");
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].clase === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

export function BuscarEvalMuscularDetalleNombre(name, array, resultado) {
  console.log("ejecutando lista real!!", name, array, resultado);
  let response = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].organo === name) {
      let newarray = array[i];
      response = newarray[resultado];
      console.log(response);
    }
  }
  return response;
}

/* -----------otra funcion que tambien sirve--------------------------------------------------------- */
/* export function buscar_detalle(id, bd) {
  (this.detalle_rta = bd.filter((el) => el.id == id)[0]),
    console.log(this.detalle_rta.detalle);
}
     */
export function consola() {
  console.log("tomando funcion");
}
