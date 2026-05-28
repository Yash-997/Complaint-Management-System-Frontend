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
        await api.get("/admin/complaints");

      console.log(response.data);

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

      alert("Admin fetch failed");
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await api.put(

        `/admin/complaints/${id}/status?status=${status}`
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Status update failed");
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

        <h1>Admin Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {

        complaints.length === 0 ?

          <h2>No Complaints Found</h2>

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

              </select>

            </div>
          ))
      }

    </div>
  );
}

export default AdminDashboard;