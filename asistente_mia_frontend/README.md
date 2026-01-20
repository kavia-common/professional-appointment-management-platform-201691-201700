# Asistente Mia Frontend

React (17) app: panel lateral + cabecera, con páginas de Citas, Usuarios, Mensajes y Configuraciones.

## Variables de entorno (ya existen en `.env`)
- `REACT_APP_API_BASE` (o `REACT_APP_BACKEND_URL`) para la base de la API.
- `REACT_APP_HEALTHCHECK_PATH` (default `/healthz`).
- `REACT_APP_WS_URL` reservado para tiempo real (aún no usado).

## Ejecutar
```bash
npm install
npm start
```

La app usa endpoints placeholder:
- `GET /api/appointments`, `POST /api/appointments`
- `GET /api/users`, `POST /api/users`, `DELETE /api/users/:id`
- `GET/PUT /api/messages/templates`
- `GET/PUT /api/settings`
