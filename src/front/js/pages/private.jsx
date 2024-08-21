import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Private = () => {
    
    const { store } = useContext(Context);
    
    return (
            
        <div className="text-center mt-5">
        {
            store.token ?
                <h1> "Hello there"</h1> :
                <Navigate to="/login" />
        }
        </div>
    )
}

export default Private;
