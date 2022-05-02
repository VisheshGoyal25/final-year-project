import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage/Homepage'
import RouteSelection from './components/RouteSelection/RouteSelection'
import LogOrsign from './components/Login-Signup/LogOrsign.js'
import TicketPage from './components/TicketPage/TicketPage'
import './App.css';
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          resObject.user.auth=resObject.auth;
          console.log(resObject.user)
          localStorage.setItem("email",JSON.stringify( resObject.user.email))
          localStorage.setItem("name",JSON.stringify( resObject.user.name))

          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Homepage {...props} />} />
          <Route path="/login" render={props => <LogOrsign {...props} />} />
          <Route path="/routes" exact render={props => <RouteSelection {...props} />} />
          <Route path="/getTicket" exact render={props => <TicketPage {...props} />} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
