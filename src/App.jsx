import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Settings as SettingsIcon } from 'lucide-react';

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route shows Landing */}
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
