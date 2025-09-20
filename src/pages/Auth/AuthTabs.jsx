
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("jwt", token);

      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // New user → redirect to profile to complete details
        await setDoc(userRef, {
          name: result.user.displayName || "",
          email: result.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isProfileComplete: false, // flag to check profile completion
        });
        navigate("/register");
      } else {
        // Existing user
        await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
        const userData = userSnap.data();
        if (!userData.isProfileComplete) {
          // If profile not complete, go to profile page
          navigate("/register");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012A4A] via-[#01497C] to-[#2C7DA0] p-6 relative overflow-hidden">
  <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#01497C]/15 rounded-full blur-3xl animate-spin-slow"></div>
  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2C7DA0]/15 rounded-full blur-3xl animate-spin-slow-reverse"></div>

  <div className="relative w-full max-w-md bg-white/10 backdrop-blur-3xl rounded-3xl shadow-xl border border-white/20 p-8 flex flex-col items-center transition-transform duration-500 hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl pointer-events-none"></div>

    <h2 className="text-white text-3xl font-bold mb-2 relative z-10">Welcome!</h2>
    <br></br>

    {error && (
      <p className="text-red-500 text-sm mb-4 text-center relative z-10">{error}</p>
    )}

    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3 bg-white/90 text-black font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-white/100 hover:scale-[1.02] transition-all relative z-10"
    >
      <FcGoogle size={22} />
      {loading ? "Processing..." : "Continue with Google"}
    </button>
  </div>
</div>

  );
}