"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from base64 import b64encode
import os
from api.utils import set_password


# from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/user", methods=["POST"])
def add_user():
    body = request.json

    fullname = body.get("fullname", None)
    email = body.get("email", None)
    password = body.get("password", None)


    if email is None or password is None or fullname is None:
        return jsonify("please complete the information"), 400
    
    else:
        
        user = User.query.filter_by(email=email).one_or_none()

        if user is not None : 
            return jsonify("user already exist"), 400
        

        salt = b64encode(os.urandom(32)).decode("utf-8")
        password = set_password(password, salt)
        user = User(email=email, password=password, fullname=fullname, salt=salt)

        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message":"User created"}), 201
            
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return jsonify({"message":f"error: {error}"}), 500
        
@api.route("/user", methods=["GET"])
@jwt_required()
def get_all_users():
    user_all = User.query.all()
    user_all = list(map(lambda item: item.serialize(), user_all))
    return jsonify(user_all), 200
        
@api.route("/login", methods=["POST"])
def login():
    body = request.json

    email = body.get("email", None)
    password = body.get("password", None)

    if email is None or password is None:
        return jsonify("you need an the email and a password"), 400

    else:
        user = User()
        user = user.query.filter_by(email=email).first()  

    if user is None:
        return jsonify({"message":"invalid information"}), 400
    elif check_password(user.password, password, user.salt):
        token = create_access_token(identity=user.id)
        return jsonify({"token":token}), 200
    else:
        return jsonify({"message":"invalid information"}), 400
