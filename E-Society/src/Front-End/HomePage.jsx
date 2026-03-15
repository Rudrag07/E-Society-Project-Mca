import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, ShieldCheck, Users, ChevronRight, Star, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-32 md:pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover scale-110 animate-slow-zoom opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md mb-10 animate-fade-down">
            <Star className="text-yellow-400 fill-yellow-400" size={14} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-yellow-500">Premium Society Ecosystem</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter animate-fade-up">
            Smart <span className="text-yellow-400">Society</span>
            <br />
            <span className="text-white">Experience</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up delay-200">
            Digitalize your community with the ultimate 
            <span className="text-white underline decoration-yellow-500 underline-offset-8 ml-2 italic">
              E-Society Ecosystem
            </span>. 
            Secure, fast, and remarkably simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up delay-500">
            <Link to="/signup">
              <button className="group relative px-12 py-5 bg-yellow-500 rounded-2xl text-black text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(234,179,8,0.2)] flex items-center gap-2">
                Get Started <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/lernmore">
              <button className="px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-xl font-bold hover:bg-white/10 hover:text-yellow-400 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- DETAILED PREMIUM FOOTER --- */}
      <footer className="bg-slate-950 border-t border-yellow-500/20 pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            {/* Column 1: Brand Vision */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-yellow-400 italic tracking-tighter">E-SOCIETY</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Smart living starts here. Hum banate hain aapki society management ko digital, 
                secure aur super fast. Hamara vision hai har community ko ek intelligent 
                aur connected environment dena.
              </p>
            </div>

            {/* Column 2: Full Detailed Features (The requested 7-8 lines) */}
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-yellow-500 pl-3">Full System Details</h4>
              <ul className="space-y-4 text-slate-400 text-xs font-semibold">
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Maintenance Hub:** Online bill payments, automated receipts & financial reports.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Gate Protocol:** Digital visitor logs, pre-approved guest entries & OTP security.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Facility Manager:** Real-time booking for Gym, Clubhouse, and Community Halls.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Smart Helpdesk:** Raise maintenance tickets and track technician progress live.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Digital Bulletin:** Instant notifications for society meetings & urgent notices.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Resident Directory:** Secure list of all members for easy internal communication.</span>
                </li>
                <li className="flex items-start gap-2 hover:text-yellow-400 transition-colors">
                   <CheckCircle2 size={14} className="text-yellow-500 mt-1 shrink-0"/> 
                   <span>**Emergency SOS:** Quick alert system for medical or security emergencies.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation */}
            <div>
             <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-yellow-500 pl-3">Navigation</h4>
  <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-tighter">
    <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
    <li><Link to="/about" className="hover:text-yellow-400">Our Vision</Link></li>
    <li><Link to="/amenities" className="hover:text-yellow-400">Amenities</Link></li> {/* Protected */}
    <li><Link to="/contact" className="hover:text-yellow-400">Contact Support</Link></li>
  </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-yellow-500 pl-3">Reach Us</h4>
              <div className="space-y-4 text-slate-400 text-sm font-medium italic">
                <p className="flex items-start gap-3 hover:text-white transition-colors">
                  <MapPin size={18} className="text-yellow-500 shrink-0"/> Ahmedabad, Gujarat
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={18} className="text-yellow-500 shrink-0"/> support@esociety.com
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={18} className="text-yellow-500 shrink-0"/> +91 90000 00000
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Branding Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] text-slate-600 font-black tracking-[0.6em] uppercase text-center">
              © 2026 E-Society | Empowering Digital Living
            </div>
            <div className="flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-right">
                <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase leading-none">Developed by</p>
                <p className="text-sm text-yellow-500 font-black italic">Rudra Gelot</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-black text-xs">RG</div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-blob { animation: blob 10s infinite; }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .animate-fade-down { animation: fadeDown 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 30s linear infinite alternate; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default HomePage;