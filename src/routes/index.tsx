import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ReactNode } from "react";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Supplier from "../pages/Supplier";
import CreateSupplier from "../pages/Supplier/CreateSupplier";
import EditSupplier from "../pages/Supplier/EditSupplier";
import Category from "../pages/Category";

interface Props {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem("token") !== null;
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
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
      <Route
        path="/supplier"
        element={
          <ProtectedRoute>
            <Supplier />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplier/create"
        element={
          <ProtectedRoute>
            <CreateSupplier />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supplier/:id"
        element={
          <ProtectedRoute>
            <EditSupplier />
          </ProtectedRoute>
        }
      />
       <Route
        path="/category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouteApp;
