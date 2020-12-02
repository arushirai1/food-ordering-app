class Restaurant {
    constructor(restaurant_id, name, location, description, photo_url="https://static.wikia.nocookie.net/familyguy/images/8/8d/Pizza_parlor.jpg") {
        this.restaurant_id = restaurant_id
        this.name = name
        this.location = location
        this.description = description
        this.photo_url = photo_url
    }
}

class Dish {
    constructor(dish_id, name, description, cooking_time, restaurant_id, special, cost) {
        this.dish_id = dish_id
        this.name = name
        this.description = description
        this.cooking_time = cooking_time
        this.restaurant_id = restaurant_id
        this.special = special
        this.cost = cost
    }
}

class credit_card {
    constructor(credit_id, customer_ID,card_number,cvv) {
        this.customer_ID=customer_ID
        this.card_number=card_number
        this.credit_id=credit_id
        this.cvv=cvv
    }
}

class Address {

    constructor(address_id, user_id, address_line1, state, zip_code) {
        this.address_id = address_id
        this.user_id = user_id
        this.address_line1 = address_line1
        this.state = state
        this.zip_code = zip_code
    }

}


export {Restaurant, Dish, credit_card, Address}