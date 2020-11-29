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

export {Restaurant, Dish}