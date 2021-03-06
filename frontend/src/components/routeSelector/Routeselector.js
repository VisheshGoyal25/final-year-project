import React, { useState,useEffect } from 'react'
import './Routeselector.css'
import * as apiCall from './routeApifunc'
import BusList from '../BusList/BusList'
import alanBtn from '@alan-ai/alan-sdk-web';
export default function Routeselector({setId:setId}) {
    const [dataInp, setData] = useState("")
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')
    
    useEffect(() => {
        alanBtn({
            key: '076a72f0ba54f78358f8c74d5a2921752e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command,source,destination}) => {
                console.log(source,destination)
                setStartCity({ startCity: source });
                setDestination({ destination: destination })
                apiCall.getRoutesFromApi(source,destination)
                .then(response => response.data)
                .then(data => {
                    console.log(data)
                    setData(data.bus)
                })
                
            }
        });
      }, []);
    const handleToCity = e => {
        e.preventDefault()
        setDestination({ destination: e.target.value })
    }
    const renderBusList = (dataInp,setId) => {
        if (Object.keys(dataInp).length > 0) {
            return (<BusList value={dataInp} setId={setId} />)
        }
    }
    const handleFromCity = e => {
        e.preventDefault()
        setStartCity({ startCity: e.target.value })
    }
   
    const getRoutes = (e)=> {
        e.preventDefault()
        apiCall.getRoutesFromApi(startCity.startCity, destination.destination)
            .then(response => response.data)
            .then(data => {
                setData(data.bus)
            })
    }

    const handleDate = e => {
        e.preventDefault();
    }
    
    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>FROM</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                    </select>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
                        <option>TO</option>
                        <option>Hyderabad</option>
                        <option>Coimbatore</option>
                        <option>Vishakapatnam</option>
                        <option>Bangalore</option>
                        <option>Chenai</option>
                    </select>
                    <input onChange={e => { handleDate(e) }} type="date"></input>
                    <input type="submit" className=" btn btn-primary btn-md getRoute" />
                </form>

                <div>
                    {renderBusList(dataInp,setId)}
                </div>
            </div>
        </div>
    )
}
