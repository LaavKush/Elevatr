import React from "react";
import {
  Home,
  BookOpen,
  Briefcase,
  Calendar,
  Settings,
  MessageSquare,
} from "lucide-react";
import profilePic from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#012A4A] text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-2xl">
        <div>
          {/* Profile */}
          <div className="flex items-center space-x-4 mb-12">
            <img
              src={profilePic}
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-[#61A5C2] shadow-md"
            />
            <div>
              <h2 className="font-semibold text-lg">Hi Anchal!</h2>
              <p className="text-sm text-[#A9D6E5]">Your roadmap awaits</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-3">
            <SidebarItem icon={<Home size={20} />} text="Home" active />
            <SidebarItem icon={<BookOpen size={20} />} text="Courses" />
            <SidebarItem icon={<Briefcase size={20} />} text="Internships" />
            <SidebarItem icon={<Calendar size={20} />} text="Study Schedule" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
          </nav>
        </div>

        {/* AI Mentor */}
        <button
          onClick={() => navigate("/ai-mentor")}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] hover:from-[#468FAF] hover:to-[#89C2D9] hover:shadow-lg hover:scale-105 transition-all px-5 py-3 rounded-xl text-sm font-medium shadow-md"
        >
          <MessageSquare size={18} /> <span>AI Mentor</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-white">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-10 text-[#012A4A]">
          Here’s your personalized roadmap 🚀
        </h1>

        {/* Courses Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#01497C]">
            Course Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CourseCard
              title="AI & Machine Learning"
              img="https://source.unsplash.com/400x200/?ai,technology"
              btn="Start Course"
            />
            <CourseCard
              title="Product Management"
              img="https://source.unsplash.com/400x200/?business,teamwork"
              btn="Start Course"
            />
            <CourseCard
              title="Creative AI Tools"
              img="https://source.unsplash.com/400x200/?innovation"
              btn="Start Course"
            />
          </div>
        </section>

        {/* Internships Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#01497C]">
            Internships & Hackathons
          </h2>
          <div className="flex space-x-4 mb-6">
            <FilterButton text="All" active />
            <FilterButton text="Internships" />
            <FilterButton text="Hackathons" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <InternshipCard title="Software Engineer Intern" />
            <InternshipCard title="Data Science Intern" />
            <InternshipCard title="AI Hackathon" />
            <InternshipCard title="Web Dev Hackathon" />
          </div>
        </section>

        {/* Study Schedule */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#01497C]">
            Study Schedule Preview
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-5 border border-[#A9D6E5]">
            <ProgressBar label="Finish Module 3" progress={60} />
            <ProgressBar label="Project Work" progress={75} />
          </div>
        </section>
      </main>
    </div>
  );
};

/* Sidebar Item */
const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition ${
      active
        ? "bg-[#01497C] text-white shadow-md"
        : "text-[#A9D6E5] hover:bg-[#013A63] hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

/* Course Card */
const CourseCard = ({ title, img, btn }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
    <img src={img} alt={title} className="w-full h-36 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-3 text-[#012A4A]">{title}</h3>
      <button className="bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] hover:from-[#468FAF] hover:to-[#89C2D9] text-sm px-4 py-2 rounded-lg shadow-md text-white transition">
        {btn}
      </button>
    </div>
  </div>
);

/* Internship Card */
const InternshipCard = ({ title }) => (
  <div className="bg-white p-5 rounded-xl shadow-md text-center hover:shadow-lg transition border border-[#A9D6E5]">
    <h3 className="font-semibold text-[#012A4A]">{title}</h3>
  </div>
);

/* Filter Button */
const FilterButton = ({ text, active }) => (
  <button
    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
      active
        ? "bg-gradient-to-r from-[#2C7DA0] to-[#61A5C2] text-white shadow-md"
        : "bg-gray-100 text-[#01497C] border border-[#A9D6E5] hover:bg-[#61A5C2] hover:text-white"
    }`}
  >
    {text}
  </button>
);

/* Progress Bar */
const ProgressBar = ({ label, progress }) => (
  <div>
    <p className="mb-1 text-[#01497C]">{label}</p>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-gradient-to-r from-[#2A6F97] to-[#61A5C2] h-3 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default Dashboard;
