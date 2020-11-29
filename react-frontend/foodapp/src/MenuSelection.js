import React, { Component } from 'react'
import App from "./App";
import {Restaurant, Dish} from "./Models"
import { Form, Button, ButtonGroup, ToggleButton, InputGroup, Card } from 'react-bootstrap';

class MenuSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'special_dishes':[], 'regular_dishes':[]}
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

  render() {
    // learn about cards here https://react-bootstrap.github.io/components/cards/
    return (<div>
      <h1> MenuSelection </h1>
      <h1>Special</h1>
      {this.state.special_dishes.map((dish) => (
       <Card style={{ width: '18rem', color: 'black' }}>
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  {dish.description}
                </Card.Text>
                <Button variant="primary">Add to Order</Button>
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
                <Button variant="primary">Add to Order</Button>
              </Card.Body>
            </Card>
      ))}
    </div>);
  }
}

export {MenuSelection}