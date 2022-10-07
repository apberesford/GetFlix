import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Login = () => {  
    return (
      <>
        <Linky to={`/searchBar`}>If you're in a rush, click here. Get searching.</Linky>
        <div>Welcome to GetFlix, the app for geriatric millenials who thought cordcutting would make it easier to find streaming video online.</div>
        <div>Log in to save shows you're interested in, mark them as watched, and add tags to your shows so you can group them and make them easier to find.</div>
        <div>Your profile page gives you the option to set what country you're looking in, and what services you own, if you aren't sure what you're looking for.</div>
      </>
    )
};


const Linky = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 1em;
  &.active {color: red;}
`;
export default Login;