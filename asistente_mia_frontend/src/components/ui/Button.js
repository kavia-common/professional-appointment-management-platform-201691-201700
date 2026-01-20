import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, variant = "primary", onClick, disabled, ariaLabel, type }) {
  return (
    <button
      type={type || "button"}
      className={`${styles.button} ${styles[variant] || ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
