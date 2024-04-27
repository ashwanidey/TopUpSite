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
import AdminPage from "./pages/admin/AdminPage";
import OrdersAdminTable from "./pages/admin/OrdersAdminTable";
import ChangePrice from "./pages/admin/ChangePriceDropdown";
import Footer from "./pages/footer/Footer";

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
        <Route
          path="/admin"
          element={
            <>
              <AdminPage />
            </>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <>
              <OrdersAdminTable />
            </>
          }
        ></Route>
        <Route
          path="/admin/price"
          element={
            <>
              <ChangePrice />
            </>
          }
        ></Route>
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
