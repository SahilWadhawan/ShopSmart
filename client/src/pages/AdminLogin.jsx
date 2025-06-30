import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong Password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-12">
      <div className="bg-card-bg/80 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;