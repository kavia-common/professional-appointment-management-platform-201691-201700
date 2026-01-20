import React from "react";
import styles from "./Badge.module.css";

export default function Badge({ label, tone = "neutral", title }) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`} title={title}>
      {label}
    </span>
  );
}
