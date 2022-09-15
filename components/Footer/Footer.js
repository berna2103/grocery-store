import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className="container-fluid bg-light">
      <hr></hr>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className={`nav-item ${styles.navItem}`}>
            <a href="/" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <a href="/offers" className="nav-link px-2 text-muted">
              Offers
            </a>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <a href="/popular" className="nav-link px-2 text-muted">
              Popular
            </a>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <a href="/departments" className="nav-link px-2 text-muted">
              Departments
            </a>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <a href="/services" className="nav-link px-2 text-muted">
              Services
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">&copy; 2022 Pete's Fresh, Inc</p>
      </footer>
    </div>
  );
}
