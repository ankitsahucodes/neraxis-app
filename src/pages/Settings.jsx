import { useState } from "react";
import { Link } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import { toast } from "react-toastify";
import Backbtn from "../components/BackBtn";
import axios from "axios";

const Settings = () => {
  const [settingsData, setSettingsData] = useState("Leads");
  const { data, salesAgents, fetchLeads, fetchSalesAgent, loading } =
    useLeadContext();

  async function handledeleteLead(leadId) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/leads/${leadId}`,
        {
          withCredentials: true,
        },
      );

      await fetchLeads();
      toast.success("Lead Deleted!");
    } catch (error) {
      console.error("Lead delete error:", error);
      toast.error(error.response?.data?.error || "Failed to delete lead");
    }
  }

  async function handledeleteAgent(agentId) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/agents/${agentId}`,
        {
          withCredentials: true,
        },
      );

      await fetchSalesAgent();
      await fetchLeads();

      toast.success("Sales Agent Deleted!");
    } catch (error) {
      console.error("Agent delete error:", error);
      toast.error(error.response?.data?.error || "Failed to delete agent");
    }
  }

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">Settings</h1>

      <div className="container">
        <div className="row">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <div>
              <button
                onClick={() => setSettingsData("Leads")}
                className={`btn m-2 ${
                  settingsData === "Leads" ? "btn-primary" : "btn-secondary"
                }`}
              >
                Manage Leads
              </button>

              <button
                onClick={() => setSettingsData("Agents")}
                className={`btn m-2 ${
                  settingsData === "Agents" ? "btn-primary" : "btn-secondary"
                }`}
              >
                Manage Sales Agents
              </button>
            </div>

            <div className="mt-3">
              {loading && <p>Loading...</p>}
              {settingsData === "Leads"
                ? data.length > 0
                  ? data?.map((lead, index) => (
                      <ul key={lead._id} className="list-group">
                        <li className="list-group-item py-3">
                          <div className="row align-items-center g-3">
                            <div className="col-12 col-md-5">
                              <strong>Lead {index + 1}: </strong>
                              {lead.name}
                            </div>

                            <div className="col-12 col-md-4">
                              <strong>Status: </strong>
                              {lead.status}
                            </div>

                            <div className="col-12 col-md-3 text-md-end">
                              <button
                                className="btn btn-danger w-100 w-md-auto"
                                onClick={() => handledeleteLead(lead._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))
                  : !loading && <p>No Lead Found</p>
                : salesAgents.length > 0
                  ? salesAgents.map((agent, index) => (
                      <ul key={agent._id} className="list-group">
                        <li className="list-group-item py-3">
                          <div className="row align-items-center g-3">
                            <div className="col-12 col-md-9">
                              <strong>Agent {index + 1}: </strong>
                              {agent.name}
                            </div>

                            <div className="col-12 col-md-3 text-md-end">
                              <button
                                className="btn btn-danger w-100"
                                onClick={() => handledeleteAgent(agent._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))
                  : !loading && <p>No Agent Found.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
