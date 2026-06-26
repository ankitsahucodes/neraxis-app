import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  return (
    <>
      <div className="container d-md-none mt-3">
        <button className="btn btn-dark w-100" onClick={() => setShow(!show)}>
          {show ? "Close Menu" : "Menu"}
        </button>

        {show && (
          <div className="border rounded p-2 mt-2">
            <Link
              to="/leads"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShow(false)}
            >
              Leads
            </Link>

            <Link
              to="/lead-management"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShow(false)}
            >
              Lead Management
            </Link>

            <Link
              to="/salesAgents"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShow(false)}
            >
              Sales Agents
            </Link>

            <Link
              to="/report"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShow(false)}
            >
              Reports
            </Link>

            <Link
              to="/settings"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShow(false)}
            >
              Settings
            </Link>

            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="col-2 d-none d-md-block mt-3">
        <div className="border p-2">
          <Link to="/leads" className="btn btn-outline-dark w-100 mb-2">
            Leads
          </Link>

          <Link
            to="/lead-management"
            className="btn btn-outline-dark w-100 mb-2"
          >
            Lead Management
          </Link>

          <Link to="/salesAgents" className="btn btn-outline-dark w-100 mb-2">
            Sales Agents
          </Link>

          <Link to="/report" className="btn btn-outline-dark w-100 mb-2">
            Reports
          </Link>

          <Link to="/settings" className="btn btn-outline-dark w-100 mb-2">
            Settings
          </Link>

          <button
            className="btn btn-outline-danger w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
