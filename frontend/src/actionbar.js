import React, { useEffect, useState, useContext } from "react";
import { BsBookmarksFill, BsBookmarks, MdOutlineMarkChatUnread, MdOutlineMarkChatRead } from "react-icons/ai";
import Action from "./action";
import styled from "styled-components";
import { SiteContext } from "./context";

const ActionBar = ({result}) => {
    //This appends to any render of details or list result 
    const { userState, searchData, setUserState } = useContext(SiteContext)
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
    //Updates both the state and backend, adding or subtracting a show from my watched list.
    useEffect(()=>{
        const body = {_id: userState._id, item: result}
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
                shows: [...userState.shows, result],
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
      <button color={"black"} size={40} onClick={()=>setIsBookmarking(true)}>
        <option kind="bookmark" />
        <span>bookmark</span>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ActionBar;