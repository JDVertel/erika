<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { getCachedUserProfile, MODULE_OPTIONS } from "@/security/accessControl";

export default {
  name: "DashboardUsers",
  data() {
    return {
      editingUid: "",
      form: {
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
        rol: "usuario",
        id_ips: "1",
        estado: "activo",
        modulosPermitidos: [],
        // Campos exclusivos de profesional
        tipo_documento: "CC",
        num_documento: "",
        tipo_consulta: "",
        tarjeta_profesional: "",
      },
      moduleOptions: MODULE_OPTIONS,
    };
  },
  computed: {
    ...mapState("users", ["users", "loading", "error", "successMessage"]),
    ...mapGetters("users", ["totalUsers"]),
    isEditing() {
      return Boolean(this.editingUid);
    },
    canPromoteUsers() {
      const profile = getCachedUserProfile();
      return profile?.rol === "admin";
    },
    // Filtra módulos para excluir aquellos que no requieren permisos
    permissionRequiredModules() {
      const alwaysAccessible = ["home", "quienes_somos", "about"];
      return this.moduleOptions.filter(
        (module) => !alwaysAccessible.includes(module.key)
      );
    },
  },
  methods: {
    ...mapActions("users", [
      "loadUsers",
      "createUserWithProfile",
      "updateUserProfile",
      "deleteUserData",
      "clearUserMessages",
    ]),

    async submitForm() {
      if (this.isEditing) {
        await this.updateUserProfile({
          uid: this.editingUid,
          nombre: this.form.nombre,
          apellido: this.form.apellido,
          telefono: this.form.telefono,
          rol: this.form.rol,
          id_ips: this.form.id_ips,
          estado: this.form.estado,
          modulosPermitidos: this.form.modulosPermitidos,
          // Campos de profesional
          tipo_documento: this.form.tipo_documento,
          num_documento: this.form.num_documento,
          tipo_consulta: this.form.tipo_consulta,
          tarjeta_profesional: this.form.tarjeta_profesional,
        });
        this.resetForm();
        return;
      }

      await this.createUserWithProfile({
        email: this.form.email,
        password: this.form.password,
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        telefono: this.form.telefono,
        rol: this.form.rol,
        id_ips: this.form.id_ips,
        modulosPermitidos: this.form.modulosPermitidos,
        // Campos de profesional (se guardan solo cuando rol = profesional)
        tipo_documento: this.form.tipo_documento,
        num_documento: this.form.num_documento,
        tipo_consulta: this.form.tipo_consulta,
        tarjeta_profesional: this.form.tarjeta_profesional,
      });

      if (!this.error) {
        this.resetForm();
      }
    },

    editUser(user) {
      this.editingUid = user.uid;
      this.form.email = user.email || "";
      this.form.password = "";
      this.form.nombre = user.nombre || "";
      this.form.apellido = user.apellido || "";
      this.form.telefono = user.telefono || "";
      this.form.rol = user.rol || "usuario";
      this.form.id_ips = user.id_ips || "";
      this.form.estado = user.estado || "activo";
      this.form.modulosPermitidos = Array.isArray(user.modulosPermitidos)
        ? [...user.modulosPermitidos]
        : [];
      // Cargar campos de profesional si existen
      this.form.tipo_documento = user.tipo_documento || "CC";
      this.form.num_documento = user.num_documento || "";
      this.form.tipo_consulta = user.tipo_consulta || "";
      this.form.tarjeta_profesional = user.tarjeta_profesional || "";
      this.clearUserMessages();
    },

    async removeUser(uid) {
      const confirmed = window.confirm(
        "Se eliminarán los datos del perfil en Firestore y Realtime Database. ¿Deseas continuar?"
      );

      if (!confirmed) {
        return;
      }

      await this.deleteUserData(uid);
      if (this.editingUid === uid) {
        this.resetForm();
      }
    },

    resetForm() {
      this.editingUid = "";
      this.form = {
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
        rol: "usuario",
        id_ips: "1",
        estado: "activo",
        modulosPermitidos: [],
        tipo_documento: "CC",
        num_documento: "",
        tipo_consulta: "",
        tarjeta_profesional: "",
      };
      this.clearUserMessages();
    },
    toggleModule(moduleKey) {
      if (this.form.modulosPermitidos.includes(moduleKey)) {
        this.form.modulosPermitidos = this.form.modulosPermitidos.filter(
          (item) => item !== moduleKey
        );
        return;
      }
      this.form.modulosPermitidos = [...this.form.modulosPermitidos, moduleKey];
    },
    async promoteToAdmin(user) {
      const confirmed = window.confirm(`¿Promover a ${user.email} como administrador?`);
      if (!confirmed) {
        return;
      }

      await this.updateUserProfile({
        uid: user.uid,
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        telefono: user.telefono || "",
        rol: "admin",
        id_ips: user.id_ips || "",
        estado: user.estado || "activo",
        modulosPermitidos: this.permissionRequiredModules.map((item) => item.key),
      });
    },
    userModuleLabels(user) {
      if (user?.rol === "admin") {
        return ["Todos los módulos"];
      }

      const allowed = Array.isArray(user?.modulosPermitidos)
        ? user.modulosPermitidos
        : [];

      if (!allowed.length) {
        return ["Sin módulos"];
      }

      return allowed.map((key) => {
        const found = this.moduleOptions.find((item) => item.key === key);
        return found ? found.label : key;
      });
    },
  },
  async created() {
    await this.loadUsers();
  },
};
</script>

