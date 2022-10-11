import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useContext }  from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SiteContext } from "./context";

//This is the landing page, both on login and logout.
const Home = () => {  
  const { setUserState, setError } = useContext(SiteContext);
  const { user } = useAuth0()
  useEffect(() =>{
    if (user) {
                  fetch(`/currentUser/${user.email}`)
                  .then(res => res.json())
                  .then(data => {
                        setUserState(data.data)
                  })
                  .catch(() => {
                    setError(true);
                    setUserState({})
                  })
                }
              }, [user])
    return (
      <Wrapper>
        <Linky to={`/searchBar`}>If you're in a rush, click here. Get searching.</Linky>
        <Block>Welcome to GetFlix, the app for geriatric millenials who thought cordcutting would make your life easier. Find streaming video online.</Block>
        <Block>Log in below to save shows you're interested in, mark them as watched, and add tags to your shows so you can group them and make them easier to find.</Block>
        <Block>Your profile page gives you the option to set what country you're looking in, and what services you own, if you aren't sure what you're looking for.</Block>
      </Wrapper>
    )
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
  text-align: center;
`;
const Linky = styled(NavLink)`
  text-decoration: none;
  color: gray;
  padding: 1em;
  &.active {color: red;}
`;
const Block = styled.div`
padding: 1em;
`;
export default Home;