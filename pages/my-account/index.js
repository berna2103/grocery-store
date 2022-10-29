import { auth } from "../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import styles from "./account.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button, Form } from "react-bootstrap";
import { useCollection } from "../../hooks/useCollection";
import Loading from "../../components/Loading/Loaading";
import { convertDate } from "../../utililies/date";
import Link from "next/link";
const Stripe = require("stripe");
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function MyAccount() {
  const { user } = useAuthContext();

  if (!user) {
    return <Loading />;
  }
  const { documents: MyOrders } = useCollection(
    `customers/${user.uid}/checkout_sessions`
  );

  const updateMyProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Maximiliano",
    })
      .then(() => {
        // Profile updated!
        alert("Profile updated successfully!");
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log(error)
      });
  };

  return (
    <div className={`container mt-2 ${styles.account}`}>
      <div className={`row`}>
        <div className={`col-lg-2 col-md-3 col-0 border border-1`}>
          <p className={`lead fw-bold mt-3`}>Account</p>
          <hr></hr>
          <p className={`lead`}>Orders</p>
          <Link href={"/my-account/orders"}>
            <a className={`ms-2 text-muted`}>Recent orders</a>
          </Link>
          <hr></hr>
          <p className={`lead`}>Manage profile</p>
          <Link href={"/my-account/personal-information"}>
            <a className={`ms-2 text-muted`}>Personal information</a>
          </Link>
        </div>
        <div className={`col-lg-10 col-md-9 col-12`}>
          <p className={`display-6 fw-bold mt-3`}>Recent orders</p>
          {!MyOrders ? (
            <p>No orders found!</p>
          ) : (
            <div className={`row`}>
              {MyOrders.map((order, index) => (
                <div className={`col-lg-12`}>
                  <div className={`accordion`} id="accordionOrder">
                    <div className={`accordion-item mb-2`} id={index}>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id={index}>
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${order.id}`}
                            aria-expanded="true"
                            aria-controls={order.id}
                          >
                            <i className="bi bi-calendar3 text-danger me-2"></i>
                            {convertDate(order.payment.charges.data[0].created)}
                          </button>
                        </h2>
                        <div
                          id={order.id}
                          className="accordion-collapse collapse"
                          aria-labelledby={index}
                          data-bs-parent="#accordionOrder"
                        >
                          <div className="accordion-body">
                            <div>
                              <span className="text-center text-muted">
                                <span>
                                  {!order.session.line_items ? (
                                    <></>
                                  ) : (
                                    <>
                                      {order.session.line_items.data.map(
                                        (item) => (
                                          <div
                                            className={`d-flex justify-content-between`}
                                          >
                                            <div>{`${item.quantity} qty`}</div>
                                            <div>{`${item.description}`}</div>
                                            <div>{`$${
                                              item.amount_total / 100
                                            }`}</div>
                                            {console.log(order.session)}
                                          </div>
                                        )
                                      )}
                                      <hr></hr>
                                      <div className={`text-end`}>
                                        <p className={`lead`}>
                                          Total:{" "}
                                          {order.session.amount_total / 100}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <hr></hr>
          <div className={`w-50n`}>
            <p className={`lead`}>Personal information</p>
            {!user.displayName ? (
              <h1 className={`lead text-muted`}>Welcome back {user.email}!</h1>
            ) : (
              <h1 className={`lead text-muted`}>
                Welcome back {user.displayName}!
              </h1>
            )}
            <Form onSubmit={updateMyProfile}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Control type="text" placeholder="Update name" />
                <Form.Text className="text-muted">
                  Please update your name!
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Control type="email" placeholder="Phone" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
