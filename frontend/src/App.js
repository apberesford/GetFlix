import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


import SearchBar from './searchBar'
import Header from './header'
import EditProfile from "./editProfile";
import MyLibrary from './MyLibrary';
import TabBar from './tabBar'
import Home from './home'

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
          <TabBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/searchBar" element={<SearchBar />} />
            <Route path='/profile/' element={<EditProfile />} />
            <Route path='/myLibrary/' element={<MyLibrary />} />
          </Routes>
        </LayoutWrapper>
  </Router>
  );
}


const LayoutWrapper = styled.div``;

export default App;