<template>
  <div class="users-admin-page">
    <div class="users-admin-header">
      <h1>Gestión de Usuarios y Perfiles</h1>
      <p>Auth en Firebase + perfiles en Firestore <strong>user</strong> + espejo en Realtime <strong>usuarios</strong>.</p>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <div class="row g-4">
      <div class="col-12 col-xl-6">
        <div class="panel-card">
          <h2>{{ isEditing ? "Editar perfil" : "Crear usuario" }}</h2>

          <form @submit.prevent="submitForm" class="form-grid">

            <!-- Fila 1: Correo + Contraseña -->
            <div class="col-half">
              <label class="form-label">Correo</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control form-control-sm"
                :disabled="isEditing"
                required
                placeholder="correo@dominio.com"
              />
            </div>
            <div class="col-half">
              <label class="form-label">Contraseña <span v-if="isEditing" class="text-muted" style="font-size:0.75rem">(no editable)</span></label>
              <input
                v-model="form.password"
                type="password"
                class="form-control form-control-sm"
                minlength="6"
                :required="!isEditing"
                :disabled="isEditing"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <!-- Fila 2: Nombre + Apellido -->
            <div class="col-half">
              <label class="form-label">Nombre</label>
              <input v-model="form.nombre" type="text" class="form-control form-control-sm" required />
            </div>
            <div class="col-half">
              <label class="form-label">Apellido</label>
              <input v-model="form.apellido" type="text" class="form-control form-control-sm" required />
            </div>

            <!-- Fila 3: Teléfono + ID IPS -->
            <div class="col-half">
              <label class="form-label">Teléfono</label>
              <input v-model="form.telefono" type="text" class="form-control form-control-sm" placeholder="3001234567" />
            </div>
            <div class="col-half">
              <label class="form-label">ID IPS</label>
              <input v-model="form.id_ips" type="text" class="form-control form-control-sm" disabled />
            </div>

            <!-- Fila 4: Rol + Estado -->
            <div class="col-half">
              <label class="form-label">Rol</label>
              <select v-model="form.rol" class="form-select form-select-sm">
                <option value="admin">admin</option>
                <option value="profesional">profesional</option>
                <option value="usuario">usuario</option>
              </select>
            </div>
            <div class="col-half">
              <label class="form-label">Estado</label>
              <select v-model="form.estado" class="form-select form-select-sm">
                <option value="activo">activo</option>
                <option value="inactivo">inactivo</option>
              </select>
            </div>

            <!-- Sección exclusiva para profesionales -->
            <template v-if="form.rol === 'profesional'">
              <div class="col-full">
                <div class="profesional-section-title">
                  <span>Datos del Profesional</span>
                </div>
              </div>

              <!-- Fila: Tipo doc + Núm. doc -->
              <div class="col-half">
                <label class="form-label">Tipo de documento</label>
                <select v-model="form.tipo_documento" class="form-select form-select-sm">
                  <option value="CC">Cédula de ciudadanía (CC)</option>
                  <option value="CE">Cédula de extranjería (CE)</option>
                  <option value="PA">Pasaporte (PA)</option>
                </select>
              </div>
              <div class="col-half">
                <label class="form-label">Número de documento</label>
                <input v-model="form.num_documento" type="text" class="form-control form-control-sm" placeholder="Ej: 12345678" />
              </div>

              <div class="col-half">
                <label class="form-label">Tarjeta / Registro profesional</label>
                <input v-model="form.tarjeta_profesional" type="text" class="form-control form-control-sm" placeholder="Ej: FT-12345" />
              </div>

              <!-- Tipo de consulta -->
              <div class="col-half">
                <label class="form-label">Tipo de profesional</label>
                <select v-model="form.tipo_consulta" class="form-select form-select-sm">
                  <option value="">-- Selecciona --</option>
                  <option value="fisioterapia">fisioterapia</option>
                  <option value="consulta">Consulta</option>
                  <option value="clases">Clase</option>
                </select>
              </div>
            </template>

            <!-- Módulos -->
            <div class="col-full">
              <label class="form-label">Módulos permitidos</label>
              <div class="modules-grid">
                <label v-for="moduleItem in permissionRequiredModules" :key="moduleItem.key" class="module-checkbox">
                  <input
                    type="checkbox"
                    :checked="form.modulosPermitidos.includes(moduleItem.key)"
                    @change="toggleModule(moduleItem.key)"
                  />
                  <span>{{ moduleItem.label }}</span>
                </label>
              </div>
            </div>

            <!-- Botones -->
            <div class="col-full actions-row">
              <button type="submit" class="btn btn-success btn-sm" :disabled="loading">
                {{ loading ? "Procesando..." : isEditing ? "Guardar cambios" : "Crear usuario" }}
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm" @click="resetForm" :disabled="loading">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <div class="panel-card">
          <div class="list-header">
            <h2>Usuarios registrados</h2>
            <span class="users-count">{{ totalUsers }} registros</span>
          </div>

          <div class="table-responsive">
            <table class="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Módulos</th>
                  <th>Estado</th>
                  <th class="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.uid">
                  <td>{{ user.nombre }} {{ user.apellido }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.rol }}</td>
                  <td>
                    <div class="modules-cell">
                      <span
                        v-for="label in userModuleLabels(user)"
                        :key="`${user.uid}-${label}`"
                        class="module-pill"
                      >
                        {{ label }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span class="badge" :class="user.estado === 'activo' ? 'bg-success' : 'bg-secondary'">
                      {{ user.estado || "activo" }}
                    </span>
                  </td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-primary me-2" @click="editUser(user)">Editar</button>
                    <button
                      v-if="canPromoteUsers && user.rol !== 'admin'"
                      class="btn btn-sm btn-warning me-2"
                      @click="promoteToAdmin(user)"
                    >
                      Hacer admin
                    </button>
                    <button class="btn btn-sm btn-danger" @click="removeUser(user.uid)">Eliminar</button>
                  </td>
                </tr>

                <tr v-if="!loading && users.length === 0">
                  <td colspan="6" class="text-center py-4">No hay usuarios registrados.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-admin-page {
  min-height: 100vh;
  background: linear-gradient(115deg, #ecf7f2 0%, #f8fafc 52%, #e8f0ff 100%);
  padding: 28px;
}

.users-admin-header {
  margin-bottom: 20px;
}

.users-admin-header h1 {
  margin: 0;
  color: #1d5f49;
  font-size: 1.9rem;
  font-weight: 700;
}

.users-admin-header p {
  margin-top: 6px;
  color: #2e5f52;
}

.panel-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(23, 72, 59, 0.1);
  padding: 18px;
}

.panel-card h2 {
  font-size: 1.25rem;
  color: #245d4d;
  margin-bottom: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.col-half {
  grid-column: span 1;
}

.col-full {
  grid-column: span 2;
}

.actions-row {
  display: flex;
  gap: 10px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.users-count {
  background: #d7efe6;
  color: #225f49;
  border-radius: 999px;
  padding: 4px 12px;
  font-weight: 600;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.module-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d8e7e1;
  border-radius: 8px;
  padding: 6px 8px;
}

.modules-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.module-pill {
  display: inline-block;
  background: #eaf5f1;
  color: #1f5b4b;
  border: 1px solid #cce5dc;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.74rem;
  line-height: 1.2;
}

.profesional-section-title {
  background: linear-gradient(90deg, #1f6f78 0%, #2ea3b0 100%);
  color: #fff;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-top: 4px;
}

@media (max-width: 767px) {
  .users-admin-page {
    padding: 14px;
  }

  .col-half {
    grid-column: span 2;
  }

  .actions-row {
    flex-direction: column;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
