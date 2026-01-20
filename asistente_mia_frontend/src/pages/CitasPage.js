import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { Field, FormRow, TextInput } from "../components/ui/Form";
import { api } from "../api/client";

function formatDateTime(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value || "");
    return d.toLocaleString();
  } catch {
    return String(value || "");
  }
}

export default function CitasPage() {
  const [state, setState] = useState({ status: "idle", data: [], error: null });
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    contact: ""
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading", data: [], error: null });
      try {
        const data = await api.listAppointments();
        if (!cancelled) setState({ status: "success", data: Array.isArray(data) ? data : [], error: null });
      } catch (e) {
        // Placeholder fallback for empty backend.
        const fallback = [
          { id: "a-1", title: "Consulta", start: new Date().toISOString(), end: new Date(Date.now() + 30 * 60000).toISOString(), contact: "Paciente" },
          { id: "a-2", title: "Corte de cabello", start: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), end: new Date(Date.now() - 24 * 3600 * 1000 + 45 * 60000).toISOString(), contact: "Cliente" }
        ];
        if (!cancelled) setState({ status: "error", data: fallback, error: e?.message || "No se pudo cargar" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useMemo(
    () => [
      { key: "title", header: "Título" },
      { key: "contact", header: "Contacto" },
      { key: "start", header: "Inicio", render: (r) => formatDateTime(r.start) },
      { key: "end", header: "Fin", render: (r) => formatDateTime(r.end) }
    ],
    []
  );

  async function onCreate() {
    // Minimal validation
    if (!form.title.trim()) return;
    if (!form.start) return;
    if (!form.end) return;

    try {
      await api.createAppointment(form);
      setOpen(false);
      // Reload quickly
      const data = await api.listAppointments();
      setState({ status: "success", data: Array.isArray(data) ? data : [], error: null });
    } catch (e) {
      // Keep modal open and surface error by setting page state
      setState((s) => ({ ...s, status: "error", error: e?.message || "Error al crear cita" }));
    }
  }

  return (
    <div className="pageGrid">
      <Card
        title="Citas"
        subtitle="Sincronizadas con Google Calendar (pasadas, presentes y futuras)."
        actions={
          <Button onClick={() => setOpen(true)} ariaLabel="Crear cita">
            Nueva cita
          </Button>
        }
      >
        {state.error && <div className="helperText">Aviso: {String(state.error)}</div>}
        <Table columns={columns} rows={state.data} emptyLabel={state.status === "loading" ? "Cargando…" : "Sin citas"} />
      </Card>

      <Modal
        title="Nueva cita"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={onCreate}>Guardar</Button>
          </>
        }
      >
        <FormRow>
          <Field label="Título" hint="Ej: Consulta, Sesión, Corte">
            <TextInput value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Título de la cita" />
          </Field>
          <Field label="Contacto" hint="Opcional">
            <TextInput value={form.contact} onChange={(v) => setForm((f) => ({ ...f, contact: v }))} placeholder="Nombre del usuario" />
          </Field>
        </FormRow>

        <FormRow>
          <Field label="Inicio">
            <TextInput type="datetime-local" value={form.start} onChange={(v) => setForm((f) => ({ ...f, start: v }))} />
          </Field>
          <Field label="Fin">
            <TextInput type="datetime-local" value={form.end} onChange={(v) => setForm((f) => ({ ...f, end: v }))} />
          </Field>
        </FormRow>

        <div className="helperText">
          Nota: estos endpoints son placeholders hasta que el backend esté disponible.
        </div>
      </Modal>
    </div>
  );
}
