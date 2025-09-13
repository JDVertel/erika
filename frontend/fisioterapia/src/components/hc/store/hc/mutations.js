// modifican el state

/* export const myGetters =(state)=>{

}  */


export const NumRegHC = (state, entradas) => {
    state.StateNumRegHC = "";
    state.StateNumRegHC = [entradas, ...state.StateNumRegHC];
}


