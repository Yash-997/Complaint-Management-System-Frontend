import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function DashBoard() {

  const [complaints, setComplaints] =
    useState([]);

    const [editingId, setEditingId] =
  useState(null);

const [editTitle, setEditTitle] =
  useState("");

const [editDescription, setEditDescription] =
  useState("");

const [editPriority, setEditPriority] =
  useState("LOW");

  const [feedbackData, setFeedbackData] =
    useState({});

  const [feedbackSubmitted, setFeedbackSubmitted] =
    useState({});

  const navigate = useNavigate();

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response =
        await api.get("/api/complaints/my");

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Error fetching complaints"
      );
    }
  };

  const deleteComplaint = async (id) => {

    const confirmDelete =
      window.confirm(
        "Do you want to delete this complaint?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/api/complaints/${id}`
      );

      fetchComplaints();

    } catch (error) {

      alert(
        "Failed to delete complaint"
      );
    }
  };

  const logout = () => {

    const confirmLogout =
      window.confirm(
        "Do you want to logout?"
      );

    if (confirmLogout) {

      localStorage.clear();

      navigate("/");
    }
  };

  const updateComplaint = async (id) => {

  try {

    await api.put(

      `/api/complaints/${id}`,

      {
        title: editTitle,
        description: editDescription,
        priority: editPriority
      }
    );

    setEditingId(null);

    fetchComplaints();

  } catch (error) {

    alert("Failed to update complaint");
  }
};

  const submitFeedback = async (id) => {

    const data = feedbackData[id];

    if (!data || !data.rating) {

      alert("Please select a rating");

      return;
    }

    try {

      await api.post(
        `/api/complaints/${id}/feedback`,
        {
          rating: parseInt(data.rating),
          feedback: data.feedback || ""
        }
      );

      setFeedbackSubmitted({
        ...feedbackSubmitted,
        [id]: true
      });

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to submit feedback");
    }
  };

  return (

    <div className="container">

      <div className="navbar">

        <h1>My Complaints</h1>

        <div>

          <button
            onClick={() =>
              navigate("/create")
            }
          >
            Create Complaint
          </button>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </div>

      {

        complaints.length === 0 ?

          <h3>No complaints found</h3>

          :

          complaints.map((c) => (

            <div
              key={c.id}
              className="card"
            >

              {

  editingId === c.id ?

  <div>

    <input
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
    />

    <textarea
      value={editDescription}
      onChange={(e) =>
        setEditDescription(e.target.value)
      }
    />

    <select
      value={editPriority}
      onChange={(e) =>
        setEditPriority(e.target.value)
      }
    >

      <option value="LOW">
        LOW
      </option>

      <option value="MEDIUM">
        MEDIUM
      </option>

      <option value="HIGH">
        HIGH
      </option>

    </select>

    <button
      onClick={() =>
        updateComplaint(c.id)
      }
    >
      Save Changes
    </button>

    <button
      onClick={() =>
        setEditingId(null)
      }
    >
      Cancel
    </button>

  </div>

  :

  <div>

    <h2>{c.title}</h2>

    <p>{c.description}</p>

    {c.status === "OPEN" && (
  <button
    onClick={() => {

      setEditingId(c.id);

      setEditTitle(c.title);

      setEditDescription(c.description);

      setEditPriority(c.priority);
    }}
  >
    Edit Complaint
  </button>
)}

  </div>
}

              <p>

                <strong>Status:</strong>

              </p>

              <span
                className={

                  c.status === "OPEN"

                    ? "status-open"

                    : c.status === "IN_PROGRESS"

                    ? "status-progress"

                    : c.status === "CLOSED"

                    ? "status-closed"

                    : "status-resolved"
                }
              >

                {c.status}

              </span>

              <p
                style={{
                  marginTop: "15px"
                }}
              >

                <strong>Priority:</strong>
                {" "}
                {c.priority}

              </p>

              <p
                style={{
                  marginTop: "10px"
                }}
              >

                <strong>Created:</strong>
                {" "}

                {
                  new Date(c.createdAt)
                    .toLocaleString()
                }

              </p>

              {c.assignedStaff && (

                <p
                  style={{
                    marginTop: "10px"
                  }}
                >

                  <strong>Assigned Staff:</strong>
                  {" "}
                  {c.assignedStaff.name}

                </p>

              )}

              {c.resolutionRemarks && (

                <p
                  style={{
                    marginTop: "10px"
                  }}
                >

                  <strong>Resolution Remarks:</strong>
                  {" "}
                  {c.resolutionRemarks}

                </p>

              )}

              {(c.status === "RESOLVED" ||
                c.status === "CLOSED") &&
                !c.rating &&
                !feedbackSubmitted[c.id] && (

                <div
                  style={{
                    marginTop: "15px"
                  }}
                >

                  <p>
                    <strong>Submit Feedback:</strong>
                  </p>

                  <select
                    value={
                      feedbackData[c.id]?.rating || ""
                    }
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        [c.id]: {
                          ...feedbackData[c.id],
                          rating: e.target.value
                        }
                      })
                    }
                  >

                    <option value="">
                      Select Rating
                    </option>

                    <option value="1">1</option>

                    <option value="2">2</option>

                    <option value="3">3</option>

                    <option value="4">4</option>

                    <option value="5">5</option>

                  </select>

                  <textarea
                    placeholder="Enter your feedback"
                    value={
                      feedbackData[c.id]?.feedback || ""
                    }
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        [c.id]: {
                          ...feedbackData[c.id],
                          feedback: e.target.value
                        }
                      })
                    }
                  />

                  <button
                    onClick={() =>
                      submitFeedback(c.id)
                    }
                  >
                    Submit Feedback
                  </button>

                </div>

              )}

              {c.rating && (

                <div
                  style={{
                    marginTop: "15px"
                  }}
                >

                  <p>

                    <strong>Rating:</strong>
                    {" "}
                    {c.rating} / 5

                  </p>

                  <p>

                    <strong>Feedback:</strong>
                    {" "}
                    {c.feedback}

                  </p>

                </div>

              )}

              {c.status === "OPEN" && (
  <button
    onClick={() =>
      deleteComplaint(c.id)
    }
    style={{
      marginTop: "20px",
      background: "#dc2626"
    }}
  >
    Delete Complaint
  </button>
)}

            </div>
          ))
      }

    </div>
  );
}

export default DashBoard;