import React from "react";
import { Link } from "react-router-dom";
import { Target, Eye, ShieldCheck, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-blue-500 selection:text-white text-slate-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover scale-105 animate-soft-zoom opacity-40"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 px-6 max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            About <span className="text-yellow-500">E-Society</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed drop-shadow-md">
            Revolutionizing community living through a seamless digital ecosystem. 
            Manage, Connect, and Thrive in your smart home.
          </p>
        </div>
      </section>

      {/* --- ABOUT INTRO --- */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800 rounded-full">
            The Digital Era
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            Connecting People, Enhancing Security, <br className="hidden md:block" /> and Simplifying Management.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed italic border-l-4 border-blue-600 pl-4 inline-block">
            "E-Society is not just a tool; it's a bridge between residents, 
            administrators, and security, creating a transparent environment 
            where everything is just a click away."
          </p>
        </div>
      </section>

      {/* --- WHAT IS E-SOCIETY (GRID) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Society Building"
              className="relative rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02] opacity-80"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white border-l-8 border-blue-600 pl-6">
              What is E-Society?
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              E-Society is an all-in-one cloud-based management system tailored for modern 
              residential complexes. From **maintenance payments** and **visitor tracking** to **amenity booking**, we bring efficiency to your doorstep.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-lg">
                <span className="block text-2xl font-bold text-blue-500">100%</span>
                <span className="text-sm text-slate-500 uppercase tracking-tighter">Paperless Process</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-lg">
                <span className="block text-2xl font-bold text-blue-500">24/7</span>
                <span className="text-sm text-slate-500 uppercase tracking-tighter">Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION (CARDS) --- */}
      <section className="bg-slate-900 py-24 px-6 text-white overflow-hidden relative border-y border-slate-800">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          <div className="bg-slate-800/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 hover:border-blue-500/50 transition duration-500">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
              <Target className="text-white" size={30} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              To empower society committees and residents with tech-driven tools 
              that reduce manual effort, ensure financial accuracy, and foster 
              a safe community environment.
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 hover:border-indigo-500/50 transition duration-500">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
              <Eye className="text-white" size={30} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              To become the global standard for smart residential management, 
              where every community is digitally connected, secure, and 
              environmentally sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (FEATURES) --- */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">
            Engineered for <span className="text-blue-500">Excellence</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Zap />, title: "Smart Management", desc: "Pay maintenance, raise complaints, and book slots in seconds." },
              { icon: <ShieldCheck />, title: "Secure & Transparent", desc: "End-to-end encrypted data with real-time audit logs for residents." },
              { icon: <Users />, title: "Community Connection", desc: "Stay updated with digital notices, polls, and upcoming events." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition duration-300 group">
                <div className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Link to="/MainServices">
              <button className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition duration-300">
                Explore Our Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-slate-500 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-slate-900 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white italic">E-SOCIETY</h3>
            <p className="leading-relaxed text-sm">
              Redefining society living with smart technology. Trusted by thousands 
              of residents across India.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest text-sm">Quick Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {['Home','Services', 'Contact'].map((link) => (
                <li key={link}><Link to={`/${link.toLowerCase()}`} className="hover:text-blue-400 transition">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest text-sm">Connect</h4>
            <div className="text-sm space-y-1">
              <p>Email: dwarkesh@esociety.com</p>
              <p>Phone: +91 82007 92488</p>
              <p className="text-blue-400">Ahmedabad, Gujarat, India</p>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 text-[10px] font-medium tracking-widest uppercase opacity-40">
          © 2026 E-Society. Crafted with ❤️ By Rudra
        </div>
      </footer>

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes soft-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-soft-zoom {
          animation: soft-zoom 20s infinite alternate ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;