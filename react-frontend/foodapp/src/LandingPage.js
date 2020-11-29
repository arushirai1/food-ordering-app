import React, { Component } from 'react'
import App from "./App";
import {Restaurant} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card } from 'react-bootstrap';
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
                <Button onClick={this._onRestaurantSelect.bind(this,restaurant.restaurant_id)} variant="primary">Start Order</Button>
              </Card.Body>
            </Card>
      ))}

    </div>);
  }
}

class Cart extends React.Component {
  render() {
    return (<div>
      <header style={{height:'1%'}} >
                <Button style={{align:'right'}}>View Current Order</Button>
      </header>
    </div>)
  }
}
class CustomerLanding extends React.Component {
  render() {
    //review how props are past, this is how you overcome undefined props errors and along withRouter
    return (
        <div>
           <Cart />
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

export {CustomerLanding, AdminLanding, StaffLanding};
