import React, { useEffect, useState, useContext } from "react";
import { BsBookmarksFill, BsBookmarks, BsFillCameraReelsFill} from "react-icons/bs";
import Action from "./action";
import ActionIcons from './actionIcons'
import styled from "styled-components";
import { SiteContext } from "./context";

const ActionBar = ({result, service}) => {
    const { userState, searchData, setUserState } = useContext(SiteContext)
  const [isBookmarking, setIsBookmarking] = useState(false);
  // const [isWatched, setIsWatched] = useState(false);
  const serviceKey = Object.keys(result.streamingInfo)[0]
  // console.log(serviceKey) 
  const countryKey = Object.keys(result.streamingInfo[serviceKey])[0]
  // console.log(countryKey)
  const link = result.streamingInfo[serviceKey][countryKey].link
  useEffect(() => {if (!userState?.shows) {}})
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
    // useEffect(() => {
    //   if (isWatched === false) {
    //     return undefined;
    //   }
    //   setIsWatched(false);
    //   const body = { _id: userState._id, imdbID: result.imdbID };
    //   const index = userState.shows.findIndex((o) => {
    //     return o.imdbID === result.imdbID;
    //   });
    //   const boolean = userState.shows[index].isWatched;
    //   setUserState({
    //     ...userState,
    //     shows: userState.shows.map((show, i) =>
    //       i === index ? { ...show, isWatched: !boolean } : show
    //     ),
    //   });
    //   fetch("/isWatched", {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   }).then((res) => res.json());
    // }, [isWatched]);
  return (
    <Wrapper>

      <BookmarkFill color={userState.shows.find(o => o.imdbID === result.imdbID) ? "#9E6723" : "#232323" } size={20} onClick={()=>setIsBookmarking(true)}>
        <option kind="bookmark" />
        <span>bookmark</span>
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
  justify-content: center;
  align-items: center;
`;
const BookmarkFill = styled(BsBookmarksFill)`
  cursor: pointer;
  font-size: 25px;
  margin-right: 0.5rem;
  color: #c29346;
`;
const Link = styled.div`
`;

//   const WatchedFill = styled(BsFillCameraReelsFill)`
//   cursor: pointer;
//   font-size: 25px;
//   margin-right: 0.5rem;
// `;
export default ActionBar;



// console.log(serviceKey, countryKey)