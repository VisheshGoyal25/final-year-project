import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default  function Email() {
  const form = useRef();
  const data=JSON.parse( localStorage.getItem("data"));
  let from = localStorage.getItem("from")
    let to = localStorage.getItem("to")
    let name=JSON.parse(localStorage.getItem("name"))    
    let email=JSON.parse(localStorage.getItem("email"))
    data.push(from);
    data.push(to);
    data.push(name)
    data.push(email)
    console.log(data);
    useEffect(()=>{
      sendEmail();
    })
  const sendEmail = () => {
    emailjs.sendForm("service_kp5tozv", "template_q0iniri", form.current, "fNURaBOmdvOWNS683")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  
  return (
    <form ref={form} onSubmit={sendEmail} style={{display:"none"}}>
      <input type="text" name="user_name"  value={name}></input>
      <input type="email" name="user_email" value={email}></input>
      <input  type="text" name ="from" value={from} ></input>
      <input  type="text" name ="to" value={to} ></input> 
    </form>
  );
};