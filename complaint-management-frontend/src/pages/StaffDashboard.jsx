import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function StaffDashboard() {

  const [complaints, setComplaints] =
    useState([]);

  const [remarks, setRemarks] =
    useState({});

  const navigate = useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/");
    }

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response =
        await api.get("/api/staff/my-complaints");

      console.log(response.data);

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch complaints");
    }
  };

  const startWork = async (id) => {

    try {

      await api.put(
        `/api/staff/complaints/${id}/status?status=IN_PROGRESS`
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to update status");
    }
  };

  const resolveComplaint = async (id) => {

    const remarkText = remarks[id];

    if (!remarkText || remarkText.trim() === "") {

      alert("Please enter resolution remarks");

      return;
    }

    try {

      await api.put(
        `/api/staff/complaints/${id}/resolve`,
        {
          remarks: remarkText
        }
      );

      setRemarks((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to resolve complaint");
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

  return (

    <div className="container">

      <div className="navbar">

        <h1>Staff Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {

        complaints.length === 0 ?

          <h2>No Complaints Assigned</h2>

          :

          complaints.map((c) => (

            <div
              key={c.id}
              className="card"
            >

              <h2>{c.title}</h2>

              <p>{c.description}</p>

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

             <p>

  <strong>Priority:</strong>

</p>

<span
  className={

    c.priority === "HIGH"

      ? "priority-high"

      : c.priority === "MEDIUM"

      ? "priority-medium"

      : "priority-low"
  }
>

  {c.priority}

</span>

              <p>

                <strong>User:</strong>
                {" "}
                {c.user?.name}

              </p>

              <p>

                <strong>Email:</strong>
                {" "}
                {c.user?.email}

              </p>

              <p>

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

              {c.status === "OPEN" && (

                <button
                  onClick={() =>
                    startWork(c.id)
                  }
                >
                  Start Work
                </button>

              )}

              {c.status === "IN_PROGRESS" && (

                <div>

                  <textarea
                    placeholder="Enter Resolution Remarks"
                    value={remarks[c.id] || ""}
                    onChange={(e) =>
                      setRemarks({
                        ...remarks,
                        [c.id]: e.target.value
                      })
                    }
                  />

                  <button
                    onClick={() =>
                      resolveComplaint(c.id)
                    }
                  >
                    Resolve Complaint
                  </button>

                </div>

              )}

              {c.status === "RESOLVED" && c.resolutionRemarks && (

                <p
                  style={{
                    marginTop: "15px"
                  }}
                >

                  <strong>Resolution Remarks:</strong>
                  {" "}
                  {c.resolutionRemarks}

                </p>

              )}

            </div>
          ))
      }

    </div>
  );
}

export default StaffDashboard;
