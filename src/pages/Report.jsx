import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import useLeadContext from "../context/LeadContext";
import Backbtn from "../components/BackBtn";

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  const { statusArray, data } = useLeadContext();
  const [leadsInPipeLine, setLeadsInPipeLine] = useState("");
  const [closedInPipeline, setClosedInPipeline] = useState("");
  const [weekData, setWeekData] = useState("");
  const [salesAgentData, setSalesAgentData] = useState([]);

  async function fetchWeekData() {
    const res = await fetch("https://neraxis-crm-backend.vercel.app/report/last-week");
    const json = await res.json();
    setWeekData(json.totalClosedLastWeek);
  }

  async function fetchAgentData() {
    const res = await fetch("https://neraxis-crm-backend.vercel.app/report/closed-by-agent");
    const json = await res.json();
    setSalesAgentData(json);
  }

  const labels = salesAgentData.map((item) => item.agentName);
  const values = salesAgentData.map((item) => item.count);

  async function fetchLeadsFromPipeline() {
    try {
      const res = await fetch("https://neraxis-crm-backend.vercel.app/report/pipeline");
      const piplineData = await res.json();
      setLeadsInPipeLine(piplineData);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function fetchClosedLeadsFromPipeline() {
    try {
      const res = await fetch("https://neraxis-crm-backend.vercel.app/report/pipeline/closed");
      const closedData = await res.json();
      setClosedInPipeline(closedData);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    fetchClosedLeadsFromPipeline();
    fetchWeekData();
    fetchAgentData();
    fetchLeadsFromPipeline();
  }, []);

  const totalLeads = leadsInPipeLine?.totalLeadsInPipeline || 0;
  const closedLeads = closedInPipeline?.totalClosedInPipeline || 0;

  const countLeadsByStatus = () => {
    let counts = [0, 0, 0, 0, 0];

    data.forEach((lead) => {
      if (lead.status === "New") counts[0]++;
      if (lead.status === "Contacted") counts[1]++;
      if (lead.status === "Qualified") counts[2]++;
      if (lead.status === "Proposal Sent") counts[3]++;
      if (lead.status === "Closed") counts[4]++;
    });

    return counts;
  };

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">Reports</h1>

      <div className="container">
        <div className="row my-4">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <div className="border border-1">
              <div className="border border-2 m-2">
                <h2 className="text-center py-2">Report Overview</h2>
              </div>

              <div className="py-4 container">
                <div className="text-center">
                  <h3>Total Leads closed and in Pipeline:</h3>

                  <div
                    style={{
                      maxWidth: "400px",
                      height: "300px",
                      margin: "auto",
                    }}
                  >
                    <Pie
                      data={{
                        labels: ["Total Leads", "Closed Leads"],
                        datasets: [
                          {
                            data: [totalLeads, closedLeads],
                            backgroundColor: ["#3672eb99", "#20e8e1b4"],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
                <hr />

                <div>
                  <h3 className="text-center">Leads Closed (Last 7 Days)</h3>

                  <div
                    style={{
                      maxWidth: "400px",
                      height: "300px",
                      margin: "auto",
                    }}
                  >
                    <Bar
                      data={{
                        labels: ["Last 7 Days"],
                        datasets: [
                          {
                            label: "Leads Closed",
                            data: [weekData],
                            backgroundColor: "#36a2eb99",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
                <hr />

                <div className="text-center">
                  <h3>Leads Closed by Sales Agent:</h3>
                  <div
                    style={{
                      height: "350px",
                      maxWidth: "700px",
                      margin: "auto",
                    }}
                  >
                    <Bar
                      data={{
                        labels,
                        datasets: [
                          {
                            label: "Closed Leads",
                            data: values,
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
                <hr />

                <div className="py-4 text-center">
                  <h3 className="py-3">Leads By Status</h3>
                  <div
                    style={{
                      maxWidth: "400px",
                      height: "300px",
                      margin: "auto",
                    }}
                  >
                    <Doughnut
                      data={{
                        labels: [
                          "New",
                          "Contacted",
                          "Qualified",
                          "Proposal Sent",
                          "Closed",
                        ],
                        datasets: [
                          {
                            label: "No. of Leads",
                            data: countLeadsByStatus(statusArray),

                            backgroundColor: [
                              "rgba(255, 99, 132, 0.2)",
                              "rgba(54, 162, 235, 0.2)",
                              "rgba(255, 206, 86, 0.2)",
                              "rgba(75, 192, 192, 0.2)",
                              "rgba(153, 102, 255, 0.2)",
                              "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                              "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
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

export default Report;
