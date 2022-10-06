import React from "react";

export default function Cancelled() {
  return (
    <div className={`container text-center mt-5`}>
      <h1 className={`display-6 text-danger`}>
        Something went wrong your order has not been processed.
      </h1>
    </div>
  );
}
