import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Logout from './logout'
import Login from './login';
import EditProfile from './editProfile'
import { SiteContext } from "./context";

const Header = () => {
    //pretty self explanatory. The profile page allows the user to change user
    //object for things which are not hardcoded at creation.
    const { user } = useAuth0()
    const { userState, setUserState, error, setError, setCollection } = useContext(SiteContext);
    //I dont love this if, but it crashes if I don't use it... It also seems to mean that it never updates?
    useEffect(() =>{
        if (user) {
          
                      fetch(`/currentUser/${user.email}`)
                      .then(res => res.json())
                      .then(data => {
                            setUserState(data.data)
                      })
                      .catch(() => {
                        setError(true);
                      })
                    } else {
                      setUserState({})
                    }
                  }, [user])

    return (
            user ?  
        <>
            <Linky to={`/Profile`}>Profile</Linky>
            <Logout />
        </>
            :
        <>
            <Login />
        </>
    )
}

const Linky = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 1em;
  &.active {color: red;}
`;

export default Header;