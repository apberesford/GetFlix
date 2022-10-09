import React, { useEffect, useState, useContext } from "react";
import { BsBookmarksFill} from "react-icons/bs";
import styled from "styled-components";
import { SiteContext } from "./context";

//Action bar appends to all rendered streamers (result and details), giving the
//option to push it into the userState array "shows", and linking directly to
//the streamer website
const ActionBar = ({result, service}) => {
    const { userState, searchData, setUserState } = useContext(SiteContext)
  const [isBookmarking, setIsBookmarking] = useState(false);
  const serviceKey = Object.keys(result.streamingInfo)[0]
  const countryKey = Object.keys(result.streamingInfo[serviceKey])[0]
  const link = result.streamingInfo[serviceKey][countryKey].link
  // useEffect(() => {if (!userState?.shows) {}})
    //Updates both the state and backend, adding or subtracting a show from my watched list.
    useEffect(()=>{
        const body = {_id: userState._id, item: result}
        let newEntry = result
        newEntry = {...result, isWatched: false, tags: ""}
        if (isBookmarking === false) {return undefined}
        setIsBookmarking(false)
        const check = userState.shows.find(o => o.imdbID === result.imdbID)
        if (check?.imdbID) {  
            setUserState({
                ...userState,
                shows: userState.shows.filter(o => o.imdbID != result.imdbID),
            });
        } else {
            setUserState({
                ...userState,
                shows: [...userState.shows, newEntry],
            })
        }            
        fetch('/updateList', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            .then((res) => res.json())
    }, [isBookmarking])
  return (
    <Wrapper>
      <BookmarkFill 
        color={userState.shows.find(o => o.imdbID === result.imdbID) ? "#9E6723" : "#232323" } 
        size={20} 
        onClick={()=>setIsBookmarking(true)}>
        <option kind="bookmark" />
      </BookmarkFill>
      <Link onClick={(ev) => {
        ev.preventDefault()
        window.open(link);
      }}>{serviceKey}</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;
const BookmarkFill = styled(BsBookmarksFill)`
  cursor: pointer;
  /* font-size: 25px; */
  margin-right: 0.5rem;
  color: #c29346;
  padding-bottom: 1em;
`;
const Link = styled.div`
`;

export default ActionBar;
