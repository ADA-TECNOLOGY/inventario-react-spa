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
import Customer from "../pages/Customer";
import CreateCustomer from "../pages/Customer/CreateCustomer";
import EditCustomer from "../pages/Customer/EditCustomer";
import ValidateCode from "../pages/auth/ValidateCode";
import { jwtDecode } from "jwt-decode";
import Products from "../pages/Product";
import CreateProduct from "../pages/Product/CreateProduct";
import Position from "../pages/Positions";
import CreatePosition from "../pages/Positions/CreatePosition";
import EditPosition from "../pages/Positions/EditPosition";
import Employee from "../pages/Employee";
import CreateEmployee from "../pages/Employee/CreateEmployee";
interface Props {
  children?: ReactNode;
}

interface TokenPayload {
  exp: number;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decodedToken = jwtDecode<TokenPayload>(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

const RedirectIfAuthenticated = ({ children }: Props) => {
  const isAuth = localStorage.getItem("token") !== null;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const RouteApp = () => {
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <RedirectIfAuthenticated>
            <SignIn />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/validatecode" element={<ValidateCode />} />

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
      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/create"
        element={
          <ProtectedRoute>
            <CreateCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/:id"
        element={
          <ProtectedRoute>
            <EditCustomer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/create"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/position"
        element={
          <ProtectedRoute>
            <Position />
          </ProtectedRoute>
        }
      />

      <Route
        path="/position/create"
        element={
          <ProtectedRoute>
            <CreatePosition />
          </ProtectedRoute>
        }
      />

    <Route
        path="/position/edit/:id"
        element={
          <ProtectedRoute>
            <EditPosition />
          </ProtectedRoute>
        }
      />
       <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
       <Route
        path="/employee/create"
        element={
          <ProtectedRoute>
            <CreateEmployee />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouteApp;
