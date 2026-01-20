import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, subtitle, actions, children }) {
  return (
    <section className={styles.card} aria-label={title}>
      {(title || actions) && (
        <header className={styles.header}>
          <div className={styles.headerText}>
            {title && <div className={styles.title}>{title}</div>}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
