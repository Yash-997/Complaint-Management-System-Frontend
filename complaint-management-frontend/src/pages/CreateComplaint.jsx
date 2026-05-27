import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function CreateComplaint() {

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("LOW");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/complaints", {

        title,
        description,
        priority
      });

      alert("Complaint Created");

      navigate("/dashboard");

    } catch {

      alert("Failed");
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1>Create Complaint</h1>

<p className="subtitle">

  Describe your issue clearly so
  admin can resolve it faster.

</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >

            <option>LOW</option>

            <option>MEDIUM</option>

            <option>HIGH</option>

          </select>

          <button type="submit">
            Create Complaint
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateComplaint;