import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login";
import EmployeeManagement from "./pages/Admin/Employee/EmployeeManagement";
import Formations from "./pages/Admin/Formation/formation";
import NotFound from "./pages/404 Page/notFound";
// import FormationCard from "./components/layout/FormationCard";
import FormationUsers from "./pages/users/FormationUsers";
import Dashboard from "./pages/Admin/dashboard/dashboard";
import Evenment from "./pages/Admin/AjouterEvenment/AddEvenment";

const ConfigueRouter = () => {
  const [role, setRole] = useState(null); // Initialize as `null` to distinguish between loading and no role

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8081/menu", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setRole(response.data.role);
        } else {
          
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("guest");
      }
    };
    fetchUserRole();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin-Specific Routes */}
        {role === "admin" && (
          <>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Employee" element={<EmployeeManagement />} />
            <Route path="/AjouterEvenment" element={<Evenment />} />
            <Route path="/Gestionformation" element={<Formations />} />
            <Route path="/profile" element={<FormationUsers />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}

        {/* User-Specific Routes */}
        {role === "user" && (
          <>
            <Route path="/profile" element={<FormationUsers />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}

        
        {/* Fallback for not found pages */}
      </Routes>
    </Router>
  );
};

export default ConfigueRouter;
