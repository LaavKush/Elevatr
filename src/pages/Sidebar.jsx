import React from "react";
import { Home, BookOpen, Calendar, Settings as SettingsIcon, MessageSquare } from "lucide-react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed md:static z-20 w-72 bg-[#012A4A] text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-2xl transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div>
        {/* Avatar + Name */}
        <div className="flex items-center space-x-4 mb-12">
          <Avatar name="Anchal Gupta" size="56" round className="shadow-md border-2 border-[#61A5C2]" />
          <div>
            <h2 className="font-semibold text-lg">Anchal Gupta</h2>
            <p className="text-sm text-[#A9D6E5]">CSE Student</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <SidebarItem icon={<Home size={20} />} text="Home" active onClick={() => navigate("/")} />
          <SidebarItem icon={<BookOpen size={20} />} text="Resources" onClick={() => navigate("/resources")} />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" onClick={() => navigate("/calendar")} />
          <SidebarItem icon={<BookOpen size={20} />} text="Checklist" onClick={() => navigate("/checklist")} />
          <SidebarItem icon={<MessageSquare size={20} />} text="AI Mentor" onClick={() => navigate("/ai-mentor")} />
          <SidebarItem icon={<SettingsIcon size={20} />} text="Settings" onClick={() => navigate("/settings")} />
        </nav>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
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

export default Sidebar;