import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const data=JSON.parse( localStorage.getItem("data"));
  let from = localStorage.getItem("from")
    let to = localStorage.getItem("to")
    let name=localStorage.getItem("name")    
    let email=localStorage.getItem("email")
    data.push(from);
    data.push(to);
    data.push(name)
    data.push(email)
    console.log(data);
    //sendEmail();

    // emailjs.sendForm("service_kp5tozv", "template_q0iniri", form.current, "fNURaBOmdvOWNS683")
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  
  const sendEmail = (e) => {
    e.preventDefault();
    //let sex=new FormData();
    emailjs.sendForm("service_kp5tozv", "template_q0iniri", form.current, "fNURaBOmdvOWNS683")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};