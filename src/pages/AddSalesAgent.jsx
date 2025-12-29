import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import Backbtn from "../components/BackBtn";
const AddSalesAgent = () => {
  const { fetchSalesAgent } = useLeadContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAgentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://neraxis-crm-backend.vercel.app/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Agent added Successfully!");

        await fetchSalesAgent();

        setTimeout(() => {
          navigate(-1);
        }, 500);

        setFormData({
          name: "",
          email: "",
        });
      } else {
        response.json({ error: "Failed to add Lead" });
        toast.error("Failed to add Lead");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center border border-4 py-3 fw-bold">
        Add New Sales Agent
      </h1>
      <div className="container">
        <div className="row">
          <Backbtn />
          <div className="col-12 col-md-10 mx-auto">
            <div className="border border-1">
              <form onSubmit={handleAgentSubmit}>
                <div className="container p-3">
                  <label htmlFor="name" className="mb-2">
                    Agent Name:{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Agent Name"
                    required
                  />
                  <br />
                  <label htmlFor="email" className="mb-2">
                    Email Address:{" "}
                  </label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Agent Email"
                    required
                  />
                  <br />
                  <button className="btn btn-success" type="submit">
                    Create Agent
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSalesAgent;
