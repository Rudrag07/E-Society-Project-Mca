import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Home1 = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-slate-50"></div>
        </div>

        <div className="relative z-10 px-6 max-w-4xl">
          {/* Animated Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fade-down">
            Society <span className="text-yellow-400">Amenities</span>
          </h1>
          {/* Animated Subtitle */}
          <p className="text-xl md:text-2xl text-blue-50 font-medium leading-relaxed drop-shadow-md animate-fade-up delay-300">
            Experience the pinnacle of modern living with our 
            world-class residential facilities.
          </p>
        </div>
      </section>

      {/* --- AMENITIES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">

        {/* 1. Beautiful Garden */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://i.pinimg.com/736x/42/f9/32/42f932ec7fd6568ec8c10f8f5bcf37d6.jpg"
              alt="Garden"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-green-600 bg-green-100 rounded-full uppercase tracking-widest">Nature & Peace</div>
            <h2 className="text-4xl font-black text-slate-800">Beautiful Garden</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our society includes a lush green sanctuary designed for total relaxation. 
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>

        {/* 2. Comfortable Rooms */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-blue-600 bg-blue-100 rounded-full uppercase tracking-widest">Modern Living</div>
            <h2 className="text-4xl font-black text-slate-800">Comfortable Rooms</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every home in our society is a masterpiece of space and ventilation. 
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-left">
            <img
              src="https://th.bing.com/th/id/OIP.u6xU6HycSxLdPZUz8zp5NgHaEJ?w=263&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
              alt="Room"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Baki sections (Cricket, Playground) mein bhi same animate-fade-right/left classes apply karein */}

      </section>

      {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-down { animation: fadeDown 1s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-right { animation: fadeRight 1s ease-out forwards; }
        .animate-fade-left { animation: fadeLeft 1s ease-out forwards; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default Home1;