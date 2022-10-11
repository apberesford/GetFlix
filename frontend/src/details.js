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
    //finally we grab the show off the api by it's id. This one generally doesn't fire unless
    //the user manually enters a show number in, so it's more meant as a catch for the first 
    //two cases.
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
        !displayedItem?.tmdbID ? (
            <>we couldn't find anything here</>
        ) : (
            <>
            <Wrapper>
                <BackgroundImage src={displayedItem.backdropURLs.original} />
                <Poster src={displayedItem.posterURLs.original} alt={`poster for ${displayedItem.title}`}/>
                <Info>
                    <Title>{displayedItem.originalTitle} ({displayedItem.year})</Title>
                    <Item>{displayedItem.tagline}</Item>
                    <Item>{displayedItem.overview}</Item>
                    <Item>Featuring: {displayedItem.cast.map((element)=>{return(<span>{element}, </span>)})} {displayedItem.significants.map((element)=>{return(<span>{element}, </span>)})}</Item>
                    {!displayedItem?.seasons ? (<Item>{displayedItem.runtime} minutes</Item>):(<Item>{displayedItem.seasons} seasons, {displayedItem.episodes} episodes</Item>)}
                </Info>
                <Actions>
                    <ActionBar result={displayedItem}/>
                    <span onClick={(ev) => {ev.preventDefault(); window.open(displayedItem.streamingInfo[service][country].link)}}>{service}</span>
                </Actions>        
            </Wrapper>
                {!userState._id ? <></> : <><DetailBar result={displayedItem}/></>}
            </>
        )
    )
}

const Wrapper = styled.div`  
    overflow: hidden;  
    width: 100vw;
    min-height: 200px;
	display: flex;
	flex-wrap: wrap;
    flex-direction: row;
    `;
const BackgroundImage = styled.img`
    z-index: -1;
    position: absolute;
    width: 100%;
    opacity: .1;
`;
const Info = styled.div`	
    padding: 1em;
    width: clamp(50%, 600px, 50%);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

`;
const Actions = styled.div`
    padding: 1em;
    width: clamp(10%, 100px, 10%);
    position: absolute;
    right: 0;
    top: 75px;
`;
const Item = styled.span`
    padding: .5em;
`
const Poster = styled.img`
    width: clamp(30%, 250px, 30%);
    border-radius: 20px;
    padding: 1em;

`;
const Title = styled.div`
    padding: 1em;
    font-size: 1.5em;

`;
export default Details;