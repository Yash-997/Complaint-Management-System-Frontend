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
  const navigate = useNavigate();

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response =
        await api.get("/complaints/my");

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
        `/complaints/${id}`
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

      `/complaints/${id}`,

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

            </div>
          ))
      }

    </div>
  );
}

export default DashBoard;