import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test/Test";
import NavBar from "./pages/navbar/NavBar";
import HomePage from "./pages/homepage/HomePage";
import ProductPage from "./pages/product/ProductPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Confirmation from "./pages/confirmationPage/Confirmation";

function App() {
  document.documentElement.classList.add("dark");

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/test"
          element={
            <>
              <Test />
            </>
          }
        ></Route>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        ></Route>
        <Route
          path="/product/:productId"
          element={
            <>
              <ProductPage />
            </>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        ></Route>

<Route
          path="/confirmation"
          element={
            <>
              <Confirmation />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
