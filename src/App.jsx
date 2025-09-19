import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route shows Landing */}
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
