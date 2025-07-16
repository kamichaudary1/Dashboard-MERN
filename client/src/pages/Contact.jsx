import { useState } from "react";

const Contact = () => {
  const [ contact, setContact ] = useState({
    username: "",
    email: "",
    messsage: ""
  });

  const handleInput = ( e ) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    console.log(contact, "contact") 
  }

  return (
    <section className="section-contact">
      <div className='contact-content container'>
        <h1>contact</h1>
      </div>
      <div className='container grid grid-two-cols'>
        <div className='contact-box'>
          <h2>Contact Form Box</h2>
        </div>
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input 
                type="text" 
                name="username"
                id="username"
                autoComplete='off'
                value={contact.username}
                onChange={handleInput}
                required
              />  
            </div> 
            <div>
              <label htmlFor="email">email</label>
              <input 
                type="text" 
                name="email"
                id="email"
                autoComplete='off'
                value={contact.email}
                onChange={handleInput}
                required
              />  
            </div>  
            <div>
              <label htmlFor="message">message</label>
              <textarea 
                name="message" 
                id="message"
                autoComplete=""
                value={contact.message}
                onChange={handleInput}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div>
              <button type="submit">submit</button>
            </div>
          </form>  
        </section>
      </div>        
    </section>
  )
}

export default Contact;
