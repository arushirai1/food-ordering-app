import React, { Component, ListItem } from 'react'
import App from "./App";
import {Restaurant} from "./Models"
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
        this.state = {'restaurants': []}
    }

    componentDidMount() {
        //api call to fetch restaurants
        console.log(this.props)
        this.state={'option':'Cash'}
    }
    _onOptionChange(method) {
        this.setState({'option':method})
    }
    render() {
        return (<div>
            <InputGroup  className="mb-3">
                <Form.Group controlId="choosePaymentMethod">
                    <Form.Label>
                        Select Payment Method
                    </Form.Label>
                    {['radio'].map((type) => (
                        <ButtonGroup style={{marginBottom:"20px"}}>
                            {['Cash', 'Credit Card'].map((method) => (
                                <ToggleButton style={{backgroundColor:'green'}} onClick={this._onOptionChange.bind(this, method)} checked={this.state.option === method} type={type} value={method}>{method}</ToggleButton>
                            ))}
                        </ButtonGroup>
                    ))}
                </Form.Group>
                {()=> {
                    if(this.state.option == 'Credit Card') {
                        return (
                            <Form.Group controlId="paymentEnterCard" style={{marginRight:"20px"}}>
                                <Form.Label>
                                    Credit Card Information
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter credit card #" />
                            </Form.Group>)
                    }
                }}



            </InputGroup>
        </div>)
    }

}

export {CheckoutView}