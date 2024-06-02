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
import OrdersAdminTable from "./pages/admin/orders/OrdersAdminTable";
import ChangePrice from "./pages/admin/ChangePriceDropdown";
import Footer from "./pages/footer/Footer";
import { VariableContext } from "./context/VariableContext";
import BootStrapToast from "./components/BootStrapToast";
import Toast from "./components/Toast";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/loginPage/Login";
import Register from "./pages/loginPage/Register";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import ResetPassword from "./pages/forgetpassword/ResetPassword";
import UsersData from "./pages/admin/users/UsersData";

function App() {
  document.documentElement.classList.add("dark");
  const { show, setShow, admin1, admin2, admin3, user, isLoggedIn } =
    useContext(VariableContext);
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      {!isLoading && (
        <>
          <NavBar />

          <Toast />

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
              path="/forgetpassword"
              element={<>{!isLoggedIn ? <ForgetPassword /> : <HomePage />}</>}
            ></Route>

            <Route
              path="/reset_password/:id/:token"
              element={<>{!isLoggedIn ? <ResetPassword /> : <HomePage />}</>}
            ></Route>

            <Route
              path="/login"
              element={<>{!isLoggedIn ? <Login /> : <HomePage />}</>}
            ></Route>
            <Route
              path="/register"
              element={
                <>
                  <Register />
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
              path="/home"
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
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <AdminPage />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <OrdersAdminTable />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>

            <Route
              path="/admin/price"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <ChangePrice />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>
            <Route
              path="/admin/usersdata"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <UsersData />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>
          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
