import React from "react";
import { useCollection } from "../../hooks/useCollection";
import Loading from "../../components/Loading/Loaading";

export default function ActiveOrders() {
  const { documents: Orders } = useCollection(`orders`);

  if (!Orders) {
    return <Loading />;
  }

  const convertTime = (created) => {
    const convertedTime = new Date(created * 1000).toLocaleTimeString();
    return convertedTime;
  };

  const convertDate = (created) => {
    const convertedDate = new Date(created * 1000).toLocaleDateString();
    return convertedDate;
  };

  return (
    <div className={`container`}>
      <h1 className={`display-5 mb-3`}>Pending Orders</h1>
      <div className={`row`}>
        {Orders.map((order) => (
          <>
            {console.log(order)}
            <div className={`col-6 mb-2`}>
              <div className={`card p-1`}>
                <div className={`card-header`}>
                  <p className={`me-5 text-muted`}>
                    {`${convertDate(order.session.created)}`}
                     <span><i className="bi bi-hourglass-top text-danger ms-5"></i></span>
                    <span className={`text-danger ms-2`}>
                      {convertTime(order.session.created)}
                    </span>
                  </p>
                </div>
                <div className={`card-body`}>
                  <p className={`lead`}>Order amount: ${order.session.amount_total/100}</p>
                  <a href={`/active-orders/details/${order.id}`} className={`btn btn-outline-danger`}>Fullfill order</a>
                </div>
              </div>
            </div>
          </>
        ))}
        {console.log(Orders)}
      </div>
    </div>
  );
}
