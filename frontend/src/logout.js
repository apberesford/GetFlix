import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Button = styled.button`
    height: 2em;
    width: 2em;
    border-radius: 50%;
    border: none;
    background-color: "black";
    color: "white"
`;

export default LogoutButton;