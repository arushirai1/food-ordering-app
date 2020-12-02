import React, { Component, ListItem } from 'react'
import App from "./App";
import {Restaurant, credit_card, Address} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurants': []}
    }

    componentDidMount() {
        //api call to fetch restaurants
        console.log(this.props)
        this.setState({
            restaurants: [new Restaurant(1, "PizzaParlor", "West Loop", "Most amazing burnt pizza in the world."),
                new Restaurant(2, "Pizza Parlor2", "West Loop2", "2nd most amazing burnt pizza in the world."),
                new Restaurant(3, "Cure Pizza Addiction Restaurant", "West Loop3", "We make sure you end up hating pizza after this.")
            ]
        })
    }

    _onRestaurantSelect(restaurant_id) {
        console.log(this.props)
        this.props.history.push({
            pathname: "/menuSelection",
            state: {
                restaurant_id: restaurant_id
            }
        })
    }
}
class CheckoutView extends React.Component {
    constructor(props) {
        super(props);
        this.state={'option':'Cash', 'selected_card': null, 'cards':[], 'addresses':[], 'selected_address': null, 'total_price':0, 'service':'Pickup'}

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
        _renderAddress (){
            if(this.state.service === 'Delivery') {
                return (<div>
                        <h1>Address Info</h1>
                        <Form.Group controlId="address" style={{marginRight:"20px"}}>
                            <Form.Label>
                                Enter Address OR
                            </Form.Label>
                            <Form.Control key="addLine1" type="text" placeholder="Enter address line 1" />
                            <Form.Control key="state" type="text" placeholder="Enter state" />
                            <Form.Control key="zip" type="text" placeholder="Enter zip" />

                        </Form.Group>
                        <Form.Group controlId="addressSelect">
                            <Form.Label>Select existing address</Form.Label>
                            <Form.Control as="select">
                                <option>None</option>
                                {this.state.addresses.map((card)=>(<option>{card.address_line1}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                )
            }
    }
    render() {
        return (<div>
            <h1>Total Price: {this.state.total_price}</h1>
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

        </div>)
    }

}

export {CheckoutView}