import React from "react";
import styles from "./success.module.css";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className={`container ${styles.mainBanner}`}>
      <div className={`row h-100`}>
        <div className={`col my-auto mx-auto`}>
          <h1 className={`display-3 text-danger`}>Thank you for your order!</h1>
          <p className={`lead`}> Please check your email for receipt.</p>
          <button className={`btn btn-outline-danger`} onClick={handleClick}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
