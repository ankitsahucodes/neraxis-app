import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };
  

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#fff5f5",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "430px",
          width: "100%",
          borderRadius: "18px",
        }}
      >
        <div className="card-body text-center p-5">
          <img
            src="/n.png"
            alt="Neraxis CRM"
            width="80"
            className="mb-3"
          />

          <h2 className="fw-bold mb-2">Neraxis CRM</h2>

          <p className="text-muted mb-4">
            Manage your leads, sales agents, and pipeline efficiently.
          </p>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          <hr className="my-4" />

          <small className="text-secondary">
            Secure login using your Google account.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;