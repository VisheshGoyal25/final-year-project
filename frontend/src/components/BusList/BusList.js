import React, { useState, useEffect } from 'react'
import './busList.css'
export default function BusList({value:dataInp,setId:setId }) {
    const [clas, SetClas] = useState(true)


    const handleSubmit = (bId,date,p) => {
        localStorage.setItem("from",JSON.stringify( dataInp[0].startCity));
        localStorage.setItem("to",JSON.stringify( dataInp[0].destination));
        localStorage.setItem("date",JSON.stringify( date));
        localStorage.setItem("price",JSON.stringify(p));
       setId(bId);
        SetClas(false)
    }


    const renderFunction = () => {
        return dataInp.map((bus, idx) => {
           
            return (
                <div key={idx} className="card mt-5 buslist">
                    <div class="row ml-3">
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

                        <div class="w-100 d-none d-md-block"></div>

                        {console.log(bus.seatArray)}
                        <div class="col-6 col-sm-3 mb-4">{bus.companyName}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.startCity}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.destination}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.pricePerSeat}</div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                            <button className={clas ? "btn btn-primary btn-md" : "btn btn-primary btn-md disabled"} onClick={(bId) => { handleSubmit(bus._id,bus.date,bus.pricePerSeat) }} >Book Now</button>
                        </div>
                    </div>
                </div >
            )
        })

    }


    return (
        <div className="">
            {renderFunction()}
        </div>

    )
}
