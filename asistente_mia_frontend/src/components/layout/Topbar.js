import React, { useEffect, useMemo, useState } from "react";
import styles from "./Topbar.module.css";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { api } from "../../api/client";
import { env } from "../../config/env";

export default function Topbar() {
  const [health, setHealth] = useState({ status: "idle", ok: null });

  const displayName = useMemo(() => {
    // Placeholder until authentication is implemented.
    return "Profesional";
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setHealth({ status: "loading", ok: null });
      try {
        await api.health();
        if (!cancelled) setHealth({ status: "success", ok: true });
      } catch {
        if (!cancelled) setHealth({ status: "error", ok: false });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className={styles.topbar} aria-label="Cabecera">
      <div className={styles.left}>
        <div className={styles.title}>Panel</div>
        <div className={styles.subtitle}>
          Gestiona citas, usuarios y mensajes automáticos
        </div>
      </div>

      <div className={styles.right}>
        <Badge
          tone={health.ok ? "success" : health.status === "loading" ? "neutral" : "error"}
          label={
            health.status === "loading"
              ? "Conectando…"
              : health.ok
                ? "Backend OK"
                : "Backend no disponible"
          }
          title={`API Base: ${env.apiBase || "(no configurada)"}`}
        />
        <div className={styles.user}>
          <div className={styles.userAvatar} aria-hidden="true">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className={styles.userMeta}>
            <div className={styles.userName}>{displayName}</div>
            <div className={styles.userRole}>Cuenta profesional</div>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          ariaLabel="Recargar"
        >
          Recargar
        </Button>
      </div>
    </header>
  );
}
