import os
from datetime import datetime
from flask import Flask, render_template, redirect, request, url_for, session, flash, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

from schemas import GameData
app = Flask(__name__)

# mongoDB config

book_uri = os.environ.get("MONGO_BOOK_URI")
users_uri = os.environ.get("MONGO_USERS_URI")
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

book_connection = PyMongo(app, uri=book_uri)
user_connection = PyMongo(app, uri=users_uri)

book_collection = book_connection.db.book_1
character_creation_collection = book_connection.db.character_creation_b1
users_collection = user_connection.db.users


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        user_in_db = users_collection.find_one(
            {"user_name": request.form['user_name']})
        if user_in_db:
            flash(f"Sorry profile {request.form['user_name']} already exist")
            return render_template("index.html")
        # If not register new user
        password = request.form['password']
        re_password = request.form['re_password']
        if password == re_password:
            hashed_pass = generate_password_hash(request.form['password'])
            users_collection.insert_one({
                "user_name": request.form['user_name'],
                "email": "",
                "password": hashed_pass,
                "saves": [],
            })
            session['user'] = request.form['user_name']
            flash(f"Account {session['user']} created ...")
            return redirect(url_for('index'))
        else:
            return "Passwords must match"
    else:
        if 'user' in session:
            return render_template('index.html', user=users_collection.find_one({"user_name": session['user']}))
        else:
            return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        user_name = request.form['password']
        password = request.form['password']
        user_in_db = users_collection.find_one({"user_name": user_name})
        if user_in_db:
            if check_password_hash(user_in_db['password'], password):
                session['user'] = user_name
                flash(f"Logged in as {user_name}")
                return redirect(url_for('index'))
            else:
                return "Invalid user name and / or password"
        else:
            return f"Sorry no profile {request.form['password']} found"


@app.route('/logout')
def logout():
    session.pop('user')
    flash("Successfully logged out ...")
    return "success"


@app.route('/new-game', methods=['GET'])
def new_game():
    """
    Main route for creating new game and save

    """
    if 'user' in session:
        data = GameData(main_data=False, new_profile=True).__dict__
        users_collection.update({"user_name": session['user']},
                                {'$push': {"saves": data['lw']}})
        session['save'] = data['lw']
        return jsonify(data)
    else:
        flash("You must be logged in to play the game!")
        return redirect(url_for('index'))


@app.route('/get-data', methods=['GET'])
def get_data():
    """
    Get all game data

    """
    if 'user' in session:
        pass
    else:
        flash("You must be logged in to play the game!")
        return redirect(url_for('index'))


@app.route('/character-creation')
def character_creation():
    """
    Main route for Character Creation

    """
    if 'user' in session:
        return render_template("character-creation.html", book_url="/character-creation")
    else:
        flash("You must be logged in to play the game!")
        return redirect(url_for('index'))


@app.route('/book')
def book():
    """
    Main route for the game

    """
    if 'user' in session:
        return render_template("book.html")
    else:
        flash("You must be logged in to play the game!")
        return redirect(url_for('index'))


@app.route('/map')
def map():
    """
    Main route for Map view

    """
    if 'user' in session:
        if session['save']['character_creation'] == True:
            return render_template("map.html", book_url="/character-creation")
        return render_template("map.html", book_url="/book")
    else:
        flash("You must be logged in to view the content of the game game!")
        return redirect(url_for('index'))


@app.route('/reset')
def reset():
    """
    Clear and reset data

    """
    if 'user' in session:
        session.pop('user')
    if 'save' in session:
        session.pop('save')
    flash("All data cleared ...")
    return "success"


if __name__ == '__main__':
    if os.environ.get("DEVELOPMENT"):
        app.run(host=os.environ.get('IP'),
                port=os.environ.get('PORT'),
                debug=True)
    else:
        app.run(host=os.environ.get('IP'),
                port=os.environ.get('PORT'),
                debug=False)
