import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

import App from "./App";
import Login from "./pages/Login";
import AddLeadForm from "./components/AddLeadForm";
import SalesAgent from "./pages/SalesAgent";
import AddSalesAgent from "./pages/AddSalesAgent";
import LeadsList from "./pages/LeadsList";
import LeadDetails from "./pages/LeadDetails";
import Settings from "./pages/Settings";
import AgentLeads from "./pages/AgentLeads";
import Report from "./pages/Report";
import LeadManagement from "./pages/LeadManagement";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
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
            path: "/lead-management",
            element: <LeadManagement />,
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
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={1500}
      theme="dark"
    />
    <RouterProvider router={router} />
  </StrictMode>
);