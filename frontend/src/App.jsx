import { useContext, useState } from "react";
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
import { VariableContext } from "./context/VariableContext";
import BootStrapToast from "./components/BootStrapToast";
import Toast from "./components/Toast";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  document.documentElement.classList.add("dark");
  const {show,setShow,admin1,admin2,admin3} = useContext(VariableContext)
  const {user,isLoading,isAuthenticated} = useAuth0();

  return (
    <>
    {!isLoading && 
    <>
      <NavBar />
      
      <Toast/>

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
            <> {isAuthenticated && (user.sub === admin1 || user.sub === admin2 || user.sub === admin3) ?  <AdminPage /> : <Dashboard/>}
             
            </>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <> {isAuthenticated && (user.sub === admin1 || user.sub === admin2 || user.sub === admin3) ?  <OrdersAdminTable/> : <Dashboard/>}
             
            </>
          }
        ></Route>
        <Route
          path="/admin/price"
          element={
            <> {isAuthenticated && (user.sub === admin1 || user.sub === admin2 || user.sub === admin3) ?  <ChangePrice /> : <Dashboard/>}
             
            </>
          }
        ></Route>
      </Routes>

      <Footer/>
      </>
        }
    </>
  );
}

export default App;
