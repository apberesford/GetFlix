import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const SiteContext = createContext(null);

export const UserContext = ({children}) => {
    const { user } = useAuth0()
    const [collection, setCollection] = useState([])
    const [error, setError] = useState(false)
    const [userState, setUserState] = useState(null)

    useEffect(() =>{
        if (user) {
          
                      fetch(`/currentUser/${user.email}`)
                      .then(res => res.json())
                      .then(data => {
                          console.log(data)
                      //   setHandleState();
                      })
                      .catch(() => {
                        setError(true);
                      })
                    } else {
                      setUserState(null)
                      setCollection([])
                    }
                  }, [user])


return (
    <SiteContext.Provider value={{
        collection, setCollection,
        error, setError,
        userState, setUserState
      }}
    >
      {children}
    </SiteContext.Provider>
    );
}