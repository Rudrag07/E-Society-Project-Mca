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

         {/* 2. Comfortable Rooms */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-blue-600 bg-blue-100 rounded-full uppercase tracking-widest">Modern Area</div>
            <h2 className="text-4xl font-black text-slate-800">Morden Flat</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every home in our society is a masterpiece of modern architecture, designed to maximize both space and natural ventilation. 
  Each flat features expansive floor-to-ceiling windows that offer breathtaking views of the city skyline while flooding your living spaces with natural light. 
  Our residences are crafted with high-end finishes, premium vitrified flooring, and smart home ready-infrastructure for a truly contemporary lifestyle. 
  The open-concept layout ensures a seamless flow between the living, dining, and kitchen areas, making it perfect for family gatherings and entertaining guests. 
  With soundproof walls and private balconies, your flat serves as a serene sanctuary where luxury meets daily comfort in perfect harmony.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-left">
            <img
              src="https://media.istockphoto.com/id/1027811130/photo/new-block-of-modern-apartments-stock-image.jpg?s=612x612&w=0&k=20&c=51Kc9YD6rXuU0G2c-4G1hFZ4aZ1UJeE_1n-1cgTfWO4="
              alt="Room"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>
       
       {/* 2. Beautiful Garden */}
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
             Our society's garden is a meticulously landscaped "Lush Green Sanctuary" designed to provide a peaceful escape from the urban hustle. 
  It features a diverse collection of exotic flora, dedicated meditation zones, and jogging tracks paved with premium organic materials for your morning rituals. 
  As evening falls, the garden transforms into a magical space with sophisticated ambient LED lighting, creating a luxury resort-like atmosphere right at your doorstep. 
  Designed as a multi-generational hub, it offers quiet sitting corners for senior citizens and open, nature-rich spaces for children to connect with the environment. 
  The oxygen-rich environment and the soothing sound of water features ensure that every moment spent here contributes to your physical health and mental tranquility.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>

        {/* 3. Kids Playground - With Slides & Swings */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://www.shutterstock.com/image-photo/childrens-playground-variety-play-structures-600nw-2501204345.jpg"
              alt="Kids Playing on Slides"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-orange-600 bg-orange-100 rounded-full uppercase tracking-widest">Kids Zone</div>
            <h2 className="text-4xl font-black text-slate-800">Kids Playground</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our society features a state-of-the-art playground equipped with modern slides, multi-level swings, and interactive climbing frames. 
              Designed with a "Safety-First" approach, the area uses premium EPDM rubber flooring to prevent injuries during play. 
              It serves as a vibrant social hub where children can develop motor skills and build lifelong friendships within a secure gated environment. 
              Whether it’s a weekend morning or a breezy evening, this zone is always filled with the joy and energy of our youngest residents.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 4.9/5</span>
            </div>
          </div>
        </div>

        {/* 4. Box Cricket Arena */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-red-600 bg-red-100 rounded-full uppercase tracking-widest">Sports Zone</div>
            <h2 className="text-4xl font-black text-slate-800">Box Cricket Area</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Unleash your inner athlete in our professional-grade Box Cricket Arena, featuring high-quality artificial turf and high-tension netting. 
              The arena is perfectly illuminated with professional floodlights, making it ideal for high-energy matches even after sunset. 
              It provides a dedicated space for fitness enthusiasts to engage in healthy competition without ever leaving the society premises. 
              From friendly neighborhood tournaments to intense weekend practice sessions, this facility is the heart of our community's sporting spirit.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-left">
            <img
              src="https://aesports.world/wp-content/uploads/slider/cache/cf6296db3da7bdc1395b227d152c81e7/box-cricket-ground.jpg"
              alt="Turf Cricket"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* 5. Infinite Swimming Pool */}
        <div className="grid lg:grid-cols-2 gap-16 items-center group pb-20">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl animate-fade-right">
            <img
              src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Luxurious Society Pool"
              className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-sm font-bold text-cyan-600 bg-cyan-100 rounded-full uppercase tracking-widest">Pure Relaxation</div>
            <h2 className="text-4xl font-black text-slate-800">Infinite Swimming Pool</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Experience the tranquility of a luxury resort with our crystal-clear, temperature-controlled infinite swimming pool. 
              The pool area features elegant sun loungers and a separate, shallow splash zone designed specifically for the safety of children. 
              Our advanced filtration system ensures the highest standards of hygiene and water clarity for a refreshing dip at any time of day. 
              It is the perfect spot for residents to unwind, stay fit, or simply enjoy a peaceful sunset by the water within the comfort of their home complex.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit">
               <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
               <span className="text-slate-400 font-bold border-l pl-4 text-sm uppercase">Rating 5/5</span>
            </div>
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