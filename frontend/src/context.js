import { createContext, useState } from "react";
export const SiteContext = createContext(null);

export const UserContext = ({children}) => {
  //All of the context here flow out from through ;
  //collection is the user collection of saved shows for quick rendering. 
  //userState saves some profile information (location, subscriptions, for
  //better ux)
    const [error, setError] = useState(false)
    const [userState, setUserState] = useState(null)
    const [searchData, setSearchData] = useState([])
    const [profileParams, setProfileParams] = useState({})



return (
    <SiteContext.Provider value={{
        error, setError,
        userState, setUserState,
        searchData, setSearchData,
        profileParams, setProfileParams,
      }}
    >
      {children}
    </SiteContext.Provider>
    );
}