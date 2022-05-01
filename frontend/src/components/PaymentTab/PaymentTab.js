import React from 'react'
import Card from 'react-credit-cards'
import './PaymentTab.css'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from './utils'
import 'react-credit-cards/es/styles-compiled.css'
export default class App extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: '',
        token: '',
        data:this.props.bus_data,

    }
     
    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer })
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        })
    }

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value)
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value)
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value)
        }

        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value
                return acc
            }, {})

        this.setState({ formData })
        this.form.reset()
    }

    moveToTicketPage = e => {
        e.preventDefault()
        localStorage.setItem("data",JSON.stringify( this.props.bus_data))
        window.location.href = '/getTicket'
    }

    renderNamesOfPassenger = () => {
        const data=this.props.bus_data;
        console.log(data);
            return data.map((name, idx) => {
                return <p key = { idx } > { name.name } </p>
            })
        
    }

    renderSeatNumbers=()=>{
        
        const data=this.props.bus_data;
            return data.map((seat, idx)=>{
                return <p key = { idx } > { seat.seatNumber } </p>
            })
        
    }
    
    getCost=()=>{
        const data=this.props.bus_data;
        let cost=0;
        data.forEach(element => {
            cost++;
        });
        return cost* JSON.parse( localStorage.getItem("price"));
    }
    getSumTotal = () => {
        const data=this.props.bus_data;
        let tax = 150
            
            return data.length * JSON.parse( localStorage.getItem("price"))+tax;
            
        
    }

    render() {
        const {
            name,
            number,
            expiry,
            cvc,
            focused,
            issuer,
            
        } = this.state

        return ( 
            <div className = 'paym' >
            <div className = 'row' >
            <div key = 'Payment' >
            <div className = 'App-payment cl-1' >
            <p className = 'pPayment' > Enter Credit card details </p> 
            <Card number = { number }
            name = { name }
            expiry = { expiry }
            cvc = { cvc }
            focused = { focused }
            callback = { this.handleCallback }
            /> 
            <form className = 'credit-form' ref = { c => (this.form = c) } onSubmit = { this.handleSubmit } >
            <div className = 'form-group' >
            <input type = 'tel'
            name = 'number'
            className = 'frm-ctrl'
            placeholder = 'Card Number'
            pattern = '[\d| ]{16,22}'
            required onChange = { this.handleInputChange }
            onFocus = { this.handleInputFocus }/>
            </div> 
            <div className = 'form-group' >
            <input type = 'text'
            name = 'name'
            className = 'frm-ctrl'
            placeholder = 'Name'
            required onChange = { this.handleInputChange }
            onFocus = { this.handleInputFocus }
            />
            </div>
            <div className = 'form-group' >
            <input type = 'tel'
            name = 'expiry'
            className = 'frm-ctrl'
            placeholder = 'Valid Thru'
            pattern = '\d\d/\d\d'
            required onChange = { this.handleInputChange }
            onFocus = { this.handleInputFocus }
            />
            </div>
            <div className = 'form-group' >
            <input type = 'tel'
            name = 'cvc'
            className = 'frm-ctrl cvc'
            placeholder = 'CVC'
            pattern = '\d{3,4}'
            required onChange = { this.handleInputChange }
            onFocus = { this.handleInputFocus }
            />
            </div> 
            <input type = 'hidden'
            name = 'issuer'
            value = { issuer }
            />
            <div className = '' >
            <button onClick = { e => this.moveToTicketPage(e) } className = 'btn btn-light btCustom' >PAY  </button>
             </div>  
             </form>  </div>  </div>  
             <div className = 'columnTwo' >
            <h3> Travel Booking System </h3>  
            <div>
            <p > BOOKING DETAILS </p>  
            <div className = 'row' >
            <div className = 'col-6 pt' >
             <hr className='hr3'/ >
            <p className = 'hdng' > Date </p> <p className='hdng'> From </p >
            <p className = 'hdng' > To </p> <hr className='hr3' / >
            <p className = 'hdng' > Passengers </p>  { this.renderNamesOfPassenger() } < hr className = 'hr3' / >
            <p className = 'hdng' > Ticket price </p>  
            < p className = 'hdng' > Tax </p> 
             <p className = 'hdng' > Toal Sum </p>  
             </div>  
             <div className = 'col-6' >
            <hr className = 'hr3' / >
            <p className = 'usrName' > { localStorage.getItem('date') } 
            </p>  
            <p className = 'usrName' > { localStorage.getItem('from') } </p>  
            <p className = 'usrName' > { localStorage.getItem('to') } </p> 
            <hr className = 'hr3' / >
            <p className = 'hdng' >
            Seat No </p> {this.renderSeatNumbers()} 
            <hr className = 'hr3' / >
                <p>{this.getCost()}</p>
             <p>150</p>
            <p> {this.getSumTotal()} </p >
            </div>  </div>  </div>  </div>  </div>  </div>
        )
    }
}