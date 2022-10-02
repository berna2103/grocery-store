import React from "react";
import SignIn from "../../components/SignInForm/SignInForm";
import styles from "./account.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function MyAccount() {
  const { user } = useAuthContext();
  return (
    <div className={`container mt-2 ${styles.account}`}>
      {!user ? (
        <div className={`w-50 mx-auto`}>
          <SignIn />
        </div>
      ) : (
        <>
          <h1 className={`lead`}>Welcome back {user.email}!</h1>
          <form>
            <input placeholder="name" />
            <input placeholder="phone" />
          </form>
        </>
      )}
    </div>
  );
}
