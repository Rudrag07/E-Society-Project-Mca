import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Car, Zap, Droplets } from "lucide-react";

const services = [
  {
    title: "Parking Management",
    path: "/parking",
    img: "https://img.freepik.com/premium-photo/basement-garage-parking-lots-building-parking-area_1048944-12093649.jpg",
    desc: "Our society provides a well-organized parking system for residents and visitors with dedicated slots.",
    icon: <Car size={24} />,
    color: "blue"
  },
  {
    title: "Security Guard System",
    path: "/security",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/11/362654387/VS/IE/YF/12926718/apartment-security-guard-services-1000x1000.jpg",
    desc: "Professional security guards are available at the main gate 24/7 to ensure complete safety.",
    icon: <ShieldCheck size={24} />,
    color: "green"
  },
  {
    title: "Electricity Management",
    path: "/electricity",
    img: "https://tse3.mm.bing.net/th/id/OIP.xaDQPgPgG3EuHERziDrB_gHaE8",
    desc: "Stable electricity supply system with a robust backup generator for uninterrupted power.",
    icon: <Zap size={24} />,
    color: "yellow"
  },
  {
    title: "Water Supply System",
    path: "/WaterForm",
    img: "https://international.lubron.eu/wp-content/uploads/2019/03/Amended-building-services-2200x1518-2200x1518.jpg",
    desc: "Reliable 24/7 water supply system for all flats with smart pressure management.",
    icon: <Droplets size={24} />,
    color: "cyan"
  }
];

const MainServices = () => {
  return (
    <div className="bg-slate-950 min-h-screen font-sans overflow-x-hidden text-slate-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[45vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=80"
            alt="Main Services"
            className="w-full h-full object-cover opacity-40 scale-110 animate-pulse-slow"
          />
          {/* Enhanced Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="relative z-10 px-6">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 rounded-full uppercase">
            Core Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter animate-fade-down">
            Society <span className="text-blue-500">Main</span> Services
          </h1>
          <p className="text-slate-400 mt-6 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-up delay-300">
            Smart utility management designed for elite residential living. 
            Efficiency at your fingertips.
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <Link key={index} to={service.path} className="group">
              <div
                className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 
                hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-4 shadow-2xl animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Container with Dark Glass Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  
                  {/* Glowing Icon Tag */}
                  <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl text-blue-400 border border-white/10 shadow-2xl">
                    {service.icon}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-10 bg-slate-900">
                  <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                    {service.title}
                    <span className="w-8 h-1 bg-blue-600 rounded-full inline-block group-hover:w-20 group-hover:bg-yellow-400 transition-all duration-500"></span>
                  </h2>

                  <p className="text-slate-400 text-lg leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                    {service.desc}
                  </p>

                  <div className="flex items-center text-blue-500 font-bold text-lg group-hover:text-yellow-400 transition-all">
                    Access Portal <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-blue-600 to-cyan-400 group-hover:w-full transition-all duration-700"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="text-center py-16 text-slate-500 border-t border-slate-900 bg-black/50">
        <div className="flex justify-center gap-6 mb-6 opacity-50">
           <ShieldCheck size={20} /> <Car size={20} /> <Zap size={20} /> <Droplets size={20} />
        </div>
        <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
          © 2026 E-SOCIETY • Infrastructure Excellence • Crafted By Rudra
        </p>
      </footer>

      {/* --- CUSTOM DARK ANIMATIONS --- */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
        .animate-fade-down { animation: fadeDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-pulse-slow { animation: pulse-slow 15s infinite ease-in-out; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default MainServices;