import { Link, useParams } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import AddComment from "../components/AddComment";
import Backbtn from "../components/BackBtn";

const LeadDetails = () => {
  const { data, loading } = useLeadContext();

  const { id } = useParams();
  const lead = data?.find((lead) => lead._id === String(id));

  return (
    <>
      <div className="mb-3">
        <h1 className="text-center border border-4 py-3 fw-bold">
          Lead Management:{" "}
          <span className="fw-semibold text-secondary-emphasis">
            {lead?.name}
          </span>
        </h1>

        <div className="container">
          <div className="row mt-4">
            <Backbtn />

            <div className="col-12 col-md-10 mx-auto">
              {loading && <p>Loading...</p>}
              {!loading && !lead && <p>No Lead Found</p>}

              {lead && (
                <div className="border border-1">
                  <div className="border border-2 m-2">
                    <h2 className="text-center py-2 ">Lead Details</h2>
                  </div>

                  <div className="container">
                    <ul className="list-group py-3">
                      <li className="list-group-item ">
                        <strong>Lead Name: </strong> {lead.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Sales Agent: </strong>{" "}
                        {lead?.salesAgent?.name
                          ? lead.salesAgent.name
                          : "No Agent Assigned"}
                      </li>
                      <li className="list-group-item">
                        <strong>Lead Source: </strong> {lead.source}
                      </li>
                      <li className="list-group-item">
                        <strong>Lead Status: </strong> {lead.status}
                      </li>
                      <li className="list-group-item">
                        <strong>Priority: </strong> {lead.priority}
                      </li>
                      <li className="list-group-item">
                        <strong>Time to Close: </strong> {lead.timeToClose}{" "}
                        {lead.timeToClose !== 1 ? "Days" : "Day"}
                      </li>
                      <li className="list-group-item">
                        <strong>Tags: </strong> {lead.tags.join(", ")}
                      </li>
                    </ul>
                  </div>

                  <div className="text-end py-2">
                    <Link
                      className="btn btn-dark m-2 px-5 fw-bold"
                      to={`/leads/add-lead?edit=${lead._id}`}
                    >
                      Edit Lead Details
                    </Link>
                  </div>

                  <div className="container mb-4">
                    <AddComment />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
