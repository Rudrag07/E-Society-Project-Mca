import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!email || !password) {
      toast.error("⚠ Please fill all fields");
      return;
    }

    if (user && user.email === email && user.password === password) {
      toast.success("🎉 Login Successful");
      setTimeout(() => {
        navigate("/home1");
      }, 1500);
    } else {
      toast.error("❌ Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-slate-950">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- PREMIUM BACKGROUND --- */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
        alt="society"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>

      {/* Animated Blobs for depth */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-md animate-zoom-in">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-[2.5rem] p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-yellow-500 rounded-2xl text-slate-900 mb-4 shadow-lg shadow-yellow-500/30">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Welcome <span className="text-yellow-400">Back</span>
            </h2>
            <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-[0.2em]">Login to your society portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-slate-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-12 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-slate-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Password Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black transition-all transform active:scale-95 shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 text-lg"
            >
              <LogIn size={20} /> Login
            </button>

          </form>

          <p className="text-center mt-8 text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-400 font-bold hover:underline transition-all">
              Signup
            </Link>
          </p>

        </div>
      </div>

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-zoom-in { animation: zoomIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}