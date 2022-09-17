import React from "react";
import styles from "./loading.module.css";

export default function Loaading() {
  return (
    <div className={`container-fluid text-center ${styles.loadingFull}`}>
     <div className={`h-100 ${styles.spinner}`}>
     <div className="spinner-grow text-danger" role="status" />
      </div>
    </div>
  );
}
