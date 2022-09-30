import React from "react";
import Loaading from "../Loading/Loaading";
import styles from "./productcard.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function ProductCard({ product }) {

  const { user } = useAuthContext()
  
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
          <img
            className={`img-fluid ${styles.imageResponsive} rounded-circle`}
            src={product.fields.productImage[0].fields.file.url}
            alt={product.fields.productName}
          />
        )}
        <p className={`text-truncate mt-2`}>{product.fields.productName}</p>
        {(product.fields.isOnSale === true && product.fields.onSalePrice > 0) ? (
          <div>
            <p className={`text-danger fw-bold`}>
              ${product.fields.onSalePrice} on sale!
            </p>
            <p className={`text-decoration-line-through`}>${product.fields.price}</p>
          </div>
        ) : (
          <p className={`text-danger`}>${product.fields.price}</p>
        )}
        {!user ? <button className={`btn btn-danger btn-sm ${styles.button} rounded-pill me-4 ms-4`}>
        </button> :
           <button className={`btn btn-danger btn-sm ${styles.buttonLoggedIn} rounded-pill me-4 ms-4`}> 
            </button>
        }
    
        <a
          href={`/products/product-details/${product.sys.id}`}
          className="stretched-link"
        ></a>
      </div>
    </div>
  );
}
