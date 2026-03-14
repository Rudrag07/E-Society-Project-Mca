import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Home,
  Info,
  Settings,
  Phone,
  LogOut,
  Menu,
  X,
  LayoutDashboard
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = (path) => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please Register First! 🛡️");
      navigate("/signup");
    } else {
      navigate(path);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("⚠ Are you sure you want to logout?");
    if (!confirmed) return;

    toast.success("Logout Successful ✅");
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };

  // Helper for active link style
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-slate-900/80 backdrop-blur-xl shadow-2xl py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO --- */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-full bg-white p-1.5 shadow-xl">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                alt="Logo"
                className="h-9 w-9 md:h-10 md:w-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
              />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter italic group-hover:text-yellow-400 transition-colors">
            E-SOCIETY
          </h1>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {[
            { name: "Home", path: "/home1", icon: <Home size={18} /> },
            { name: "About", path: "/about", icon: <Info size={18} /> },
            { name: "Services", path: "/services", icon: <Settings size={18} /> },
            { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => checkAuth(item.path)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
          
          <div className="w-[1px] h-6 bg-white/20 mx-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-2.5 rounded-xl font-black 
                       hover:bg-yellow-300 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-yellow-400/20"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2 text-white bg-white/10 rounded-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      <div 
        className={`absolute top-full left-0 w-full transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4">
          {[
            { name: "Home", path: "/home1", icon: <Home /> },
            { name: "About", path: "/about", icon: <Info /> },
            { name: "Services", path: "/services", icon: <Settings /> },
            { name: "Contact", path: "/contact", icon: <Phone /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => checkAuth(item.path)}
              className="flex items-center gap-4 text-white p-4 rounded-2xl bg-white/5 hover:bg-blue-600 transition-all font-bold"
            >
              {item.icon} {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 bg-yellow-400 text-slate-900 p-4 rounded-2xl font-black mt-2"
          >
            <LogOut size={20} /> LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;