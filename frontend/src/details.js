import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ActionBar from "./actionbar";
import DetailBar from "./detailBar";



const Details = ({service, country}) => {
    //This is needlessly complicated, to protect from rerender problems, as well
    //as reduce load on the API
    const { userState, searchData} = useContext(SiteContext)
    const [displayedItem, setDisplayedItem] = useState(null)
    const [findingItem, setFindingItem] = useState(false)
    const paramArray = window.location.pathname.split("/").splice(2)
    useEffect(() => {
    //a user can manually enter a search in the window. If it's correctly formatted,
    //it will work.
    //first we try to grab the show from the most recent search.
    let searchedShows = searchData.find(o => o.tmdbID === paramArray[2])
    if (typeof searchedShows === "object") {setDisplayedItem(searchedShows)}
    //if that doesnt work we check if it's already been saved by the user
    else if (userState?.shows) {let myShowMatches = userState.shows
        let myShows = myShowMatches.find(o => o.tmdbID === paramArray[2])
        if (typeof myShows === "object") {setDisplayedItem(myShows)}}
        else {setFindingItem(true)}
    }, [])
    //finally we grab the show off the api by it's id.
    // useEffect(() => {
    //     setFindingItem(false)
    //     fetch(`/details/${paramArray[0]}/${paramArray[1]}/${paramArray[2]}`)
    //     .then((res) => res.json())
    //     .then(data => {
    //         setDisplayedItem(data.data)
    //     })
    // }, [findingItem])
    //if displayedItem is still null at this point, the page loads an error. 
    //otherwise, the show loads with more details than you get on the list item.
    return ( 
        !displayedItem?.tmdbID ? (
            <>we couldn't find anything here</>
        ) : (
            <Wrapper>
                <Poster src={displayedItem.posterURLs.original} alt={`poster for ${displayedItem.title}`}/>
                <LittleLink onClick={(ev) => {ev.preventDefault(); window.open(displayedItem.streamingInfo[service][country].link)}}>{service}</LittleLink>
                <>A show! Here's some more information {displayedItem.tmdbID}</>        
                {!userState._id ? <></> : <><ActionBar result={displayedItem}/><DetailBar result={displayedItem}/></>}
            </Wrapper>
        )
    )
}

const Wrapper = styled.div`
`
const Poster = styled.img`
    height: 500px;
`;
const LittleLink = styled.div`
`;
export default Details;