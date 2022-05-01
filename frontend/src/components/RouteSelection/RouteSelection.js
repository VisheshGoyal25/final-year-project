import React from 'react'
import RouteSelector from '../routeSelector/Routeselector'
import SeatSelection from '../SeatSelection/SeatSelection'
import PaymentTab from '../PaymentTab/PaymentTab'
import { useState } from 'react'
export default function RouteSelection() {
     
    const [bus_id, setId] = useState("null");
    const [bus_data, setData] = useState([]);
    const handleSignOut = e => {
        e.preventDefault()
        window.open("http://localhost:5000/auth/logout", "_self");
    }
    
    return (
        <div style={{backgroundColor: 'rgb(189 12 167 / 85%)' }} className="container">
            <div>
                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
                    <a href="/#" className="navbar-brand Company-Log">UT</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                        <ul className="navbar-nav ml-auto nav-flex-icons ic">
                            <li className="nav-item">
                                <a href="/#" className="nav-link waves-effect waves-light"><i className="fa fa-user user"></i></a>
                            </li>
                            <li className="nav-item">
                                <a href="/#" className="nav-link waves-effect waves-light" onClick={e => handleSignOut(e)}>Sign-Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#home">Select Bus</a>
                    </li>
                    <li className="nav-item" disabled>
                        {bus_id!=="null"?<a className="nav-link " data-toggle="pill"  href="#menu1" >Select Seat</a>:
                        <span className="nav-link " data-toggle="pill"   >Select Seat</span>}
                    </li>
                    <li className="nav-item" disabled>
                        {bus_data.length!==0?<a className="nav-link" data-toggle="pill" href="#menu2">Payment</a>:
                        <span className="nav-link" data-toggle="pill" >Payment</span>}
                    </li>
                </ul>
                <div className="tab-content">
                    
                    <div className="tab-pane container active mn-box" id="home"><RouteSelector setId={setId}/></div>
                  <div className="tab-pane container fade mn-box" id="menu1"><SeatSelection setData={setData}/></div>
                    <div className="tab-pane container fade mn-box" id="menu2"><PaymentTab bus_data={bus_data}/></div>
                </div>
            </div>

        </div>
    )
}
