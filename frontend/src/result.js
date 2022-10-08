import { SiteContext } from "./context";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./searchBar.js";
import ActionBar from "./actionbar";

const Result = ({ result, resultId, country, countryCode, service, type }) => {
  const { userState, searchData } = useContext(SiteContext);
  let isWatched = result.isWatched
  let medium = "";
  if (type === "series") {
    medium = "tv";
  } else {
    medium = "movie";
  }
  return (
    <>
    <Wrapper 
    >
      <DetailLink
        watched={isWatched}
        to={`/details/${country}/${medium}/${result.tmdbID}`}
        key={result.imdbID}
        result={result}
        country={country}
        service={service}
        type={type}
        >
        <Poster
          src={result.posterURLs.original}
          alt={`release poster for ${result.title}`}
          />
        <span>
          {result.title} ({result.year})
        </span>
        {!result.seasons ? (
          <></>
          ) : (
            <span>
            {result.seasons} seasons, {result.episodes} episodes total
          </span>
        )}
      </DetailLink>
    </Wrapper>
      {userState?._id ? <><ActionBar result={result} service={service}/></> : <></>}
            </>
  );
};

const Wrapper = styled.div`
    justify-content: space-around;
    
    `;
const Poster = styled.img`
  height: 100px;
  `;
const DetailLink = styled(Link)`
opacity: ${props => props.watched ? .2 : 1};
  color: whitesmoke;
  text-decoration: none;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: baseline;
	align-content: flex-start;
`;
const LittleLink = styled.span`
`;
export default Result;
