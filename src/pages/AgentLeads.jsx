import useLeadContext from "../context/LeadContext";
import { Link, useParams } from "react-router-dom";
import FilterLead from "../components/FilterLead";
import { useEffect } from "react";
import Backbtn from "../components/BackBtn";

const AgentLeads = () => {
  const {
    salesAgents,
    loading,
    filtered,
    setAgentFilter,
    setStatus,
    setPrioritySort,
    setTimeSort,
  } = useLeadContext();
  const { id } = useParams();

  const agentName = salesAgents?.find((agent) => agent._id === String(id));

  useEffect(() => {
    const agent = salesAgents?.find((a) => a._id === id);
    if (agent) {
      setAgentFilter(agent.name);
    }
  }, [id, salesAgents, setAgentFilter]);

  useEffect(() => {
    return () => {
      setAgentFilter("");
      setStatus("");
      setPrioritySort("");
      setTimeSort("");
    };
  }, [setAgentFilter, setStatus, setPrioritySort, setTimeSort]);

  const leads = filtered;

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        Leads By Sales Agent
      </h1>

      <div className="container">
        <div className="row mt-4">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <div className="border border-1">
              <div className="border border-2 m-2">
                <h2 className="text-center py-2">Lead List By Agent</h2>
              </div>

              <div className="py-3 container">
                <h3 className="mb-3 fw-bold">
                  Sales Agent:{" "}
                  <span className="fw-bold text-primary-emphasis">
                    {agentName?.name}
                  </span>
                </h3>
                <FilterLead
                  showAgent={false}
                  showPriority={false}
                  clearOne={false}
                />
                <hr />
                <ul className="list-group ">
                  {loading && <p>Loading...</p>}
                  {leads?.length > 0
                    ? leads?.map((lead, index) => (
                        <li
                          className="d-flex flex-column flex-md-row justify-content-between py-2 list-group-item"
                          key={lead._id}
                        >
                          <p className="col">
                            <strong>Lead: </strong> {index + 1}
                          </p>
                          <p className="col">
                            <Link to={`/leads/${lead._id}`}>{lead?.name}</Link>
                          </p>
                          <p className="col">{lead?.status}</p>
                          <p className="col">{lead?.salesAgent?.name}</p>
                        </li>
                      ))
                    : !loading && (
                        <p className="fs-5 fw-semibold text-danger">
                          No leads available for the selected filter.
                        </p>
                      )}
                </ul>
              </div>
              <div className="text-start">
                <Link to="/leads/add-lead" className="btn btn-primary m-2 mb-3">
                  Add New Lead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentLeads;
