import React, { useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sun, Moon, Bell, RefreshCw, Trash2 } from "lucide-react";

const Settings = () => {
  // Theme toggle
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Notifications toggle
  const [notifications, setNotifications] = useState(true);

  // Profile form
  const [profile, setProfile] = useState({
    name: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: [],
    interests: [],
    careerGoals: [],
  });

  const skillsOptions = [
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Web Development", label: "Web Development" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "AWS", label: "AWS" },
  ];

  const interestsOptions = [
    { value: "AI", label: "AI" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Frontend", label: "Frontend" },
    { value: "Cybersecurity", label: "Cybersecurity" },
  ];

  const careerOptions = [
    { value: "AI Engineer", label: "AI Engineer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
  ];

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile, theme, notifications);
    toast.success("Settings updated!");
  };

  return (
    <div className={`min-h-screen py-12 px-6 ${theme === "light" ? "bg-gradient-to-r from-[#01497C] to-[#468FAF]" : "bg-gray-900 text-white"}`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#01497C] dark:text-white">Settings</h1>

        {/* Theme & Notifications */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] rounded-xl p-6 shadow-md flex items-center justify-between cursor-pointer hover:scale-105 transition"
            onClick={toggleTheme}>
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
              <span className="font-semibold text-white">Theme: {theme === "light" ? "Light" : "Dark"}</span>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] rounded-xl p-6 shadow-md flex items-center justify-between cursor-pointer hover:scale-105 transition"
            onClick={() => setNotifications(!notifications)}>
            <div className="flex items-center gap-3">
              <Bell size={24} />
              <span className="font-semibold text-white">Notifications: {notifications ? "On" : "Off"}</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-[#01497C] dark:text-white">Update Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="p-3 rounded-lg border border-[#A9D6E5] focus:ring-2 focus:ring-[#01497C] w-full"
            />
            <input
              type="text"
              placeholder="Branch"
              value={profile.branch}
              onChange={(e) => handleProfileChange("branch", e.target.value)}
              className="p-3 rounded-lg border border-[#A9D6E5] focus:ring-2 focus:ring-[#01497C] w-full"
            />
            <input
              type="text"
              placeholder="Year"
              value={profile.year}
              onChange={(e) => handleProfileChange("year", e.target.value)}
              className="p-3 rounded-lg border border-[#A9D6E5] focus:ring-2 focus:ring-[#01497C] w-full"
            />
            <input
              type="text"
              placeholder="CGPA"
              value={profile.cgpa}
              onChange={(e) => handleProfileChange("cgpa", e.target.value)}
              className="p-3 rounded-lg border border-[#A9D6E5] focus:ring-2 focus:ring-[#01497C] w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#01497C] dark:text-white">Skills</label>
            <Select
              isMulti
              options={skillsOptions}
              value={profile.skills}
              onChange={(selected) => handleProfileChange("skills", selected)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#01497C] dark:text-white">Interests</label>
            <Select
              isMulti
              options={interestsOptions}
              value={profile.interests}
              onChange={(selected) => handleProfileChange("interests", selected)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#01497C] dark:text-white">Career Goals</label>
            <Select
              isMulti
              options={careerOptions}
              value={profile.careerGoals}
              onChange={(selected) => handleProfileChange("careerGoals", selected)}
            />
          </div>

          {/* Account Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="button"
              className="flex-1 bg-yellow-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition"
              onClick={() => toast.info("Reset Password clicked")}
            >
              <RefreshCw size={20} /> Reset Password
            </button>
            <button
              type="button"
              className="flex-1 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition"
              onClick={() => toast.error("Delete Account clicked")}
            >
              <Trash2 size={20} /> Delete Account
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
          >
            Save Changes
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default Settings;
