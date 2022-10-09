import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { SiteContext } from "./context";

const TabBar = () => {
    //pretty self explanatory. The profile page allows the user to change user
    //object for things which are not hardcoded at creation.
    const { userState } = useContext(SiteContext);
    return (
            userState?._id ?  
        <Wrapper>
            <Linky to={`/searchBar`}>Search for new streamers</Linky>
            <Linky to={'/myLibrary'}>My streamers</Linky> 
        </Wrapper>
            :
        <></>
    )
}
const Wrapper = styled.div`
	display: flex;
`;
const Linky = styled(NavLink)`
    background-color: #232323;
    width: 50vw;
    text-decoration: none;
    color: gray;
    padding: 1em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  &.active {color: whitesmoke; 
        background: #36393E; 
    };
  `;


export default TabBar;