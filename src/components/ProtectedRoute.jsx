import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            withCredentials: true,
          },
        );

        setAuthenticated(true);

        toast.success(`Welcome, ${res.data.user.name}!`, {
          toastId: "login-success",
        });
      } catch (error) {
        setAuthenticated(false);

        toast.error("Please log in to access this page");
        console.log(error);
      }
    };

    verifyUser();
  }, []);

  if (authenticated === null) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border text-danger mb-3" role="status"></div>
        <h5 className="text-secondary">Checking authentication...</h5>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
