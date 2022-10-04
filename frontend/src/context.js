import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const SiteContext = createContext(null);

export const UserContext = ({children}) => {
  //All of the context here (except error) flow out from the auth0 feature;
  //collection is the user collection of saved shows for quick rendering. 
  //userState saves some profile information (location, subscriptions, for
  //better ux)
    const { user } = useAuth0()
    const [error, setError] = useState(false)
    const [userState, setUserState] = useState(null)
    const [searchData, setSearchData] = useState([])

return (
    <SiteContext.Provider value={{
        error, setError,
        userState, setUserState,
        searchData, setSearchData
      }}
    >
      {children}
    </SiteContext.Provider>
    );
}