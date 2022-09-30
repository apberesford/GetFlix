import React from 'react';
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from './App';
import { UserContext } from './context';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(  
  <UserContext>
  <Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_CLIENT_ID} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  </UserContext>
);