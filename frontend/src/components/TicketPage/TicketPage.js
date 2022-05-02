import React from 'react'
import './TicketPage.css'
import {sendEmail,ContactUs}  from './Email';
export default function TicketPage() {
     const data=JSON.parse( localStorage.getItem("data"));
    const handleSignOut = e => {
        e.preventDefault()
        
        window.open("http://localhost:5000/auth/logout", "_self");
    }
  
    const getLocationData = () => {
        let from = localStorage.getItem("from")
        let to = localStorage.getItem("to")
        return (
            <div>
                <p>From:  {from}</p>
                <p>To:  {to}</p>
            </div>
        )
    }
    const getPassengerName = () => {
        
        return data.map((name, idx) => {
            return (
                <div key={idx}>
                    <p className="names">{name.name}</p>
                </div>
            )
        })
    }
    const getSeatNumbers = () => {
        
        return data.map((element, idx) => {
            return (
                <div key={idx}>
                    <p classsName="seatNo">{element.seatNumber}</p>
                </div>
            )
        })
    }
    const getIdNumber = () => {
        console.log("ticket show");
        ContactUs();
        //sendEmail(data);
        return (
            <p className="idData">
                874357855285365385
            </p>
        )
    }
    const getDateValue = () => {
        return <p>On: {localStorage.getItem("date")}, 10 AM (Hourly commute)</p>
    }
    return (

        <div className="container">
            <div>
                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
                    <a href="/#" className="navbar-brand Company-Log">UT</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                        <ul className="navbar-nav ml-auto nav-flex-icons ic">
                            
                            <li className="nav-item">
                                <a href="/#" className="nav-link waves-effect waves-light" onClick={e => handleSignOut(e)}>Sign-Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="tpMain">
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">
                            1 🎟 Travel Booking System
                        </div>
                    </header>
                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>
                    <div className="ticket__body">
                        <section className="ticket__section">
                            {getLocationData()}
                            {getSeatNumbers()}
                            <p>Your seats are together <span>{getDateValue()}</span></p>
                        </section>
                        <section className="ticket__section">
                            <h3>Passenger Names</h3>
                            {getPassengerName()}
                        </section>
                        <section className="ticket__section">
                            <h3>Payment Method</h3>
                            <p>Credit Card</p>
                        </section>
                    </div>
                    <footer className="ticket__footer">
                        <p>Transaction-ID</p>
                        {getIdNumber()}
                    </footer>
                </article>
            </div>

        </div>

    )
}
