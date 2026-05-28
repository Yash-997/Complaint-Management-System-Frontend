import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await api.post("/users/register", {

        name,
        email,
        password
      });

      alert("Registered Successfully");

      navigate("/");

    } catch (error) {

  console.log(error);

  alert(
    error.response?.data ||
    error.message
  );
}
  };

  return (

    <div className="container auth-container">

      <div className="card">

        <h1>Register</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;