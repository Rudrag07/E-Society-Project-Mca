import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
    { name: "Home", path: "/home1", icon: <Home size={22} /> },
    { name: "About", path: "/about", icon: <Info size={22} /> },
    { name: "Services", path: "/services", icon: <Settings size={22} /> },
    { name: "Residence", path: "/residence", icon: <Building2 size={22} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={22} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-[#02040a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
          : "bg-transparent"
      } ${scrolled ? "py-2 lg:py-3" : "py-4 lg:py-6"}`}
    >
      {/* Container - min-height fixed to keep everything centered */}
      <div className="w-full max-w-full px-6 md:px-12 flex justify-between items-center min-h-[60px] lg:min-h-[80px]">
        
        {/* --- LOGO (ALIGNED) --- */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 lg:gap-4 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-[2px]">
              <div className="bg-[#02040a] rounded-xl p-2 lg:p-2.5 flex items-center justify-center">
                <Building2 className="text-amber-500" size={26} lg:size={30} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl lg:text-3xl font-black text-white tracking-tighter leading-none group-hover:text-amber-400 transition-colors">
              DWARKESH
            </h1>
            <span className="text-[9px] lg:text-[12px] font-bold text-amber-500 tracking-[0.4em] uppercase mt-0.5">E-Society</span>
          </div>
        </motion.div>

        {/* --- DESKTOP NAVIGATION (CENTER ALIGNED) --- */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/[0.05] p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl h-fit">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => checkAuth(item.path)}
                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-amber-400"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {isActive(item.path) && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-amber-500/15 border border-amber-500/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  {item.icon}
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-[#02040a] px-8 py-3.5 rounded-xl font-black text-xs tracking-[0.15em] uppercase shadow-lg shrink-0 h-fit"
          >
            <LogOut size={20} strokeWidth={3} />
            Logout
          </motion.button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="lg:hidden flex items-center">
          <button
            className="p-3 text-white bg-white/10 rounded-xl border border-white/20 active:scale-90"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#02040a]/98 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
          >
            <div className="p-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => checkAuth(item.path)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                    isActive(item.path) 
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                      : "bg-white/[0.04] text-slate-300 border border-white/5"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    {React.cloneElement(item.icon, { size: 18 })} 
                    {item.name}
                  </span>
                  {isActive(item.path) && <Sparkles size={16} className="text-amber-500" />}
                </button>
              ))}
              <hr className="border-white/10 my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-[#02040a] p-4 rounded-xl font-black text-xs uppercase tracking-widest"
              >
                <LogOut size={18} strokeWidth={3} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;