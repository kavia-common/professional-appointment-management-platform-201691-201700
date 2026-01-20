import { env } from "../config/env";

/**
 * Basic API client.
 * - Uses REACT_APP_API_BASE / REACT_APP_BACKEND_URL
 * - Provides placeholder endpoints until backend is available
 */

class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function readJsonSafely(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function normalizeBaseUrl(base) {
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

const API_BASE = normalizeBaseUrl(env.apiBase);

/**
 * PUBLIC_INTERFACE
 * Create a full URL for an API path.
 */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

async function request(path, { method = "GET", body, headers } = {}) {
  if (!API_BASE) {
    throw new ApiError(
      "API base URL no configurada. Define REACT_APP_API_BASE o REACT_APP_BACKEND_URL en .env.",
      { status: 0 }
    );
  }

  const res = await fetch(apiUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await readJsonSafely(res);

  if (!res.ok) {
    throw new ApiError(
      payload?.message || `Error de API (${res.status})`,
      { status: res.status, details: payload }
    );
  }

  return payload;
}

/**
 * PUBLIC_INTERFACE
 * API surface for the app. Endpoints are "sensible placeholders" and can be
 * redirected to real backend routes when available.
 */
export const api = {
  // Healthcheck (configurable path)
  health: () => request(env.healthcheckPath, { method: "GET" }),

  // Citas
  listAppointments: () => request("/api/appointments", { method: "GET" }),
  createAppointment: (data) => request("/api/appointments", { method: "POST", body: data }),

  // Usuarios/contactos
  listUsers: () => request("/api/users", { method: "GET" }),
  createUser: (data) => request("/api/users", { method: "POST", body: data }),
  deleteUser: (id) => request(`/api/users/${encodeURIComponent(id)}`, { method: "DELETE" }),

  // Mensajes
  getMessageTemplates: () => request("/api/messages/templates", { method: "GET" }),
  saveMessageTemplates: (data) =>
    request("/api/messages/templates", { method: "PUT", body: data }),

  // Configuración general
  getSettings: () => request("/api/settings", { method: "GET" }),
  saveSettings: (data) => request("/api/settings", { method: "PUT", body: data })
};
