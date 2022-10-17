import React, { useEffect } from "react";
import styles from "./success.module.css";
import { useRouter } from "next/router";
import { useFirestore } from "../../hooks/useFirestore";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
const stripe = require("stripe")(
  "sk_test_51KJmVLBt569SUtL1aCf4ovxKrOfwRjEM7Dbl0rDv75JHugaP4BFSr9tBMVlNMPQyvlISLP4bQN1MNVySGE9af79y00EWLzOZEV"
);

export default function Success(props) {
  const { user } = useAuthContext();

  const { addDocument } = useFirestore(`customers/${user.uid}`)

  const session = props.session;
  const customer = props.customer;
  const payment = props.payment;

  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {

    const data = { session: session, payment: payment}
    
    addDocument(data, session.id)
  
  }, [props]);

  return (
    <div className={`container ${styles.mainBanner}`}>
      <div className={`row h-100`}>
        <div className={`col my-auto mx-auto`}>
          <h1 className={`display-3 text-danger`}>
            Thank you {customer.name}!
          </h1>
          {payment.charges.data[0].receipt_number && (
            <p>Order Confirmation: {payment.charges.data[0].receipt_number}</p>
          )}

          <p>
            {" "}
            <a
              className={`lead text-danger`}
              href={payment.charges.data[0].receipt_url}
            >
              {" "}
              View receipt{" "}
            </a>
          </p>
          <button className={`btn btn-outline-danger`} onClick={handleClick}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { sessionId } = context.params;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const customer = await stripe.customers.retrieve(session.customer);
  const payment = await stripe.paymentIntents.retrieve(session.payment_intent);

  return {
    props: {
      session: session,
      customer: customer,
      payment: payment,
    },
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
