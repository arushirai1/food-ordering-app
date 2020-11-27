import logo from './logo.svg';
import './App.css';
//import React;
import React, { Component } from 'react'
import { Form, Button, ButtonGroup, ToggleButton, InputGroup } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { option: "Customer" };
    }
    _onOptionChange(option) {
        this.setState({
            option: option
        });
}
  render() {
    return (<div>
        <h1 style={{marginBottom:"40px"}}> The Food App </h1>
        <Form>
            <Form.Label>
            Role
           </Form.Label><br/>
              {['radio'].map((type) => (
    <ButtonGroup style={{marginBottom:"20px"}} toggle>
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


  <Button variant="primary" type="submit" style={{marginLeft:"56%", marginRight:"20px"}}>
    Sign Up
  </Button>
            <Button variant="primary" type="submit">
    Sign in
  </Button>
        </Form>
    </div>);
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Login/>
      </header>
    </div>
  );
}

export default App;
