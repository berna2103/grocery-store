import React from "react";
import styles from "./carousel.module.css";

export default function CarouselItem(props) {
  
  const data = props.item;

  if (!data) {
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
            {data.fields.isOnSale === true &&
            data.fields.onSalePrice > 0 ? (
              <div>
                <p className={`text-danger lead`}>
                  ${data.fields.onSalePrice} on sale!
                </p>
                <p className={`text-decoration-line-through`}>
                  ${data.fields.price}
                </p>
              </div>
            ) : (
              <p className={`text-danger`}>${data.fields.price}</p>
            )}
            <p className="lead text-muted mt-2">{data.fields.description}</p>
            <a
              href={`/products/product-details/${data.sys.id}`}
              className={`link-danger`}
            >
              Shop Now <i className="bi bi-arrow-right-circle-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
