import React from "react";
import styles from "./cancelled.module.css";
const stripe = require("stripe")(
  "sk_test_51KJmVLBt569SUtL1aCf4ovxKrOfwRjEM7Dbl0rDv75JHugaP4BFSr9tBMVlNMPQyvlISLP4bQN1MNVySGE9af79y00EWLzOZEV"
);

export default function Cancelled(props) {
  const session = props.session;
  return (
    <div className={`container text-center ${styles.mainBanner}`}>
      <div className="row h-100">
        <div className={`col my-auto`}>
        <i class="bi bi-exclamation-circle-fill text-danger display-1"></i>
          <h1 className={`lead text-danger mt-5`}>
            OOPs! Something went wrong your order has not been processed.
          </h1>
          <a href={session.url} className={`btn btn-outline-danger mt-5`}>
            Go to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { sessionId } = context.params;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    props: {
      session: session,
    },
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
