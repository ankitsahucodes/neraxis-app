import { useState } from "react";
import useLeadContext from "../context/LeadContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
const AddComment = () => {
  const { salesAgents } = useLeadContext();
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [formData, setFormData] = useState({
    author: "",
    commentText: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function fetchComments() {
    try {
      const res = await fetch(`https://neraxis-crm-backend.vercel.app/leads/${id}/comments`);
      const commentData = await res.json();
      setComments(commentData);
    } catch (error) {
      console.log("Failed to load comments:", error);
      toast.error("Failed to load comments");
    }
  }

  useEffect(() => {
    fetchComments();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newFormData = {
      ...formData,
      lead: id,
    };

    try {
      const res = await fetch(`https://neraxis-crm-backend.vercel.app/leads/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (res.ok) {
        toast.success("Comment added Successfully");
        clearForm();
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function clearForm() {
    setFormData({
      author: "",
      commentText: "",
    });
  }

  return (
    <>
      <h2 className="text-center fw-bold">Comments ({comments.length})</h2>
      <div className="my-3">
        <div>
          {comments?.map((comment) => (
            <div key={comment._id} className="border border-1 p-3">
              <h5 className="fw-bold">
                {comment?.author?.name ? (
                  comment?.author?.name
                ) : (
                  <p className="text-danger">No Agent Found</p>
                )}
              </h5>
              <p>
                <strong>Time: </strong>
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Comment: </strong>
                {comment.commentText}
              </p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="border border-1 p-3 ">
        <h4>Add Comment:</h4>

        <label htmlFor="author" className="mb-2"></label>
        <br />
        <select
          id="author"
          name="author"
          className="form-select"
          onChange={handleChange}
          value={formData.author}
          required
        >
          <option value="" disabled>
            --Select Author--
          </option>
          {salesAgents?.length > 0 &&
            salesAgents.map((lead) => {
              return (
                <option key={lead._id} value={lead._id}>
                  {lead.name}
                </option>
              );
            })}
        </select>
        <br />
        <textarea
          type="text"
          name="commentText"
          onChange={handleChange}
          value={formData.commentText}
          className="form-control"
          placeholder="Add a Comment"
          required
        ></textarea>

        <div className="mt-3 text-end">
          <button
            type="button"
            className="btn btn-danger fw-semibold me-3"
            onClick={clearForm}
          >
            Cancel
          </button>
          <button className="btn btn-success fw-semibold" type="submit">
            Comment
          </button>
        </div>
      </form>
    </>
  );
};

export default AddComment;
