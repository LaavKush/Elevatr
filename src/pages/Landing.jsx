import { Sparkles, Calendar, BookOpen, Bot, Menu, X, User } from "lucide-react"; // Import the User icon
import Lottie from "lottie-react";
import { useState } from "react";
import aiAvatar from "../assets/mentor/ai-avatar.json";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Track profile dropdown state

  // Toggle login state and add logs for debugging
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle profile dropdown
  };

  return (
    <div className="font-sans text-white bg-[#012A4A]">
      {/* 🌐 Navbar */}
      <header className="fixed top-0 left-0 w-full bg-[#01497C]/90 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-[#A9D6E5]">
            CareerAdvisor
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-[#89C2D9]">
            <a href="#features" className="hover:text-[#A9D6E5] transition">Features</a>
            <a href="#about" className="hover:text-[#A9D6E5] transition">About</a>
            <a href="#contact" className="hover:text-[#A9D6E5] transition">Contact</a>
          </nav>

          {/* CTA Buttons or Profile Icon */}
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-[#012A4A] bg-[#A9D6E5] rounded-lg font-semibold hover:bg-[#89C2D9] transition"
                  onClick={toggleLoginState} // Ensure this triggers the login state toggle
                >
                  Sign In / Sign Up
                </a>
                
              </>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center text-[#A9D6E5] hover:text-white transition"
                  onClick={toggleProfileMenu} // Toggle profile dropdown
                >
                  <User className="w-6 h-6" style={{ color: "#A9D6E5" }} /> {/* Add inline styling to ensure visibility */}
                  <span className="ml-2">Profile</span>
                </button>

                {/* Profile dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#01497C] rounded-lg shadow-lg text-[#A9D6E5]">
                    <a href="/profile" className="block px-4 py-2 hover:bg-[#2C7DA0]">My Profile</a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-[#2C7DA0]"
                      onClick={() => {
                        toggleLoginState(); // Sign out and update login state
                        setProfileMenuOpen(false); // Close profile dropdown
                      }}
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#A9D6E5] hover:bg-[#014F86] transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#01497C] shadow-md">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <a href="#features" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#about" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#contact" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Contact</a>
              {!isLoggedIn ? (
                <>
                  <a href="/login" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Sign In</a>
                  <a href="/signup" className="hover:text-[#A9D6E5] transition" onClick={() => setMenuOpen(false)}>Sign Up</a>
                </>
              ) : (
                <a
                  href="#"
                  className="hover:text-[#A9D6E5] transition"
                  onClick={() => {
                    toggleLoginState();
                    setMenuOpen(false);
                  }}
                >
                  Sign Out
                </a>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* 🌟 Hero Section */}
      <section className="relative bg-gradient-to-r from-[#014F86] via-[#2A6F97] to-[#468FAF] text-white min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Your Personalized <br /> <span className="text-[#A9D6E5]">AI Career Mentor</span>
            </h1>
            <p className="mt-6 text-lg text-[#A9D6E5]">
              Tailored paths, internships & skills curated just for <b>YOU</b>.
            </p>
            <a
              href="/signup"
              className="mt-8 inline-block px-8 py-4 bg-[#A9D6E5] text-[#012A4A] font-semibold rounded-2xl shadow-lg hover:bg-[#89C2D9] transition-transform transform hover:scale-105"
            >
              Get Started
            </a>
          </div>

          <div className="w-full h-[400px] lg:h-[500px]">
            <Lottie animationData={aiAvatar} loop />
          </div>
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section id="features" className="py-20 bg-[#2A6F97]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#A9D6E5] mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <Sparkles className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">Skill Recommendations</h3>
              <p className="text-[#A9D6E5] mt-2">
                AI-powered personalized learning paths to boost your career.
              </p>
            </div>

            <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <Calendar className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">Internship Calendar</h3>
              <p className="text-[#A9D6E5] mt-2">
                Track upcoming workshops, webinars & placement drives.
              </p>
            </div>

            <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <BookOpen className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">Interactive Flashcards</h3>
              <p className="text-[#A9D6E5] mt-2">
                Revise concepts with gamified, easy-to-use flashcards.
              </p>
            </div>

            <div className="p-6 bg-[#01497C] rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <Bot className="w-12 h-12 text-[#A9D6E5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">AI Mentor</h3>
              <p className="text-[#A9D6E5] mt-2">
                Get instant guidance and resume feedback from your AI mentor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ⚓ Footer */}
      <footer className="bg-[#01497C] text-[#A9D6E5] py-6 text-center">
        <p>© {new Date().getFullYear()} Career Advisor. All rights reserved.</p>
      </footer>
    </div>
  );
}
