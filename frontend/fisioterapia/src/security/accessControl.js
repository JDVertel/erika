export const MODULE_OPTIONS = [
  { key: "home", label: "Home" },
  { key: "quienes_somos", label: "Quienes somos" },
  { key: "about", label: "About" },
  { key: "users_admin", label: "Usuarios y perfiles" },
  { key: "agendas", label: "Agendas" },
  { key: "reservas", label: "Reservas" },
  { key: "hc", label: "Historia Clinica" },
  { key: "informes", label: "Informes" },
  { key: "vitrina", label: "Vitrina" },
  { key: "ventas", label: "Facturacion" },
  { key: "profesional", label: "Profesional" },
  { key: "parametros", label: "Parametros" },
];

const MODULE_KEY_ALIASES = {
  dashboard: "users_admin",
  prof: "profesional",
  profesionales: "profesional",
  usuarios: "users_admin",
  usuario_admin: "users_admin",
  facturacion: "ventas",
  historia_clinica: "hc",
  historias_clinica: "hc",
  configuracion: "parametros",
};

const MODULE_OPTION_KEYS = new Set(MODULE_OPTIONS.map((item) => item.key));

export const PUBLIC_ROUTE_NAMES = [
  "home",
  "about",
  "login",
  "quienes_somos",
  "vitrina",
];

const PROFILE_CACHE_KEY = "fisio_user_profile";

function safeParse(raw) {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export function normalizeProfile(profile) {
  if (!profile) {
    return null;
  }

  const rawModules = Array.isArray(profile.modulosPermitidos)
    ? profile.modulosPermitidos
    : [];

  const normalizedModules = rawModules
    .map((key) => MODULE_KEY_ALIASES[key] || key)
    .filter((key) => MODULE_OPTION_KEYS.has(key));

  return {
    ...profile,
    rol: profile.rol || "usuario",
    modulosPermitidos: [...new Set(normalizedModules)],
  };
}

export function setCachedUserProfile(profile) {
  const normalized = normalizeProfile(profile);
  if (!normalized) {
    return;
  }
  localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(normalized));
}

export function getCachedUserProfile() {
  return normalizeProfile(safeParse(localStorage.getItem(PROFILE_CACHE_KEY)));
}

export function clearCachedUserProfile() {
  localStorage.removeItem(PROFILE_CACHE_KEY);
}

export function hasModuleAccess(profile, moduleKey) {
  if (!moduleKey) {
    return true;
  }

  // Módulos siempre accesibles sin requerir permisos
  const ALWAYS_ACCESSIBLE = ["home", "quienes_somos", "about"];
  if (ALWAYS_ACCESSIBLE.includes(moduleKey)) {
    return true;
  }

  const normalized = normalizeProfile(profile);
  if (!normalized) {
    return false;
  }

  if (normalized.rol === "admin") {
    return true;
  }

  return normalized.modulosPermitidos.includes(moduleKey);
}
