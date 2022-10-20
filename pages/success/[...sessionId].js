import React, { useEffect, useState } from "react";
import styles from "./success.module.css";
import { useRouter } from "next/router";
import { useFirestore } from "../../hooks/useFirestore";
import Loading from '../../components/Loading/Loaading'
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default function Success(props) {
  const session = props.session;
  const customer = props.customer;
  const payment = props.payment;
  const uid = props.uid;

  const { addDocument } = useFirestore(`customers/${uid}/checkout_sessions`);

  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  if(!uid){
    return <Loading />
  }

  useEffect(() => {
    const data = { active: true, session: session, payment: payment };
    addDocument(data, session.id);
  }, [uid]);

  return (
    <div className={`container ${styles.mainBanner}`}>
      <div className={`row h-100`}>
        <div className={`col my-auto mx-auto`}>
          <h1 className={`display-3 text-danger`}>
            Thank you {customer.name}!
          </h1>
          {payment.charges.id && (
            <p>Order Confirmation: {payment.charges.data[0].created}</p>
          )}
          <p>
            <a
              className={`lead text-danger`}
              href={payment.charges.data[0].receipt_url}
            >
              View receipt
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
  const session = await stripe.checkout.sessions.retrieve(sessionId[1], {
    expand: ['line_items']
  });
  const customer = await stripe.customers.retrieve(session.customer);
  const payment = await stripe.paymentIntents.retrieve(session.payment_intent);

  return {
    props: {
      session: session,
      customer: customer,
      payment: payment,
      uid: sessionId[0],
    },
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
