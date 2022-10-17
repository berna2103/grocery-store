import React from "react";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./button.module.css";

export default function AddToCartButton(props) {
  const { user } = useAuthContext();
  const cartCtx = useContext(CartContext);

  const product = props.product;
  const id = props.id;

  const addToCartHandler = (amount) => {
    if (!product.fields) {
      cartCtx.addItem({
        id: id,
        sku: product.sku,
        name: product.productName,
        image: product.productImage[0].fields.file.url,
        amount: 1,
        price: product.price,
      });
    } else {
      cartCtx.addItem({
        id: id,
        sku: product.fields.sku,
        name: product.fields.productName,
        image: product.fields.productImage[0].fields.file.url,
        amount: 1,
        price: product.fields.price,
      });
    }
  };

  return (
    <>
      {!user ? (
        <button
          className={`btn btn-danger btn-sm ${styles.button} rounded-pill me-4 ms-4`}
        ></button>
      ) : (
        <>
          <button
            onClick={addToCartHandler}
            className={`btn btn-danger btn-sm ${styles.buttonLoggedIn} rounded-pill me-4 ms-4`}
          ></button>
        </>
      )}
    </>
  );
}
