import { auth } from '../config/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
 
export const useLogOut = () => {

  const navigate = useNavigate()
  const { dispatch } = useAuthContext()  
  const logOut = () => {
    signOut(auth)
    .then(() => {
        dispatch({ type: 'SIGNOUT'})
        navigate('/')
    })
    .catch((err) => {
        alert('Log out was unsuccessful please try again.')
    } )
  }  
  return { logOut }

}