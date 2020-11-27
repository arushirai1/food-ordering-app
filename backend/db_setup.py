#in psql
create database foodorder;

#run in bash
export DATABASE_URL="postgresql://localhost/foodorder"
export APP_SETTINGS="config.DevelopmentConfig"
FLASK_APP=app.py