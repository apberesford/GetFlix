import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";

// import {SiteContext} from './ContextProvider';
import Login from './login';
import Sidebar from './sidebar';
import Searchbar from './searchbar'

const App = () => {
  return (
    <Router>
    {/* <SiteContext> */}
    <LayoutWrapper>
      <Sidebar />
      <Login />
      <Routes>
        <Route path="/" element={<Searchbar />} />
      </Routes>
    </LayoutWrapper>
    {/* </SiteContext> */}
  </Router>
  );
}


const LayoutWrapper = styled.div`
`;
export default App;
