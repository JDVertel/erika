# Consolidación de Módulos Vuex - Guía de Migración

## 📋 Resumen del Cambio

Se ha completado la **consolidación de todos los módulos Vuex** del sistema de fisioterapia. Los módulos han sido migrados de directorios dispersos en carpetas de componentes a una estructura centralizada en `src/store/modules/`.

## ✅ Estado de Consolidación

Todos los 4 módulos han sido consolidados exitosamente:

| Módulo      | Estado         | Ruta Original                           | Ruta Consolidada                      |
| ----------- | -------------- | --------------------------------------- | ------------------------------------- |
| **Auth**    | ✅ Consolidado | `src/components/dashboard/store/auth/`  | `src/store/modules/auth.module.js`    |
| **Agendas** | ✅ Consolidado | `src/components/agendas/store/agendas/` | `src/store/modules/agendas.module.js` |
| **HC**      | ✅ Consolidado | `src/components/hc/store/hc/`           | `src/store/modules/hc.module.js`      |
| **Vitrina** | ✅ Consolidado | `src/components/vitrina/store/vitrina/` | `src/store/modules/vitrina.module.js` |

## 🏗️ Nueva Estructura

```
src/store/
├── index.js                          # Store principal (actualizado)
└── modules/
    ├── index.js                      # Registro de módulos y exportaciones
    ├── auth.module.js                # Auth consolidado
    ├── agendas.module.js             # Agendas consolidado
    ├── hc.module.js                  # HC consolidado
    ├── vitrina.module.js             # Vitrina consolidado
    └── [deprecated]
        ├── auth.state.js             # Archivo de transición (puede eliminarse)
```

## 📦 Cambios en las Importaciones

### Antes (Importaciones dispersas):

```javascript
// en diferentes lugares
import Auth from "@/components/dashboard/store/auth";
import Agendas from "@/components/agendas/store/agendas";
import Hc from "@/components/hc/store/hc";
import vitrina from "@/components/vitrina/store/vitrina";
```

### Ahora (Importaciones centralizadas):

```javascript
// src/store/index.js
import { Auth, Agendas, Hc, vitrina } from "./modules/index";
```

## 🔄 Cada Módulo Consolidado Contiene:

Todos los módulos `.module.js` tienen la siguiente estructura uniforme:

```javascript
/**
 * [MODULO] MODULE - Consolidated Vuex Module
 *
 * Parts consolidated:
 * - state.js: Definición del estado inicial
 * - actions.js: Operaciones asincrónicas
 * - mutations.js: Mutaciones sincrónicas
 * - getters.js: Getters (si existen)
 */

import firebase_api from "@/api/firebaseApi";

const state = () => ({
  /* ... */
});
const getters = {
  /* ... */
};
const mutations = {
  /* ... */
};
const actions = {
  /* ... */
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
```

## 📊 Detalles de Cada Módulo

### 1. AUTH Module

**Propósito:** Autenticación y configuración de empresa/página

- **Estado:** 8 propiedades (auth, id_ips, id_user, rol, DataEmpresa[], DataPagina[], etc)
- **Acciones:** 6 funciones
  - `Action_createDataEmpresa` - Crear empresa
  - `Action_update_Empresa` - Actualizar empresa
  - `Action_createDataPagina` - Crear página
  - `Action_update_Pagina` - Actualizar página
  - `getDataIPSbyParam` - Obtener datos por parámetro
  - `getDatabyParam` - Obtener datos por parámetro (ahora también en Auth para profesionales)
  - `getDatabyKey` - Obtener datos por clave primaria (ahora también en Auth para profesionales)
  - `ChangeState` - Cambiar estado genérico
- **Mutaciones:** 5 funciones
  - `setStateEmpresa` - Actualizar datos empresa
  - `setStatePagina` - Actualizar datos página
  - `setStateProfesionales` - Actualizar datos profesionales
  - `setStateDataProfesional` - Actualizar datos de profesional específico
  - `muta_setNewState` - Actualizar estado genérico

### 2. AGENDAS Module

**Propósito:** Gestión de citas y pacientes

- **Estado:** 9 propiedades (datapaciente[], dataCitas[], dataAgendas[], etc)
- **Acciones:** 14 funciones
  - Consultas: `getDatabyParam`, `getDatabyKey`, `getDataByRangoSuperior`
  - Citas: `createEntradaCitaNueva`, `updateReserva`
  - Pacientes: `createEntradanewPaciente`, `getDataUsersbyParam`
  - Usuarios: `createEntradaUser`, `ClosetModalNewPaciente`
  - Profesionales: `createEntradaProf`
  - Agenda: `CreateAgendaNueva`, `DeleteItem`
  - Limpieza: `clearDataStoreA`, `clearStorePaciente`
- **Mutaciones:** 9 funciones

**Note:** `dataprofesionales[]` y `existeprofesionales` se han movido al módulo Auth

### 3. HC Module (Historia Clínica / Medical Records)

**Propósito:** Gestión de registros médicos en 13 secciones

