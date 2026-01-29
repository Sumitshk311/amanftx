import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState(""); // State ka naam username hai
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Yahan check kijiye: username "admin@aman" hona chahiye
    if (username === "admin@aman" && password === "aman123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl max-w-md w-full">
        <h2 className="text-3xl font-black text-white italic uppercase mb-8 text-center">
          Admin <span className="text-purple-500">Access</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="text" // 'username' koi valid type nahi hota, 'text' use karein
            placeholder="Username"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Yahan 'setUsername' hona chahiye tha
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-500/20">
            Login Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;