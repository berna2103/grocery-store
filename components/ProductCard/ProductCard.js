import React from "react";
import Loaading from "../Loading/Loaading";
import styles from "./productcard.module.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

export default function ProductCard({ product }) {
  if (!product) {
    return <Loaading />;
  }
  return (
    <div className={`${styles.container}`}>
      <div
        className={`card p-3 ${styles.cardOnHover} ${styles.cardCustom} p-1 text-center`}
      >
        {!product.fields.productImage[0].fields.file.url ? (
          <p></p>
        ) : (
          <a href={`/products/product-details/${product.sys.id}`}>
            <img
              className={`img-fluid ${styles.imageResponsive} rounded-circle`}
              src={product.fields.productImage[0].fields.file.url}
              alt={product.fields.productName}
            />
          </a>
        )}
        <p className={`text-truncate mt-2`}>{product.fields.productName}</p>
        {product.fields.isOnSale === true && product.fields.onSalePrice > 0 ? (
          <div>
            <p className={`text-danger fw-bold`}>
              ${product.fields.onSalePrice} on sale!
            </p>
            <p className={`text-decoration-line-through`}>
              ${product.fields.price}
            </p>
          </div>
        ) : (
          <p className={`text-danger`}>${product.fields.price}</p>
        )}
        <AddToCartButton id={product.sys.id} product={product} />
      </div>
    </div>
  );
}
