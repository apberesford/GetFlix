import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import Logout from './logout'
import Login from './login';

const Header = () => {
    //pretty self explanatory. The profile page allows the user to change user
    //object for things which are not hardcoded at creation.
    const { user } = useAuth0()
    return (
            user ?  
        <>
            <Logout />
        </>
            :
        <>
            <Login />
        </>
    )
}

export default Header;