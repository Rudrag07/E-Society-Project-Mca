import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation ke liye
import emailjs from '@emailjs/browser'; 
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  // --- SIGNUP LOGIC ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      to_name: user.name,
      to_email: user.email, 
      message: `Welcome to E-Society Premium Residency... (your message)`
    };

    try {
      await emailjs.send(
        'service_v3ka4ug',
        'template_5x0ai7o',
        templateParams,
        'W3tw55c7a7hY_QdNN'
      );

      toast.success("Account Created & Mail Sent! 📧");
      
      // ✅ Signup ke baad data save karein aur isLoggedIn true karein
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('isLoggedIn', 'true'); 

      setTimeout(() => navigate('/home1'), 1500);

    } catch (error) {
      toast.error("Check EmailJS Dashboard!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 font-sans relative overflow-hidden text-white">
      <Toaster position="top-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] p-8 md:p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Join <span className="text-amber-500 text-4xl">E-Society</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Premium Residency Portal</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Full Name</label>
            <input 
              required type="text" placeholder="Enter Name" 
              className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-amber-500/50 transition-all font-bold"
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Email Address</label>
            <input 
              required type="email" placeholder="name@email.com" 
              className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-amber-500/50 transition-all font-bold"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Secure Password</label>
            <div className="relative">
              <input 
                required 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 pr-12 text-white outline-none focus:border-amber-500/50 transition-all font-bold"
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all mt-4 flex items-center justify-center gap-2 ${
              loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 shadow-xl shadow-amber-500/20 active:scale-95'
            }`}
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs font-bold">
            Already have an account?
            {/* ✅ CHANGE: Yahan Navigate ka use kiya hai */}
            <button 
              onClick={() => navigate('/login')} 
              className="ml-2 text-amber-500 hover:text-orange-500 transition-colors uppercase tracking-widest text-[10px] font-black"
            >
              Login Here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;