import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Login = () => {  
    return <Linky to={`/searchBar`}>No time like the present. Get searching.</Linky>;
};


const Linky = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 1em;
  &.active {color: red;}
`;
export default Login;