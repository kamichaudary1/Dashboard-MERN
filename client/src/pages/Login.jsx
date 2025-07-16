import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () => {
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const {storeTokenLS} = useAuth();

  const handleInput = ( e ) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const URL = "http://localhost:5000/api/auth/login";

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok) {
        const res_data = await response.json();
        console.log("response DATA", res_data);
        storeTokenLS( res_data.token );
        setUser({ email: "", password: ""});
        navigate("/");
      }
    } catch (error) {
      console.log(error, "login error")
    }
  }

  return (
    <section>
      <main>
        <div className='section-registration'>
          <div className='container grid grid-rwo-cols'>
            <div className='registration-image'>
              <h1>Login BOX</h1>
            </div>
            <div className='registration-form'>
              <h1 className='main-heading mb-3'>
                login form
              </h1>
              <form onSubmit={ handleSubmit }>
                <div>
                  <label htmlFor="email">
                    email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder='enter your email'
                    id="email"
                    required
                    autoComplete='off'
                    value={ user.email }
                    onChange={ handleInput }
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    password
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='enter your password'
                    id="password"
                    required
                    autoComplete='off'
                    value={ user.password }
                    onChange={ handleInput }
                  />
                </div>
                <button type="submit" btn btn-submit>Login</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section> 
  )
}

export default Login
