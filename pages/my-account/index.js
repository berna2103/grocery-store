import React from "react";
import { auth } from '../../config/firebaseConfig'
import { updateProfile } from "firebase/auth";
import SignIn from "../../components/SignInForm/SignInForm";
import styles from "./account.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button, Form } from "react-bootstrap";
import { useCollection } from "../../hooks/useCollection";
import Loading from '../../components/Loading/Loaading'

export default function MyAccount() {
  const { user } = useAuthContext();

  if(!user){
    return <Loading />
  }
  const { documents: MyOrders } = useCollection(
    `customers/${user.uid}/checkout_sessions`
  );

  const updateMyProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Bernardo"
    }).then(() => {
      // Profile updated!
      alert('Profile updated successfully!')
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
      
    });
    
  }

  return (
    <div className={`container mt-2 ${styles.account}`}>
      {!user ? (
        <div className={`w-50 mx-auto`}>
          <SignIn />
        </div>
      ) : (
        <div className={`container mt-5`}>
          <p className={`lead`}>Recent receipts</p>
          {!MyOrders ? (
            <p>No orders found!</p>
          ) : (
            <div className={`row`}>
              {MyOrders.map((order) => (
                <div className={`col-lg-2 col-md-3 col`}>
                <div className={`card m-1 p-2`}>
                  <a
                    href={order.payment.charges.data[0].receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`me-3 fs-6`}
                  >
                     <i className="bi bi-file-earmark-text text-danger me-2"></i>
                     {order.payment.charges.data[0].created}
                  </a>
                  {/* {order.payment.charges.data[0].receipt_number && <p>Receipt: {order.payment.charges.data[0].receipt_number}</p>} */}
                  {console.log(order)}
                  <p className="text-center mt-2 text-muted">Amount total: ${order.session.amount_total/100}</p>
                </div>
                </div>
              ))}
            </div>
          )}
          <hr></hr>
          <div className={`w-50n`}>
          <p className={`lead`}>My Profile</p>
          {!user.displayName ? <h1 className={`lead text-muted`}>Welcome back {user.email}!</h1> :
          <h1 className={`lead text-muted`}>Welcome back {user.displayName}!</h1>}
            <Form onSubmit={updateMyProfile}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Control type="email" placeholder="Name" />
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
      )}
    </div>
  );
}