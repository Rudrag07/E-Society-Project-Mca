import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Home1 = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
            alt="Society"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-slate-50"></div>
        </div>

        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fade-down">
            Society <span className="text-yellow-400">Amenities</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-50 font-medium leading-relaxed drop-shadow-md animate-fade-up delay-300">
            Experience the pinnacle of modern living with our 
            world-class residential facilities.
          </p>
        </div>
      </section>

      {/* --- AMENITIES SECTION --- */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-20 md:space-y-32">

         {/* 1. Morden Flat */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-blue-600 bg-blue-100 rounded-full uppercase tracking-widest">Modern Area</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Morden Flat</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Every home in our society is a masterpiece of modern architecture, designed to maximize both space and natural ventilation. 
              Each flat features expansive floor-to-ceiling windows that offer breathtaking views of the city skyline.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-left">
            <img
              src="https://media.istockphoto.com/id/1027811130/photo/new-block-of-modern-apartments-stock-image.jpg?s=612x612&w=0&k=20&c=51Kc9YD6rXuU0G2c-4G1hFZ4aZ1UJeE_1n-1cgTfWO4="
              alt="Room"
              className="w-full h-[250px] md:h-[450px] object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>
       
       {/* 2. Beautiful Garden */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://i.pinimg.com/736x/42/f9/32/42f932ec7fd6568ec8c10f8f5bcf37d6.jpg"
              alt="Garden"
              className="w-full h-[250px] md:h-[450px] object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-green-600 bg-green-100 rounded-full uppercase tracking-widest">Nature & Peace</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Beautiful Garden</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
             Our society's garden is a meticulously landscaped "Lush Green Sanctuary" designed to provide a peaceful escape from the urban hustle. 
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>

        {/* 3. Kids Playground */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://www.shutterstock.com/image-photo/childrens-playground-variety-play-structures-600nw-2501204345.jpg"
              alt="Kids Playing"
              className="w-full h-[250px] md:h-[450px] object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-orange-600 bg-orange-100 rounded-full uppercase tracking-widest">Kids Zone</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Kids Playground</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Our society features a state-of-the-art playground equipped with modern slides, multi-level swings, and interactive climbing frames. 
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-xs uppercase">Rating 4.9/5</span>
            </div>
          </div>
        </div>

        {/* 4. Box Cricket Arena */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-red-600 bg-red-100 rounded-full uppercase tracking-widest">Sports Zone</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Box Cricket Area</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Unleash your inner athlete in our professional-grade Box Cricket Arena, featuring high-quality artificial turf.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-left">
            <img
              src="https://aesports.world/wp-content/uploads/slider/cache/cf6296db3da7bdc1395b227d152c81e7/box-cricket-ground.jpg"
              alt="Turf Cricket"
              className="w-full h-[250px] md:h-[450px] object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* 5. Infinite Swimming Pool */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group pb-20">
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Luxurious Society Pool"
              className="w-full h-[250px] md:h-[450px] object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-cyan-600 bg-cyan-100 rounded-full uppercase tracking-widest">Pure Relaxation</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Infinite Swimming Pool</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Experience the tranquility of a luxury resort with our crystal-clear, temperature-controlled infinite swimming pool.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white italic">E-SOCIETY</h3>
            <p className="leading-relaxed text-sm md:text-base">
              Redefining society living with smart technology. Trusted by thousands 
              of residents across India.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest">Quick Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[ 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}><Link to={`/${link.toLowerCase()}`} className="hover:text-blue-400 transition">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest">Connect</h4>
            <p className="text-sm">Email: dwarkesh@esociety.com</p>
            <p className="text-sm">Phone: +91 82007 92488</p>
            <p className="text-sm">Ahmedabad, Gujarat, India</p>
          </div>
        </div>
        <div className="text-center pt-8 text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-50">
          © 2026 E-Society. Crafted with ❤️ By Rudra
        </div>
      </footer>

      {/* --- CSS FOR ANIMATIONS --- */}
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
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(30px); }
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