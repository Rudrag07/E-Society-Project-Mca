import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // Premium Animations
import {
  Home,
  Info,
  Settings,
  Phone,
  LogOut,
  Menu,
  X,
  Building2,
  Sparkles
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = (path) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Security Protocol: Please Login First! 🛡️");
      navigate("/signup");
    } else {
      navigate(path);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to exit the secure portal? 🔒");
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Home", path: "/home1", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
    { name: "Services", path: "/services", icon: <Settings size={18} /> },
    { name: "Residence", path: "/residence", icon: <Building2 size={18} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- BRANDING LOGO --- */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-[2px]">
              <div className="bg-[#02040a] rounded-xl p-1.5">
                <Building2 className="text-amber-500" size={24} />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-amber-400 transition-colors">
              DWARKESH
            </h1>
            <span className="text-[8px] font-bold text-amber-500 tracking-[0.4em] uppercase">E-Society</span>
          </div>
        </motion.div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => checkAuth(item.path)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                isActive(item.path)
                  ? "text-amber-500"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isActive(item.path) && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
            </button>
          ))}
          
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-[#02040a] px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg transition-all"
          >
            <LogOut size={16} strokeWidth={3} />
            Logout
          </motion.button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE SIDEBAR MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full overflow-hidden bg-[#02040a]/95 backdrop-blur-3xl border-b border-white/5"
          >
            <div className="p-6 flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => checkAuth(item.path)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] ${
                    isActive(item.path) 
                      ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" 
                      : "bg-white/[0.02] text-slate-400 border border-white/5"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    {item.icon} {item.name}
                  </span>
                  {isActive(item.path) && <Sparkles size={14} />}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-[#02040a] p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] mt-2 shadow-xl"
              >
                <LogOut size={18} strokeWidth={3} /> Secure Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;