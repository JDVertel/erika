// modifican el state


/* crear-ver-actualziar */

    export const setStateEmpresa=(state,entradas) =>{
      state.DataEmpresa="";
      state.DataEmpresa=[...state.DataEmpresa, ...entradas];
       state.stateEmpresa="ver";
    }


    export const setStatePagina=(state,entradas) =>{
      state.DataPagina="";
      state.DataPagina=[...state.DataPagina, ...entradas];
    state.statePagina="ver";
    }

/* ---------------------------------------------------------------------- */
    export const muta_UpdateDataEmpresa = (state, entradas) => {
      state.entry= [];
      const idx = state.entry.map((e) => e.id).indexOf(entradas.id);
      //console.log("imprimo", { idx });
      state.entry[idx] = entradas;
    };

    /* ---------------------------------------------------------------------- */
    export const muta_UpdateDataPagina = (state, entradas) => {
      state.entry= [];
      const idx = state.entry.map((e) => e.id).indexOf(entradas.id);
      //console.log("imprimo", { idx });
      state.entry[idx] = entradas;
    };

    export const muta_setNewState =(state,entrada)=>{
      state[entrada.state] = entrada.value;
    };