import { Link } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import FilterLead from "../components/FilterLead";
import Backbtn from "../components/BackBtn";

const LeadManagement = () => {
  const { filtered, loading } = useLeadContext();

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        Lead Management
      </h1>

      <div className="container">
        <div className="row mt-4">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <div className="border border-1 mb-3">
              <div className="border border-2 m-2">
                <h2 className="text-center py-2">Filter Leads</h2>
              </div>

              <div className="py-3 container">
                <FilterLead />
                <hr />
                <ul className="list-group ">
                  {loading && <p>Loading...</p>}
                  {filtered?.length > 0
                    ? filtered?.map((lead, index) => (
                        <li className="list-group-item py-3" key={lead?._id}>
                          <div className="row align-items-center g-2">
                            <div className="col-12 col-md-2">
                              <strong>Lead {index + 1}</strong>
                            </div>

                            <div className="col-12 col-md-3">{lead?.name}</div>

                            <div className="col-6 col-md-2">
                              <span className="fw-semibold">Status:</span>{" "}
                              {lead?.status}
                            </div>

                            <div className="col-6 col-md-2">
                              <span className="fw-semibold">Close:</span>{" "}
                              {lead?.timeToClose}{" "}
                              {lead?.timeToClose > 1 ? "Days" : "Day"}
                            </div>

                            <div className="col-12 col-md-3">
                              <span className="fw-semibold">Agent:</span>{" "}
                              {lead?.salesAgent?.name}
                            </div>
                          </div>
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

export default LeadManagement;
