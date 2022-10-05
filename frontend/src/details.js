import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";



const Details = () => {
    const [displayedItem, setDisplayedItem] = useState(null)
    const imdbID = useParams()

    return ( null
        // <Wrapper>
        //     <Poster src={result.posterURLs.original} alt={`release poster for ${result.title}`}/>
        //     <span>{result.title} ({result.year})</span>
        //     <a href={result.streamingInfo[service][country].link} target="_blank">Link</a>
        //     {!result.seasons ? (<></>):(<span>{result.seasons} seasons, {result.episodes} episodes total</span>)}  
        // </Wrapper>
    )
}

const Wrapper = styled.div`
`
const Poster = styled.img`
    height: 100px
    `;

export default Details;