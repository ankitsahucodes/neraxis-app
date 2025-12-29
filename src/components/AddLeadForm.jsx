import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import useLeadContext from "../context/LeadContext";
import Backbtn from "./BackBtn";
const AddLeadForm = () => {
  const { salesAgents, fetchLeads } = useLeadContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: 1,
    tags: [],
  });

  useEffect(() => {
    if (!editId) return;

    async function loadDetails() {
      try {
        const res = await fetch(`https://neraxis-crm-backend.vercel.app/leads/${editId}`);
        const leadData = await res.json();

        if (leadData) {
          setFormData({
            name: leadData.name,
            source: leadData.source,
            salesAgent: leadData.salesAgent,
            status: leadData.status,
            priority: leadData.priority,
            timeToClose: leadData.timeToClose,
            tags: leadData.tags.map((tag) => ({
              value: tag,
              label: tag,
            })),
          });
        }
      } catch (error) {
        console.log("Lead details load error:", error);
      }
    }

    loadDetails();
  }, [editId]);

  const tagOptions = [
    { value: "High Value", label: "High Value" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Hot Lead", label: "Hot Lead" },
    { value: "Cold Lead", label: "Cold Lead" },
    { value: "Urgent", label: "Urgent" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "timeToClose" ? (value === "" ? "" : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.map((tag) => tag.value),
    };

    const endPoint = editId
      ? `https://neraxis-crm-backend.vercel.app/leads/${editId}`
      : "https://neraxis-crm-backend.vercel.app/leads/";

    try {
      const response = await fetch(endPoint, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          editId ? "Lead Details updated!" : "Lead added Successfully!"
        );

        await fetchLeads();

        setTimeout(() => {
          navigate(-1);
        }, 1000);

        setFormData({
          name: "",
          source: "",
          salesAgent: "",
          status: "",
          priority: "",
          timeToClose: 1,
          tags: [],
        });
      } else {
        const err = await response.json();
        toast.error(err.error || "Enter valid inputs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        {editId ? "Update Lead Details" : "Add New Lead"}
      </h1>
      <div className="container">
        <div className="row mt-4">
          <Backbtn />

          <div className="col-12 col-md-10 mx-auto">
            <form
              className="border border-1 py-4 mb-2 container"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name" className="mb-2">
                Lead Name:
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Add Lead Name"
              />
              <br />
              <label htmlFor="source" className="mb-2">
                Lead Source:{" "}
              </label>
              <br />
              <select
                id="source"
                name="source"
                className="form-select"
                value={formData.source}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  --Select Lead Source--
                </option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
              <br />

              <label htmlFor="salesAgent" className="mb-2">
                Sales Agent:
              </label>
              <br />
              <select
                id="salesAgent"
                name="salesAgent"
                className="form-select"
                onChange={handleChange}
                value={formData.salesAgent}
              >
                <option value="" disabled>
                  --Select Agent--
                </option>
                {salesAgents?.length > 0 &&
                  salesAgents.map((agent) => {
                    return (
                      <option key={agent?._id} value={agent?._id}>
                        {agent?.name}
                      </option>
                    );
                  })}
              </select>
              <br />

              <label htmlFor="status" className="mb-2">
                Lead Status:{" "}
              </label>
              <br />
              <select
                id="status"
                name="status"
                className="form-select"
                onChange={handleChange}
                value={formData.status}
              >
                <option value="" disabled>
                  --Select Lead Status--
                </option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
              <br />

              <label htmlFor="priority" className="mb-2">
                Priority:{" "}
              </label>
              <br />
              <select
                id="priority"
                name="priority"
                className="form-select"
                onChange={handleChange}
                value={formData.priority}
              >
                <option value="" disabled>
                  --Select Priority--
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <br />

              <label htmlFor="timeToClose" className="mb-2">
                Time to Close ( in days ):
              </label>
              <br />
              <input
                type="number"
                min="1"
                id="timeToClose"
                name="timeToClose"
                onChange={handleChange}
                value={formData.timeToClose}
                className="form-control"
                required
              />
              <br />
              <label className="mb-2">Tags:</label>

              <Select
                isMulti
                options={tagOptions}
                value={formData.tags}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: selected,
                  }))
                }
                placeholder="Select Tags"
              />

              <br />
              <button
                className="btn btn-success text-center d-grid gap-2 w-50 mx-auto"
                type="submit"
              >
                {editId ? "Update Lead" : "Create Lead"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLeadForm;
