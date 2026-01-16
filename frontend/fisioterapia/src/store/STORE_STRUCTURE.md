# Store Structure Documentation

## Overview

The Vuex store is organized into modular, namespaced modules for better maintainability and scalability.

## Current Module Structure

### 1. **Auth Module** (`components/dashboard/store/auth/`)

**Purpose**: Authentication and company/page data management
**State**:

- `auth`: Authentication status (boolean)
- `id_ips`, `id_user`, `rol`: User authentication info
- `DataEmpresa[]`: Company data
- `DataPagina[]`: Page data
- `stateEmpresa`, `statePagina`: Status flags

**Actions**:

- `Action_createDataEmpresa` - Create company
- `Action_update_Empresa` - Update company
- `Action_createDataPagina` - Create page
- `Action_update_Pagina` - Update page
- `getDataIPSbyParam` - Retrieve by parameter
- `ChangeState` - Generic state modifier

**Mutations**:

- `setStateEmpresa`, `setStatePagina`, `setStateProfesionales`, `setStateDataProfesional` - Load data
- `muta_setNewState` - Generic state updater

**Getters**: None (components use mapState directly)

---

### 2. **Agendas Module** (`components/agendas/store/agendas/`)

**Purpose**: Appointment scheduling, patients management
**State**:

- `datapaciente[]`: Patient data
- `datausuarios[]`: User data
- `dataCitas[]`: Appointments
- `dataAllCitas[]`: All appointments
- `dataAgendas[]`: Schedules
- Existence flags: `existepaciente`, `existeusuarios`

**Note**: `dataprofesionales[]` and `existeprofesionales` moved to Auth module

**Actions**:

- `getDatabyParam` - Retrieve data by parameter
- `getDatabyKey` - Retrieve by primary key
- `getDataByRangoSuperior` - Retrieve by date range
- `CreateAgendaNueva` - Create new schedule
- `getDataUsersbyParam` - Get users
- `createEntradaCitaNueva` - Create appointment
- `createEntradanewPaciente` - Create patient
- `createEntradaUser` - Create user
- `createEntradaProf` - Create professional
- `DeleteItem` - Delete entry
- `clearDataStoreA` - Clear store
- `clearStorePaciente` - Clear patient data
- `updateReserva` - Update appointment status

**Mutations** (9 total):

- `setStatePaciente`, `setStateAgendas`, `setStateCitas`, `setStateAllCitas`
- `setStateUsuarios`
- `ClearStoreM`, `ClearStorePaciente`, `ClosetModalP`

**Getters**: None (components use mapState directly)

---

### 3. **HC Module** (`components/hc/store/hc/`)

**Purpose**: Medical records (Historia Clínica) management
**State**:

- `id_paciente`, `id_ips`, `id_prof`: HC metadata
- `StateNumRegHC`: Medical record registration number

**Actions** (14 total):

- `SaveHCcabecera` - Save HC header
- `SaveDatos1-13` - Save each HC section:
  1. Initial consultation & vital signs
  2. Clinical observation
  3. Static inspection
  4. Postural evaluation
  5. Dynamic inspection
  6. Visual pain scale
  7. Diagnostic images
  8. Physical examination
  9. Muscular system
  10. Analysis/assessment
  11. Diagnosis
  12. Treatment plan
  13. Medical orders

**Mutations**:

- `NumRegHC` - Set medical record number

**Getters**: None (components use mapState directly)

---

### 4. **Vitrina Module** (`components/vitrina/store/vitrina/`)

**Purpose**: E-commerce products, services, and invoicing
**State**:

- `entry[]`: Product catalog
- `cargando`: Loading status
- `cant`: Product quantity
- `StateInventario[]`: Inventory state
- `StateFacturasDiarias[]`: Daily invoices
- `StateQueryFacturas[]`: Invoice query results

**Actions** (17 total):

- **Products**: `load_Vitrina`, `getDatosVitrinabyParams`, `getDatosVitrinabyParamsDate`, `updateVitrinaP`, `createEntradaVitrina`, `newDataVitrina`
- **Services**: `updateVitrinaS`, `createEntradaVitrinaS`
- **Status**: `CambiarEstadoVitrina`, `DeleteItemVitrina`
- **Invoicing**: `createEntradaFacturaCabecera`, `createEntradaFacturaDetalle`, `getListFacturasDia`, `getCurrentIdFactura`, `UpdateNewIdFactura`

**Mutations** (7 total):

- `setVitrina`, `updateDataVitrina`, `newDataVitrina`, `DeleteItemVitrina`
- `setStateInventario`, `setStateFacturasDiarias`, `setStateQueryFacturas`

**Getters**: None (components use mapState directly)

---

## Console Logging

All action functions include `console.log()` for debugging:

- Logs action name and parameters
- Logs errors when applicable
- Helps track data flow through the store

## Best Practices Implemented

1. **Namespaced Modules**: All modules use `namespaced: true`
2. **JSDoc Comments**: All actions documented with purpose and parameters
3. **Separation of Concerns**: State, mutations, actions, and getters are separate files
4. **Data Validation**: Components validate parameters before routing
5. **Error Handling**: Try-catch blocks in complex operations
6. **No Dead Code**: All mutations and actions verified as used

## File Locations

```
src/
├── store/
│   ├── index.js (main store configuration)
│   ├── STORE_STRUCTURE.md (this file)
│   └── modules/
│       ├── auth.module.js (future: centralized auth module)
│       ├── agendas.module.js (future: centralized agendas module)
│       ├── hc.module.js (future: centralized HC module)
│       └── vitrina.module.js (future: centralized vitrina module)
│
└── components/
    ├── dashboard/store/auth/ (current: Auth module)
    ├── agendas/store/agendas/ (current: Agendas module)
    ├── hc/store/hc/ (current: HC module)
    └── vitrina/store/vitrina/ (current: Vitrina module)
```

## Usage Examples

```javascript
// In components:
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("Auth", ["id_ips", "DataEmpresa"]),
    ...mapState("Agendas", ["datapaciente", "dataCitas"]),
  },
  methods: {
    ...mapActions("Agendas", ["getDatabyParam", "createEntradaCitaNueva"]),
    ...mapActions("Hc", ["SaveHCcabecera"]),
  },
};
```

## Future Improvements

1. Consolidate all modules into `src/store/modules/` directory
2. Implement module factory pattern for reusable modules
3. Add typing/TypeScript definitions for better IDE support
4. Create store-level error handling middleware
5. Implement state persistence layer
