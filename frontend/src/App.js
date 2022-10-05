import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useContext } from "react";

import { SiteContext } from "./context";
import SearchBar from './searchBar'
import Header from './header'
import EditProfile from "./editProfile";
import MyLibrary from './MyLibrary';
import TabBar from './tabBar'
import Home from './home'
import Details from "./details";

const App = () => {
  //The app has some functionality that depends on a user being logged in, but
  //is not particularly dependant on security or social aspects. For now, when
  //a user is logged in some features are unlocked, but no encryption has been added.
  const { user } = useAuth0();
  const { userState } = useContext(SiteContext)

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
            <Route path='/details/:country/:type/:imdbID' element={<Details />} />
          </Routes>
        </LayoutWrapper>
  </Router>
  );
}


const LayoutWrapper = styled.div``;

export default App;
