// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaChartPie, FaCog, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebase";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
    { name: "Stats", path: "/dashboard/stats", icon: <FaChartPie /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/"; // redirect to home/login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-[#01497C] to-[#468FAF] min-h-screen text-white flex flex-col p-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Elevatr</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white hover:text-[#01497C] transition ${
              location.pathname === item.path ? "bg-white text-[#01497C]" : ""
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
