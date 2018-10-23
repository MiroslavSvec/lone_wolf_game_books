import os
from flask import Flask, render_template, redirect, request, url_for, session, flash
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# mongoDB config
book_uri = os.environ.get("MONGO_BOOK_URI")
users_uri = os.environ.get("MONGO_USERS_URI")
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

book_connection = PyMongo(app, uri=book_uri)
user_connection = PyMongo(app, uri=users_uri)

book_collection = book_connection.db.book_1
users_collection = user_connection.db.users


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        pass
    else:        
        book = book_collection.find()
        return render_template('index.html', book=book)


if __name__ == '__main__':
    if os.environ.get("DEVELOPMENT"):
        app.run(host=os.environ.get('IP'),
                port=os.environ.get('PORT'),
                debug=True)
    else:
        app.run(host=os.environ.get('IP'),
                port=os.environ.get('PORT'),
                debug=False)
