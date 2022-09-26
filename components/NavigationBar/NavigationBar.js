import { useState } from "react";
import styles from "./navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import MyModal from "../Modal/MyModal";
import SignInForm from "../SignInForm/SignInForm";
import ProductCard from "../ProductCard/ProductCard";

export default function NavigationBar() {
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={`${styles.superNav} border-bottom py-2 bg-light`}>
        <div className="container">
          <div className="row">
            <div
              className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 ${styles.centerOnMobile}`}
            >
              <select className="me-3 border-0 bg-light">
                <option value="en-us">EN</option>
                <option value="es-us">ES</option>
              </select>
              <span className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-3">
                <strong>info@petesfresh.com</strong>
              </span>
              <span className="me-3">
                <i className={`${styles.bi} bi-phone text-muted me-1`}></i>{" "}
                <strong>1-800-123-1234</strong>
              </span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
              <span className={`me-3 ${styles.topbaritem}`}>
                <i className={`${styles.bi} bi-truck text-muted me-1`}></i>
                <a className={`text-muted`} href="/shipping">
                  Shipping
                </a>
              </span>
              <span className={`me-3 ${styles.topbaritem}`}>
                <i
                  className={`${styles.bi} bi-briefcase
                       text-muted me-1`}
                ></i>
                <a className="text-muted" href="/policy">
                  Careers
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-2 border-bottom">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              className={`${styles.logo}`}
              src="/images/Logo.jpeg"
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
            <div className="input-group">
              <input
                type="text"
                placeholder="Find product"
                className="form-control border-danger"
              />
              <button className="btn btn-danger text-white">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-auto d-none d-lg-block">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Find product"
                  className="form-control border-danger"
                />
                <button className="btn btn-sm btn-danger  text-white">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <ul className="navbar-nav ms-auto ">
              <Link href="/offers" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/offers" ? "active" : ""
                  } nav-link mx-2 text-uppercase`}
                  aria-current="page"
                  href="/offers"
                >
                  Offers
                </a>
              </Link>
              <Link href="/popular" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/popular" ? "active" : ""
                  } nav-link mx-2 text-uppercase`}
                  aria-current="page"
                  href="/popular"
                >
                  Popular
                </a>
              </Link>
              <Link href="/categories" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/categories" ? "active" : ""
                  } nav-link mx-2 text-uppercase`}
                  aria-current="page"
                  // href="/categories"
                >
                  Categories
                </a>
              </Link>
              <Link href="/services" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/services" ? "active" : ""
                  } nav-link mx-2 text-uppercase`}
                  aria-current="page"
                  href="/services"
                >
                  Services
                </a>
              </Link>
              <Link href="/about" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/about" ? "active" : ""
                  } nav-link mx-2 text-uppercase`}
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </Link>
            </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <a className="nav-link mx-2" href="/cart">
                  <i className={`${styles.bi} bi-cart text-muted me-1`}></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="#">
                  <i
                    onClick={() => setModalShow(true)}
                    className={`${styles.bi} bi-person-circle text-muted me-1`}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <MyModal show={modalShow} onHide={() => setModalShow(false)}>
        <SignInForm />
      </MyModal>
    </>
  );
}
