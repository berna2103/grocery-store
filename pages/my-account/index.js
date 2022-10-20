import React, { useEffect } from "react";
import { auth } from "../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import styles from "./account.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button, Form } from "react-bootstrap";
import { useCollection } from "../../hooks/useCollection";
import Loading from "../../components/Loading/Loaading";
import Link from "next/link";
const Stripe = require("stripe");
const stripe = Stripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function MyAccount() {
  const { user } = useAuthContext();

  if (!user) {
    return <Loading />;
  }
  const { documents: MyOrders } = useCollection(
    `customers/${user.uid}/checkout_sessions`
  );

  const updateMyProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Maximiliano",
    })
      .then(() => {
        // Profile updated!
        alert("Profile updated successfully!");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  return (
    <div className={`container mt-2 ${styles.account}`}>
      <div className={`row`}>
        <div className={`col-lg-2 col-md-3 col-0 border border-1`}>
          <p className={`lead fw-bold mt-3`}>Account</p>
          <hr></hr>
          <p className={`lead`}>Orders</p>
          <Link href={"/my-account/orders"}>
            <a className={`ms-2 text-muted`}>Recent orders</a>
          </Link>
          <hr></hr>
          <p className={`lead`}>Manage profile</p>
          <Link href={"/my-account/personal-information"}>
            <a className={`ms-2 text-muted`}>Personal information</a>
          </Link>
        </div>
        <div className={`col-lg-10 col-md-9 col-12`}>
          <p className={`display-6 fw-bold mt-3`}>Recent orders</p>
          {!MyOrders ? (
            <p>No orders found!</p>
          ) : (
            <div className={`row`}>
              {MyOrders.map((order) => (
                <div className={`col-lg-4 col-md-4 col-6`}>
                  <div className={`card m-1 p-2`}>
                    <a
                      href={order.payment.charges.data[0].receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`me-3 fs-6`}
                    >
                      <i className="bi bi-file-earmark-text text-danger me-2"></i>
                      {order.payment.charges.data[0].created}
                    </a>
                    {!order.session.line_items ? <></> : <p className="text-center text-muted">{`Items: ${order.session.line_items.data.length}`}</p>}
                   
                    <p className="text-center text-muted">
                      Amount total: ${order.session.amount_total / 100}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <hr></hr>
          <div className={`w-50n`}>
            <p className={`lead`}>Personal information</p>
            {!user.displayName ? (
              <h1 className={`lead text-muted`}>Welcome back {user.email}!</h1>
            ) : (
              <h1 className={`lead text-muted`}>
                Welcome back {user.displayName}!
              </h1>
            )}
            <Form onSubmit={updateMyProfile}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Control type="text" placeholder="Update name" />
                <Form.Text className="text-muted">
                  Please update your name!
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Control type="email" placeholder="Phone" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}


