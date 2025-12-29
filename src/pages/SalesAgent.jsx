import { Link } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import Backbtn from "../components/BackBtn";

const SalesAgent = () => {
  const { salesAgents } = useLeadContext();

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        Sales Agent Management
      </h1>

      <div className="container">
        <div className="row mt-4">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <div className="border border-1">
              <div className="border border-2 m-2">
                <h2 className="text-center py-2 fw-bold">Sales Agent List</h2>
              </div>
              <div className="container">
                <ul className="list-group mb-2">
                  {salesAgents?.map((agent, index) => (
                    <li
                      className="d-flex flex-column flex-md-row justify-content-between py-4 list-group-item"
                      key={agent._id}
                    >
                      <p className="ms-md-5 mb-1 mb-md-0">
                        <strong>Agent: </strong> {index + 1}
                      </p>
                      <p className="mb-1 mb-md-0">
                        <Link to={`/agents/${agent._id}`}>{agent.name}</Link>
                      </p>
                      <Link to={`/agents/${agent._id}`} className="me-5">
                        {agent.email}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="text-start">
                    <Link
                      className="btn btn-primary m-2 px-5"
                      to="/agents/add-agent"
                    >
                      Add New Agent
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAgent;
