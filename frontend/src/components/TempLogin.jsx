import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TempLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // important if backend sets cookies
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      console.log("Login success:", data);
      navigate("/app");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed");
    }
  };

  // Google OAuth

  const handleGoogleLogin = () => {
    // ✅ Redirects to backend Google login (cookie will be set after callback)
    window.location.href = "http://localhost:8000/google/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Username / Password login */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <div className="flex items-center justify-center">
          <span className="text-gray-500">or</span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-slate-500 text-white rounded-lg hover:bg-state-600 flex items-center justify-center space-x-2"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </button>
      </form>
    </div>
  );
}
