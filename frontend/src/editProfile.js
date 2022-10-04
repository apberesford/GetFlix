import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { SiteContext } from "./context";


//a pretty barebones edit profile page. This allows the user to "preset" a 
//country and list of services they use to speed up searches.
const EditProfile = () => {
  const {userState, setUserState} = useContext(SiteContext)
  const [profileParams, setProfileParams] = useState({country: "", subscriptions: []})
  const [newArray, setNewArray] = useState([])
  // const [click, setClick] = useState(false)
  console.log(userState)
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
    setProfileParams({...profileParams, ["subscriptions"]: newArray})
  }, [newArray]);
  // useEffect(() => {
  //   if (click === false) {return console.log("done")}
  //   console.log("click")
  //   setClick(false)
  // }, [click])
    return (
        <>
        <p>Select a country</p>
        {console.log(profileParams.country)}
        <Select id="country" value={profileParams.country[1]} onChange={handleChangeList}>
        {/* {userState.country ? (<Item key={userState.country[1]} value={userState.country[1]}>{userState.country[0].toUpperCase}</Item>
        ) : (<Item>Select</Item>)} */}
            {/* Add the country code which already exists for the user, if one does */}
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
              const unique = Object.keys(e).toString() 
              return ( 
                <span key={unique} >
                <Check id={unique} type={"checkbox"} label={profileParams.subscriptions} onChange={handleChangeCheck}/>
                <Label> {unique} </Label>
                </span>
              );
            })}
          </div>
          {/* <Button id="save" onClick={setClick(true)} style={{backgroundColor: "green"}}>S</Button> */}
        </>
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