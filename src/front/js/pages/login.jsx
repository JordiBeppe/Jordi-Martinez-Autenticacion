import React, {useState, useContext} from "react";
import {Context} from "../store/appContext"

const initialState = {
    email: "",
    password: ""
}

const Login = () => {

    const {actions} = useContext(Context)

    const[user, setUser] = useState (initialState)

    const handleChange = ({target}) => {
        setUser({
            ...user, 
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.email.trim() == "" || user.password.trim() == "") return;
    
        try {
            const response = await actions.login(user)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    };
    

    return (
        <div className="container m-5 p-3">
            <form 
                className="row g-3"
                onSubmit={handleSubmit}
            >   
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
