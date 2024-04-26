import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import env from "react-dotenv";
import { Auth0Provider } from '@auth0/auth0-react';
import 'flowbite';
import { VariableProvider } from "./context/VariableContext";
import {isSafari, isFirefox } from 'react-device-detect'

const isBrave = async()=> {
  return (navigator.brave && await navigator.brave.isBrave() || false)
}
let useRefreshTokens = isSafari || isFirefox || isBrave ? true : false


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <VariableProvider>
    <Auth0Provider
      domain= {import.meta.env.VITE_REACT_DOMAIN}
      clientId={import.meta.env.VITE_REACT_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience:'This is a unique identifier',
      scope :"openid profile email update:price"
      }}
      useRefreshTokens={useRefreshTokens}
      cacheLocation={useRefreshTokens ? 'localstorage' : 'memory'}
      
    >
      <App />
    </Auth0Provider>
    </VariableProvider>
  </BrowserRouter>
);
