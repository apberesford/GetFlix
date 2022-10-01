import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    
    return <Button onClick={() => loginWithRedirect()}>GF</Button>;
};
const Button = styled.button`
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    border: none;
    background-color: black;
    color: white
`;
export default Login;