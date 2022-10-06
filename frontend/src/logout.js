import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useContext } from "react";
import { SiteContext } from "./context";

const LogoutButton = () => {
  const {setUserState} = useContext(SiteContext)
  const { logout } = useAuth0();
  const { user } = useAuth0();
  let initials = ""
  user.name ? initials = user.name.split(' ').map(word => word[0]).join('') : initials = "GF"

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      {initials}
    </Button>
  );
};

const Button = styled.button`
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    border: none;
    background-color: black;
    color: white
`;

export default LogoutButton;