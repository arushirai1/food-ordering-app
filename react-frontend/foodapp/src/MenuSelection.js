import React, { Component } from 'react'
import App from "./App";
import {Restaurant, Dish} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card } from 'react-bootstrap';
import {Cart} from './LandingPage'
class MenuSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'special_dishes':[], 'regular_dishes':[], 'selected_dishes':{}}
  }
  _test_function() {
    console.log("test funct", this.state.selected_dishes)
    return this.state.selected_dishes
  }
  componentDidMount() {
    //api call to fetch dishes with restaurant id, should pass through props from landing page
    //console.log(this.props.location.state.restaurant_id) does not work
    let dishes=[new Dish(123, "Margharita Pizza", "Tomatos, Basil, and Mozzerela. Simple but sweet.", 20, 1, false, 5), new Dish(124, "Pizza of the Day", "Chef's favorite.", 20, 1, true, 15)] //fake data delete this once integration is done
    let regular_dishes=[]
    let special_dishes=[]
    for(const dish of dishes) {
      if(dish.special) {
        special_dishes.push(dish)
      } else {
        regular_dishes.push(dish)
      }

    }
    this.setState({'special_dishes':special_dishes, 'regular_dishes':regular_dishes})
  }

  _addToOrder(dish) {
    let x= [dish.dish_id, {'dish': dish, 'quantity':1}]
    let y = this.state.selected_dishes

    if(this.state.selected_dishes[dish.dish_id]) {
      x[1].quantity = y[x[0]].quantity+x[1].quantity
    }
    y[x[0]]=x[1]
    this.setState({'selected_dishes': y})
    console.log(this.state.selected_dishes)
  }

  render() {
    // learn about cards here https://react-bootstrap.github.io/components/cards/
    return (<div>
      <Cart {...this.props} getSelectedDishes={this._test_function.bind(this)}/>

      <h1> MenuSelection </h1>
      <h1>Special</h1>
      {this.state.special_dishes.map((dish) => (
       <Card style={{ width: '18rem', color: 'black' }}>
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  {dish.description}
                </Card.Text>
                <Button variant="primary" onClick={this._addToOrder.bind(this, dish)}>Add to Order</Button>
              </Card.Body>
            </Card>
      ))}
      <h1>Regular</h1>
      {this.state.regular_dishes.map((dish) => (
       <Card style={{ width: '18rem', color: 'black' }}>
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  {dish.description}
                </Card.Text>
                <Button variant="primary" onClick={this._addToOrder.bind(this, dish)}>Add to Order</Button>
              </Card.Body>
            </Card>
      ))}
    </div>);
  }
}

export {MenuSelection}