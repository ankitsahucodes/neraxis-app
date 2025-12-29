import { createContext, useContext, useEffect, useState } from "react";
const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);
export default useLeadContext;

export function LeadProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [salesAgents, setSalesAgent] = useState([]);
  const [quickFilter, setQuickFilter] = useState("All");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [prioritySort, setPrioritySort] = useState("");
  const [timeSort, setTimeSort] = useState("");

  let filtered = data.filter((lead) => {
    if (status && lead.status !== status) return false;
    if (agentFilter && lead.salesAgent?.name !== agentFilter) return false;

    return true;
  });

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  if (prioritySort === "high-low") {
    filtered.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  if (prioritySort === "low-high") {
    filtered.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  if (timeSort === "high-low") {
    filtered = [...filtered].sort((a, b) => a.timeToClose - b.timeToClose);
  }

  if (timeSort === "low-high") {
    filtered = [...filtered].sort((a, b) => b.timeToClose - a.timeToClose);
  }

  function handleLeadStatus(e) {
    setStatus(e.target.value);
  }

  function handleAgentFilter(e) {
    setAgentFilter(e.target.value);
  }

  function handleLeadPriority(e) {
    setPrioritySort(e.target.value);
  }

  function handleLeadCloseTime(e) {
    setTimeSort(e.target.value);
  }

  function handleClearFilter() {
    setStatus("");
    setAgentFilter("");
    setPrioritySort("");
    setTimeSort("");
  }

   function handleLeadClearFilter() {
    setStatus("");
    setTimeSort("");
  }

  async function fetchSalesAgent() {
    try {
      const res = await fetch("https://neraxis-crm-backend.vercel.app/agents");
      const agentsData = await res.json();
      setSalesAgent(agentsData);
    } catch (error) {
      console.log("Failed to load Agents:", error);
    }
  }

  async function fetchLeads() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://neraxis-crm-backend.vercel.app/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      const leadsData = await res.json();
      setData(leadsData);
    } catch (error) {
      console.log("Failed to load Leads:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
    fetchSalesAgent();
  }, []);

  function countLeadsByStatus(leadStatus) {
    return data?.filter((lead) => lead.status === leadStatus).length;
  }

  const filteredLeads = data?.filter((lead) => {
    if (quickFilter === "All") return true;
    return lead.status === quickFilter;
  });

  const statusArray = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  return (
    <LeadContext.Provider
      value={{
        data,
        fetchLeads,
        fetchSalesAgent,
        loading,
        error,
        salesAgents,
        countLeadsByStatus,
        quickFilter,
        setQuickFilter,
        filteredLeads,
        statusArray,
        filtered,
        status,
        handleLeadStatus,
        handleClearFilter,
        handleLeadClearFilter,
        agentFilter,
        setAgentFilter,
        setStatus,
        setPrioritySort,
        setTimeSort,
        handleAgentFilter,
        priorityOrder,
        prioritySort,
        handleLeadPriority,
        timeSort,
        handleLeadCloseTime,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
