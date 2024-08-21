import React, {useState, useContext} from "react";
import {Context} from "../store/appContext"

const initialState = {
    fullname: "",
    email: "",
    password: ""
}

const Signup = () => {

    const {actions} = useContext(Context)

    const[user, setUser] = useState (initialState)

    const handleChange = ({target}) => {
        setUser({
            ...user, 
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()        
        if (user.fullname.trim() == "" || user.email.trim() == "") return
        const response = actions.signUp(user)

        response
            .then((res) => {
                if (res == 201) {
                    setUser(initialState)
                    alert("registered successfully")
                } else if (res == 400) {
                    alert("User already exist")
                } else {
                    alert("Error, try again later")
                }
            })
    }

    return (
        <div className="container m-5 p-3">
            <form 
                className="row g-3"
                onSubmit={handleSubmit}
            >                
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Full Name</label>
                    <input 
                        type="fullname" 
                        className="form-control" 
                        id="inputFullname"
                        name="fullname"  
                        placeholder="John Doe"
                        value={user.fullname}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail"  
                        name="email"
                        placeholder="mail@server.com"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        name="password"
                        placeholder="password"
                        value={user.password}
                        onChange={handleChange}
                    />
               </div>
               <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
