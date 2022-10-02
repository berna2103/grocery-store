import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <div className={`row ${classes.product}`}>
          <div className={`col-2 my-auto pb-1`}>
            <img src={props.image} alt={props.name} />
          </div>
          <div className={`col my-auto ms-3`}>
            <h2>{props.name}</h2>
          </div>
        </div>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;