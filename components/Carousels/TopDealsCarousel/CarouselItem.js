import React from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

export default function CarouselItem(props) {
  const data = props.item;
  const myLoader = () => {
    return `${data.imgURL}`;
  };

  if (!data) {
    console.log(props)
    return <p>loading ...</p>;
  }

  return (
    <div className={`${styles.carouselItem} bg-light`}>
      <div key={props.key} className="container mb-5">
       
        <div className="row h-100 shadow-lg mb-3">
          <div className="col-lg-5 col-md-6 col-sm-12 p-0 m-0 bg-white">
            <img
              className={`img-fluid ${styles.imgSize}`}
              src={data.fields.productImage[0].fields.file.url}
              alt={data.title}
            />
          </div>
          <div className="col-lg-7 col-md-6 col-sm-12 p-5 my-auto">
            <h1 className="display-6 text-danger">{data.fields.productName}</h1>
            <p className="lead text-muted mt-2">{data.fields.description}</p>
            <a href={`/products/product-details/${data.sys.id}`}className={`link-danger`}>
              Shop Now <i className="bi bi-arrow-right-circle-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
