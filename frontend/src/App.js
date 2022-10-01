import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


import SearchBar from './searchBar'
import Header from './header'

const App = () => {
  //The app has some functionality that depends on a user being logged in, but
  //is not particularly dependant on security or social aspects. For now, when
  //a user is logged in some features are unlocked, but no encryption has been added.
  const { user } = useAuth0();
  user ? sessionStorage.setItem("currentUser", `${user.email}`)
    : sessionStorage.removeItem("currentUser")
  return (
    <Router>
        <LayoutWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<SearchBar />} />
          </Routes>
        </LayoutWrapper>
  </Router>
  );
}


const LayoutWrapper = styled.div`
`;
export default App;
