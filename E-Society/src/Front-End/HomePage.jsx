import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Make sure to install: npm install framer-motion
import { CreditCard, ShieldCheck, Users, ChevronRight, Star, Mail, MapPin, Phone, CheckCircle2, Zap, Globe, Shield, Search } from "lucide-react";

// --- DYNAMIC DATA FOR STATS CARDS ---
const statsDetails = {
  security: {
    icon: <ShieldCheck size={40} className="text-yellow-500"/>,
    title: "Bank Grade Security",
    sub: "END-TO-END ENCRYPTION",
    details: [
      "End-to-end data encryption for all personal and financial details.",
      "Multi-factor authentication (MFA) for an extra layer of access protection.",
      "Real-time fraud detection algorithms monitoring system-wide transactions."
    ]
  },
  community: {
    icon: <Users size={40} className="text-yellow-500"/>,
    title: "Unified Community",
    sub: "100% RESIDENT CONNECTIVITY",
    details: [
      "Integrated member directory with instant chat and communication nodes.",
      "Digital bulletin board for meetings, announcements, and urgent notices.",
      "Polling and feedback systems for collective decision-making within the community."
    ]
  },
  cloud: {
    icon: <Globe size={40} className="text-yellow-500"/>,
    title: "Cloud Operations",
    sub: "DEPLOYING ANYWHERE",
    details: [
      "Access from any location on any device—web or mobile.",
      "Automated system updates and maintenance without any downtime.",
      "Real-time synchronized data backup and disaster recovery on global servers."
    ]
  }
};

