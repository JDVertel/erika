# Store Modules Index

## Quick Reference

| Module      | Purpose                               | Key State                                        | Main Actions                                                                  |
| ----------- | ------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| **Auth**    | Authentication & company/page config  | `id_ips`, `DataEmpresa`, `DataPagina`            | `getDataIPSbyParam`, `Action_update_Empresa`                                  |
| **Agendas** | Appointments, patients, professionals | `dataCitas`, `datapaciente`, `dataprofesionales` | `getDatabyParam`, `createEntradaCitaNueva`, `updateReserva`                   |
| **HC**      | Medical records (13 sections)         | `id_paciente`, `StateNumRegHC`                   | `SaveHCcabecera`, `SaveDatos1-13`                                             |
| **Vitrina** | E-commerce & invoicing                | `entry`, `StateFacturasDiarias`                  | `load_Vitrina`, `createEntradaFacturaCabecera`, `createEntradaFacturaDetalle` |

---

## Module Details

### 1. Auth Module

**Path**: `src/components/dashboard/store/auth/`
**Namespace**: `Auth`
**Files**:

- `state.js` - Authentication state
- `actions.js` - Company & page CRUD operations
- `mutations.js` - State updates
- `getters.js` - (empty, use mapState)
- `index.js` - Module export
- `README.md` - Detailed documentation

**State**: 8 properties (auth, id_ips, id_user, rol, DataEmpresa[], DataPagina[], stateEmpresa, statePagina)
**Actions**: 6 functions
**Mutations**: 3 functions

---

### 2. Agendas Module

**Path**: `src/components/agendas/store/agendas/`
**Namespace**: `Agendas`
**Files**:

- `state.js` - Appointment data state
- `actions.js` - Data retrieval, creation, modification
- `mutations.js` - State updates (cleaned, 9 mutations)
- `getters.js` - (empty, use mapState)
- `index.js` - Module export
- `README.md` - Detailed documentation
- `mutations_clean.js` - Backup/reference file

**State**: 11 properties (datapaciente[], dataCitas[], dataprofesionales[], etc.)
**Actions**: 14 functions
**Mutations**: 11 functions

---

### 3. HC Module (Medical Records)

**Path**: `src/components/hc/store/hc/`
**Namespace**: `hc`
**Files**:

- `state.js` - HC metadata
- `actions.js` - Saving 14 HC sections
- `mutations.js` - State updates (cleaned)
- `getters.js` - (empty, use mapState)
- `index.js` - Module export
- `README.md` - Detailed documentation

**State**: 4 properties (id_paciente, id_ips, id_prof, StateNumRegHC)
**Actions**: 14 functions (SaveHCcabecera + SaveDatos1-13)
**Mutations**: 1 function

---

### 4. Vitrina Module (E-Commerce)

**Path**: `src/components/vitrina/store/vitrina/`
**Namespace**: `vitrina`
**Files**:

- `state.js` - Product & invoice state
- `actions.js` - Catalog & invoicing operations
- `mutations.js` - State updates (cleaned, 7 mutations)
- `getters.js` - (empty, use mapState)
- `index.js` - Module export
- `README.md` - Detailed documentation

**State**: 6 properties (entry[], cargando, cant, StateInventario[], StateFacturasDiarias[], StateQueryFacturas[])
**Actions**: 17 functions
**Mutations**: 7 functions

---

## Store Initialization

```javascript
// src/store/index.js
import { createStore } from "vuex";
import Auth from "./../components/dashboard/store/auth/index";
import Agendas from "../components/agendas/store/agendas/index";
import Hc from "../components/hc/store/hc";
import vitrina from "./../components/vitrina/store/vitrina/index";

const store = createStore({
  modules: {
    Auth,
    Agendas,
    hc: Hc,
    vitrina,
  },
});

export default store;
```

---

## Usage in Components

### Import Pattern

```javascript
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("Auth", ["id_ips", "DataEmpresa"]),
    ...mapState("Agendas", ["datapaciente", "dataCitas"]),
    ...mapState("hc", ["id_paciente", "StateNumRegHC"]),
    ...mapState("vitrina", ["entry", "cargando"]),
  },
  methods: {
    ...mapActions("Auth", ["getDataIPSbyParam"]),
    ...mapActions("Agendas", ["getDatabyParam", "updateReserva"]),
    ...mapActions("hc", ["SaveHCcabecera", "SaveDatos1"]),
    ...mapActions("vitrina", ["load_Vitrina", "createEntradaVitrina"]),
  },
};
```

### Dispatch Example

```javascript
// Using dispatch for complex scenarios
await this.$store.dispatch("Agendas/getDatabyParam", [
  {
    bd: "citas",
    parametro: "fecha",
    valor: "2026-01-14",
    rta: "setStateCitas",
  },
]);
```

---

## State Management Statistics

| Metric                       | Count |
| ---------------------------- | ----- |
| Total Modules                | 4     |
| Total State Properties       | 29    |
| Total Actions                | 51    |
| Total Mutations              | 22    |
| Console.logs (for debugging) | 43+   |
| Documentation Files          | 5     |

---

## Console Logging

All actions include console.logs for debugging:

```javascript
console.log("Getting data by parameter:", { bd, parametro, valor });
console.log("Creating new appointment:", entradas);
console.log("Error al guardar:", error);
```

**To debug**:

1. Open Browser DevTools (F12)
2. Go to Console tab
3. Perform action
4. Look for logged output
5. Check Network tab for API calls

---

## Documentation Structure

```
src/store/
├── index.js                      # Main store config (enhanced)
├── STORE_STRUCTURE.md           # Overview of all modules
├── BEST_PRACTICES.md            # Guidelines for development
├── MODULES_INDEX.md             # This file
│
└── components/
    ├── dashboard/store/auth/
    │   ├── state.js
    │   ├── actions.js
    │   ├── mutations.js
    │   ├── getters.js
    │   ├── index.js
    │   └── README.md             # Auth module details
    │
    ├── agendas/store/agendas/
    │   ├── state.js
    │   ├── actions.js
    │   ├── mutations.js
    │   ├── getters.js
    │   ├── index.js
    │   ├── README.md             # Agendas module details
    │   └── mutations_clean.js
    │
    ├── hc/store/hc/
    │   ├── state.js
    │   ├── actions.js
    │   ├── mutations.js
    │   ├── getters.js
    │   ├── index.js
    │   └── README.md             # HC module details
    │
    └── vitrina/store/vitrina/
        ├── state.js
        ├── actions.js
        ├── mutations.js
        ├── getters.js
        ├── index.js
        └── README.md             # Vitrina module details
```

---

## Key Principles

1. ✅ **Namespaced**: All modules use `namespaced: true`
2. ✅ **Documented**: Each module has README.md
3. ✅ **Debuggable**: Console.logs in all actions
4. ✅ **No Dead Code**: All mutations and actions verified as used
5. ✅ **Clean**: Removed unnecessary state, getters, and mutations
6. ✅ **Organized**: Clear separation of concerns
7. ✅ **Validated**: Components validate params before routing

---

## Next Steps for Enhancement

- [ ] Centralize modules to `src/store/modules/`
- [ ] Add TypeScript definitions
- [ ] Implement state persistence
- [ ] Add error handling middleware
- [ ] Create module factory pattern
- [ ] Add unit tests for actions
