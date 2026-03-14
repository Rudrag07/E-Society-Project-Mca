import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Car, Zap, Droplets } from "lucide-react"; // Icons for extra flair

const services = [
  {
    title: "Parking Management",
    path: "/parking",
    img: "https://img.freepik.com/premium-photo/basement-garage-parking-lots-building-parking-area_1048944-12093649.jpg",
    desc: "Our society provides a well-organized parking system for residents and visitors with dedicated slots.",
    icon: <Car size={24} />
  },
  {
    title: "Security Guard System",
    path: "/security",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/11/362654387/VS/IE/YF/12926718/apartment-security-guard-services-1000x1000.jpg",
    desc: "Professional security guards are available at the main gate 24/7 to ensure complete safety.",
    icon: <ShieldCheck size={24} />
  },
  {
    title: "Electricity Management",
    path: "/electricity",
    img: "https://tse3.mm.bing.net/th/id/OIP.xaDQPgPgG3EuHERziDrB_gHaE8",
    desc: "Stable electricity supply system with a robust backup generator for uninterrupted power.",
    icon: <Zap size={24} />
  },
  {
    title: "Water Supply System",
    path: "/WaterForm",
    img: "https://international.lubron.eu/wp-content/uploads/2019/03/Amended-building-services-2200x1518-2200x1518.jpg",
    desc: "Reliable 24/7 water supply system for all flats with smart pressure management.",
    icon: <Droplets size={24} />
  }
];

const MainServices = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=80"
            alt="Main Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-slate-50"></div>
        </div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter animate-fade-down">
            Society <span className="text-yellow-400">Main</span> Services
          </h1>
          <p className="text-blue-100 mt-4 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-up delay-300">
            Core infrastructure services designed to provide a seamless living experience for every resident.
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <Link key={index} to={service.path} className="group">
              <div
                className="relative bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 
                hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Container with Overlay */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  
                  {/* Floating Icon Tag */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl text-blue-600 shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-black text-slate-800 mb-4 flex items-center gap-3">
                    {service.title}
                    <span className="w-8 h-1 bg-yellow-400 rounded-full inline-block group-hover:w-16 transition-all"></span>
                  </h2>

                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold text-lg group-hover:gap-4 gap-2 transition-all">
                    Explore Details <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- SIMPLE FOOTER --- */}
      <footer className="text-center py-10 text-slate-400 border-t border-slate-200 bg-white">
        <p className="text-xs font-bold tracking-[0.3em] uppercase">
          © 2026 E-Society Infrastructure Services
        </p>
      </footer>

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-down { animation: fadeDown 0.8s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.8s ease-out both; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default MainServices;