import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLeadContext from "../context/LeadContext";
import Backbtn from "../components/BackBtn";
import axios from "axios";
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
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/agents`,
      formData,
      {
        withCredentials: true,
      }
    );

    toast.success("Agent added Successfully!");

    await fetchSalesAgent();

    setTimeout(() => {
      navigate(-1);
    }, 500);

    setFormData({
      name: "",
      email: "",
    });
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.error || "Failed to add Agent");
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
