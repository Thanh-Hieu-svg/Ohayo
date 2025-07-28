import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

export const CartRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, showToast: "cart" }}
      />
    );
  }
  return children;
};
