# Store Best Practices Guide

## Overview

This document outlines best practices and conventions for working with the Vuex store system.

## 1. Action vs Mutation Usage

### Use ACTIONS for:

```javascript
// ✅ Asynchronous operations
export const getDatabyParam = async ({ commit }, parametros) => {
  const response = await firebase_api.get(`/${bd}.json`, {...});
  const data = processData(response);
  commit('setStatePaciente', data);
};

// ✅ Multiple mutations
export const createEntry = async ({ commit }, data) => {
  const response = await firebase_api.post('/path', data);
  commit('addToList', response);
  commit('incrementCount', 1);
};

// ✅ Complex logic
export const updateReserva = async ({ commit }, entradas) => {
  const current = await firebase_api.get(`/ruta/${id}.json`);
  const updated = { ...current, ...entradas };
  await firebase_api.put(`/ruta/${id}.json`, updated);
  commit('updateDataVitrina', updated);
};
```

### Use MUTATIONS for:

```javascript
// ✅ Synchronous state changes
export const setStatePaciente = (state, data) => {
  state.datapaciente = [...data];
};

// ✅ Simple state updates
export const ClosetModalP = (state) => {
  state.existeusuarios = 0;
};

// ❌ DON'T: Async operations in mutations
export const badMutation = async (state, data) => { // WRONG!
  await someAsyncCall();
};

// ❌ DON'T: Multiple API calls
export const badMutation = (state, data) => {
  firebase_api.post(...); // WRONG!
};
```

## 2. Component Integration

### Correct Pattern:

```javascript
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    // Map state - READ ONLY
    ...mapState("Agendas", ["datapaciente", "dataCitas"]),
    ...mapState("Auth", ["id_ips"]),

    // Computed properties for derived state
    totalAppointments() {
      return this.dataCitas.length;
    },
  },

  methods: {
    // Map actions - for mutations and async operations
    ...mapActions("Agendas", ["getDatabyParam", "updateReserva"]),

    async loadData() {
      await this.getDatabyParam([
        {
          bd: "citas",
          parametro: "fecha",
          valor: this.today,
          rta: "setStateCitas",
        },
      ]);
    },
  },

  created() {
    this.loadData();
  },
};
```

### Avoid:

```javascript
// ❌ Direct state mutation
this.$store.state.Agendas.dataCitas = []; // WRONG!

// ❌ Forgetting namespacing
this.$dispatch('getDatabyParam', params); // WRONG!
this.$store.dispatch('Agendas/getDatabyParam', params); // RIGHT

// ❌ Logic in components instead of actions
async loadData() {
  const response = await firebase_api.get(...); // WRONG!
  // Do this in an action instead
}
```

## 3. Naming Conventions

### State

```javascript
// ✅ Plural for collections
datapaciente[]      // ✓ clear
dataCitas[]         // ✓ clear
existepaciente      // ✓ flag name

// ❌ Ambiguous
data[]              // X too generic
patients            // X mixes languages
isLoading           // X should be in component
```

### Actions

```javascript
// ✅ Verb-based, descriptive
getDatabyParam;
createEntradaCitaNueva;
updateReserva;
DeleteItem;

// ❌ Vague
getData; // X too generic
save; // X unclear what
load; // X load what?
```

### Mutations

```javascript
// ✅ Clear operation
setStatePaciente;
setStateAgendas;
ClearStoreM;

// ❌ Unclear
update; // X what updates?
change; // X what changes?
set; // X too generic
```

## 4. Error Handling

### In Actions:

```javascript
export const SaveHCcabecera = async ({ commit }, Data) => {
  console.log("Saving HC header:", Data);
  const { idpaciente, idprofesional, idips } = Data;
  const DatatoSave = { idpaciente, idprofesional, idips };
  const Ruta = `/hc_cabeceras.json`;

  try {
    const { data } = await firebase_api.post(Ruta, DatatoSave);
    const idGenerado = data.name;

    // Validate response
    if (!idGenerado) {
      throw new Error("No ID generated from server");
    }

    const updateObj = { idHC: idGenerado };
    await firebase_api.patch(`/hc_cabeceras/${idGenerado}.json`, updateObj);

    commit("NumRegHC", { ...DatatoSave, ...updateObj });
    return idGenerado;
  } catch (error) {
    console.error("Error saving HC header:", error);
    throw error; // Re-throw for component handling
  }
};
```

### In Components:

```javascript
try {
  await this.SaveHCcabecera(data);
  this.$toast.success("Medical record created");
} catch (error) {
  console.error("Failed to create record:", error);
  this.$toast.error("Failed to create medical record");
}
```

## 5. Data Flow Pattern

```
User Action (click, form submit)
    ↓
Component Method
    ↓
mapActions/dispatch → Store Action
    ↓
Action performs logic & API calls
    ↓
Action commits Mutation
    ↓
Mutation updates State
    ↓
Component's computed property (via mapState)
    ↓
Re-render with new data
```

## 6. State Organization Rules

1. **Keep state flat where possible**

   ```javascript
   // ✅ GOOD
   { datapaciente: [], dataCitas: [] }

   // ❌ AVOID unnecessary nesting
   { data: { patients: [], appointments: [] } }
   ```

2. **Use arrays for collections, booleans for flags**

   ```javascript
   datapaciente: [],        // Array of objects
   existepaciente: 0        // Flag (0, 1, 2)
   ```

3. **Normalize related data**

   ```javascript
   // Instead of duplicating data in every appointment:
   datapaciente: [{ id: "1", name: "John" }];
   dataCitas: [{ id: "c1", idpaciente: "1", hora: "10:00" }];

   // Components can join them as needed
   ```

## 7. Debugging with Console.logs

All actions include console.logs for tracking:

```javascript
console.log("Getting data by parameter:", { bd, parametro, valor });
console.log("Creating new appointment:", entradas);
console.log("Error al guardar la factura cabecera:", error);
```

Use browser DevTools console to trace data flow:

1. Open DevTools (F12)
2. Go to Console tab
3. Look for action logs to trace execution
4. Check Network tab to verify API calls

## 8. Testing Tips

### Before Dispatch:

- Log input parameters
- Verify data types match expectations
- Check required fields aren't missing

### After Dispatch:

- Verify state updated correctly
- Check component re-rendered
- Confirm no console errors

### Common Issues:

- Parameters undefined → check mapState spelling
- State not updating → verify mutation name in commit()
- API errors → check Firebase rules and database structure
