import logo from './logo.svg';
import './App.css';
//import React;
import React, { Component } from 'react'
import { Form, Button, ButtonGroup, ToggleButton, InputGroup } from 'react-bootstrap';
import {CustomerLanding, StaffLanding, AdminLanding} from "./LandingPage";
import { Route, Switch } from "react-router-dom";
import {MenuSelection} from './MenuSelection'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {CheckoutView} from './CheckoutScreen'
import {backend_server_url, detect_fail} from "./config";
const axios = require('axios');

//do this to import props
const CustomerLandingWithRouter = withRouter(CustomerLanding);
const MenuSelectionWithRouter = withRouter(MenuSelection);
const CheckoutViewWithRouter = withRouter(CheckoutView);
//const TitleWithRouter = withRouter(Title);


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { option: "Customer", extraComponent: false, error: ""};
    }
    goToCustomerView() {
        if(this.state.option === 'Customer') {
            this.props.history.push("/listing")
        }
    }
    _onOptionChange(option) {
        this.setState({
            option: option
        });
    }
    renderExtra() {
        if(this.state.extraComponent) {
            return (
                <div>
                    <Form.Group controlId="formBasicName" style={{marginRight:"20px"}}>
                            <Form.Label>
                                Name
                            </Form.Label>

                            <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Button onClick={this._onButtonClick.bind(this, "submit")} variant="primary">
                        Submit
                    </Button>
                </div>

            )
        } else {
            return (
                <div>
                <Button onClick={this._onButtonClick.bind(this, "sign_up")} variant="primary"  style={{marginLeft:"56%", marginRight:"20px"}}>
                    Sign Up
                </Button>
                <Button onClick={this._onButtonClick.bind(this, "sign_in")} variant="primary" >
                    Sign in
                </Button>
                </div>

            )

        }

    }
    async getValidation(username, password) {
        const response =
            await axios.get(backend_server_url+""+"login", {params: {role: this.state.option, username: username, password: password}})
        return response.data

    }
    async createUser(username, password) {
        const response =
            await axios.get(backend_server_url+""+"create_user", {params: {role: this.state.option, username: username, password: password}})
        return response.data

    }
    async _onButtonClick(button_id) {
        let username=document.getElementById('formBasicUsername').value
        let password = document.getElementById('formBasicPassword').value

        if(button_id==="sign_in") {
            //take fields and send call to backend server
            let results=await this.getValidation(username, password)
            console.log("results", results)
            //if verified then proceed to next screen, else throw validation error and ask client to enter inputs again
            if(detect_fail(results)) {
                this.setState({"error": results})
            } else {
                this.goToCustomerView()
            }
        } else if (button_id==="submit") {
            //create_user
            //send signup info to backend and then proceed to the next screen like sign_in
            let results=await this.createUser(username, password)
            console.log("results", results)
            //if verified then proceed to next screen, else throw validation error and ask client to enter inputs again
            if(detect_fail(results)) {
                this.setState({"error": results})
            } else {
                this.goToCustomerView()
            }
        }
        else {
            //sign up add extra component
            this.setState({'extraComponent': true})
        }
    }
    render() {
        return (<div>
            <h1 style={{marginBottom:"40px"}}> The Food App </h1>
            <Form>
                <Form.Label>
                    Role
                </Form.Label><br/>
                {['radio'].map((type) => (
                    <ButtonGroup style={{marginBottom:"20px"}}>
                        {['Customer', 'Staff', 'Admin'].map((role) => (
                            <ToggleButton style={{backgroundColor:'green'}} onClick={this._onOptionChange.bind(this, role)} checked={this.state.option === role} type={type} value={role}>{role}</ToggleButton>
                        ))}
                    </ButtonGroup>
                ))}
                <InputGroup  className="mb-3">
                    <Form.Group controlId="formBasicUsername" style={{marginRight:"20px"}}>
                        <Form.Label>
                            Username
                        </Form.Label>

                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </InputGroup>

                {this.renderExtra()}

            </Form>
            <h3 id="error" style={{color:'red'}}>{this.state.error}</h3>
        </div>);
    }
}

/*
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Login/>
            </header>
        </div>
    );
}*/
//https://github.com/JOELJOSEPHCHALAKUDY/reactjs-login-dashboard-with-redux-and-multi-language/blob/3b14454ff9be5dac2be2bbbb8b785bbfdb1f079b/src/routes/index.js

function HomePage() {
    return (
        <div className="App">
            <h1>entrypoint</h1>
        </div>
    );
}
const App = ({ location }) => (

        <div className="App">
                <header className="App-header">

            <Switch>
                <Route location={ location } exact path="/" render={ (props) => <Login {...props} /> } />
                <Route location={ location } exact path="/listing" render={ (props) => <CustomerLandingWithRouter {...props} /> } />

                <Route location={ location } exact path="/menuSelection" render={ (props) => <MenuSelectionWithRouter {...props} /> } />
                <Route location={ location } exact path="/checkoutView" render={ (props) => <CheckoutViewWithRouter {...props} /> } />

            </Switch>
                </header>

        </div>

);

App.prototype = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;
