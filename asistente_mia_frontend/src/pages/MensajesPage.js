import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Field, TextArea } from "../components/ui/Form";
import { api } from "../api/client";

export default function MensajesPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [templates, setTemplates] = useState({
    reminder24h: "Hola {nombre}, te recordamos tu cita mañana a las {hora}. Responde SI para confirmar.",
    reminder2h: "Hola {nombre}, tu cita es en 2 horas ({hora}). ¿Vas a asistir?",
    followUp: "Gracias por tu visita. ¿Cómo fue tu experiencia?"
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setError(null);
      try {
        const data = await api.getMessageTemplates();
        if (!cancelled && data && typeof data === "object") {
          setTemplates((t) => ({ ...t, ...data }));
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
      await api.saveMessageTemplates(templates);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e?.message || "No se pudo guardar");
    }
  }

  return (
    <div className="pageGrid">
      <Card
        title="Mensajes"
        subtitle="Personaliza mensajes automáticos para WhatsApp (plantillas con variables)."
        actions={<Button onClick={save} disabled={status === "saving"}>{status === "saving" ? "Guardando…" : "Guardar"}</Button>}
      >
        {error && <div className="helperText">Aviso: {String(error)}</div>}

        <Field label="Recordatorio 24h" hint="Variables sugeridas: {nombre}, {hora}, {fecha}">
          <TextArea value={templates.reminder24h} onChange={(v) => setTemplates((t) => ({ ...t, reminder24h: v }))} rows={4} />
        </Field>

        <Field label="Recordatorio 2h" hint="Variables sugeridas: {nombre}, {hora}">
          <TextArea value={templates.reminder2h} onChange={(v) => setTemplates((t) => ({ ...t, reminder2h: v }))} rows={4} />
        </Field>

        <Field label="Seguimiento" hint="Después de la cita">
          <TextArea value={templates.followUp} onChange={(v) => setTemplates((t) => ({ ...t, followUp: v }))} rows={4} />
        </Field>

        <div className="helperText">
          Endpoint placeholder: <code>/api/messages/templates</code>.
        </div>
      </Card>
    </div>
  );
}
