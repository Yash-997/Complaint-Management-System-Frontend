import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/DashBoard";

import CreateComplaint from "./pages/CreateComplaint";

import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";

import StaffLogin from "./pages/StaffLogin";

import StaffDashboard from "./pages/StaffDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create"
          element={<CreateComplaint />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/staff/login"
          element={<StaffLogin />}
        />

        <Route
          path="/staff/dashboard"
          element={<StaffDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;