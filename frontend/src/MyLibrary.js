import { useState, useContext, useEffect } from "react";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
// import StyledSuggestions from "./StyledSuggestions";
import Result from "./result";
import { SiteContext } from "./context";
import { BsTrash2Fill, BsSearch } from "react-icons/bs";


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
// check for matches in the strings of both title and tags. Filter to remove 
//duplicates, and render
const titleSuggestions = userState.shows.filter(o => o.title.toLowerCase().includes(filterParams.toLowerCase()))
const tagSuggestions = userState.shows.filter(o => o.tags.toLowerCase().includes(filterParams.toLowerCase())) 
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
            <Clear id="clear" onClick={clearChanges}>C</Clear>
        </Row>
        <Row>
        {uniqueSuggestions.map((result) => {
              return (
                <Result 
                  key={result.imdbID}
                  result={result}
                  service={result.service}
                  country={userState.country}
                  countryCode={userState.countryCode}
                />
                )
              })}
        </Row>
    </>
)
}

const Row = styled.div`
  margin: 1em;`;
const Button = styled.button`
  height: 2em;
  width: 2em;
  border-radius: 50%;
  border: none;
  margin: .5em;
  `;
const SearchBox = styled.input`
  width: clamp(100px, 80%, 800px);
  margin: .5em;
  `;
  const Clear = styled(BsTrash2Fill)`
  margin-right: 0.5rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? .2 : 1}
`;

export default MyLibrary