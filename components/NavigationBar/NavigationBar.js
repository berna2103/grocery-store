import { useState } from "react";
import styles from "./navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import MyModal from "../Modal/MyModal";
import SignInForm from "../SignInForm/SignInForm";
import SignUp from "../SignUp/SignUp";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogOut } from "../../hooks/useLogOut";
import NavCartIcon from "./NavCartIcon";

export default function NavigationBar(props) {
  const router = useRouter();

  const [modalShowSignIn, setModalShowSignIn] = useState(false);
  const [modalShowSignUp, setModalShowSignUp] = useState(false);
  const { user } = useAuthContext();
  const { logOut } = useLogOut();

  const handleModal = () => {
    setModalShowSignIn(false);
  };
  const handleSignUpModal = () => {
    setModalShowSignUp(false);
  };

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
                <a className="text-muted" href="/careers">
                  Careers
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-md bg-white sticky-top navbar-light p-2 border-bottom">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              className={`${styles.logo}`}
              src="/images/Logo.jpeg"
              alt="logo"
            />
          </a>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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
              <Link href="/offers" className="nav-item" >
                <a
                  className={`${
                    router.pathname == "/offers" ? "active" : ""
                  } nav-link mx-2`}
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
                  } nav-link mx-2`}
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
                  } nav-link mx-2`}
                  aria-current="page"
                  // href="/categories"
                >
                  Categories
                </a>
              </Link>
              <Link href="/services" className="nav-item" >
                <a
                  className={`${
                    router.pathname == "/services" ? "active" : ""
                  } nav-link mx-2`}
                  aria-current="page"
               
                >
                  Services
                </a>
              </Link>
              <Link href="/about" className="nav-item">
                <a
                  className={`${
                    router.pathname == "/about" ? "active" : ""
                  } nav-link mx-2`}
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </Link>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className={`${styles.bi} bi-person-circle text-muted me-1`}
                  ></i>
                </a>
                <div
                  className="dropdown-menu text-center"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {!user ? (
                    <>
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        className="btn btn-sm btn-danger col-10 m-1"
                        href="#"
                        onClick={() => setModalShowSignIn(true)}
                      >
                        Sign In
                      </a>
                      <a
                        className="btn btn-sm btn-outline-danger col-10 m-1"
                        href="#"
                        onClick={() => setModalShowSignUp(true)}
                      >
                        Create Account
                      </a>
                    </>
                  ) : (
                    <>
                      <p className={`fw-bold`}>Account</p>
                      {!user.displayName ? <Link href={"/my-account"}>
                        <a className="col-10 m-1 mt-2">My Account</a>
                      </Link> : <Link href={"/my-account"}><a >{user.displayName}</a></Link>}
                      <a
                        className="btn btn-sm btn-outline-danger col-10 m-1 mt-3"
                        onClick={logOut}
                        href="#"
                      >
                        Log Out
                      </a>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className={`ms-2`}>
            <NavCartIcon onClick={props.onShowCart} />
          </div>
        </div>
      </nav>

      <div className="mx-auto ps-4  pe-4 my-3 d-lg-none d-m-none d-sm-block d-xs-block">
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

      <MyModal show={modalShowSignIn} onHide={() => setModalShowSignIn(false)}>
        <SignInForm handleModal={handleModal} />
      </MyModal>

      <MyModal show={modalShowSignUp} onHide={() => setModalShowSignUp(false)}>
        <SignUp handleModal={handleSignUpModal} />
      </MyModal>
    </>
  );
}
