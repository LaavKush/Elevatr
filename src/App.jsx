import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages

import Auth from "./pages/Auth/AuthTabs";
import Landing from "./pages/Landing";
import Calendar from "./pages/Calendar"; 
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// context
import { useAuth } from "./context/AuthContext";


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Pages */}
      <Route path="/auth" element={<Auth />} />

        <Route path="/calendar" element={<Calendar />} /> 

        <Route path="/resources" element={<Resources/>}/>
         <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
    

      {/* Protected Routes (to be added later) */}
      {/* <Route element={user ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        ...
      </Route> */}
    </Routes>
  );
}

export default App;
