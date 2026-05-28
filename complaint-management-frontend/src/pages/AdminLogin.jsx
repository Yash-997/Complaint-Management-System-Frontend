import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function AdminLogin() {

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

      if (
        response.data.role !==
        "ROLE_ADMIN"
      ) {

        alert("Not Admin");

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/admin/dashboard");

    } catch {

      alert("Login Failed");
    }
  };

  return (

    <div className="container auth-container">

      <div className="card">

        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;