import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { Target, Eye, ShieldCheck, Zap, Users, ArrowRight, Sparkles, ChevronDown, Cloud, LayoutGrid } from "lucide-react";

const About = () => {
  // Independent state for all expandable sections
  const [activeId, setActiveId] = useState(null);

  const toggleSection = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="bg-[#02040a] min-h-screen font-sans selection:bg-amber-500 selection:text-black text-slate-400 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover scale-105 animate-soft-zoom opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl"
        >
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em] mb-6 block animate-pulse">
            Beyond Connectivity
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter italic uppercase leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">Digital Legacy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto border-l-4 border-amber-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            Revolutionizing community living through a seamless digital ecosystem. 
            <span className="text-white font-bold"> Manage, Connect, and Thrive</span> in your smart home.
          </p>
        </motion.div>
      </section>

      {/* --- ABOUT INTRO --- */}
      <section className="py-24 px-6 bg-[#02040a] relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Sparkles size={12} /> The Digital Era
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter uppercase italic leading-tight">
            Connecting People, Enhancing Security, <br className="hidden md:block" /> and <span className="text-amber-500">Simplifying Management.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed italic border-l-2 border-amber-500/30 pl-6 inline-block max-w-3xl">
            "E-Society is not just a tool; it's a bridge between residents, 
            administrators, and security, creating a transparent environment 
            where everything is just a click away."
          </p>
        </motion.div>
      </section>

      {/* --- WHAT IS E-SOCIETY --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Society Building"
              className="relative rounded-3xl shadow-2xl border border-white/5 opacity-70 grayscale hover:grayscale-0 transition duration-700"
            />
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic text-center lg:text-left">
              What is <span className="text-amber-500 text-6xl">?</span>
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
              {/* Box 1: Paperless */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={() => toggleSection('paperless')}
                className={`p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 active:scale-[0.98] ${activeId === 'paperless' ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-white/[0.02] hover:border-amber-500/40'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-amber-500 tracking-tighter">100% <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-2">Paperless Process</span></span>
                  <ChevronDown size={20} className={`transition-transform duration-500 ${activeId === 'paperless' ? 'rotate-180 text-amber-500' : 'text-slate-600'}`} />
                </div>
                <AnimatePresence>
                  {activeId === 'paperless' && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 text-sm text-slate-400 italic border-t border-white/5 pt-4 leading-relaxed overflow-hidden">
                      Go green with digital billing, automated receipts, and secure cloud-based document storage. No more physical registers or lost paperwork.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Box 2: Security */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                onClick={() => toggleSection('security')}
                className={`p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 active:scale-[0.98] ${activeId === 'security' ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-white/[0.02] hover:border-amber-500/40'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-amber-500 tracking-tighter">24/7 <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-2">Secure Node</span></span>
                  <ChevronDown size={20} className={`transition-transform duration-500 ${activeId === 'security' ? 'rotate-180 text-amber-500' : 'text-slate-600'}`} />
                </div>
                <AnimatePresence>
                  {activeId === 'security' && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 text-sm text-slate-400 italic border-t border-white/5 pt-4 leading-relaxed overflow-hidden">
                      End-to-end encrypted resident data and real-time visitor tracking systems ensure your peace of mind and society's safety around the clock.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Box 3: Smart Infrastructure */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onClick={() => toggleSection('smart')}
                className={`p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 active:scale-[0.98] ${activeId === 'smart' ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-white/[0.02] hover:border-amber-500/40'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="text-amber-500" size={28} />
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Smart Infrastructure</span>
                  </div>
                  <ChevronDown size={20} className={`transition-transform duration-500 ${activeId === 'smart' ? 'rotate-180 text-amber-500' : 'text-slate-600'}`} />
                </div>
                <AnimatePresence>
                  {activeId === 'smart' && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 text-sm text-slate-400 italic border-t border-white/5 pt-4 leading-relaxed overflow-hidden">
                      A unified digital dashboard to manage everything—from maintenance payments and slot booking to community polls and event updates.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="bg-white/[0.01] py-32 px-6 relative border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }} 
            className="bg-[#0a0c12] p-12 rounded-[3rem] border border-white/5 hover:border-amber-500/40 transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-amber-500/20 group-hover:rotate-12 transition-transform">
              <Target className="text-black" size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tighter">Our Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              To empower society committees and residents with tech-driven tools 
              that reduce manual effort, ensure financial accuracy, and foster 
              a safe community environment.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }} 
            className="bg-[#0a0c12] p-12 rounded-[3rem] border border-white/5 hover:border-orange-500/40 transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-orange-600/20 group-hover:-rotate-12 transition-transform">
              <Eye className="text-white" size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tighter">Our Vision</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              To become the global standard for smart residential management, 
              where every community is digitally connected, secure, and 
              environmentally sustainable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-32 px-6 bg-[#02040a]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-20 tracking-tighter uppercase italic"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Excellence</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'f1', icon: <Zap size={24} />, title: "Smart Logic", desc: "Automated maintenance and slot booking.", info: "Pay maintenance and book clubhouse slots with instant digital receipts." },
              { id: 'f2', icon: <ShieldCheck size={24} />, title: "Bank Security", desc: "End-to-end encrypted resident data.", info: "Enterprise-grade firewalls and encryption protocols to protect your privacy." },
              { id: 'f3', icon: <Users size={24} />, title: "Elite Network", desc: "Digital polls and community updates.", info: "Stay connected with real-time notices and participate in society voting." }
            ].map((f, i) => (
              <motion.div 
                key={f.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toggleSection(f.id)}
                className={`p-10 rounded-[2.5rem] border transition-all duration-500 text-left cursor-pointer active:bg-amber-500/5 ${activeId === f.id ? 'bg-amber-500/10 border-amber-500' : 'bg-white/[0.02] border-white/5 hover:border-amber-500/30'}`}
              >
                <div className={`w-12 h-12 mb-8 transition-colors ${activeId === f.id ? 'text-white' : 'text-amber-500'}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter italic">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-bold">{f.desc}</p>
                <AnimatePresence>
                  {activeId === f.id && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-white/10 text-[11px] text-amber-500 font-bold italic overflow-hidden">
                      {f.info}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-24">
            <Link to="/MainServices">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-amber-500/20"
              >
                Explore Services <ArrowRight className="inline ml-2" size={16} strokeWidth={3} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-slate-600 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 pb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">E-SOCIETY</h3>
            <p className="leading-relaxed text-sm font-bold">
              Redefining society living with smart technology. <br />
              <span className="text-amber-500/50 italic tracking-widest text-[10px]">PREMIUM RESIDENCY NODE</span>
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Navigation</h4>
            <ul className="grid grid-cols-2 gap-4 text-[11px] font-black uppercase tracking-widest">
              {['Home','Services', 'Contact'].map((link) => (
                <li key={link}><Link to={`/${link.toLowerCase()}`} className="hover:text-amber-500 transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Connect</h4>
            <div className="text-[11px] font-bold space-y-2 uppercase tracking-widest">
              <p>dwarkesh@esociety.com</p>
              <p className="text-amber-500">+91 82007 92488</p>
              <p className="opacity-40">Ahmedabad, Gujarat, India</p>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 text-[9px] font-black tracking-[0.5em] uppercase opacity-20">
          © 2026 E-SOCIETY • CRAFTED BY RUDRA
        </div>
      </footer>

      <style>{`
        @keyframes soft-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-soft-zoom {
          animation: soft-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default About;