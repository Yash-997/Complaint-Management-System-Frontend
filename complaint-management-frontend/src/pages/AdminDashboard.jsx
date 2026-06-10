import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function AdminDashboard() {

  const [complaints, setComplaints] =
    useState([]);

  const [staffList, setStaffList] =
    useState([]);

  const [selectedStaff, setSelectedStaff] =
    useState({});

  const [dashboardStats, setDashboardStats] =
    useState(null);

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/");
    }

    fetchComplaints();

    fetchStaff();

    fetchDashboardStats();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response =
        await api.get("/api/admin/complaints");

      console.log(response.data);

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

      alert("Admin fetch failed");
    }
  };

  const fetchStaff = async () => {

    try {

      const response =
        await api.get("/api/admin/staff");

      setStaffList(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchDashboardStats = async () => {

    try {

      const response =
        await api.get("/api/admin/dashboard");

      setDashboardStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await api.put(

        `/api/admin/complaints/${id}/status?status=${status}`
      );

      fetchComplaints();

      fetchDashboardStats();

    } catch (error) {

      console.log(error);

      alert("Status update failed");
    }
  };

  const assignStaff = async (complaintId) => {

    const staffId = selectedStaff[complaintId];

    if (!staffId) {

      alert("Please select a staff member");

      return;
    }

    try {

      await api.put(
        `/api/admin/complaints/${complaintId}/assign/${staffId}`
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Staff assignment failed");
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

  const filteredComplaints =
    statusFilter === "ALL"
      ? complaints
      : complaints.filter(
          (c) => c.status === statusFilter
        );

  return (

    <div className="container">

      <div className="navbar">

        <h1>Admin Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {dashboardStats && (

        <div className="summary-cards">

          <div className="card">

            <h2>
              {dashboardStats.totalComplaints}
            </h2>

            <p>Total Complaints</p>

          </div>

          <div className="card">

            <h2>
              {dashboardStats.openComplaints}
            </h2>

            <p>Open</p>

          </div>

          <div className="card">

            <h2>
              {dashboardStats.inProgressComplaints}
            </h2>

            <p>In Progress</p>

          </div>

          <div className="card">

            <h2>
              {dashboardStats.resolvedComplaints}
            </h2>

            <p>Resolved</p>

          </div>

          <div className="card">

            <h2>
              {dashboardStats.closedComplaints}
            </h2>

            <p>Closed</p>

          </div>

        </div>

      )}

      <div className="filter-section">

        <label>Filter By Status:</label>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="ALL">ALL</option>

          <option value="OPEN">OPEN</option>

          <option value="IN_PROGRESS">
            IN_PROGRESS
          </option>

          <option value="RESOLVED">
            RESOLVED
          </option>

          <option value="CLOSED">
            CLOSED
          </option>

        </select>

      </div>

      {

        filteredComplaints.length === 0 ?

          <h2>No Complaints Found</h2>

          :

          filteredComplaints.map((c) => (

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
                  {" "}
                  ({c.assignedStaff.email})

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

              {c.rating && (

                <p
                  style={{
                    marginTop: "10px"
                  }}
                >

                  <strong>Rating:</strong>
                  {" "}
                  {c.rating} / 5

                </p>

              )}

              {c.feedback && (

                <p
                  style={{
                    marginTop: "10px"
                  }}
                >

                  <strong>Feedback:</strong>
                  {" "}
                  {c.feedback}

                </p>

              )}

              <div
                style={{
                  marginTop: "15px"
                }}
              >

                <p>
                  <strong>Assign Staff:</strong>
                </p>

                <select
                  value={
                    selectedStaff[c.id] || ""
                  }
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      [c.id]: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Staff
                  </option>

                  {staffList.map((s) => (

                    <option
                      key={s.id}
                      value={s.id}
                    >
                      {s.name} ({s.email})
                    </option>

                  ))}

                </select>

                <button
                  onClick={() =>
                    assignStaff(c.id)
                  }
                >
                  Assign
                </button>

              </div>

              <select

                value={c.status}

                onChange={(e) =>

                  updateStatus(
                    c.id,
                    e.target.value
                  )
                }
              >

                <option value="OPEN">
                  OPEN
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="RESOLVED">
                  RESOLVED
                </option>

                <option value="CLOSED">
                  CLOSED
                </option>

              </select>

            </div>
          ))
      }

    </div>
  );
}

export default AdminDashboard;