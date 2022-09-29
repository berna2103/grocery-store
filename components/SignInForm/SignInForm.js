import Link from "next/link"
import { useState } from "react"
import { useLogIn } from "../../hooks/useLogin"
import { useResetPassword } from "../../hooks/useResetPassword"
import MyModal from "../Modal/MyModal"
import SignUp from "../SignUp/SignUp"


export default function SignIn({handleModal}){

  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, logIn } = useLogIn()
  const { resetPassword } = useResetPassword()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    logIn(email, password)
  }
  const handlePasswordReset = (e) => {
    e.preventDefault()
    resetPassword(email)
  }

  const handleSignInModal = () => {
    setModalShow(false)
    handleModal()
  }

  return(
    <main className="center-screen p-4">
      <div className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <Link href={'/'}>
              <img className="mb-4" src={'/images/Logo.jpeg'} alt="" height="75"/>
          </Link>
          <h1 className="lead mb-3 fw-normal">Please sign in</h1>  
          <div className="form-floating mb-1">
          <input  
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            type="email" 
            class="form-control" 
            id="floatingInput" 
            placeholder="name@example.com"/>  
          <label HTMLfor="floatingInput">
              Email address
          </label>
          </div>  
          <div className="form-floating">
          <input 
            type="password"
            required 
            className="form-control mb-4" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="floatingPassword" 
            placeholder="Password"/>
          <label HTMLfor="floatingPassword">
              Password
          </label>
          </div>
          
          <button 
            className="w-100 btn btn-lg btn-danger" 
            type="submit">Sign in
          </button>
          <br></br>
          <p>Not registered yet, please 
            <a className='link-danger' onClick={() => setModalShow(true)} href='#'>Sign Up</a>
          </p>
          <p className="mb-3 text-muted">{error && <p>{error}</p>}</p>
          <a href='#' className="link-danger" onClick={handlePasswordReset}>Reset Password</a> 
        </form>
      </div>
      <MyModal show={modalShow} onHide={() => setModalShow(false)}>
        <SignUp handleModal={handleSignInModal}/>
      </MyModal>
    </main>    
  )
}