import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; 
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      to_name: user.name,
      to_email: user.email, 
      message: `Welcome to E-Society Premium Residency! Your journey to an elite lifestyle begins here.`
    };

    try {
      await emailjs.send(
        'service_v3ka4ug',
        'template_5x0ai7o',
        templateParams,
        'W3tw55c7a7hY_QdNN'
      );

      toast.success("Welcome to the Elite Club! 📧");
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('isLoggedIn', 'true'); 

      setTimeout(() => navigate('/home1'), 2000);
    } catch (error) {
      toast.error("Network Error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02040a] p-4 font-sans relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* --- PREMIUM DYNAMIC BACKGROUND WITH FLAT IMAGE --- */}
      <div className="absolute inset-0 z-0">
        {/* Background Image with Zoom Animation */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Flat" 
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] z-1" />
        <div className="absolute inset-0 bg-black/40 z-1" />

        {/* Animated Orbs (Kept subtle for extra depth) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-amber-600/20 rounded-full blur-[100px] z-2" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-[480px]"
      >
        {/* Main Card with Glassmorphism */}
        <div className="bg-black/40 backdrop-blur-[25px] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="inline-flex p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-[1.5rem] border border-amber-500/30 mb-6 shadow-lg shadow-amber-500/10"
            >
              <ShieldCheck className="text-amber-500" size={36} />
            </motion.div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
               <Sparkles size={14} className="text-amber-500 animate-pulse" />
               <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">Gate Protocol Active</span>
            </div>

            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              DWARKESH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">RESIDENCY</span>
            </h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {[
              { label: 'Resident Name', icon: User, placeholder: 'Enter Full Name', field: 'name', type: 'text' },
              { label: 'Official Email', icon: Mail, placeholder: 'name@esociety.com', field: 'email', type: 'email' }
            ].map((input) => (
              <div key={input.field} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">{input.label}</label>
                <div className="group relative flex items-center bg-white/[0.05] border border-white/10 rounded-2xl transition-all duration-300 focus-within:border-amber-500/50 focus-within:bg-white/[0.08]">
                  <input.icon className="absolute left-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                  <input 
                    required 
                    type={input.type}
                    placeholder={input.placeholder} 
                    className="w-full bg-transparent p-5 pl-14 text-white outline-none font-bold placeholder:text-slate-600 text-sm"
                    onChange={(e) => setUser({...user, [input.field]: e.target.value})}
                  />
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Secure Password</label>
              <div className="group relative flex items-center bg-white/[0.05] border border-white/10 rounded-2xl transition-all duration-300 focus-within:border-amber-500/50">
                <Lock className="absolute left-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-transparent p-5 pl-14 pr-14 text-white outline-none font-bold placeholder:text-slate-600 text-sm"
                  onChange={(e) => setUser({...user, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 text-slate-500 hover:text-amber-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(245, 158, 11, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all mt-6 flex items-center justify-center gap-3 relative ${
                loading 
                ? 'bg-slate-800 text-slate-500' 
                : 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-black'
              }`}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" className="flex items-center gap-3">
                    <div className="w-5 h-5 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
                    Syncing Node...
                  </motion.div>
                ) : (
                  <motion.div key="text" className="flex items-center gap-2">
                    Initialize Account <ArrowRight size={18} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <div className="mt-10 text-center border-t border-white/10 pt-8">
            <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase">
              Existing Resident?
              <button 
                onClick={() => navigate('/login')} 
                className="ml-3 text-amber-500 hover:text-white transition-all underline underline-offset-4"
              >
                Access Portal
              </button>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-8 gap-2">
          <p className="text-slate-600 text-[9px] font-black tracking-[0.6em] uppercase">
            Encrypted with 256-bit SSL
          </p>
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;