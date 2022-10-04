import { useState } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
// import StyledSuggestions from "./StyledSuggestions";

//the list of movies in a users list will always be visible, and the searchbar
//acts as a filtering tool, making the list shorter or longer
const MyLibrary = () => {

const handleChange = () => {

}
const clearChanges = () => {

}


return (
    <>
        <Row>
            <SearchBox id="keyword" type="text" value={"key"} onChange={handleChange}/>
            <Button id="clear" onClick={clearChanges} style={{backgroundColor: "red"}}>C</Button>
        </Row>
        <Row>
            Here's a bunch of movies and series you already liked!
        </Row>
    </>
)
}

const Row = styled.div``;
const Button = styled.button`
  height: 2em;
  width: 2em;
  border-radius: 50%;
  border: none;
  margin: .5em
  `;
const SearchBox = styled.input`
  width: clamp(100px, 80%, 800px);
  margin: .5em;
  `;

export default MyLibrary