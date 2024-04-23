import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import env from "react-dotenv";
import { Auth0Provider } from '@auth0/auth0-react';



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain= {import.meta.env.VITE_REACT_DOMAIN}
      clientId={import.meta.env.VITE_REACT_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
