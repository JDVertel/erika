
export const setVitrina = (state, entradas) => {
  state.entry = "";
  state.entry = [...state.entry, ...entradas];
  state.cargando = false;
  state.cant = entradas.length;
};
/* ======================================================================= */
export const updateDataVitrina = (state, entradas) => {
  const idx = state.entry.map((e) => e.id).indexOf(entradas.id);
  //console.log("imprimo", { idx });
  state.entry[idx] = entradas;
};
/* =========================================================== */
export const newDataVitrina = (state, entradas) => {
  state.entry = [entradas, ...state.entry]

};
/* =================================================== */
export const DeleteItemVitrina = (state, idDelete) => {

  state.entry = state.entry.filter(e => e.id !== idDelete)

};
/* =================================================== */
export const setStateInventario = (state, entrada) => {
  state.StateInventario = [entrada, ...state.StateInventario]
};

export const setStateFacturasDiarias=(state, entrada) => {
  state.StateFacturasDiarias = [entrada, ...state.StateFacturasDiarias]
} 

export const setStateQueryFacturas=(state, entrada) => {
  state.StateQueryFacturas = [entrada, ...state.StateQueryFacturas]
}