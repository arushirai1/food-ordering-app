from app import db
from sqlalchemy.dialects.postgresql import JSON

class Test(db.Model):
    __tablename__ = 'test'

    test_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    name2 = db.Column(db.String())
    age = db.Column(db.Integer)
    def __init__(self, name, name2, age):
        self.name = name
        self.name2 = name2
        self.age = age

    def __repr__(self):
        return '<id {}>'.format(self.test_id)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'test_id': self.test_id, 
            'name': self.name,
            'name2': self.name2,
        }

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String)
    username = db.Column(db.String())
    password = db.Column(db.String())

    def __init__(self, user_id, role, username, password):
        self.user_id = user_id
        self.role = role
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User id {}>'.format(self.user_id)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'role': self.role,
            'username': self.username,
            'password': self.password,
        }

class Address(db.Model):
    __tablename__ = 'address'
    address_id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    address_line1 = db.Column(db.String())
    state = db.Column(db.String())
    zip_code = db.Column(db.Integer)

    def __init__(self, address_id, user_id, address_line1, state, zip_code):
        self.address_id = address_id
        self.user_id = user_id
        self.address_line1 = address_line1
        self.state = state
        self.zip_code = zip_code

    def __repr__(self):
        return '<Address id {}>'.format(self.address_id)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'address_id': self.address_id,
            'user_id': self.user_id,
            'address_line1': self.address_line1, 
            'state': self.state,
            'zip_code': self.zip_code
        }

class Dish(db.Model):
    __tablename__ = 'dish'

    dish_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    cooking_time = db.Column(db.Numeric)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.restaurant_id'))
    special = db.Column(db.Boolean)
    cost = db.Column(db.Numeric)

    def __init__(self, dish_id, name, description, cooking_time, restaurant_id, special, cost):
        self.dish_id = dish_id
        self.name = name
        self.description = description
        self.cooking_time = cooking_time
        self.restaurant_id = restaurant_id
        self.special = special
        self.cost = cost

    def __repr__(self):
        return '<Dish id {}>'.format(self.dish_id)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'dish_id': self.dish_id,
            'name': self.name,
            'description': self.description,
            'cooking_time': self.cooking_time,
            'restaurant_id': self.restaurant_id,
            'special': self.special,
            'cost': self.cost
        }

class Restaurant(db.Model):
    __tablename__ = 'restaurant'

    restaurant_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __init__(self, restaurant_id, name, admin_id):
        self.restaurant_id = restaurant_id
        self.name = name
        self.admin_id = admin_id

    def __repr__(self):
        return '<Restaurant id {}>'.format(self.restaurant_id)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'admin_id': self.admin_id
        }

class Order(db.Model):
    __tablename__ = 'order'

    order_ID = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)
    customer_ID = db.Column(db.Integer,db.ForeignKey('users.user_id'))
    pickup_type = db.Column(db.String)
    order_prediction_time = db.Column(db.Numeric)

    def __init__(self, order_ID, status, customer_ID, pickup_type, order_prediction_time):
        self.order_ID= order_ID
        self.status = status
        self.customer_ID = customer_ID
        self.pickup_type = pickup_type
        self.order_prediction_time = order_prediction_time
        

    def __repr__(self):
        return '<order id {}>'.format(self.order_ID)
    
    #used for JSON formatting    
    def serialize(self):
        return {
            'order_ID': self.order_ID, 
            'status': self.status,
            'customer_ID': self.customer_ID,
            'pickup_type': self.pickup_type,
            'order_prediction_time': self.order_prediction_time
        }

class Delivery(db.Model):

    __tablename__='delivery'

    order_id =db.Column(db.Integer, db.ForeignKey(Order.order_ID), primary_key=True)
    status=db.Column(db.String())
    address_id=db.Column(db.Integer, db.ForeignKey(Address.address_id))
    
    def __init__ (self,order_ID,status,address_id):
        self.order_ID=order_ID
        self.status=status
        self.address_id=address_id

    def __repr__(self):
        return '<id {}>'.format(self.order_id)

    def serialize(self):
        return{
            'order_ID': self.order_ID,
            'status': self.status,
            'address_id': self.address_id
        }



class order_items(db.Model):

    __tablename__='order_items'

    order_ID =db.Column(db.Integer, db.ForeignKey(Order.order_ID), primary_key=True)
    dish_id=db.Column(db.Integer, db.ForeignKey(Dish.dish_id), primary_key=True)
    quantity=db.Column(db.Integer)
    
    
    def __init__ (self,order_ID,dish_id,quantity):
        self.order_ID=order_ID
        self.dish_id=dish_id
        self.quantity=quantity

    def __repr__(self):
        return '<id {}>'.format(self.order_ID)

    def serialize(self):
        return{
            'order_ID': self.order_ID,
            'dish_id': self.dish_id,
            'quantity': self.quantity,
            
        }


class ProcessedPayment(db.Model):
    __tablename__ = 'processed_payment'

    order_ID = db.Column(db.Integer, db.ForeignKey(Order.order_ID), primary_key=True)
    payment_status = db.Column(db.Boolean)

    def __init__(self, order_ID, payment_status):
        self.order_ID = order_ID
        self.payment_status = payment_status

    def __repr__(self):
        return '<id {}>'.format(self.order_ID)

    def serialize(self):
        return {
            'order_ID': self.order_ID,
            'payment_status': self.payment_status
        }

class credit_card(db.Model):

    __tablename__='credit_card'
    credit_id = db.Column(db.Integer, primary_key=True)
    customer_ID =db.Column(db.Integer, db.ForeignKey(Users.user_id))
    card_number=db.Column(db.Integer)
    cvv=db.Column(db.Numeric)

    def __init__ (self,credit_id, customer_ID,card_number,cvv):
        self.customer_ID=customer_ID
        self.card_number=card_number
        self.credit_id=credit_id
        self.cvv=cvv

    def __repr__(self):
        return '<id {}>'.format(self.credit_id)

    def serialize(self):
        return{
            'credit_id': self.credit_id,
            'customer_ID': self.customer_ID,
            'card_number': self.card_number,
            'cvv': self.cvv,
        }


class Payment(db.Model):

    __tablename__='payment'
    order_id = db.Column(db.Integer, db.ForeignKey(Order.order_ID), primary_key= True)
    payment_type=db.Column(db.String())
    cost=db.Column(db.Numeric)
    final_price=db.Column(db.Numeric)
    credit_id=db.Column(db.Integer, db.ForeignKey(credit_card.credit_id))

    def __init__ (self,order_id,payment_type, cost, final_price, credit_id):
        self.order_id=order_id
        self.payment_type=payment_type
        self.cost=cost
        self.final_price=final_price
        self.credit_id=credit_id

    def __repr__(self):
        return '<id {}>'.format(self.order_id)

    def serialize(self):
        return{
            'order_id': self.order_id,
            'payment_type': self.payment_type,
            'cost': self.cost,
            'final_price': self.final_price,
            'credit_id': self.credit_id,
        }

class Rewards(db.Model):
    __tablename__ = 'rewards'

    customer_id = db.Column(db.Integer, db.ForeignKey(Users.user_id), primary_key=True)
    rewards_points = db.Column(db.Numeric)

    def __init__(self, customer_id, rewards_points):
        self.customer_id = customer_id
        self.rewards_points = rewards_points

    def __repr__(self):
        return '<id {}>'.format(self.customer_id)

    def serialize(self):
        return {
            'customer_id': self.customer_id,
            'rewards_points': self.rewards_points
        }
