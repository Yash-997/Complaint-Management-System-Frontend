import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post("/api/users/login", {

          email,
          password
        });

      if(response.data.role === "ROLE_ADMIN") {

  alert("Please login from admin page");

  return;
}

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "role",
  response.data.role
);

navigate("/dashboard");

    } catch {

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="container auth-container">

      <div className="card">

        <h1>User Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>

          <Link to="/register">

            Create New Account

          </Link>

        </p>

        <p>

          <Link to="/admin/login">

            Admin Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;