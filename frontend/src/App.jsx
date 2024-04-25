import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test/Test";
import NavBar from "./pages/navbar/NavBar";
import HomePage from "./pages/homepage/HomePage";
import ProductPage from "./pages/product/ProductPage";

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
              <ProductPage/>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
