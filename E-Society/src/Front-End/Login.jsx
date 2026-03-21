import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion"; 
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const Login = () => {
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
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Welcome Back to the Elite Club! 🎉");

      setTimeout(() => {
        navigate("/home1");
        window.location.reload(); 
      }, 1500);
    } else {
      toast.error("❌ Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[#02040a]">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- PREMIUM DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
          alt="society"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]"></div>
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-[30px] bg-white/[0.03] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="inline-block p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl text-yellow-500 mb-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5"
            >
              <ShieldCheck size={36} />
            </motion.div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
               <Sparkles size={12} className="text-yellow-500 animate-pulse" />
               <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Resident Authentication</span>
            </div>

            <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">
              Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Portal</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Registry Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-400 transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@residency.com"
                  className="w-full bg-white/[0.02] border border-white/5 text-white pl-14 pr-4 py-5 rounded-2xl focus:ring-2 focus:ring-yellow-500/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-slate-700 font-bold text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-400 transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/5 text-white pl-14 pr-14 py-5 rounded-2xl focus:ring-2 focus:ring-yellow-500/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-slate-700 font-bold text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(234, 179, 8, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-xs mt-8 shadow-2xl"
            >
              Authorize Login <ArrowRight size={16} strokeWidth={3} />
            </motion.button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">
              First Time Resident?{" "}
              <Link to="/signup" className="ml-2 text-yellow-500 hover:text-white transition-all underline underline-offset-4 decoration-yellow-500/30">
                Register Node
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-700 text-[9px] font-black mt-8 tracking-[0.6em] uppercase flex items-center justify-center gap-3">
           <span className="w-8 h-[1px] bg-slate-800"></span>
           Encrypted Session Active
           <span className="w-8 h-[1px] bg-slate-800"></span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;