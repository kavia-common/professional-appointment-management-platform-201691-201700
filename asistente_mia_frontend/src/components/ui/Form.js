import React from "react";
import styles from "./Form.module.css";

export function Field({ label, hint, children }) {
  return (
    <label className={styles.field}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export function TextInput({ value, onChange, placeholder, type = "text", required, name }) {
  return (
    <input
      className={styles.input}
      value={value}
      name={name}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function FormRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}
