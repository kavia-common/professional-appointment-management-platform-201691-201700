import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import CitasPage from "./pages/CitasPage";
import UsuariosPage from "./pages/UsuariosPage";
import MensajesPage from "./pages/MensajesPage";
import ConfiguracionesPage from "./pages/ConfiguracionesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Switch>
          <Route exact path="/">
            <Redirect to="/citas" />
          </Route>

          <Route path="/citas" component={CitasPage} />
          <Route path="/usuarios" component={UsuariosPage} />
          <Route path="/mensajes" component={MensajesPage} />
          <Route path="/configuraciones" component={ConfiguracionesPage} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
