import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import Button from "./Button";

export default function Modal({ title, open, onClose, children, footer }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <Button variant="secondary" onClick={onClose} ariaLabel="Cerrar modal">
            Cerrar
          </Button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
      <button className={styles.clickAway} aria-label="Cerrar" onClick={onClose} />
    </div>
  );
}
