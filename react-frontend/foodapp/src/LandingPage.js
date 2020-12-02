import React, { Component, ListItem } from 'react'
import App from "./App";
import {Restaurant, Address} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
class RestaurantView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'restaurants':[]}
  }
  componentDidMount() {
    //api call to fetch restaurants
    console.log(this.props)
    this.setState({restaurants : [new Restaurant(1, "PizzaParlor", "West Loop", "Most amazing burnt pizza in the world."),
      new Restaurant(2, "Pizza Parlor2", "West Loop2", "2nd most amazing burnt pizza in the world."),
      new Restaurant(3, "Cure Pizza Addiction Restaurant", "West Loop3", "We make sure you end up hating pizza after this.")
    ]})
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

  render() {
    // learn about cards here https://react-bootstrap.github.io/components/cards/
    return (<div>
      <h1> RestaurantView </h1>

      {this.state.restaurants.map((restaurant) => (
       <Card style={{ width: '18rem', color: 'black' }}>
              <Card.Img variant="top" src={restaurant.photo_url} />
              <Card.Body>
                <Card.Title>{restaurant.name}-{restaurant.location}</Card.Title>
                <Card.Text>
                  {restaurant.description}
                </Card.Text>
                <Button onClick={this._onRestaurantSelect.bind(this, restaurant.restaurant_id)} variant="primary">Start Order</Button>
              </Card.Body>
            </Card>
      ))}

    </div>);
  }
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'show': false};
    console.log("cart", this.props.getSelectedDishes())

  }
  handleClose () {
    this.setState({'show':false})
  }
  handleShow () {
    this.setState({'show':true})
  }
  _goCheckOut() {
    let items=this.props.getSelectedDishes()
    console.log(items)
    this.props.history.push({
        pathname: "/checkoutView",
        state: {
            selected_checkout: items
        }
    })
  }

  render() {
    return (<div>
      <header style={{height:'1%'}} >
                <Button style={{align:'right'}} onClick={this.handleShow.bind(this)}>View Current Order</Button>
      </header>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body><div>{Object.keys(this.props.getSelectedDishes()).map((key)=>(<div> <h1>{this.props.getSelectedDishes()[key].dish.name}</h1> <h1>Quantity: {this.props.getSelectedDishes()[key].quantity}</h1></div> ))}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Continue Shopping
          </Button>
          <Button variant="primary" onClick={this._goCheckOut.bind(this)}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>)
  }
}
class ChangeUserSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state={'selectedAdd':false, 'addresses':this.props.location.state.order.addresses}
    this.addresses=[]
    this._updateStateAdd.bind(this)
  }

  _updateStateAdd(addr) {
    console.log()
    //this.setState({'selectedAdd':addr})

  }
_editAddress() {
    console.log("test")
  let addr_id =0
  let x = (addr) => {
    this.state.addresses.forEach((item)=> {
      if(item.address_line1 === addr) {
        addr_id = item.address_id
      }
    })
    return addr_id.toString()
  }
  if(this.addresses) {
        console.log(this.addresses.value)
        let temp=this.addresses.value.split(",")
        console.log(temp)
        temp.push(x(temp[0]))
        console.log(temp)
        this.setState({selectedAdd: temp })
  }
}
_updateAddress(addr_id) {
    //remove
  let old=null
  let x = () => {
    for(let i=0; i<this.state.addresses.length; i++) {
      if(this.state.addresses[i].address_id===parseInt(addr_id))
        old=this.state.addresses[i]
        return i
    }
  }

  this.state.addresses.splice(x(), 1, new Address(old.address_id, old.user_id, document.getElementById('addLine1').value, document.getElementById('state').value, document.getElementById('zip').value))
  console.log(x(), this.state.addresses)
  this.setState({selectedAdd:false})
  //this.props.location.state.order.addresses.put(new Address(this.state.selectedAdd[0], this.state.selectedAdd[1], this.state.selectedAdd[2]))
}
_deleteAddress() {
      let addr_id = this.addresses.value
  console.log("Address value", addr_id)
  let getIndex = () => {
    for(let i=0; i<this.state.addresses.length; i++) {
      if(this.state.addresses[i].address_line1===addr_id)
        return i
    }
  }
  this.state.addresses.splice(getIndex(), 1)
  this.setState({selectedAdd:false})

}
_renderEditAddress() {
    //this.address is the
  if(this.state.selectedAdd) {
    return (
        <Form.Group controlId="address" style={{marginRight:"20px"}}>
                            <Form.Label>
                                Update Address
                            </Form.Label>
                            <Form.Control id="addLine1" type="text" defaultValue={this.state.selectedAdd[0]} placeholder="Enter address line 1" />
                            <Form.Control id="state" type="text" defaultValue={this.state.selectedAdd[1]} placeholder="Enter state" />
                            <Form.Control id="zip" type="text" defaultValue={this.state.selectedAdd[2]} placeholder="Enter zip" />
                            <Button onClick={this._updateAddress.bind(this, this.state.selectedAdd[3])}>Update</Button>
                        </Form.Group>
    )
  }
  else {
    return (<div>      <Button onClick={this._editAddress.bind(this)}>Edit</Button> <Button style={{backgroundColor:"red"}} onClick={this._deleteAddress.bind(this)}>Delete</Button>
</div>)
  }
}
  render() {
    return (<div>
      <h1 style={{color:"blue"}}>Edit User Info</h1>
      <h2>Address</h2>

      <Form.Group controlId="addressSelect" onChange={this._updateStateAdd}>
        <Form.Label>Select existing address</Form.Label>
        <select id = "dropdown" ref = {(input)=> this.addresses = input}>
          <option>None</option>
          {this.state.addresses.map((addr) => (<option value={[addr.address_line1, addr.state, addr.zip_code]}>{addr.address_line1}</option>))}
      </select>

      </Form.Group>
      {this._renderEditAddress()}
      <h2>Payment</h2>

      <h2>Password</h2>

    </div>)
  }

}


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    let show = false
    let wait_time = 0
    if(props.location) {
      if(props.location.state.modal) {
        show=true
        wait_time=props.location.state.wait_time
      }
    }
    this.state = {'show': show, wait_time: wait_time};

  }
  handleClose () {
    this.setState({'show':false})
  }
  handleShow () {
    this.setState({'show':true})
  }

  render() {
    return (<div>
      <header style={{height:'1%'}} >
                <Button style={{align:'right'}} onClick={this.handleShow.bind(this)}>View Current Order and Account</Button>
      </header>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body><div><h1 style={{color:"blue"}}> Order history </h1> <h3>Wait Time for Current Order: {this.state.wait_time}</h3>
        <ChangeUserSettings {...this.props}/>
        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>)
  }
}
class CustomerLanding extends React.Component {

  render() {
    //review how props are past, this is how you overcome undefined props errors and along withRouter
    return (
        <div>
          <MyProfile {...this.props}/>
          <RestaurantView {...this.props}/>
        </div>

    );
  }
}

class StaffLanding extends React.Component {
  render() {
    return (<div>
      <h1> Login </h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label> <br/>
        <label>
          Password:
          <input type="password" name="password" />
        </label> <br/>
        <input type="submit" value="Sign Up" />

        <input type="submit" value="Sign In" />
      </form>
    </div>);
  }
}

class AdminLanding extends React.Component {
  render() {
    return (<div>
      <h1> Login </h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label> <br/>
        <label>
          Password:
          <input type="password" name="password" />
        </label> <br/>
        <input type="submit" value="Sign Up" />

        <input type="submit" value="Sign In" />
      </form>
    </div>);
  }
}

export {CustomerLanding, AdminLanding, StaffLanding, Cart};
