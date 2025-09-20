import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Card } from "../components/Card.jsx";
import { Button } from "../components/Button.jsx";
import { FilterChips } from "../components/FilterChips.jsx";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const companies = ["Google", "Amazon", "Microsoft"];
const roles = ["SDE", "Data Scientist", "Frontend"];
const skills = ["DSA", "System Design", "DBMS", "OS", "React", "ML"];

// Company + Role based resources
const mockResources = [
  { company: "Google", role: "SDE", title: "Google DSA Guide", link: "#", tags: ["DSA", "Medium"], time: "2–4h", type: "PDF" },
  { company: "Amazon", role: "SDE", title: "Amazon System Design", link: "#", tags: ["System Design", "Hard"], time: "5h+", type: "Video" },
  { company: "Microsoft", role: "Frontend", title: "React Prep Sheet", link: "#", tags: ["React", "Easy"], time: "≤1h", type: "Article" },
];

// Skills-based resources
const skillResources = [
  { skill: "DSA", title: "DSA Mastery Guide", link: "#", tags: ["DSA", "Medium"], time: "3h", type: "PDF" },
  { skill: "System Design", title: "System Design Deep Dive", link: "#", tags: ["System Design", "Hard"], time: "5h+", type: "Video" },
  { skill: "DBMS", title: "DBMS Concepts", link: "#", tags: ["DBMS", "Medium"], time: "2h", type: "Article" },
  { skill: "OS", title: "Operating Systems Basics", link: "#", tags: ["OS", "Easy"], time: "1.5h", type: "PDF" },
  { skill: "React", title: "React Hooks Guide", link: "#", tags: ["React", "Medium"], time: "2h", type: "Video" },
  { skill: "ML", title: "Machine Learning Intro", link: "#", tags: ["ML", "Hard"], time: "6h", type: "Video" },
];

const topicWeightage = {
  Google: { SDE: [{ name: "DSA", value: 50 }, { name: "System Design", value: 30 }, { name: "DBMS", value: 20 }] },
  Amazon: { SDE: [{ name: "Graphs", value: 40 }, { name: "Trees", value: 30 }, { name: "Arrays", value: 30 }] },
};

const topicFrequency = {
  Google: { SDE: [{ topic: "Arrays", freq: 40 }, { topic: "DP", freq: 30 }, { topic: "Graphs", freq: 20 }] },
  Amazon: { SDE: [{ topic: "Graphs", freq: 15 }, { topic: "Trees", freq: 10 }, { topic: "Hashing", freq: 5 }] },
};

const difficultyStats = {
  Google: { SDE: [{ name: "Easy", value: 30 }, { name: "Medium", value: 50 }, { name: "Hard", value: 20 }] },
  Amazon: { SDE: [{ name: "Easy", value: 20 }, { name: "Medium", value: 60 }, { name: "Hard", value: 20 }] },
};

const COLORS = ["#61A5C2", "#2A6F97", "#01497C", "#A9D6E5"];

const interviewExperiences = [
  {
    company: "Google",
    role: "SDE",
    rounds: [
      { name: "Round 1 (OA)", topics: ["Arrays", "DP"] },
      { name: "Round 2", topics: ["System Design basics"] },
      { name: "Round 3", topics: ["HR + leadership fit"] },
    ],
  },
  {
    company: "Amazon",
    role: "SDE",
    rounds: [
      { name: "OA", topics: ["Trees", "Graphs"] },
      { name: "Tech Round", topics: ["System Design", "Coding"] },
      { name: "HR", topics: ["Leadership principles"] },
    ],
  },
  {
    company: "Microsoft",
    role: "Frontend",
    rounds: [
      { name: "OA", topics: ["JS", "CSS"] },
      { name: "Tech Round", topics: ["React hooks", "DSA"] },
      { name: "HR", topics: ["Communication", "Project discussion"] },
    ],
  },
];

