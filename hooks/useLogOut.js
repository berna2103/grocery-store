import { auth } from '../config/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { useRouter } from 'next/router'
 
export const useLogOut = () => {
  const router = useRouter()

  const { dispatch } = useAuthContext()  
  const logOut = () => {
    signOut(auth)
    .then(() => {
        dispatch({ type: 'SIGNOUT'})
        router.push('/')
    })
    .catch((err) => {
        alert('Log out was unsuccessful please try again.')
    } )
  }  
  return { logOut }

}