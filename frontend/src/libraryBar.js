import { useState } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import StyledSuggestions from "./StyledSuggestions";

//the list of movies in a users list will always be visible, and the searchbar
//acts as a filtering tool, making the list shorter or longer
const libraryBar = () => {
    const [search, setSearch] = useState("")
    console.log(collection)


    const clearChanges = () => {
        setSearch("")
    }
}




return (
    <>
        <Row>
            <SearchBox id="keyword" type="text" value={params.keyword} onChange={handleChange}/>
            <Button id="clear" onClick={clearChanges} style={{backgroundColor: "red"}}>C</Button>
        </Row>
        <Row>
        </Row>
    </>
)