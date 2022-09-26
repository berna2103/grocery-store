import { useState } from "react";
import { auth } from '../config/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from './useAuthContext'

export const useLogIn = () => {

  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()  
  const logIn = (email, password) => {  
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user })
    }).then(() => {
      auth.currentUser.getIdToken(true)
      auth.currentUser.getIdTokenResult().then((result) => {
        dispatch({ type: 'AUTH_ROLE', payload: result.claims.stripeRole })
      })
    })
    .catch((err) => {
        setError(err.message)
    })
  }
  return { error, logIn }
}