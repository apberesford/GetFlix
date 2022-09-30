import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


import Sidebar from './sidebar';
import Searchbar from './searchbar'
import Header from './header'

const App = () => {
  const { user } = useAuth0();
  user ? sessionStorage.setItem("currentUser", `${user.email}`)
    : sessionStorage.removeItem("currentUser")
  return (
    <Router>
        <LayoutWrapper>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Searchbar />} />
          </Routes>
        </LayoutWrapper>
  </Router>
  );
}


const LayoutWrapper = styled.div`
`;
export default App;
