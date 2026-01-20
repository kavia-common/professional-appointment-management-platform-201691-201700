import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "./AppShell.module.css";

export default function AppShell({ children }) {
  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <main className={styles.content} aria-label="Contenido principal">
          {children}
        </main>
      </div>
    </div>
  );
}
