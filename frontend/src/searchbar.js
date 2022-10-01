import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { SiteContext } from "./context";

//This is the searchbar which pings the API. It accepts mostly dropdown
//information to reduce user error. It is less nimble than searching 
//collection
const SearchBar = () => {
  //This is based on Auth0
  const { userState } = useContext(SiteContext);
  //Failsafe to prevent repeat searches
  const [isSearching, setIsSearching] = useState(false)
  //This is the model params which will be passed to the API for the search.
  const [params, setParams] = useState({
    country: "",
    service: "",
    type: "",
    keyword: "",
    page: "1",
    output_language: "en",
    language: "en",
  });
  //This async function confirms the shape of the data
  const fetchShows = async (e) => {
    if (!params.country || !params.service || !params.type || !params.keyword) return console.log("insufficient information")
    //passes the information to the backend
    await fetch(`/show?country=${params.country}&service=${params.service}&type=${params.type}&keyword=${params.keyword}&page=1&output_language=en&language=en`)
    ((res) => res.json())
    await ((data) => {
      console.log(data)
      //resets the searchbar
      setParams({
        country: "",
        service: "",
        type: "",
        keyword: "",
        page: "1",
        output_language: "en",
        language: "en",
      });
      //and will eventually pass the information to a list for rendering
    })
    .catch(() => {
      console.log("error")
    });
  }
  //a button to clear search params
  const clearChanges = () => {
    setParams({
      country: "",
      service: "",
      type: "",
      keyword: "",
      page: "1",
      output_language: "en",
      language: "en",
    });
  };
  //This keeps the params object up to date with user inputs
  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.id]: e.target.value,
    });
  };
  //This protects from endless rerendering
  useEffect(async() => {
    setIsSearching(true)
    await fetchShows();
    setIsSearching(false)
  }, []);
  return (
    <>
      <Row>
        <SearchBox
          id="keyword"
          type="text"
          value={params.keyword}
          onChange={handleChange}
          onKeyDown={(ev) => {
            // if (ev.key === "Enter") {onSubmit(params)}
          }}
        ></SearchBox>
        {isSearching === true ? (<p>Searching</p>
        ) : (
          <>
          <Button id="search" onClick={useEffect} style={{backgroundColor: "green"}}>S</Button>
          <Button id="clear" onClick={clearChanges} style={{backgroundColor: "red"}}>C</Button>
          </>
        )}

      </Row>
      <Row>
        <div>
          <Select id="type" value={params.type} onChange={handleChange}>
            <Item key={"movie"}>movie</Item>
            <Item key={"series"}>series</Item>
          </Select>
          <Select id="country" value={params.country} onChange={handleChange}>
            {COUNTRIES.map((country) => {
              //This map is finding all the countries from the data set. The data
              //is hardcoded and stored on the front end because the API doesn't
              //have a way of retreiving it on load, and it isn't sensitive.
              //The key is the standard 2 digit country code.
              return (
                <Item key={country.code} value={country.code}>
                  {country.country}
                </Item>
              );
            })}
          </Select>
          <Select id="service" value={params.service} onChange={handleChange}>
            {SERVICES.filter((service) => {
              //Services rerenders when the country changes, and filters based on 
              //services available in the region.
              if (Object.values(service)[0].includes(params.country)) {
                return Object.keys(service)[0];
              }
            }).map((e) => {
              return (
                <Item
                  key={Object.keys(e).toString()}
                  value={Object.keys(e).toString()}
                >
                  {Object.keys(e).toString()}
                </Item>
              );
            })}
          </Select>
        </div>
      </Row>
    </>
  );
};
const Row = styled.div``;
const SearchBox = styled.input`
  width: clamp(100px, 80%, 800px);
  margin: .5em;
  `;
const Button = styled.button`
  height: 2em;
  width: 2em;
  border-radius: 50%;
  border: none;
  margin: .5em
  `;
const Select = styled.select`
  margin: 1em
  `;
const Item = styled.option``;

export default SearchBar;
