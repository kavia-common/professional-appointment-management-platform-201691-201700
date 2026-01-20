import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={styles.navItem}
      activeClassName={styles.navItemActive}
    >
      <span className={styles.navLabel}>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Navegación lateral">
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          M
        </div>
        <div className={styles.brandText}>
          <div className={styles.brandTitle}>Asistente Mia</div>
          <div className={styles.brandSubtitle}>Panel profesional</div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Secciones">
        <NavItem to="/citas" label="Citas" />
        <NavItem to="/usuarios" label="Usuarios" />
        <NavItem to="/mensajes" label="Mensajes" />
        <NavItem to="/configuraciones" label="Configuraciones" />
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerHint}>Light • Minimal</div>
      </div>
    </aside>
  );
}
