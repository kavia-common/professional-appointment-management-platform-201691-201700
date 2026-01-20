import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

export default function NotFoundPage() {
  return (
    <Card title="Página no encontrada" subtitle="La ruta solicitada no existe.">
      <div className="helperText">
        Volver a <Link to="/citas">Citas</Link>.
      </div>
    </Card>
  );
}
