2020 Software Engineering Project to build a online restaurant food ordering app. 

Then, run each file individually for each screen

To clone the repo:

```https://github.com/arushirai1/food-ordering-app ```

Then create a virtual env to keep our dependencies isolated by running the following commands:
```python3 -m venv venv```

and activate it:
```source venv/bin/activate```

It should look like this:
![alt-text][./info.png "Title"]

Now, run ```pip3 install -r requirements.txt``` to install Flask and it's dependencies!

If you install anything use pip3, do ```pip3 freeze > requirements.txt```. This is also why activating your virtual env is important. We only want to store required dependencies!

After pulling you have to run:
#in bash
```bash
psql
create database foodorder;
quit

export DATABASE_URL="postgresql://localhost/foodorder"
export APP_SETTINGS="config.DevelopmentConfig"
FLASK_APP=app.py
python3 manage.py db init --directory migrations
```

```python3 manage.py db upgrade```

Run the app by:
```python3 app.py```

#Set up DB
##in psql terminal
create database foodorder;

##run in bash
export DATABASE_URL="postgresql://localhost/foodorder"
export APP_SETTINGS="config.DevelopmentConfig"

After editing in models, you need to run the migrations so it reflects in your db
``` 
python manage.py db migrate
python manage.py db upgrade
```

"Note that Flask-SQLAlchemy uses a "snake case" naming convention for database tables by default. For the User model above, the corresponding table in the database will be named user. For a AddressAndPhone model class, the table would be named address_and_phone. If you prefer to choose your own table names, you can add an attribute named __tablename__ to the model class, set to the desired name as a string." - https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database





