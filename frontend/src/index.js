import React from 'react';
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const {AUTHO_DOMAIN, CLIENT_ID} = process.env;


root.render(  
  <Auth0Provider domain={AUTHO_DOMAIN} clientId={CLIENT_ID} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
);