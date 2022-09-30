import React from 'react'
import SignIn from '../../components/SignInForm/SignInForm'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function MyAccount() {
  const { user } = useAuthContext()
  return (
    <div className={`container mt-2`}>
        {!user ? <div className={`w-50 mx-auto`}><SignIn /> </div>: <h1 className={`lead`}>Welcome {user.email}!</h1>}
    </div>
  )
}
