import React, { Component, ListItem } from 'react'
import App from "./App";
import {Restaurant, credit_card, Address} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

class CheckoutView extends React.Component {
    constructor(props) {
        super(props);
        this.state={'option':'Cash', 'selected_card': null, 'cards':[], 'addresses':[], 'selected_address': null, 'total_price':0, 'service':'Pickup', 'rewards': 223}
        this._addAddress.bind(this)
    }

    componentDidMount() {
        //api call to fetch restaurants
        let credit_cards=[new credit_card(12, 1,1233435346,598), new credit_card(112, 1,1233437777,123)]
        let addresses = [new Address(123, 1, '123 Fake St APT 3', 'Chicago', 'IL', 60616),
        new Address(124, 1, '124 Fake St APT 2', 'Cupertino', 'CA', 95014)]
        this.setState({'cards': credit_cards, 'addresses': addresses})
        if(Object.keys(this.props.location.state).includes("selected_checkout")) {
            let that = this
            that.totalCost = 0

            let dictionary= this.props.location.state.selected_checkout
            console.log("enters")
            Object.keys(dictionary).forEach((pair)=> that.totalCost+=(dictionary[pair].dish.cost* dictionary[pair].quantity))
            this.setState({'total_price':that.totalCost})
        }
    }
    _onOptionChange(method) {
        this.setState({'option':method})
    }
    _filterCard(card) {
        let str=card.toString()
        let x = ""
        for(let i=0; i<str.length; i++){
            if(i+4 < str.length) {

                x=x.concat("X")

            } else {
                x=x.concat(str[i])
            }

        }
        return x
    }
    _changeService(service) {
        this.setState({'service': service})
    }
    _renderCreditInput (){
        if(this.state.option === 'Credit Card') {
            console.log("test")
            return (<div>
                    <Form.Group controlId="paymentEnterCard" style={{marginRight:"20px"}}>
                        <Form.Label>
                            Credit Card Information
                        </Form.Label>
                        <Form.Control key="cardno" type="text" placeholder="Enter credit card #" />
                        <Form.Control key="cvv" type="text" placeholder="Enter cvv" />
                    </Form.Group>
                    <Form.Group controlId="paymentSelectCard">
                        <Form.Label>Select existing card</Form.Label>
                        <Form.Control as="select">
                            <option>None</option>

                            {this.state.cards.map((card)=>(<option>{this._filterCard(card.card_number)}</option>))}
                        </Form.Control>
                    </Form.Group>
                </div>
            )
        }
    }
    _checkOut() {
        //send order
        let wait_time=0
        let copy_of_state = {...this.state}
        if(Object.keys(this.props.location.state).includes("selected_checkout")) {

            let dictionary= this.props.location.state.selected_checkout
            console.log("enters")
            Object.keys(dictionary).forEach((pair)=> (wait_time+=dictionary[pair].dish.cooking_time))
        }
        //back to home with modal open
        this.props.history.push({
            pathname: "/listing",
            state: {
                order: copy_of_state,
                selected_items: this.props.location.state.selected_checkout,
                wait_time: wait_time,
                modal: true
            }
        })
    }
    _useRewards() {
        this.setState({'total_price': this.state.total_price - Math.floor(this.state.rewards/100), 'rewards':this.state.rewards%100})
    }
    _addAddress() {
    //const selectedIndex = event.target.options.selectedIndex;
        let id=Math.floor(Math.random() * 200)
        let address=new Address( id, 1, document.getElementById('addLine1').value, document.getElementById('state').value, document.getElementById('zip').value);
        console.log(this.state.addresses.push(address))
        console.log(this.state.addresses)
        this.setState({selected_address:address})
    }
    _getDefault() {
        if(this.state.selected_address) {
            return this.state.selected_address.address_line1
        }
        return "None"
    }
        _renderAddress (){
            if(this.state.service === 'Delivery') {
                return (<div>
                        <h1>Address Info</h1>
                        <Form.Group controlId="address" style={{marginRight:"20px"}}>
                            <Form.Label>
                                Enter Address OR
                            </Form.Label>
                            <Form.Control id="addLine1" type="text" placeholder="Enter address line 1" />
                            <Form.Control id="state" type="text" placeholder="Enter state" />
                            <Form.Control id="zip" type="text" placeholder="Enter zip" />

                        </Form.Group>
                        <Button onClick={this._addAddress.bind(this)}>Add Address</Button>
                        <Form.Group controlId="addressSelect">
                            <Form.Label>Select existing address</Form.Label>
                            <Form.Control as="select">
                                <option>{this._getDefault()}</option>
                                {this.state.addresses.map((card)=>(<option>{card.address_line1}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                )
            }
    }
    render() {
        return (<div>
            <div>            <h1>Rewards: {this.state.rewards}</h1> <Button onClick={this._useRewards.bind(this)}>Apply Rewards</Button> </div>
            <h1>Total Price: ${this.state.total_price} </h1>
            <h3>Potential Rewards from this order: {Math.floor(this.state.total_price/2)}</h3>
            <h1>Payment</h1>
                <Form.Group controlId="choosePaymentMethod">
                    <Form.Label>
                        Select Payment Method
                    </Form.Label>
                    <br/>
                    {['radio'].map((type) => (
                        <ButtonGroup style={{marginBottom:"20px"}}>
                            {['Cash', 'Credit Card'].map((method) => (
                                <ToggleButton style={{backgroundColor:'green'}} onClick={this._onOptionChange.bind(this, method)} checked={this.state.option === method} type={type} value={method}>{method}</ToggleButton>
                            ))}
                        </ButtonGroup>
                    ))}
                </Form.Group>
                { this._renderCreditInput()}
                <Form.Group controlId="serviceMethod">
                    <Form.Label>
                        How will you receive your order
                    </Form.Label>
                    <br/>
                    {['radio'].map((type) => (
                        <ButtonGroup style={{marginBottom:"20px"}}>
                            {['Pickup', 'Delivery', 'Dine In'].map((method) => (
                                <ToggleButton style={{backgroundColor:'green'}} onClick={this._changeService.bind(this, method)} checked={this.state.service === method} type={type} value={method}>{method}</ToggleButton>
                            ))}
                        </ButtonGroup>
                    ))}
                </Form.Group>
            {this._renderAddress()}

        <div>            <Button>Go Back</Button>

            <Button style={{marginLeft:"20px"}} onClick={this._checkOut.bind(this)}>Checkout</Button>
            </div>
        </div>)
    }

}

export {CheckoutView}