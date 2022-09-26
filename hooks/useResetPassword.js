
import { auth } from '../config/firebaseConfig'
import { sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {

  const resetPassword = (email) => {
      
    sendPasswordResetEmail(auth, email)
    .then(() => {
    // Password reset email sent!
      alert('Reset link sent to your email address!')
    // ..
    })
    .catch((error) => {
      alert('Check your email and try again!')
    // ..
  });
}
return { resetPassword }
}