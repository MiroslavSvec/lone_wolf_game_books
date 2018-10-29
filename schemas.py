import os
from time import gmtime, strftime
from flask import Flask, session
from flask_pymongo import PyMongo


app = Flask(__name__)

# mongoDB config

admin_uri = os.environ.get("MONGO_ADMIN_URI")
book_uri = os.environ.get("MONGO_BOOK_URI")
users_uri = os.environ.get("MONGO_USERS_URI")
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

book_connection = PyMongo(app, uri=book_uri)
user_connection = PyMongo(app, uri=users_uri)

book_collection = book_connection.db.book_1
character_creation_collection = book_connection.db.character_creation_b1
users_collection = user_connection.db.users


class GameData:
    def __init__(self, main_data=True, new_profile=False):
        if main_data:
            self.main_data = [x['content']
                              for x in book_collection.find()]
        else:
            self.character_creation = [x['content']
                                       for x in character_creation_collection.find()]
        self.new_profile = new_profile
        self.lw = self.lone_wolf()
        self.inventory = self.inventory_schema()
        self.kai_disciplines = self.kai_disciplines_schema()

    def lone_wolf(self):
        if self.new_profile:
            return {
                "created": strftime("%Y-%m-%d %H:%M:%S", gmtime()),
                "owner": session['user'],
                "index": 0,
                "character_creation": True,
                "ep": {
                    "basic": 1,
                    "adition": 0,
                    "final": 1,
                    "max_ep": 1
                },
                "cs": {
                    "basic": 0,
                    "adition": 0,
                    "final": 0,
                    "max_cs": 0
                },
                "kai": [],
                "weapons": ["axe"],
                "mastery_weapon": "",
                "golds_arrows": {
                    "golds": 0,
                    "arrows": 0
                },
                "backpack": ["meal"],
                "special_items": [],
                "random_number": 0,
                "statistics": {
                    "alive": True,
                    "sections_visited": [],
                    "items_picked": 0,
                    "gold_found": 0,
                    "gold_spend": 0,
                    "food_ate": 0,
                    "disciplines_used": 0,
                    "dmg_deal": 0,
                    "dmg_taken": 0,
                    "dmg_healed": 0,
                }
            }
        else:
            return session['save']

    def inventory_schema(self):
        return {
            "weapons": ["dagger",
                        "spear",
                        "mace",
                        "short sword",
                        "warhammer",
                        "sword",
                        "axe",
                        "sword",
                        "quarterstaff",
                        "broadsword"
                        ]

        }

    def kai_disciplines_schema(self):
        return [

            {
                "kai_id": "camouflage",
                "name": "Camouflage",
                        "description":
                        "This Discipline enables a Kai Lord to blend in with his surroundings. In the countryside, he can hide undetected among trees and rocks and pass close to an enemy without being seen. In a town or city, it enables him to look and sound like a native of that area, and can help him to find shelter or a safe hiding place."
            },
            {
                "kai_id": "hunting",
                "name": "Hunting",
                        "description":
                        "This skill ensures that a Kai Lord will never starve in the wild. He will always be able to hunt for food for himself except in areas of wasteland and desert. The skill also enables a Kai Lord to be able to move stealthily when stalking his prey."
            },
            {
                "kai_id": "sixth_sense",
                "name": "Sixth Sense",
                        "description":
                        "This skill may warn a Kai Lord of imminent danger. It may also reveal the true purpose of a stranger or strange object encountered in your adventure."
            },
            {
                "kai_id": "tracking",
                "name": "Tracking",
                        "description":
                        "This skill enables a Kai Lord to make the correct choice of a path in the wild, to discover the location of a person or object in a town or city and to read the secrets of footprints or tracks."
            },
            {
                "kai_id": "healing",
                "name": "Healing",
                        "description":
                        "Discipline can be used to restore <strong> ENDURANCE </strong> points lost in combat. If you possess this skill you may restore <strong> 1 ENDURANCE </strong> point to your total for every numbered section of the book you pass through in which you are not involved in combat. ENDURANCE cannot rise above its original level."
            },
            {
                "kai_id": "weapon_skill",
                "name": "Weapon Skill",
                        "description":
                        "Upon entering the Kai Monastery, each initiate is taught to master one type of weapon. The fact that you are skilled with a weapon does not mean you set out on the adventure carrying that particular weapon. However, you will have opportunities to acquire weapons in the course of your adventures. This skill adds extra <strong> 2 COMBAT SKILLS </strong> if you fight with weapon you mastered. <br> <br>(you will roll for the mastered weapon at the end of this section if you choose this skill)"
            },
            {
                "kai_id": "mindshield",
                "name": "Mindshield",
                        "description":
                        "The Darklords and many of the evil creatures in their command have the ability to attack you using their Mindforce. The Kai Discipline of Mindshield prevents you from losing any <strong> ENDURANCE </strong> points when subjected to this form of attack."
            },
            {
                "kai_id": "mindblast",
                "name": "Mindblast",
                        "description":
                        "This enables a Kai Lord to attack an enemy using the force of his mind. It can be used at the same time as normal combat weapons and adds two extra points to your<strong> COMBAT SKILL </strong>. Not all the creatures encountered on this adventure will be harmed by Mindblast. You will be told if a creature is immune"
            },
            {
                "kai_id": "animal_kinship",
                "name": "Animal Kinship",
                        "description":
                        "This skill enables a Kai Lord to communicate with some animals and to be able to guess the intentions of others."
            },
            {
                "kai_id": "mind_over_matter",
                "name": "Mind Over Matter",
                        "description":
                        "Mastery of this Discipline enables a Kai Lord to move small objects with his powers of concentration"
            }
        ]
