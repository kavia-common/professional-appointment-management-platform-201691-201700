import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Field, FormRow, Select, TextInput } from "../components/ui/Form";
import { api } from "../api/client";

export default function ConfiguracionesPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState({
    timezone: "Europe/Madrid",
    sendWindowStart: "09:00",
    sendWindowEnd: "20:00",
    reminder24hEnabled: "true",
    reminder2hEnabled: "true"
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setError(null);
      try {
        const data = await api.getSettings();
        if (!cancelled && data && typeof data === "object") {
          setSettings((s) => ({ ...s, ...data }));
        }
        if (!cancelled) setStatus("success");
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setError(e?.message || "No se pudo cargar");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    setStatus("saving");
    setError(null);
    try {
      await api.saveSettings(settings);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e?.message || "No se pudo guardar");
    }
  }

  return (
    <div className="pageGrid">
      <Card
        title="Configuraciones"
        subtitle="Configura periodos y horarios de envío de mensajes automáticos."
        actions={<Button onClick={save} disabled={status === "saving"}>{status === "saving" ? "Guardando…" : "Guardar"}</Button>}
      >
        {error && <div className="helperText">Aviso: {String(error)}</div>}

        <FormRow>
          <Field label="Zona horaria">
            <TextInput
              value={settings.timezone}
              onChange={(v) => setSettings((s) => ({ ...s, timezone: v }))}
              placeholder="Europe/Madrid"
            />
          </Field>

          <Field label="Recordatorio 24h">
            <Select
              value={settings.reminder24hEnabled}
              onChange={(v) => setSettings((s) => ({ ...s, reminder24hEnabled: v }))}
              options={[
                { value: "true", label: "Activado" },
                { value: "false", label: "Desactivado" }
              ]}
            />
          </Field>
        </FormRow>

        <FormRow>
          <Field label="Ventana de envío (inicio)">
            <TextInput
              type="time"
              value={settings.sendWindowStart}
              onChange={(v) => setSettings((s) => ({ ...s, sendWindowStart: v }))}
            />
          </Field>
          <Field label="Ventana de envío (fin)">
            <TextInput
              type="time"
              value={settings.sendWindowEnd}
              onChange={(v) => setSettings((s) => ({ ...s, sendWindowEnd: v }))}
            />
          </Field>
        </FormRow>

        <Field label="Recordatorio 2h">
          <Select
            value={settings.reminder2hEnabled}
            onChange={(v) => setSettings((s) => ({ ...s, reminder2hEnabled: v }))}
            options={[
              { value: "true", label: "Activado" },
              { value: "false", label: "Desactivado" }
            ]}
          />
        </Field>

        <div className="helperText">
          Endpoint placeholder: <code>/api/settings</code>.
        </div>
      </Card>
    </div>
  );
}
