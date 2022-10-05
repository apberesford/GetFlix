import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";



const Details = () => {
    //This is needlessly complicated, to protect from rerender problems, as well
    //as reduce load on the API
    const { userState, searchData} = useContext(SiteContext)
    const [displayedItem, setDisplayedItem] = useState(null)
    const [findingItem, setFindingItem] = useState(false)
    useEffect(() => {
    //a user can manually enter a search in the window. If it's correctly formatted,
    //it will work.
    let paramArray = window.location.pathname.split("/").splice(2)
    //first we try to grab the show from the most recent search.
    let searchedShows = searchData.filter(o => o.tmdbID === paramArray[2])
    if (typeof searchedShows[0] === "object") {setDisplayedItem(searchedShows[0])}
    //if that doesnt work we check if it's already been saved by the user
    else if (userState?.shows) {let myShowMatches = userState.shows
        let myShows = myShowMatches.filter(o => o.tmdbID === paramArray[2])
        if (typeof myShows[0] === "object") {setDisplayedItem(myShows[0])}}
        else {setFindingItem(true)}
    }, [])
    //finally we grab the show off the api by it's id.
    useEffect(() => {
        setFindingItem(false)
        fetch(`/details/${paramArray[0]}/${paramArray[1]}/${paramArray[2]}`)
        .then((res) => res.json())
        .then(data => {
            setDisplayedItem(data.data)
        })
    }, [findingItem])
    //if displayedItem is still null at this point, the page loads an error. 
    //otherwise, the show loads with more details than you get on the list item.
    return ( 
        !displayedItem.imdbID ? (
            <>we couldn't find anything here</>
        ) : (
            <Wrapper>
                <>A show! Here's some more information</>        
            </Wrapper>
        )
    )
}

const Wrapper = styled.div`
`
const Poster = styled.img`
    height: 100px
    `;

export default Details;