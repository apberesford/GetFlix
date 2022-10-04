import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { SiteContext } from "./context";

const TabBar = () => {
    //pretty self explanatory. The profile page allows the user to change user
    //object for things which are not hardcoded at creation.
    const { user } = useAuth0()
    const { userState } = useContext(SiteContext);
    return (
            user ?  
        <div>
            <Linky to={`/searchBar`}>Search for new streamers</Linky>
            <Linky to={'/myLibrary'}>My streamers</Linky> 
        </div>
            :
        <div>
            {/* <Linky to={`/`}>Search for new shows</Linky> */}
        </div>
    )
}

const Linky = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 1em;
  &.active {color: red;}`;

export default TabBar;