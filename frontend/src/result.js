import { SiteContext } from "./context";
import { useContext} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ActionBar from "./actionbar";

const Result = ({ result, country, service, type }) => {
  const { userState } = useContext(SiteContext);
  //these little shortcuts allow some conditional styling, and translate a few weird spots in
  //the api where the names of equivalent value keys are changed for no reason (tv = series)
  let isWatched = result.isWatched
  let medium = "";
  if (type === "series") {
    medium = "tv";
  } else {
    medium = "movie";
  }
  const serviceKey = Object.keys(result.streamingInfo)[0]
  const countryKey = Object.keys(result.streamingInfo[serviceKey])[0]
  const link = result.streamingInfo[serviceKey][countryKey].link
  return (
    <>
    <Wrapper 
    >
      {/* This passes some information down to the little bar appended to the result with bookmark and link options */}
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
          <Info>
        <Title>
          {result.title} ({result.year})
        </Title>
        {!result.tags ? (<></>):(
        <Overview>tagged with: {result.tags} </Overview>)}
        {!result.seasons ? (
          <></>
          ) : (
            <div>
            {result.seasons} seasons, {result.episodes} episodes total
          </div>

)}
          </Info>
      </DetailLink>
      {userState?._id ? <><ActionBar result={result} service={service} serviceKey={serviceKey}/></> 
        :<div onClick={(ev) => {
        ev.preventDefault()
        window.open(link);
      }}>{serviceKey}</div>}
    </Wrapper>
            </>
  );
};

const Wrapper = styled.div`
    justify-content: space-around;
  display: flex;
	flex-direction: row;
	justify-content: left;
  width: 80%;
  padding: 1em;
    
    `;
const Info = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;

`;
const Poster = styled.img`
  height: 100px;
  border-radius: 2px;
  padding-right: 1em;

  `;
const DetailLink = styled(Link)`
opacity: ${props => props.watched ? .2 : 1};
  color: whitesmoke;
  text-decoration: none;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
  width: 80%;
`;
const Title = styled.div`
font-size: 1.2em;
`;
const Overview = styled.span`
font-size: .8em;
opacity: .4;

`;

export default Result;
