import { Link } from "react-router-dom";
import useLeadContext from "../context/LeadContext";

const Homepage = () => {
  const {
    countLeadsByStatus,
    loading,
    error,
    filteredLeads,
    quickFilter,
    setQuickFilter,
    statusArray,
  } = useLeadContext();

  return (
    <>
      <div className="border border-1 container mb-4">
        <h2 className="text-center mt-2 fw-bold">Overview</h2>
        <hr />
        <div className="row py-2">
          {loading && <p>Loading...</p>}
          {error && <p className="display-5">Error: {error}</p>}
          {filteredLeads?.length >= 1
            ? filteredLeads?.map((lead) => (
                <div
                  key={lead._id}
                  className="col-12 col-sm-6 col-md-4 text-center py-2"
                >
                  <Link
                    to={`/leads/${lead._id}`}
                    className="btn btn-outline-secondary fs-6 fs-md-4 w-100 py-2"
                  >
                    {lead.name}
                  </Link>
                </div>
              ))
            : !loading && (
                <p className="fs-5 fw-semibold text-danger">
                  No leads available for the selected filter.
                </p>
              )}
        </div>

        <hr />
        <div className="my-4">
          <h3 className="fw-bold">Lead Status:</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            statusArray?.map((lead) => (
              <p key={lead}>
                - <strong>{lead}:</strong> {countLeadsByStatus(lead)}{" "}
                {countLeadsByStatus(lead) > 1 ? "Leads" : "Lead"}
              </p>
            ))
          )}
        </div>

        <hr />
        <div>
          <h4 className="fw-bold">Quick Filters:</h4>
          <div className="my-3">
            <button
              onClick={() => setQuickFilter("All")}
              className={`btn m-2 ${
                quickFilter === "All" ? "btn-primary" : "btn-secondary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setQuickFilter("New")}
              className={`btn m-2 ${
                quickFilter === "New" ? "btn-primary" : "btn-secondary"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setQuickFilter("Contacted")}
              className={`btn m-2 ${
                quickFilter === "Contacted" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => setQuickFilter("Qualified")}
              className={`btn m-2 ${
                quickFilter === "Qualified" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Qualified
            </button>
            <button
              onClick={() => setQuickFilter("Proposal Sent")}
              className={`btn m-2 ${
                quickFilter === "Proposal Sent"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              Proposal Sent
            </button>
            <button
              onClick={() => setQuickFilter("Closed")}
              className={`btn m-2 ${
                quickFilter === "Closed" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Closed
            </button>
          </div>
          <Link to="/leads/add-lead" className="btn btn-primary m-2 mb-3">
            Add New Lead
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;
