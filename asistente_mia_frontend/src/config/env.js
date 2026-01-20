/**
 * Centralizes parsing of REACT_APP_* variables.
 * CRA injects these at build-time.
 */

function parseJsonOrFallback(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export const env = {
  // Prefer API_BASE, otherwise fall back to BACKEND_URL.
  apiBase: process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "",
  backendUrl: process.env.REACT_APP_BACKEND_URL || "",
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || "",
  wsUrl: process.env.REACT_APP_WS_URL || "",
  nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
  logLevel: process.env.REACT_APP_LOG_LEVEL || "info",
  healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/healthz",
  trustProxy: String(process.env.REACT_APP_TRUST_PROXY || "false").toLowerCase() === "true",
  experimentsEnabled:
    String(process.env.REACT_APP_EXPERIMENTS_ENABLED || "false").toLowerCase() === "true",
  featureFlags: parseJsonOrFallback(process.env.REACT_APP_FEATURE_FLAGS, {})
};
