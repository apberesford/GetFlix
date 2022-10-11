import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { useEffect, useState, useContext } from "react";
import { SiteContext } from "./context";
import { BsTrash2Fill, BsSearch } from "react-icons/bs";



import Result from "./result";

//This is the searchbar which pings the API. It accepts mostly dropdown
//information to reduce user error. It is less nimble than searching 
//collection
const SearchBar = () => {
  //This is based on Auth0
  const { userState, searchData, setSearchData } = useContext(SiteContext);
  const [params, setParams] = useState({
    country: "",
    service: "",
    type: "",
    keyword: "",
    page: "1",
    output_language: "en",
    language: "en",
  });
  //Failsafe to prevent repeat searches
  const [isSearching, setIsSearching] = useState(false)
  //This async function confirms the shape of the data
  const fetchShows = async (e) => {
    try {
      //passes the information to the backend
      const fetchResult = await fetch(`/show/?country=${params.country}&service=[${params.service}]&type=${params.type}&keyword=${params.keyword}&page=1&output_language=en&language=en`)
      const data = await fetchResult.json()
      // and saves the response in state to use
        setSearchData(data.data)
    } catch (error) {
      return error
    };
    setIsSearching(false)
  }
  //this function is called if the services are an array (i.e. several services 
  //are being searched at once). It promises all the returns since I didn't want 
  //to pay for the premium API, and this is an acceptable workaround at small scale
  const fetchManyShows = async (e) => {
    try {
      //passes the information to the backend
      const fetchResult = await fetch(`/multistream/?country=${params.country}&service=[${params.service}]&type=${params.type}&keyword=${params.keyword}&page=1&output_language=en&language=en`)
      const data = await fetchResult.json()
      // and saves the response in state to use
      setSearchData(data.data)
    } catch (error) {
      return error
    };
    setIsSearching(false)
  } 
  // //a button to clear search params
  const clearChanges = () => {
    setParams({
      ...params,
      type: "",
      keyword: "",
    });
    setSearchData([])
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
    if (!params.country || !params.service || !params.type || !params.keyword) {setIsSearching(false); return undefined}
    if (isSearching === false) {return undefined}
    // if (typeof params.service === "string") {
    //   fetchShows()
    //   setIsSearching(false)
    // } else {
      fetchManyShows()
      setIsSearching(false)
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
          <Enter id="search" size={20} disabled={isSearching || !params.country || !params.service || !params.type || !params.keyword } onClick={()=>setIsSearching(true)}></Enter>
          <Clear id="clear" size={20} disabled={!params.country && !params.service && !params.type && !params.keyword }onClick={clearChanges}></Clear>
          </>
        )}

      </Row>
      <Row>
        <div>
          <Select id="type" value={params.type} onChange={handleChange}>
            <option> SELECT</option>
            <option key={"movie"}>movie</option>
            <option key={"series"}>series</option>
          </Select>
          <Select id="country" value={!params.country ? (""):(params.country )} onChange={handleChange}>
            {userState?.country ? <option key="myCountry" value={userState.countryCode}>{userState.country}</option> : <option value="">Select a country</option>} 
            {/* {!userState.country ? (<></>) : (<Item key={userState.countryCode}>{userState.country}</Item>)} */}
            {COUNTRIES.map((country) => {
              //This map is finding all the countries from the data set. The data
              //is hardcoded and stored on the front end because the API doesn't
              //have a way of retreiving it on load, and it isn't sensitive.
              //The key is the standard 2 digit country code.
              return (
                <option key={country.code} value={country.code}>
                  {country.country}
                </option>
              );
            })}
          </Select>
          <Select id="service" value={params.service} onChange={handleChange}>
            {userState?.subscriptions ? <option key="mySubs" value={userState.subscriptions}>My Services</option> : <option value="">Select a service</option>}
            {SERVICES.filter((service) => {
              //Services rerenders when the country changes, and filters based on 
              //services available in the region.
              if (Object.values(service)[0].includes(params.country)) {
                return Object.keys(service)[0];
              }
            }).map((e) => {
              return (
                <option
                key={Object.keys(e).toString()}
                value={Object.keys(e).toString()}
                >
                  {Object.keys(e).toString()}
                </option>
              );
            })}
          </Select>
          {isSearching ? (
            <>searching</>
            ) : (
              searchData.length === 0 ? (
                <></>
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
                  countryCode={userState.countryCode}
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
const Row = styled.div`
  margin: 1em;
  
  `;
const SearchBox = styled.input`
  width: clamp(100px, 80%, 800px);
  margin: .5em;
  `;
const Select = styled.select`
  margin: 1em;
  `;
const Clear = styled(BsTrash2Fill)`
  margin-right: 0.5rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? .2 : 1};
  `;
  const Enter = styled(BsSearch)`
  margin-right: 0.5rem;
  cursor: pointer;  
  opacity: ${props => props.disabled ? .2 : 1};
  `;
  export default SearchBar;
  