- **Estado:** 4 propiedades (id_paciente, id_ips, id_prof, StateNumRegHC)
- **Acciones:** 14 funciones (una por sección + cabecera)
  - `SaveHCcabecera` - Encabezado de HC
  - `SaveDatos1` - Datos de consulta
  - `SaveDatos2` - Observación
  - `SaveDatos3` - Inspección estática
  - `SaveDatos4` - Evaluación postural
  - `SaveDatos5` - Inspección dinámica
  - `SaveDatos6` - Escala visual
  - `SaveDatos7` - Imágenes
  - `SaveDatos8` - Exploración física
  - `SaveDatos9` - Sistema muscular
  - `SaveDatos10` - Análisis
  - `SaveDatos11` - Diagnóstico
  - `SaveDatos12` - Tratamiento
  - `SaveDatos13` - Órdenes médicas
- **Mutaciones:** 1 función (`NumRegHC`)

### 4. VITRINA Module (E-commerce)

**Propósito:** Catálogo de productos, servicios y facturación

- **Estado:** 6 propiedades (entry[], cargando, StateInventario[], StateFacturasDiarias[], etc)
- **Acciones:** 17 funciones
  - Productos: `load_Vitrina`, `getDatosVitrinabyParams`, `createEntradaVitrina`, `updateVitrinaP`
  - Servicios: `createEntradaVitrinaS`, `updateVitrinaS`
  - Estados: `CambiarEstadoVitrina`, `DeleteItemVitrina`
  - Facturas: `createEntradaFacturaCabecera`, `createEntradaFacturaDetalle`, `getListFacturasDia`, `getCurrentIdFactura`, `UpdateNewIdFactura`
  - Consultas por fecha: `getDatosVitrinabyParamsDate`
- **Mutaciones:** 7 funciones

## 🔧 Actualización Manual Requerida (Opcional)

Si algunos componentes importaban directamente de las rutas antiguas, deben actualizarse:

### Cambios en Componentes (si aplica):

```javascript
// Antiguo
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Auth", ["id_user", "rol"]),
  },
};

// Nuevo (sin cambios - Vuex sigue funcionando igual)
// Los mappers siguen usando los mismos namespace strings
```

## 🔌 Como Usar en Componentes

**No hay cambios en como se usan los módulos desde los componentes:**

```javascript
// Sigue siendo igual
this.$store.commit("Auth/setStateEmpresa", data);
this.$store.dispatch("Agendas/getDatabyParam", parametros);
this.$store.state.hc.id_paciente;
```

## 📝 Registro de Módulos

El archivo `src/store/modules/index.js` proporciona:

```javascript
// Acceso a módulos
export { Auth, Agendas, Hc, vitrina }

// Registro con metadatos
export const moduleRegistry = { ... }

// Funciones helper
export function getAllModules() { ... }
export function getModuleInfo(moduleName) { ... }
export function listModules() { ... }
```

## ✨ Beneficios de la Consolidación

1. **Estructura centralizada:** Todos los módulos en una ubicación clara
2. **Mantenimiento mejorado:** Un archivo por módulo (no 4 archivos)
3. **Documentación integrada:** JSDoc completo en cada módulo
4. **Escalabilidad:** Fácil agregar nuevos módulos siguiendo el patrón
5. **Consistencia:** Todos los módulos siguen la misma estructura
6. **Depuración:** Console.logs centralizados en cada acción

## ⚠️ Consideraciones Importantes

### ✅ Ya implementado:

- ✅ Consolidación de todos los módulos
- ✅ Actualización de src/store/index.js
- ✅ Registro de módulos con metadatos
- ✅ JSDoc completo en todos los módulos
- ✅ Console.logs en todas las acciones

### 🔄 Próximos pasos opcionales:

- Eliminar las carpetas originales de componentes (después de verificar que todo funciona)
- Actualizar importaciones en componentes si las hay (la mayoría no necesitan cambios)
- Crear tests para cada módulo

### ❌ NO hacer:

- No eliminar los archivos originales todavía (hasta verificar que todo funciona)
- No cambiar los namespaces (Auth, Agendas, hc, vitrina)
- No alterar las signatures de actions/mutations

## 🧪 Verificación Post-Consolidación

Para verificar que la consolidación funciona correctamente:

1. **Iniciar la aplicación:** `npm run dev`
2. **Verificar consola:** Los console.logs deben aparecer con los datos correctos
3. **Probar funcionalidades:**
   - Autenticación
   - Crear/listar citas
   - Crear/guardar registros médicos
   - Gestionar productos y facturación
4. **Revisar Vue DevTools:** Los módulos deben aparecer en el árbol de estado

## 📚 Documentación Relacionada

- [STORE_STRUCTURE.md](./STORE_STRUCTURE.md) - Documentación general del store
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Mejores prácticas
- [MODULES_INDEX.md](./MODULES_INDEX.md) - Índice detallado de módulos
- [auth/README.md](./modules/auth/README.md) - Documentación Auth
- [agendas/README.md](./modules/agendas/README.md) - Documentación Agendas
- [hc/README.md](./modules/hc/README.md) - Documentación HC
- [vitrina/README.md](./modules/vitrina/README.md) - Documentación Vitrina

## 📞 Soporte

Si hay problemas después de la consolidación:

1. Verificar que src/store/modules/ tiene los 4 archivos .module.js
2. Revisar src/store/index.js importa correctamente
3. Verificar consola del navegador para errores
4. Revisar que los namespaces en componentes son correctos (Auth, Agendas, hc, vitrina)

---

**Fecha de Consolidación:** [Fecha actual]
**Versión:** 1.0.0 (Consolidado)
**Estado:** Completo ✅
