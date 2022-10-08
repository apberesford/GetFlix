import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #36393E;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: whitesmoke;

  }
  input, option, select, input, option {
    background-color: #F4F4F4;
  }
`;


export default GlobalStyle;