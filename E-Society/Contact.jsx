import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.text) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    toast.success("Feedback Received! 😊");
    setFormData({ name: "", email: "", text: "" });
  };

  // Animation Variants for Smooth Staggered entry
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen font-sans bg-[#02040a] text-slate-200 overflow-x-hidden selection:bg-amber-500/30">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- VOID BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-5 py-10 md:py-20 z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 md:mb-24"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter italic uppercase leading-none">
            Get In <span className="text-amber-500">Touch</span>
          </h1>
          <p className="text-slate-500 mt-6 text-[10px] md:text-sm font-black uppercase tracking-[0.5em] opacity-80">
            Premium Support for Premium Living
          </p>
        </motion.div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch"
        >
          
          {/* --- INFO CARD (Left Side) --- */}
          <motion.div 
            variants={itemVars}
            className="bg-[#0a0c14]/80 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-8 italic tracking-tighter flex items-center gap-4 text-white uppercase">
                <span className="w-8 h-[2px] bg-amber-500 inline-block group-hover:w-16 transition-all duration-500"></span>
                Inquiry Hub
              </h2>

              <p className="text-slate-400 text-sm md:text-lg mb-10 leading-relaxed font-medium">
                Whether it's administrative queries or technical society management support, our core team is at your disposal 24/7.
              </p>

              <div className="space-y-8 md:space-y-10">
                {/* Email */}
                <div className="flex items-start md:items-center gap-5 group/item">
                  <div className="p-4 md:p-5 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20 group-hover/item:bg-amber-500 group-hover/item:text-black transition-all duration-500 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">Official Mail</h4>
                    <a href="mailto:dwarkeshsociety@gmail.com" className="text-sm md:text-xl font-bold text-white hover:text-amber-500 transition-colors break-words">dwarkeshsociety@gmail.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start md:items-center gap-5 group/item">
                  <div className="p-4 md:p-5 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-500 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">Admin Node</h4>
                    <a href="tel:+918200792488" className="text-sm md:text-xl font-bold text-white hover:text-blue-500 transition-colors">+91 82007 92488</a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start md:items-center gap-5 group/item">
                  <div className="p-4 md:p-5 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-500 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">HQ Location</h4>
                    <p className="text-sm md:text-xl font-bold text-white">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
           {/* --- AHMEDABAD LIVE MAP SECTION --- */}
<a 
  href="https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0204736,72.439311,12z" 
  target="_blank" 
  rel="noopener noreferrer"
  className="mt-12 block w-full h-32 md:h-40 rounded-[2rem] overflow-hidden border border-white/5 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700 relative group/map cursor-pointer"
>
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 group-hover/map:bg-black/20 transition-colors z-10">
        <MapPin className="text-amber-500 mb-2 group-hover/map:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Explore Ahmedabad Node</span>
    </div>
    
    {/* Ahmedabad Map Satellite/Stylized Image */}
    <img 
      src="https://images.unsplash.com/photo-1595954421407-ad5e012b25e5?auto=format&fit=crop&q=80&w=1000" 
      alt="Ahmedabad Map" 
      className="w-full h-full object-cover scale-125 group-hover/map:scale-100 transition-transform duration-[2000ms] ease-out" 
    />
</a>
          </motion.div>

          {/* --- FORM CARD (Right Side) --- */}
          <motion.div 
            variants={itemVars}
            className="bg-slate-950 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-inner"
          >
            <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 flex items-center justify-center rounded-2xl text-amber-500">
                    <MessageSquare size={20} />
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase">Feedback Node</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Full Identity</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="EX: RUDRA GELOT"
                  className="w-full bg-[#0a0c14] px-6 md:px-8 py-5 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-bold text-xs md:text-sm text-white placeholder:text-slate-800 tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Digital Mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="IDENTITY@GATEWAY.COM"
                  className="w-full bg-[#0a0c14] px-6 md:px-8 py-5 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-bold text-xs md:text-sm text-white placeholder:text-slate-800 tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Transmission Content</label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  rows="4"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  className="w-full bg-[#0a0c14] px-6 md:px-8 py-5 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-bold text-xs md:text-sm text-white placeholder:text-slate-800 tracking-wider resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-black font-black py-5 md:py-6 rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(245,158,11,0.1)] flex items-center justify-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.4em]"
              >
                <Send size={16} strokeWidth={3} /> Execute Dispatch
              </motion.button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <Link to="/home1" className="inline-flex items-center gap-3 text-slate-600 font-black hover:text-amber-500 transition-all text-[9px] uppercase tracking-[0.3em]">
                <ArrowLeft size={14} /> Secure Return to Dashboard
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/5 pt-16 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-16 border-b border-white/5">
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter flex items-center justify-center md:justify-start gap-3">
                <span className="bg-amber-500 text-black px-2 py-0.5 rounded-md not-italic">E</span> SOCIETY
            </h3>
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest opacity-60 max-w-xs mx-auto md:mx-0">
              Elite Residency Management Framework. Delivering excellence to every square foot.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8">Navigation</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              <li><Link to="/home1" className="hover:text-amber-500 transition-colors">Home Core</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">System Intel</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Utility Matrix</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8">Official Node</h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">
              Sector 7, Ahmedabad Central<br />
              Gujarat, India IN-380001
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10 text-[9px] font-black tracking-[0.5em] uppercase text-slate-800 px-4">
          © 2026 Core Infrastructure • Developed By Rudra Gelot
        </div>
      </footer>
    </div>
  );
};

export default Contact;