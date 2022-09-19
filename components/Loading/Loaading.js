import React from "react";
import styles from "./loading.module.css";

export default function Loaading() {
  return (
    <div className={`container-fluid ${styles.loadingFull}`}>
      <div className={`${styles.spinner}`}>
        <div className="spinner-grow text-danger" role="status"></div>
        <div className={`mt-2`}>Loading ...</div>
      </div>
    </div>
  );
}
