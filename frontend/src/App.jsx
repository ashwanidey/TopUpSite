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
import DeleteUser from "./pages/admin/deleteUser/DeleteUser";
import AllTxn from "./pages/admin/allTransactions/AllTxn";
import PrivacyPage from "./pages/footer/pages/PrivacyPage";
import RefundPolicy from "./pages/footer/pages/RefundPolicy";
import TnC from "./pages/footer/pages/TnC";
import Verification from "./pages/verification/Verification";
import CheckVerification from "./pages/verification/CheckVerification";
import EditUserRole from "./pages/admin/editUser/EditUser"; // Import EditUserRole component
import Wallet from "./pages/wallet/Wallet";
import TopUp from "./pages/wallet/TopUp";
import WalletConfirmation from "./pages/confirmationPage/WalletConfirmation";
import BalanceErr from "./pages/wallet/BalanceErr";
import RedeemPoints from "./pages/wallet/RedeemPoints";
import OtpLogin from "./pages/loginPage/OtpLogin";
import OtpVerify from "./pages/loginPage/OtpVerify";

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
              path="/otplogin"
              element={
                <>
                  <OtpLogin />
                </>
              }
            ></Route>

<Route
              path="/otpverify/:mobile"
              element={
                <>
                  <OtpVerify />
                </>
              }
            ></Route>
           
            <Route
              path="/balanceerror"
              element={
                <>
                  <BalanceErr />
                </>
              }
            ></Route>
            <Route
              path="/redeem"
              element={
                <>
                  <RedeemPoints />
                </>
              }
            ></Route>

            <Route
              path="/walletconfirmation"
              element={
                <>
                  <WalletConfirmation />
                </>
              }
            ></Route>
            <Route
              path="/wallet"
              element={
                <>
                  <Wallet />
                </>
              }
            ></Route>
            <Route
              path="/topup"
              element={
                <>
                  <TopUp />
                </>
              }
            ></Route>

            <Route
              path="/forgetpassword"
              element={<>{!isLoggedIn ? <ForgetPassword /> : <HomePage />}</>}
            ></Route>
            <Route
              path="/checkverification"
              element={
                <>{!isLoggedIn ? <CheckVerification /> : <HomePage />}</>
              }
            ></Route>

            <Route
              path="/reset_password/:id/:token"
              element={<>{!isLoggedIn ? <ResetPassword /> : <HomePage />}</>}
            ></Route>

            <Route
              path="/verification/:id/:token"
              element={<>{!isLoggedIn ? <Verification /> : <HomePage />}</>}
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
              path="/privacypage"
              element={
                <>
                  <PrivacyPage />
                </>
              }
            ></Route>
            <Route
              path="/refund-policy"
              element={
                <>
                  <RefundPolicy />
                </>
              }
            ></Route>
            <Route
              path="/terms-and-condition"
              element={
                <>
                  <TnC />
                </>
              }
            ></Route>
            <Route
              path="/product/:productId/:id"
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

            <Route
              path="/admin/deleteuser"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <DeleteUser />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>

            <Route
              path="/admin/txn"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <AllTxn />
                  ) : (
                    <Dashboard />
                  )}
                </>
              }
            ></Route>

            <Route
              path="/admin/edituser"
              element={
                <>
                  {" "}
                  {isLoggedIn && user?.role === "admin" ? (
                    <EditUserRole />
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
