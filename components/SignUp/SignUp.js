
import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import Link from "next/link";
import { useRouter } from "next/router";


export default function SignUp({handleModal}){

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, signUp } = useSignUp()


    const handleSubmit = (e) => {
      e.preventDefault()
      signUp(email, password)
      handleModal()
      router.push('/')
    }
 
    return(
      <div className="center-screen text-center">
        <div className="form-signin">
          <form onSubmit={handleSubmit}>
            <Link href={'/'}>
              <img 
                className="mb-4" 
                src={'/images/Logo.jpeg'} 
                alt=""  
                height="75"/>
            </Link>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            <div className="form-floating">
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
                className="form-control" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="floatingPassword" 
                placeholder="Password"/>
              <label HTMLfor="floatingPassword">Password</label>
            </div>
        
            <button 
              className="w-100 btn btn-lg btn-danger" 
              type="submit">Sign Up
            </button>
            <br></br>
            <p>Already have account, please <Link className='link-text' href='/signin'>Sign In</Link></p>
            <p className="mt-5 mb-3 text-muted">{error && <p>{error}</p>}</p>
          </form>
        </div>
      </div>  
    )
}