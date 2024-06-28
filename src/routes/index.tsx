import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ReactNode } from "react";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";

interface Props {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem("token") != undefined;
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};


const RouteApp = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouteApp;
