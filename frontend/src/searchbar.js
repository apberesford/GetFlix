import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { useEffect, useState, useContext } from "react";
import { SiteContext } from "./context";


import Result from "./result";

//This is the searchbar which pings the API. It accepts mostly dropdown
//information to reduce user error. It is less nimble than searching 
//collection
const SearchBar = () => {
  //This is based on Auth0
  const { userState, searchData, setSearchData, params, setParams } = useContext(SiteContext);
  //Failsafe to prevent repeat searches
  const [isSearching, setIsSearching] = useState(false)
  //This async function confirms the shape of the data
  const fetchShows = async (e) => {
    try {
      //passes the information to the backend
      const fetchResult = await fetch(`/show?country=${params.country}&service=${params.service}&type=${params.type}&keyword=${params.keyword}&page=1&output_language=en&language=en`)
      const data = await fetchResult.json()
      // and saves the response in state to use
        setSearchData(data.data)
    } catch (error) {
      console.log(error)
    };
    setIsSearching(false)
  }
  //this function is called if the services are an array (i.e. several services 
  //are being searched at once). It promises all the returns since I didn't want 
  //to pay for the premium API, and this is an acceptable workaround at small scale
  // const fetchManyShows = async (e) => {
  //   try {
  //     //passes the information to the backend
  //     const fetchResult = await fetch(`/show?country=${params.country}&service=${params.service}&type=${params.type}&keyword=${params.keyword}&page=1&output_language=en&language=en`)
  //     const data = await fetchResult.json()
  //     // and saves the response in state to use
  //       setSearchData(data.data)
  //   } catch (error) {
  //     console.log(error)
  //   };
  //   setIsSearching(false)
  // } 
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
  useEffect(() =>{
    setParams({
      country: (userState?.countryCode ? userState.countryCode : ""),
      service: (userState?.subscriptions ? userState.subscriptions : ""),
      type: "",
      keyword: "",
      page: "1",
      output_language: "en",
      language: "en",
    });
  }, [])
  useEffect(() => {
    if (!params.country || !params.service || !params.type || !params.keyword) {return console.log("insufficient info")}
    if (isSearching === false) {return undefined}
    if (typeof params.service === "string") {
      fetchShows()
      .then(setIsSearching(false))
    }
    // else {fetchManyShows()
    //   .then(setIsSearching(false))
    // }
  }, [isSearching]);
  return (
    <>
      <Row>
        <SearchBox
          id="keyword"
          type="text"
          value={params.keyword}
          onChange={handleChange}
        ></SearchBox>
        {isSearching === true ? (<p>Searching</p>
        ) : (
          <>
          <Button id="search" onClick={()=>setIsSearching(true)} style={{backgroundColor: "green"}}>S</Button>
          <Button id="clear" onClick={clearChanges} style={{backgroundColor: "red"}}>C</Button>
          </>
        )}

      </Row>
      <Row>
        <div>
          <Select id="type" value={params.type} onChange={handleChange}>
            <Item> SELECT</Item>
            <Item key={"movie"}>movie</Item>
            <Item key={"series"}>series</Item>
          </Select>
          <Select id="country" value={!params.country ? (""):(params.country )} onChange={handleChange}>
            {userState?.country ? <Item key="myCountry" value={userState.countryCode}>{userState.country}</Item> : <Item value="">Select a country</Item>} 
            {/* {!userState.country ? (<></>) : (<Item key={userState.countryCode}>{userState.country}</Item>)} */}
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
            {userState?.subscriptions ? <Item key="mySubs" value={userState.subscriptions}>My Services</Item> : <Item value="">Select a service</Item>}
            {/* Set this up so that once there's a function to check multiple services in one go */}
            {/* {userState.subscriptions ? <Item key={1} value={1}>My Subscriptions</Item> : <></>}  */}
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
          {isSearching ? (
            <>searching</>
          ) : (
          searchData.length === 0 ? (
            <div>no data</div>
          ) : (
            <div>
              some data
            {searchData.map((result) => {
              return (
                <Result 
                  key={result.imdbID}
                  result={result}
                  country={params.country}
                  service={params.service}
                  type={params.type}
                />
                )
              })}
            </div>
          )
          )}
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
  margin: .5em;
  `;
const Select = styled.select`
  margin: 1em
  `;
const Item = styled.option``;

export default SearchBar;
