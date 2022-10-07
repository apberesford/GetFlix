import { useState, useContext } from "react";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
// import StyledSuggestions from "./StyledSuggestions";
import Result from "./result";
import { SiteContext } from "./context";


//the list of movies in a users list will always be visible, and the searchbar
//acts as a filtering tool, making the list shorter or longer
const MyLibrary = () => {
  const { userState } = useContext(SiteContext)
  const [filterParams, setFilterParams] = useState("")
const handleChange = (e) => {
  setFilterParams(e.target.value)
  
}
const clearChanges = () => {
  setFilterParams("")
}
const titleSuggestions = userState.shows.filter(o => o.title.toLowerCase().includes(filterParams.toLowerCase()))
const tagSuggestions = userState.shows.filter(o => o.tags.find(element => element.includes(filterParams.toLowerCase()))) 
const allSuggestions = titleSuggestions.concat(tagSuggestions)
const uniqueSuggestions = []
for(let i of allSuggestions) {
  if(uniqueSuggestions.indexOf(i) === -1) {
      uniqueSuggestions.push(i);
  }
}
return (
    <>
        <Row>
            <SearchBox id="keyword" type="text" value={filterParams} onChange={handleChange}/>
            <Button id="clear" onClick={clearChanges} style={{backgroundColor: "red"}}>C</Button>
        </Row>
        <Row>
        {/* userState.shows.filter(o => o.name === filterParams || o => o.tags */}
        {uniqueSuggestions.map((result) => {
              return (
                <Result 
                  key={result.imdbID}
                  result={result}
                  country={userState.country}
                  service={userState.service}
                />
                )
              })}
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