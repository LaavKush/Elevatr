import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages

import Auth from "./pages/Auth/AuthTabs";
import Landing from "./pages/Landing";

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
    

      {/* Protected Routes (to be added later) */}
      {/* <Route element={user ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        ...
      </Route> */}
    </Routes>
  );
}

export default App;
