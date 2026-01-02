import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="btn btn-dark d-md-none m-2"
        onClick={() => setShow(!show)}
      >
        {show ? "Close Menu" : "Menu"}
      </button>

      {/* Mobile Sidebar */}
      {show && (
        <div className="col-12 d-md-none shadow-sm p-3 mb-3 bg-body rounded">
          <Link to="/leads" className="btn btn-outline-dark w-100 mb-2">
            Leads
          </Link>

           <Link to="/sales" className="btn btn-outline-dark w-100 mb-2">
            Sales
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
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="col-2 d-none d-md-block mt-3">
        <div className="border p-2">
          <Link to="/leads" className="btn btn-outline-dark w-100 mb-2">
            Leads
          </Link>

          <Link to="/sales" className="btn btn-outline-dark w-100 mb-2">
            Sales
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
        </div>
      </div>
    </>
  );
}
