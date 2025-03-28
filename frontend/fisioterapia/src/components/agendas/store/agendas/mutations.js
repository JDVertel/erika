// modifican el state

/* export const myGetters =(state)=>{

}  */

/* ---------PACIENTES */

export const setStatePaciente=(state, entryDataPaciente)=>{
    state. datapaciente="";
    state.datapaciente=[...state.datapaciente, ...entryDataPaciente];
    state.existepaciente = entryDataPaciente.length;
}




export const SetStatenoregistrado=(state, noreg)=>{
    state.existepaciente=noreg;
}


/* ++++++++++++++AGENDAS++++++++++++ */


export const setStateAgendas=(state, data)=>{
    //dataAgendas
    state.dataAgendas="";
    state.dataAgendas=[...state.dataAgendas, ...data];
}
//quitar

/* export const setStateCitasPaciente=(state,data)=>{
    state.dataAllCitasPaciente="",
    state.dataAllCitasPaciente=[...state.dataAllCitasPaciente, ...data];
}
 */

/* ------------------------------------CITAS ------------------------------------------------ */

export const setStateCitas=(state , citas)=>{
    state.dataCitas="";
    state.dataCitas=[...state.dataCitas, ...citas];

}

export const setStateAllCitas=(state , citas)=>{
    state.dataAllCitas="";
    state.dataAllCitas=[...state.dataAllCitas, ...citas];

}


/* export const UpdateStateCitas=(state , citas)=>{
    state.dataCitas="";
    state.dataCitas=[...state.dataCitas, ...citas];

} */
/* ---------------------------------VACIAR STORE GENERAL-------------------------------------- */
export const ClearStoreM=(state)=>{
state.dataCitas=[];
state.citasdisponibles="";
state.dataAgendas=[];
state.datapaciente=[];
state.existepaciente="";
state.dataprofesionales=[];
state.existeprofesionales="";
}

export const ClearStorePaciente=(state)=>{
    state.dataAllCitasPaciente=[];
    state.datapaciente=[];
    state.existepaciente="";

}

/* ------PROFESIONALES++++++++++ */

export const setStateProfesionales=(state, entryDataProfesionales)=>{
    state. dataprofesionales="";
    state.dataprofesionales=[...state.dataprofesionales, ...entryDataProfesionales];
    state.existeprofesionales = entryDataProfesionales.length;
}






/* -----------USUARIOS----- */
export const setStateUsuarios=(state, entryDataUsuarios)=>{
    state. datausuarios="";
    state.datausuarios=[...state.datausuarios, ...entryDataUsuarios];
    state.existeusuarios = entryDataUsuarios.length;
}

export const ClosetModalP=(state)=>{
    state.existeusuarios = 0;
}






/* -------------------------------------------------------- */
export const updateDataVitrina = (state, entradas) => {
    const idx = state.entry.map((e) => e.id).indexOf(entradas.id);
    //console.log("imprimo", { idx });
    state.entry[idx] = entradas;
  };


  /* -------------------------------------------------------- */