import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ChecklistCard } from "./Card2";
import Modal from "react-modal";
import { MessageSquare, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

Modal.setAppElement("#root");

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [careerObjectives, setCareerObjectives] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwMDZlMjc5MTVhMTcwYWIyNmIxZWUzYjgxZDExNjU0MmYxMjRmMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTGFhdmFueWEgS3VzaHdhaGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSTNSVlc5SWNSTWNISnpOZ1dmNF9mTURSb2hWNEltbXRob3hGb3lXQ2hUb1NEb3NXZHo9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWxldmF0ci1hZDM0MCIsImF1ZCI6ImVsZXZhdHItYWQzNDAiLCJhdXRoX3RpbWUiOjE3NTgzNjY5MzUsInVzZXJfaWQiOiJKbUlZYkNSUzg2UjFyQVV3aDdUSVFSYVp0a2kxIiwic3ViIjoiSm1JWWJDUlM4NlIxckFVd2g3VElRUmFadGtpMSIsImlhdCI6MTc1ODM2NjkzNSwiZXhwIjoxNzU4MzcwNTM1LCJlbWFpbCI6ImxhYXZhbnlhMDM2YnRpdDIzQGlnZHR1dy5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxMTQ5NTgzOTMxNzg4NjE5Nzg4Il0sImVtYWlsIjpbImxhYXZhbnlhMDM2YnRpdDIzQGlnZHR1dy5hYy5pbiJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.rhaERFYq0ATffeaG5l_NNCj6zY3ABU3dcaC-K7g5u8xitDa7cZ7I9npe0ycVfiTchIQIteX5j-AF3edrM2kvc3OvGwSk0C05ZILX-kDPY_lZ-tiSez-3Cbfbit2WOCvqrb762dRoPyrHwjM5nOTBbQ5ye4nL1djwQMqvMlRYU__WY3tgfjT-3-8B8z6wKoCUP3LaBIdw7wrmXcNK1yCEmmQVFue5JHlUAKvvE_f40nQQ4YbvouHjOy6DTh9MIV5kzf9u9sQ0YXV_Q0gGxfQgRuCpSu6ZpLn7ctKuXHSARmkCKf2OIr9ieIcSydmKUHx3D4JPF4J67jpoXLI9LyAe1Q"); // Replace with your token storage
        const res = await fetch("https://418fad5fc00f.ngrok-free.app/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);

        // Optional: derive career objectives or stats dynamically
        setCareerObjectives(data.interests || []);
        setStats([
          { title: "Completed Tasks", value: 12 },
          { title: "Ongoing Courses", value: 5 },
          { title: "Portfolio Projects", value: 2 },
          { title: "Certifications", value: 3 },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">
        Loading profile...
      </div>
    );
  }

  const cgpaStatus = user.cgpa >= 7 ? "good" : "improve";
  const overallProgress = 65; // You can calculate dynamically if needed

  const improvementTips = [
    {
      subject: "Data Structures",
      reason: "Low assignment scores",
      tips: ["Revise key topics weekly", "Solve 2-3 practice problems daily", "Follow checklist tasks"],
    },
    {
      subject: "Machine Learning",
      reason: "Low quiz scores",
      tips: ["Watch ML tutorials", "Redo course exercises", "Join study groups"],
    },
    {
      subject: "Web Development",
      reason: "Missed deadlines",
      tips: ["Complete portfolio project", "Follow checklist tasks", "Use online resources for practice"],
    },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-gray-100 relative">
      <Sidebar sidebarOpen={sidebarOpen} />

      <button
        className="absolute top-6 left-6 md:hidden z-30 bg-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <main className={`flex-1 p-10 transition-all duration-300 relative ${sidebarOpen ? "md:ml-72" : "md:ml-0"}`}>
        {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-10">
          <div className="relative">
            <Avatar name={user.name} size="100" round className="relative z-10 shadow-lg" />
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-[#2C7DA0] to-[#61A5C2] opacity-30 animate-pulse z-0"></div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#012A4A]">
              Welcome Back, {user.name} 👋
            </h1>
            <p className="text-gray-600 mt-1 text-lg">{user.college}</p>
            <div className="flex mt-4 space-x-4">
              <div
                className={`px-4 py-1 rounded-xl shadow-md font-semibold text-white ${
                  cgpaStatus === "good" ? "bg-gradient-to-r from-green-400 to-blue-400" : "bg-gradient-to-r from-red-400 to-orange-400"
                }`}
              >
                CGPA: {user.cgpa} / 10
              </div>
              <div className="bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] text-white px-4 py-1 rounded-xl shadow-md font-semibold">
                Progress: {overallProgress}%
              </div>
              {cgpaStatus === "improve" && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-red-500 text-white px-4 py-1 rounded-xl shadow-md font-semibold hover:bg-red-600 transition"
                >
                  Click here For Improvement Tips
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-[#2C7DA0]">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-3xl font-bold text-[#01497C]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Career Objectives */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#01497C]">Career Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerObjectives.map((obj, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#2C7DA0]">{obj}</div>
            ))}
          </div>
        </section>

        {/* Checklist Preview */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#01497C]">Checklist Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ChecklistCard task="Complete DSA Basics" progress={50} category="DSA" />
            <ChecklistCard task="Build Portfolio Website" progress={70} category="Web" />
            <ChecklistCard task="Finish ML Course" progress={30} category="ML" />
          </div>
        </section>

        {/* Floating AI Mentor Button */}
        <button
          onClick={() => navigate("/ai-mentor")}
          className="fixed bottom-24 right-8 bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] text-white p-4 rounded-full shadow-xl hover:scale-110 transition z-40"
          title="Ask AI Mentor"
        >
          <MessageSquare size={28} />
        </button>
      </main>

      {/* Improvement Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="max-w-2xl w-full mx-4 bg-white rounded-3xl p-8 shadow-2xl outline-none max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <h2 className="text-3xl font-bold mb-6 text-red-500">Tips to Improve CGPA</h2>
        <div className="space-y-6">
          {improvementTips.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[#01497C] text-xl">{item.subject}</h3>
              <p className="text-gray-600 mb-2">Reason: {item.reason}</p>
              <ul className="list-disc pl-5 text-gray-700">
                {item.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-[#2C7DA0] text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
