import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { Field, FormRow, TextInput } from "../components/ui/Form";
import { api } from "../api/client";

export default function UsuariosPage() {
  const [state, setState] = useState({ status: "idle", data: [], error: null });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    tags: ""
  });

  async function load() {
    setState({ status: "loading", data: [], error: null });
    try {
      const data = await api.listUsers();
      setState({ status: "success", data: Array.isArray(data) ? data : [], error: null });
    } catch (e) {
      const fallback = [
        { id: "u-1", name: "María López", phone: "+34 600 000 001", tags: ["vip"] },
        { id: "u-2", name: "Carlos Pérez", phone: "+34 600 000 002", tags: ["nuevo"] }
      ];
      setState({ status: "error", data: fallback, error: e?.message || "No se pudo cargar" });
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      { key: "name", header: "Nombre" },
      { key: "phone", header: "WhatsApp" },
      {
        key: "tags",
        header: "Etiquetas",
        render: (r) => (Array.isArray(r.tags) ? r.tags.join(", ") : r.tags || "—")
      },
      {
        key: "actions",
        header: "",
        render: (r) => (
          <Button
            variant="danger"
            onClick={async () => {
              try {
                await api.deleteUser(r.id);
                await load();
              } catch (e) {
                setState((s) => ({ ...s, status: "error", error: e?.message || "No se pudo eliminar" }));
              }
            }}
            ariaLabel={`Eliminar ${r.name}`}
          >
            Eliminar
          </Button>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onCreate() {
    if (!form.name.trim()) return;
    if (!form.phone.trim()) return;

    setSaving(true);
    try {
      await api.createUser({
        name: form.name.trim(),
        phone: form.phone.trim(),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      });
      setOpen(false);
      setForm({ name: "", phone: "", tags: "" });
      await load();
    } catch (e) {
      setState((s) => ({ ...s, status: "error", error: e?.message || "Error al crear usuario" }));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pageGrid">
      <Card
        title="Usuarios"
        subtitle="Gestiona la lista de contactos a los que el bot puede enviar mensajes."
        actions={
          <Button onClick={() => setOpen(true)} ariaLabel="Agregar usuario">
            Agregar usuario
          </Button>
        }
      >
        {state.error && <div className="helperText">Aviso: {String(state.error)}</div>}
        <Table columns={columns} rows={state.data} emptyLabel={state.status === "loading" ? "Cargando…" : "Sin usuarios"} />
      </Card>

      <Modal
        title="Agregar usuario"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={onCreate} disabled={saving}>
              {saving ? "Guardando…" : "Guardar"}
            </Button>
          </>
        }
      >
        <FormRow>
          <Field label="Nombre">
            <TextInput value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Nombre y apellidos" />
          </Field>
          <Field label="WhatsApp" hint="Incluye código país">
            <TextInput value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+34 600 000 000" />
          </Field>
        </FormRow>

        <Field label="Etiquetas" hint="Separadas por coma (opcional)">
          <TextInput value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} placeholder="vip, nuevo, seguimiento" />
        </Field>

        <div className="helperText">
          Nota: crear/eliminar usa endpoints placeholder: <code>/api/users</code>.
        </div>
      </Modal>
    </div>
  );
}
