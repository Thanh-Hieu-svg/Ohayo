import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRootRedirect = () => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user && user.role === "admin") {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  return null;
};
