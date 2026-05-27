import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function Dashboard() {

  const [complaints, setComplaints] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

  try {

    const response =
      await api.get("/complaints/my");

    console.log(response.data);

    setComplaints(response.data);

  } catch (error) {

    console.log(error);

    alert(error.response?.data?.message || "Error");
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
                {" "}
                {c.priority}

              </p>

            </div>
          ))
      }

    </div>
  );
}

export default Dashboard;