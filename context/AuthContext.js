import { createContext, useReducer, useEffect } from 'react'
import { auth } from '../config/firebaseConfig'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'SIGNOUT':
      return { ...state, user: null, authRole: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    case 'AUTH_ROLE':
      return { ...state, authRole: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authRole: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  // useEffect(() => {
  //   const userRole = auth.onIdTokenChanged(() => {
  //     auth.currentUser.getIdToken(true)
  //     auth.currentUser.getIdTokenResult().then((result) => {
  //       dispatch({ type: 'AUTH_ROLE', payload: result.claims.stripeRole })
  //     })
  //   })
  //   userRole()
    
  // }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}