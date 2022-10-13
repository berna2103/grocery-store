import React from "react";
import SignIn from "../../components/SignInForm/SignInForm";
import styles from "./account.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button, Form } from "react-bootstrap";

export default function MyAccount() {
  
  const { user } = useAuthContext();
 
  return (
    <div className={`container mt-2 ${styles.account}`}>
      {!user ? (
        <div className={`w-50 mx-auto`}>
          <SignIn />
        </div>
      ) : (
        <div className={`container mt-5`}>
          <h1 className={`lead`}>Welcome back {user.email}!</h1>
       
          <div className={`w-50n`}>
          <Form>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control type="email" placeholder="Name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
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
// export async function getServerSideProps() {

//   const docRef = doc(db, 'customers', "B6ajsROZcteWw8izQhubv8fYdZ03") 
//   const docSnap = await getDoc(docRef)

//   return {
//     props: {
//       customer: docSnap.data(),
//     },
//   };
// }
