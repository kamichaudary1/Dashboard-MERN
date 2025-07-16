import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenLS} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        console.log("response DATA", res_data);
        storeTokenLS( res_data.token );
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      }
      console.log("response ...", response);
    } catch (error) {
      console.log("register error", error);
    }

  }

  return (
    <section>
      <main>
        <div className='section-registration'>
          <div className='container grid grid-rwo-cols'>
            <div className='registration-image'>
              <h1>Registration BOX</h1>
            </div>
            <div className='registration-form'>
              <h1 className='main-heading mb-3'>
                registration form
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">
                    username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder='username'
                    id="username"
                    required
                    autoComplete='off'
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
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
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">
                    phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    placeholder='enter your phone'
                    id="phone"
                    required
                    autoComplete='off'
                    value={user.phone}
                    onChange={handleInput}
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
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <button type="submit" btn btn-submit>Register Now</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Register 
