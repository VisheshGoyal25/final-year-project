import React, { useState } from 'react'
import './logOrsign.css'
    
  
export default function LogOrsign({ history }) {

    let [userData, setUserData] = useState({})
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
      };
    
      const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
      };
    
      const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
      };



    return (
        <div className="container">
            <section className="myform-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="form-area login-form">
                                <div className="form-content">
                                    <h2>Login</h2>
                                    <p>you chose the right option</p>
                                    <ul>
                                        <li><div className="facebook" onClick={google}>Google</div></li>
                                    </ul>
                                    <ul>
                                        <li><div className="facebook" onClick={facebook}>facebook</div></li>
                                    </ul>
                                    <ul>
                                        <li><div className="facebook" onClick={github}>GitHub</div></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    )
}
