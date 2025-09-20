import React from "react";
import Sidebar from "./Sidebar";
import aiMentorImg from "../assets/ai-mentor.png"; // Import your image

export default function AIMentor() {
  const profile = {
    name: "Only For You :)",
    headline: "AI Mentor",
  };

  const aiResponse = {
    career_paths: ["Software Engineer", "Data Scientist", "Product Manager"],
    skills: [
      { name: "Python", learned: true },
      { name: "Machine Learning", learned: false },
      { name: "Project Management", learned: false },
      { name: "SQL", learned: false },
    ],
    relevant_skills: ["Data Analysis", "Model Deployment", "Communication"],
    timeline: ["1 month", "3 months", "6 months", "9 months"],
  };

  const chat = [
    { from: "user", text: "What after B.Tech IT with CGPA 8?" },
    {
      from: "ai",
      text:
        "You can pursue Data Science or Software Engineering. Start with Python, SQL and small projects. Build a 6-month roadmap.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 flex flex-col items-center justify-start">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-12 grid-cols-1 gap-6">
          {/* LEFT: Chat Column */}
          <div className="md:col-span-7 p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
            {/* Mentor Header */}
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  src={aiMentorImg}   
                  alt="AI Mentor"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{profile.headline}</h3>
                <p className="text-sm text-gray-500">{profile.name}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[60vh]">
              {chat.map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-indigo-600 text-white ml-auto rounded-br-none"
                      : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="mt-4">
              <div className="bg-white border rounded-full shadow-md px-4 py-2 flex items-center gap-3">
                <input
                  placeholder="Ask your mentor..."
                  className="flex-1 outline-none text-sm placeholder-gray-400"
                />
                <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition">
                  ➤
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Cards Column */}
          <div className="md:col-span-5 p-6 bg-gray-50 border-l flex flex-col gap-6">
            {/* AI Bot Profile */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
              <img
                src={aiMentorImg} // Use imported image
                alt="AI Bot"
                className="w-20 h-20 rounded-full mb-3 object-cover"
              />
              <h4 className="font-semibold text-lg">AI Mentor</h4>
              <p className="text-sm text-gray-500">Your personal career assistant</p>
            </div>

            {/* Career Paths */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-semibold mb-4">Suggested Career Paths</h4>
              <div className="flex flex-wrap gap-3">
                {aiResponse.career_paths.map((p, idx) => (
                  <button
                    key={p}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      idx === 0
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h5 className="text-sm font-semibold mb-3">Career Skills</h5>
                <ul className="space-y-3">
                  {aiResponse.skills.map((s) => (
                    <li key={s.name} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={s.learned}
                        readOnly
                        className="w-4 h-4 accent-indigo-600"
                      />
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-gray-400">
                  {aiResponse.skills.filter((s) => s.learned).length}/{aiResponse.skills.length} learned
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h5 className="text-sm font-semibold mb-3">Relevant Skills</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  {aiResponse.relevant_skills.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Career Timeline */}
            {/* <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h5 className="text-sm font-semibold mb-4">Career Stepper</h5>
              <div className="flex items-center justify-between flex-wrap">
                {aiResponse.timeline.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-xs font-medium text-gray-600 mb-2"
                  >
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-full mb-2 ${
                        idx === 0
                          ? "bg-indigo-600 text-white shadow-md"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
