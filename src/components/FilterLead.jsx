import useLeadContext from "../context/LeadContext";

const FilterLead = ({
  showAgent = true,
  showPriority = true,
  clearOne = true,
}) => {
  const {
    statusArray,
    salesAgents,
    status,
    agentFilter,
    handleLeadStatus,
    handleAgentFilter,
    handleClearFilter,
    prioritySort,
    handleLeadPriority,
    timeSort,
    handleLeadCloseTime,
    handleLeadClearFilter,
  } = useLeadContext();

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Filter & Sorting:</h4>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={clearOne ? handleClearFilter : handleLeadClearFilter}
          >
            Clear
          </button>
        </div>

        <div className="row gap-2 py-3 justify-content-between">
          <h5 className="col">Filters:</h5>
          <div className="col-12 col-md-4">
            {showAgent && (
              <select
                name="salesAgent"
                className="form-select"
                value={agentFilter}
                onChange={handleAgentFilter}
              >
                <option value="" disabled>
                  --Select Agent--
                </option>
                {salesAgents?.length > 0 &&
                  salesAgents.map((agent) => {
                    return (
                      <option key={agent._id} value={agent.name}>
                        {agent.name}
                      </option>
                    );
                  })}
              </select>
            )}
          </div>
          <div className="col-12 col-md-4">
            <select
              name="filterByStatus"
              className="form-select"
              value={status}
              onChange={handleLeadStatus}
            >
              <option value="" disabled>
                --Select Status--
              </option>
              {statusArray.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row gap-2 py-3 justify-content-between">
          <h5 className="col">Sorting:</h5>
          <div className="col-12 col-md-4">
            {showPriority && (
              <select
                name="sortByPriority"
                className="form-select"
                value={prioritySort}
                onChange={handleLeadPriority}
              >
                <option value="" disabled>
                  --Sort By Priority--
                </option>
                <option value="high-low">High To Low</option>
                <option value="low-high">Low To High</option>
              </select>
            )}
          </div>

          <div className="col-12 col-md-4">
            <select
              name="sortByTimeToClose"
              className="form-select"
              value={timeSort}
              onChange={handleLeadCloseTime}
            >
              <option value="" disabled>
                --Sort By Time to CLose--
              </option>
              <option value="high-low">Lowest To Highest</option>
              <option value="low-high">Highest To Lowest</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterLead;
