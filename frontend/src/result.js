import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./searchBar.js";



const Result = ({result, resultId, country, service, type}) => {
    console.log(result.streamingInfo[service][country].link)
    return (
        <Wrapper>
            <Poster src={result.posterURLs.original} alt={`release poster for ${result.title}`}/>
            <span>{result.title} ({result.year})</span>
            <a href={result.streamingInfo[service][country].link} target="_blank">Link</a>
            {!result.seasons ? (<></>):(<span>{result.seasons} seasons, {result.episodes} episodes total</span>)}  
        </Wrapper>
    )
}

const Wrapper = styled.div`
`
const Poster = styled.img`
    height: 100px
    `;

export default Result;