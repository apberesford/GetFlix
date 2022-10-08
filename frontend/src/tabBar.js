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
        <Wrapper>
            <Linky to={`/searchBar`}>Search for new streamers</Linky>
            <Linky to={'/myLibrary'}>My streamers</Linky> 
        </Wrapper>
            :
        <>
            {/* <Linky to={`/searchBar`}>Search for new shows</Linky> */}
        </>
    )
}
const Wrapper = styled.div`
	display: flex;
`;
const Linky = styled(NavLink)`
    /* margin: 1em; */
    background-color: #232323;
    width: 50vw;
    text-decoration: none;
    color: gray;
    padding: 1em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  &.active {color: whitesmoke; 
        background: #36393E; 
        /* border-radius: 50%; */
    };
  `;

export default TabBar;