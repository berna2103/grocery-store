import { useContext } from "react";
import Modal from "../../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          image={item.image}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // const checkout = async () => {
  //   const response = await axios
  //     .post("/api/checkout_sessions", {
  //       Headers: { "Content-Type": "application/json" },
  //       body: cartCtx.items,
  //     })
  //     console.log(response)
  // };
  const checkout = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/checkout_sessions', {
      body: cartCtx.items,
      headers: {
        "Content-Type": 'application/json'
      }
    });
    console.log(checkoutSession.data.session.id)
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.session.id,
    } );
     
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={`bg-light p-3 m-0`}>
        <div className={`${classes.total}`}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button onClick={checkout} className={classes.button}>
              Checkout
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
