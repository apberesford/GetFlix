import React, { useEffect, useState, useContext } from "react";
import { BsFillCameraReelsFill, BsFillTagFill } from "react-icons/bs";

import Action from "./action";
import styled from "styled-components";
import { SiteContext } from "./context";

const DetailBar = ({ result }) => {
  const { userState, searchData, setUserState } = useContext(SiteContext);
  const [tags, setTags] = useState(result.tags);
  const [confirmTags, setConfirmTags] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [colour, setColour] = useState(false)
  const handleChange = (e) => {
    setTags(e.target.value);
  };
  useEffect(() => {if (userState.isWatched === true) {setColour(true)}}, []);
  // Updates both the state and backend, adding or subtracting a show from my watched list.
  
  
  //toggles a show to be isWatched or not
  useEffect(() => {
    if (isWatched === false) {
      return undefined;
    }
    setIsWatched(false);
    const body = { _id: userState._id, imdbID: result.imdbID, isWatched: colour };
    console.log(body)
    const index = userState.shows.findIndex((o) => {
      return o.imdbID === result.imdbID;
    });
    const boolean = userState.shows[index].isWatched;
    setColour(!colour)
    setUserState({
      ...userState,
      shows: userState.shows.map((show, i) =>
        i === index ? { ...show, isWatched: !boolean } : show
      ),
    });
    fetch("/isWatched", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }, [isWatched]);
  
  
  // sets the tags in state and backend, confirmed with the button push.
  useEffect(() => {
      if (confirmTags === false) {return undefined}
      setConfirmTags(false)
    const body = { _id: userState._id, imdbID: result.imdbID, tags: tags };
    const index = userState.shows.findIndex((o) => {
        return o.imdbID === result.imdbID;
      });
    setUserState({
        ...userState,
        shows: userState.shows.map((show, i) => i === index ? {...show, tags: tags} : show),
    });
    fetch('/updateTags', {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => res.json());
  }, [confirmTags]);
  return (
    <Wrapper>
      <SearchBox
        id="tags"
        type="text"
        value={tags}
        onChange={handleChange}
      ></SearchBox>
      <TagFill size={20} onClick={() => setConfirmTags(true)}>
        <option kind="bookmark" />
        <span>setTags</span>
      </TagFill>
      <WatchedFill color={colour ? "black" : "#c29346"} size={20} onClick={() => setIsWatched(true)}>
        <option kind="watched" />
      </WatchedFill>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchBox = styled.input`
  width: clamp(100px, 80%, 800px);
  margin: 0.5em;
`;
const WatchedFill = styled(BsFillCameraReelsFill)`
margin-right: 0.5rem;
color: #c29346;
`;
const TagFill = styled(BsFillTagFill)`
margin-right: 0.5rem;
color: #c29346;
`;

export default DetailBar;
