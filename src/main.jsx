import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { LeadProvider } from "./context/LeadContext.jsx";
import AddLeadForm from "./components/AddLeadForm.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SalesAgent from "./pages/SalesAgent.jsx";
import AddSalesAgent from "./pages/AddSalesAgent.jsx";
import LeadsList from "./pages/LeadsList.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import Settings from "./pages/Settings.jsx";
import AgentLeads from "./pages/AgentLeads.jsx";
import Report from "./pages/Report.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/leads/add-lead",
    element: <AddLeadForm />,
  },
  {
    path: "/salesAgents",
    element: <SalesAgent />,
  },
  {
    path: "/agents/add-agent",
    element: <AddSalesAgent />,
  },
  {
    path: "/leads",
    element: <LeadsList />,
  },
  {
    path: "/leads/:id",
    element: <LeadDetails />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/agents/:id",
    element: <AgentLeads />,
  },
  {
    path: "/report",
    element: <Report />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </LeadProvider>
  </StrictMode>
);
