import React from "react";
import styles from "./special-events.module.css";

export default function SpecialEvents(props) {
  const specialEvents = props.item;

  if (!specialEvents) {
    return <p>No data found!</p>;
  }

  return (
    <div className={`container`}>
      <div className={`row bg-light ${styles.bannerHeight}`}>
        <div
          className={`col-lg-7 col-md-6 p-5 my-auto order-lg-first order-md-first order-sm-last order-1'`}
        >
          <h1 className={`display-5 text-danger`}>
            {specialEvents.fields.event}
          </h1>
          <p className={`lead text-muted`}>
            {specialEvents.fields.eventDescription}
          </p>
          <a
            href={`/products/${specialEvents.fields.event}/${specialEvents.sys.id}`}
            className={`lead stretched-link btn btn-outline-danger`}
          >
            Shop now <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </div>
        <div
          className={`col-lg-5 col-md-6 p-0 m-0 order-lg-last order-md-last order-sm-first order-2`}
        >
          {!specialEvents.fields.eventImage[0].fields.file.url ? (
            <p></p>
          ) : (
            <img
              className={`img-fluid  ${styles.imageResponsive}`}
              src={specialEvents.fields.eventImage[0].fields.file.url}
              alt={specialEvents.fields.eventImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
