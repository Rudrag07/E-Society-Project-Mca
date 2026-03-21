import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, MapPin, Send, ArrowLeft, ChevronRight, MessageSquare } from "lucide-react";

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
      toast.error("⚠️ Please fill all the fields");
      return;
    }

    toast.success("Thank you for your Feedback 😊");
    setFormData({ name: "", email: "", text: "" });
  };

  return (
    <div className="min-h-screen font-sans bg-[#02040a] text-slate-200 overflow-x-hidden">
      <Toaster position="top-center" />

      {/* --- BACKGROUND DECOR --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-6 py-12 md:py-24 z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase">
            Get In <span className="text-amber-500">Touch</span>
          </h1>
          <p className="text-slate-500 mt-6 text-sm md:text-lg font-bold uppercase tracking-[0.5em] opacity-60">
            Premium Support for Premium Living
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* --- INFO CARD (Left Side) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0a0c14] backdrop-blur-3xl p-8 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-8 italic tracking-tighter flex items-center gap-4 text-white uppercase">
                <span className="w-10 h-1px bg-amber-500 inline-block"></span>
                Inquiry Hub
              </h2>

              <p className="text-slate-400 text-base md:text-lg mb-12 leading-relaxed font-medium">
                Whether it's administrative queries or technical society management support, our core team is at your disposal 24/7.
              </p>

              <div className="space-y-10">
                {/* Email */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="p-5 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">Official Mail</h4>
                    <a href="mailto:dwarkeshsociety@gmail.com" className="text-lg md:text-xl font-bold text-white hover:text-amber-500 transition-colors">dwarkeshsociety@gmail.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="p-5 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">Admin Node</h4>
                    <a href="tel:+918200792488" className="text-lg md:text-xl font-bold text-white hover:text-blue-500 transition-colors">+91 82007 92488</a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="p-5 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-1">HQ Location</h4>
                    <p className="text-lg md:text-xl font-bold text-white">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Map Placeholder/Link */}
            <div className="mt-12 w-full h-32 rounded-[2rem] overflow-hidden border border-white/5 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-700 relative group">
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">View Live Map</span>
                </div>
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" alt="Map" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* --- FORM CARD (Right Side) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-950 p-8 md:p-16 rounded-[3.5rem] border border-white/5 shadow-inner"
          >
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center rounded-2xl text-amber-500">
                    <MessageSquare size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">Give A Small Feedback</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-4">Full Identity</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="EX: RUDRA GELOT"
                  className="w-full bg-[#0a0c14] px-8 py-6 rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-black text-sm text-white placeholder:text-slate-800 tracking-wider"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-4">Digital Mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="IDENTITY@GATEWAY.COM"
                  className="w-full bg-[#0a0c14] px-8 py-6 rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-black text-sm text-white placeholder:text-slate-800 tracking-wider"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-4">Transmission Content</label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  rows="5"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  className="w-full bg-[#0a0c14] px-8 py-6 rounded-3xl border border-white/5 focus:border-amber-500/50 outline-none transition-all font-bold text-sm text-white placeholder:text-slate-800 tracking-wider resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-black font-black py-6 rounded-3xl shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex items-center justify-center gap-4 text-xs uppercase tracking-[0.4em]"
              >
                <Send size={18} strokeWidth={3} /> Execute Dispatch
              </motion.button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <Link to="/home1" className="inline-flex items-center gap-3 text-slate-600 font-black hover:text-amber-500 transition-all text-[10px] uppercase tracking-[0.3em]">
                <ArrowLeft size={16} /> Secure Return to Dashboard
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/5">
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-3xl font-black text-white italic tracking-tighter flex items-center justify-center md:justify-start gap-3">
                <span className="bg-amber-500 text-black px-3 py-0.5 rounded-lg not-italic">E</span> SOCIETY
            </h3>
            <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-widest opacity-60">Elite Residency Management Framework. Delivering excellence to every square foot.</p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              <li><Link to="/home1" className="hover:text-amber-500 transition-colors">Home Core</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">System Intel</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Utility Matrix</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-8">Official Node</h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">
              Sector 7, Ahmedabad Central<br />
              Gujarat, India IN-380001
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12 text-[10px] font-black tracking-[0.5em] uppercase text-slate-800">
          © 2026 Core Infrastructure • Developed By Rudra Gelot
        </div>
      </footer>
    </div>
  );
};

export default Contact;