export default function Resources() {
  const [selectedCompany, setSelectedCompany] = useState("Google");
  const [selectedRole, setSelectedRole] = useState("SDE");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState("");

  const toggleBookmark = (res) => {
    if (bookmarks.includes(res.title)) {
      setBookmarks(bookmarks.filter((b) => b !== res.title));
    } else {
      setBookmarks([...bookmarks, res.title]);
    }
  };

  const weightageData = topicWeightage[selectedCompany]?.[selectedRole] || [];
  const freqData = topicFrequency[selectedCompany]?.[selectedRole] || [];
  const diffData = difficultyStats[selectedCompany]?.[selectedRole] || [];
  const currentInterview = interviewExperiences.find(
    (exp) => exp.company === selectedCompany && exp.role === selectedRole
  );

  // Company + role resources
  const filteredCompanyRoleResources = mockResources.filter(
    (res) => res.company === selectedCompany && res.role === selectedRole
  );

  // Skill-specific resources
  const filteredSkillResources = selectedSkills.length
    ? skillResources.filter((res) => selectedSkills.includes(res.skill))
    : [];

  return (
    <div className="p-6 bg-[#f0f4f8] min-h-screen text-gray-900 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-6">🎯 Career Resources Hub</h1>

      {/* Company & Role Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <FilterChips
            options={companies}
            selected={[selectedCompany]}
            onChange={(val) => setSelectedCompany(val[0])}
            singleSelect
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Role</h3>
          <FilterChips
            options={roles}
            selected={[selectedRole]}
            onChange={(val) => setSelectedRole(val[0])}
            singleSelect
          />
        </div>
      </div>

      {/* Interview Experiences */}
      {currentInterview && (
        <section>
          <h2 className="text-2xl font-bold mb-4">💬 Interview Experiences ({selectedCompany} - {selectedRole})</h2>
          <div className="space-y-4">
            {currentInterview.rounds.map((round, i) => (
              <Card key={i} className="bg-white p-4 shadow rounded-lg">
                <h3 className="font-semibold">{round.name}</h3>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {round.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Charts */}
      <section className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold mb-2 text-center">📊 Topic Weightage</h2>
          <Pie
            data={{
              labels: weightageData.map((d) => d.name),
              datasets: [{ data: weightageData.map((d) => d.value), backgroundColor: COLORS }],
            }}
            options={{
              plugins: {
                legend: { position: "bottom" },
                datalabels: { color: "#000", formatter: (value) => `${value}%` },
              },
            }}
            height={250}
          />
        </Card>

        <Card className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold mb-2 text-center">📊 Topic Frequency</h2>
          <Bar
            data={{
              labels: freqData.map((d) => d.topic),
              datasets: [{ label: "Frequency", data: freqData.map((d) => d.freq), backgroundColor: COLORS[0] }],
            }}
            options={{
              plugins: {
                legend: { display: false },
                datalabels: { anchor: "end", align: "end", color: "#000", formatter: (val) => val },
              },
              scales: {
                x: { ticks: { color: "#000" } },
                y: { ticks: { color: "#000", beginAtZero: true } },
              },
            }}
            height={250}
          />
        </Card>

        <Card className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold mb-2 text-center">📊 Difficulty Distribution</h2>
          <Pie
            data={{
              labels: diffData.map((d) => d.name),
              datasets: [{ data: diffData.map((d) => d.value), backgroundColor: COLORS }],
            }}
            options={{
              plugins: {
                legend: { position: "bottom" },
                datalabels: { color: "#000", formatter: (val) => `${val}%` },
              },
            }}
            height={250}
          />
        </Card>
      </section>

      {/* Recommended Resources: Company + Role */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📘 Recommended Resources ({selectedCompany} - {selectedRole})</h2>
        {filteredCompanyRoleResources.length === 0 ? (
          <p className="text-gray-600">No resources found for this selection.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredCompanyRoleResources.map((res, i) => (
              <Card key={i} className="bg-white p-4 shadow rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{res.title}</h2>
                  <Button
                    onClick={() => toggleBookmark(res)}
                    className={`px-3 py-1 rounded-lg ${
                      bookmarks.includes(res.title) ? "bg-yellow-400 text-black" : "bg-blue-500 text-white"
                    }`}
                  >
                    {bookmarks.includes(res.title) ? "★ Saved" : "☆ Save"}
                  </Button>
                </div>
                <p className="text-gray-600">Tags: {res.tags.join(", ")}</p>
                <p className="text-gray-500 text-sm">⏳ {res.time} | 📂 {res.type}</p>
                <a href={res.link} className="text-blue-600 underline">View Resource</a>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Skills Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Skills</h3>
        <FilterChips options={skills} selected={selectedSkills} onChange={setSelectedSkills} />
      </div>

      {/* Skill-based resources */}
      {selectedSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">💡 Skill Resources</h2>
          {filteredSkillResources.length === 0 ? (
            <p className="text-gray-600">No resources found for selected skills.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredSkillResources.map((res, i) => (
                <Card key={i} className="bg-white p-4 shadow rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{res.title}</h2>
                    <Button
                      onClick={() => toggleBookmark(res)}
                      className={`px-3 py-1 rounded-lg ${
                        bookmarks.includes(res.title) ? "bg-yellow-400 text-black" : "bg-blue-500 text-white"
                      }`}
                    >
                      {bookmarks.includes(res.title) ? "★ Saved" : "☆ Save"}
                    </Button>
                  </div>
                  <p className="text-gray-600">Tags: {res.tags.join(", ")}</p>
                  <p className="text-gray-500 text-sm">⏳ {res.time} | 📂 {res.type}</p>
                  <a href={res.link} className="text-blue-600 underline">View Resource</a>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
