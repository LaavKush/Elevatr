import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to Elevatr</h1>

      {!user && (
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-500 transition-all"
        >
          Get Started
        </button>
      )}

      {user && (
        <p className="text-lg">You are logged in. Dashboard coming soon!</p>
      )}
    </div>
  );
}
