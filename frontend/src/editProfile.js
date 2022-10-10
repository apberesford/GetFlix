import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COUNTRIES, SERVICES } from "./CONSTANTS";
import { SiteContext } from "./context";
import { BsTrash2Fill, BsSaveFill } from "react-icons/bs";


//a pretty barebones edit profile page. This allows the user to "preset" a 
//country and list of services they use to speed up searches.
const EditProfile = () => {
  const {userState, profileParams, setProfileParams, params} = useContext(SiteContext)
  // const [profileParams, setProfileParams] = useState({})
  const [newArray, setNewArray] = useState([])
  const [click, setClick] = useState(false)
  const [cancel, setCancel] = useState(false)
  //handles the change of country in the dropdown window, so the user can set a country.
  const handleChangeList = (e) => {
    setProfileParams({
      ...profileParams,
      country: e.target[e.target.selectedIndex].innerText,
      countryCode: e.target.value,
      subscriptions: userState.subscriptions
    });
  }
  //handles the checkboxes of available services, so the user can set their services.
  const handleChangeCheck = (e) => {
    if (profileParams?.subscriptions && profileParams.subscriptions.includes(e.target.id)) {
      setNewArray(profileParams.subscriptions.filter((i) => i != e.target.id))
    } else {
      const newArray =  profileParams.subscriptions.push(e.target.id)
      setProfileParams({
        ...profileParams,
        [e.target.label]: newArray
      });
    }
  }
  //this use effect watches when boxes are unchecked, to set the 
  //profileParams.subscriptions without stale setting interfering 
  //initial on load
  useEffect(() => {
    setProfileParams(userState)
  }, [])

  //setting subscriptions, including in backend
  useEffect(() => {
    setProfileParams({...profileParams, ["subscriptions"]: newArray})
  }, [newArray]);
  useEffect(() => {
    const request = {...profileParams, _id: userState._id}
    if (click === false) {return undefined}
    fetch('/updateUser', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    })
    .then((res) => res.json())
    setClick(false)
  }, [click])

  //clear changes
  useEffect(() => {
    if (cancel === false) {return undefined}
    setProfileParams({country: userState.country, countryCode: userState.countryCode, subscriptions: userState.subscriptions})
    setCancel(false)
  }, [cancel])
  console.log(profileParams.country)
    return (
        <Wrapper>
        <p>Select a country:</p>
        <Select id="country" 
        value={!profileParams.country ? ("") : (profileParams.country)} 
        key={""} onChange={handleChangeList}>
          {profileParams?.country ? <option key="myCountry" value={profileParams.countryCode}>{profileParams.country}</option> : <option value={""} disabled>SELECT A COUNTRY</option>}
            {COUNTRIES.map((country) => {
                //This map is finding all the countries from the data set. The data
                //is hardcoded and stored on the front end because the API doesn't
                //have many pings, and it isn't sensitive.
                //The key is the standard 2 digit country code.
                return (
                  <option key={country.code} value={country.code}>
                    {country.country}
                  </option> 
                );
            })}
        </Select>
          <Save id="save" onClick={()=>{setClick(true)}} size={20}/>
          <Clear id="clear" onClick={()=>{setCancel(true)}} size={20}/>
          <p>Select the services you're subscribed to:</p>
        <div>
            {SERVICES.filter((service) => {
              //Services rerenders when the country changes, and filters based on 
              //services available in the region.
              if (Object.values(service)[0].includes(profileParams.countryCode)) {
                return Object.keys(service)[0];
              }
            }).map((e) => {
              //You want unique keys? Here.
              const unique = Object.keys(e).toString() 
              let checked = false
              if (profileParams?.subscriptions) {checked = profileParams.subscriptions.find(e => e === unique)}
              return ( 
                <span key={unique} >
                <Check id={unique} type={"checkbox"} label={profileParams.subscriptions} checked={checked ? 'checked' : ""}onChange={handleChangeCheck}/>
                <span> {unique} </span>
                </span>
              );
            })}
          </div>
        </Wrapper>
      )
  }
const Wrapper = styled.div`
  margin: 1em;`;
const Select = styled.select`
  margin: 1em;
  `;
const Check = styled.input`
  margin: 1em;
  `;
  const Clear = styled(BsTrash2Fill)`
margin-right: 0.5rem;
cursor: pointer;
`;
const Save = styled(BsSaveFill)`
margin-right: 1rem;
margin-left: 1.5rem;
cursor: pointer;  
`;




export default EditProfile
