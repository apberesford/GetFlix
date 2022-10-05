import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { SiteContext } from "./context";


//a pretty barebones edit profile page. This allows the user to "preset" a 
//country and list of services they use to speed up searches.
const EditProfile = () => {
  const {userState, setUserState, error, setError} = useContext(SiteContext)
  const [profileParams, setProfileParams] = useState({country: userState.country, countryCode: userState.countryCode, subscriptions: userState.subscriptions})
  const [newArray, setNewArray] = useState([])
  const [click, setClick] = useState(false)
  const [cancel, setCancel] = useState(false)
  console.log(profileParams)
  //handles the change of country in the dropdown window, so the user can set a country.
  const handleChangeList = (e) => {
    setProfileParams({
      ...profileParams,
      [e.target.id]: e.target.value,
    });
  }
  //handles the checkboxes of available services, so the user can set their services.
  const handleChangeCheck = (e) => {
    if (profileParams.subscriptions.includes(e.target.id)) {
      setNewArray(profileParams.subscriptions.filter((i) => i != e.target.id))
    } else {
      setProfileParams({
        ...profileParams,
        [e.target.label]: [profileParams.subscriptions.push(e.target.id)]
      });
    }
  }
  //this use effect watches when boxes are unchecked, to set the 
  //profileParams.subscriptions without stale setting interfering 
  useEffect(() => {
    setProfileParams(userState)
  }, [])
  useEffect(() => {
    setProfileParams({...profileParams, ["subscriptions"]: newArray})
  }, [newArray]);
  useEffect(() => {
    if (click === false) {return console.log("done")}
    console.log("click")
    setClick(false)
  }, [click])
  useEffect(() => {
    if (cancel === false) {return console.log("done")}
    setProfileParams({country: userState.country, countryCode: userState.countryCode, subscriptions: userState.subscriptions})
    setCancel(false)
  }, [cancel])
    return (
      !userState.country ? (<>Please Log in</>) : ( 
        <>
        <p>Select a country</p>
        <Select id="country" value={profileParams.country ? profileParams.country : ""} onChange={handleChangeList}>
          <Item>SELECT A COUNTRY</Item>
          {/* Adds the country code which already exists for the user, if one does at the top of the list */}
          {userState.country ? (<Item key={userState.countryCode} value={userState.countryCode}>{userState.country}</Item>
        ) : (<></>)}
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
        <div>
            {SERVICES.filter((service) => {
              //Services rerenders when the country changes, and filters based on 
              //services available in the region.
              if (Object.values(service)[0].includes(profileParams.country)) {
                return Object.keys(service)[0];
              }
            }).map((e) => {
              //You want unique keys? Here.
              const unique = Object.keys(e).toString() 
              const checked = profileParams.subscriptions.find(e => e === unique)
              return ( 
                <span key={unique} >
                <Check id={unique} type={"checkbox"} label={profileParams.subscriptions} checked={checked ? 'checked' : ""}onChange={handleChangeCheck}/>
                <Label> {unique} </Label>
                </span>
              );
            })}
          </div>
          <Button id="save" onClick={()=>{setClick(true)}} style={{backgroundColor: "green"}}>Save Changes</Button>
          <Button id="clear" onClick={()=>{setCancel(true)}} style={{backgroundColor: "red"}}>Cancel Changes</Button>
        </>
      )
    )
  }
  
const Select = styled.select`
  margin: 1em;
  `;
const Item = styled.option``;
const Label = styled.span``;
const Check = styled.input``;
const Button = styled.button`
  height: 2em;
  width: 2em;
  border-radius: 50%;
  border: none;
  margin: .5em
  `;



export default EditProfile
  /* {checked={userState.subscriptions.includes(Object.keys(e).toString()) ? 'checked' : ''}} */