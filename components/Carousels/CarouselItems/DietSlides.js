import React from 'react'
import styles from './diet-slide.module.css'

export default function DietSlides(props) {
    const { title, description, imageUrl, id, buttonLabel, link } =
    props;

  if (!props) {
    return <p>loading ...</p>;
  }

  return (
    <div className={`${styles.carouselItem} bg-light`}>
      <div key={id} className="container mb-5">
        <div className="row h-100 shadow-lg mb-3">
          <div className="col-lg-5 col-md-6 col-sm-12 p-0 m-0 bg-white">
            <img
              className={`img-fluid ${styles.imgSize}`}
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="col-lg-7 col-md-6 col-sm-12 p-5 my-auto">
            <h1 className="display-6 text-danger">{title}</h1>
            <p className="lead text-muted mt-2">{description}</p>
            <a
              href={link}
              className={`link-danger`}
            >
              {buttonLabel} <i className="bi bi-arrow-right-circle-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