const HomePage = () => {
  const [openStat, setOpenStat] = useState(null); // State for stats interaction

  return (
    <div className="bg-[#02040a] min-h-screen text-white font-sans overflow-x-hidden selection:bg-yellow-500/30">
      
      {/* --- FLOATING AMBIENT LIGHTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] animate-pulse delay-700" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[100vh] flex items-center justify-center px-6 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-10 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover scale-110 animate-slow-zoom opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#02040a]/70 to-[#02040a]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-12 animate-fade-down shadow-2xl">
            <Zap className="text-yellow-400 animate-pulse" size={16} />
            <span className="text-[15px] font-black tracking-[0.5em] uppercase text-white/80">Next-Gen Management Node</span>
          </div>

          {/* THE FIXED SINGLE-LINE MASTER TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-10 leading-tight tracking-tighter animate-fade-up">
            <span className="text-white hover:text-yellow-400 transition-colors duration-500">Welcome To</span>
            <span className="mx-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 italic drop-shadow-2xl">Dwarkesh E-Society</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed animate-fade-up delay-200 opacity-80">
            Smart Living For Modern Societies
            <span className="text-white border-b-2 border-yellow-500 ml-3 pb-1">Smart Technology</span> 
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up delay-500">
            <Link to="/signup">
              <button className="group relative px-14 py-5 bg-yellow-500 rounded-[2rem] text-black text-lg font-black transition-all hover:scale-110 uppercase hover:shadow-[0_0_60px_rgba(234,179,8,0.3)] active:scale-95 flex items-center gap-3 overflow-hidden">
                Get Started <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
            <Link to="/lernmore">
              <button className="px-10 py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] text-lg font-black uppercase tracking-widest hover:bg-white/10 hover:text-yellow-400 transition-all">
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- QUICK STATS / INTERACTIVE CARDS (Fixed Image 1) --- */}
      <div className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-up delay-700">
        {Object.entries(statsDetails).map(([key, item]) => (
          <div key={key} className="space-y-6">
            <div 
              onClick={() => setOpenStat(openStat === key ? null : key)} // Toggle click logic
              className={`bg-white/5 p-12 rounded-[3rem] border ${openStat === key ? 'border-yellow-500 shadow-2xl scale-[1.02]' : 'border-white/5'} flex flex-col items-center text-center cursor-pointer group transition-all duration-500 hover:border-yellow-500/50 hover:bg-yellow-500/5`}
            >
              <div className={`mb-6 ${openStat === key ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white group-hover:text-yellow-400">
                {item.title}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">
                {item.sub}
              </p>
              <div className="mt-8 text-slate-700 group-hover:text-yellow-500 flex items-center gap-2 text-xs font-bold uppercase">
                  {openStat === key ? "Minimize Details" : "View Details"} <ChevronRight size={14} className={`${openStat === key ? 'rotate-90' : ''} transition-transform`}/>
              </div>
            </div>

            {/* INTERACTIVE DETAIL EXPANSION (Accordian Style) */}
            <AnimatePresence>
              {openStat === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
                  className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden shadow-inner"
                >
                  <ul className="space-y-5 text-sm font-semibold text-slate-400 leading-relaxed italic border-l-2 border-yellow-500/30 pl-4">
                    {item.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2 hover:text-white">
                        <span className="text-yellow-500 font-black">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* --- DETAILED PREMIUM FOOTER --- */}
      <footer className="bg-black/80 border-t border-white/5 pt-32 pb-12 relative overflow-hidden backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            {/* Column 1: Brand Vision */}
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-white italic tracking-tighter flex items-center gap-3">
                <span className="w-12 h-1 bg-yellow-500 inline-block"></span>
                DWARKESH
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-loose uppercase tracking-wider opacity-60">
                Dwarkesh E-Society is a digital core for high-end residential management. Transforming community operations with precision tech.
              </p>
            </div>

            {/* Column 2: Full Detailed Features (Unchanged) */}
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10 text-yellow-500">Master Capabilities</h4>
              <ul className="space-y-5 text-slate-400 text-xs font-black uppercase tracking-widest">
                {[
                  "Fin-Tech Hub: Online billing & reports.",
                  "Gate Protocol: Secure visitor OTP entry.",
                  "Booking Matrix: Amenity reservations.",
                  "Service Node: Technician tracking live.",
                  "Digital Bulletin: Broadcast system.",
                  "Nexus Directory: Encrypted comunication.",
                  "SOS Terminal: Emergency response logic."
                ].map(feature => (
                  <li key={feature} className="flex items-center gap-3 group">
                     <CheckCircle2 size={16} className="text-yellow-500 group-hover:scale-110"/> <span className="group-hover:text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Navigation */}
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10 text-yellow-500">Quick Links</h4>
              <ul className="space-y-6 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
                <li><Link to="/" className="hover:text-white flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/> Home Core</Link></li>
                <li><Link to="/about" className="hover:text-white flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/> Node_About</Link></li>
                <li><Link to="/amenities" className="hover:text-white flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/> Node_Amenity</Link></li>
                <li><Link to="/contact" className="hover:text-white flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/> Node_Support</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10 text-yellow-500">Support Terminal</h4>
              <div className="space-y-6 text-slate-500 text-[10px] font-black uppercase tracking-widest leading-loose">
                <p className="flex items-start gap-3 hover:text-white transition-colors">
                  <MapPin size={18} className="text-yellow-500 shrink-0"/> Ahmedabad, Gujarat, India
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={18} className="text-yellow-500 shrink-0"/> support@esociety.com
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={18} className="text-yellow-500 shrink-0"/> +91 82007 92488
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Branding Bar */}
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[9px] text-slate-700 font-black tracking-[0.6em] uppercase text-center">
              © 2026 E-SOCIETY ECOSYSTEM | ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-right">
                <p className="text-[8px] text-slate-500 font-black tracking-widest uppercase leading-none">Architected by</p>
                <p className="text-sm text-yellow-500 font-black italic">Rudra Gelot</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-black text-xs">RG</div>
            </div>
          </div>
        </div>
      </footer>

      {/* --- PREMIUM DYNAMIC ANIMATIONS (Keeping existing + new) --- */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        .animate-fade-up { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-down { animation: fadeDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slow-zoom { animation: slowZoom 30s linear infinite alternate; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .delay-500 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        .delay-700 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default HomePage;