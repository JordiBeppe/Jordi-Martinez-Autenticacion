from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)    

    salt = db.Column(db.String(180), nullable=False)
    # created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            # do not serialize the password, its a security breach
        }