import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Logout from './logout'
import Login from './login';

const Header = () => {
    const { user } = useAuth0()
    return (
            user ?  
        <div>
            <Logout />
        </div>
            :
        <div>
            <Login />
        </div>
    )
}

export default Header;