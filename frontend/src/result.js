import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./searchBar.js";
import ActionBar from "./actionbar";


const Result = ({result, resultId, country, service, type}) => {
    const { userState, searchData } = useContext(SiteContext)
    let medium = ""
    if (type === "series") {medium = "tv"} else {medium = "movie"}
    return (
        <Wrapper>
            <DetailLink to={`/details/${country}/${medium}/${result.tmdbID}`}                   key={result.imdbID}
                  result={result}
                  country={country}
                  service={service}
                  type={type}>
            <Poster src={result.posterURLs.original} alt={`release poster for ${result.title}`}/>
            <span>{result.title} ({result.year})</span>
            <LittleLink onClick={(ev) => {ev.preventDefault(); window.open(result.streamingInfo[service][country].link)}}>link</LittleLink>
            {!result.seasons ? (<></>):(<span>{result.seasons} seasons, {result.episodes} episodes total</span>)}  
            </DetailLink>
            {userState?._id ? (
                <ActionBar 
                    result={result}/>
            ) : (<></>)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
`
const Poster = styled.img`
    height: 100px
`;
const DetailLink = styled(Link)`
`;
const LittleLink = styled.div`
`;
export default Result;