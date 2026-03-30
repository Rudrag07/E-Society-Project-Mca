import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Home1 = () => {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // --- FULL GALLERY DATA (6 Images Per Category) ---
  const galleryData = {
    modernFlat: {
      title: "Modern Premium Flats",
      images: [
        "https://www.piramalrealty.com/_next/image?url=%2Fimages%2Faranya-gallery-int-5-Big.jpg&w=3840&q=75",
        "https://aiginroyalpark.com/wp-content/uploads/2023/11/5.png.webp",
        "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2000",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000",
        "https://thumbs.dreamstime.com/b/modern-apartment-balcony-coffee-table-sunrise-view-ultra-realistic-high-resolution-image-featuring-cozy-lush-green-377621092.jpg",
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      ]
    },
    garden: {
      title: "Lush Green Sanctuary",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000",
        "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=2000",
        "https://i1.pickpik.com/photos/123/403/726/butchart-botanical-garden-butchart-gardens-garden-preview.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/52/72/b1/dsc-0143-largejpg.jpg?w=900&h=-1&s=1",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQpzW1zQpac-se4nWmd3tFBGS_6EwUP_PGld1Y6ufwIDCymMY1cfvRQBUuSHqpwBlocdM9K6qnRnOUszfobGEDdFmU58AF24RHBp-FcKIKqlCD9yJfHRUEaAJ_T5Z3Zd_zBGoOlwGiInQ/s1600/vansda_waghai02+(1).jpg",
        "https://assets-news.housing.com/news/wp-content/uploads/2022/10/25153339/Lucknow-Botanical-Garden1.jpg",
      ]
    },
    kidsZone: {
      title: "Champions Playground",
      images: [
        "https://media.istockphoto.com/id/1447832543/photo/group-of-happy-playful-indian-children-running-outdoors-in-spring-park-asian-kids-playing-in.jpg?s=612x612&w=0&k=20&c=c1JCV-NURNagxi0g4WnjjDtwf7TVo4KQdBBnFPRUOD0=",
        "https://media.telanganatoday.com/wp-content/uploads/2023/05/Untitled-1-42.jpg",
        "https://t3.ftcdn.net/jpg/08/16/25/30/360_F_816253066_B3aeDJyAdcmKpWfa8ACVqf7XtD5qvtzr.jpg",
        "https://th-i.thgim.com/public/news/cities/chennai/c89jma/article34245110.ece/alternates/LANDSCAPE_1200/04dcangrparkJPG",
        "https://img-cdn.publive.online/fit-in/1200x675/english-betterindia/media/media_files/uploads/2023/07/Playgrounds-for-India-Anthill-Feature-Image-1689852969.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2023/6/320517670/JK/ZL/TZ/13936208/school-playground-slide-swing.jpg",
      ]
    },
    cricket: {
      title: "Elite Sports Arena",
      images: [
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000",
        "https://images.unsplash.com/photo-1593766788306-28561086694e?q=80&w=2000",
        "https://blog.playo.co/wp-content/uploads/2025/10/Box-cricket-pitch-2.webp",
        "https://assportsandinfra.com/wp-content/uploads/2025/09/box-cricket-setup-cost.jpg",
        "https://d3mt0x61rkkfy3.cloudfront.net/venue/b22289cf-9262-4495-8bc7-698354cb0f1b/original/1711879275-image_cropper_1711879253005.jpg?v=ab1ff4eb93b72eb75f2afa2418d486d0",
        "https://boxcricketnearme.com/wp-content/uploads/2025/05/converted_image-19.webp",
      ]
    },
    pool: {
      title: "Infinity Azure Pool",
      images: [
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000",
        "https://assets.architecturaldigest.in/photos/626137184979b30fbf2ed14f/16:9/w_1280,c_limit/Most%20beautifully%20designed%20swimming%20pools%20in%20India.jpg",
        "https://3.imimg.com/data3/BE/RG/MY-10160686/swimming-pool.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2024/3/401607778/WW/XY/WL/9324876/whatsapp-image-2024-03-18-at-3-55-09-pm.jpeg",
        "https://content3.jdmagicbox.com/v2/comp/pathankot/w5/9999px186.x186.251129073523.p1w5/catalogue/the-golden-cherry-swimming-pool-sujanpur-pathankot-swimming-pools-kraowdyeum.jpg",
        "https://content3.jdmagicbox.com/v2/comp/raichur/r5/9999p8532.8532.250805120415.h9r5/catalogue/ktc-swimming-pool-rajendra-gunj-raichur-swimming-pools-9ffp2bgfyy.jpg",
      ]
    },
    gym: {
  title: "Elite Fitness Center",
  images: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2000",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2000",
    "https://media.assettype.com/deccanherald%2F2025-03-01%2F74jyoob8%2Ffile7zg3m9vheg51nfwy8jf6.jpg?w=undefined&auto=format%2Ccompress&fit=max",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000"
  ]
},
  };

  const handleNext = (e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev + 1) % galleryData[selectedGallery].images.length); };
  const handlePrev = (e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev - 1 + galleryData[selectedGallery].images.length) % galleryData[selectedGallery].images.length); };

  return (
    <div className="bg-slate-950 min-h-screen font-sans overflow-x-hidden text-slate-200">
      
      {/* --- LIGHTBOX (ONE BY ONE IMAGE VIEW) --- */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/98 flex items-center justify-center p-4"
            onClick={() => setActiveImageIndex(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-amber-500 z-[260] bg-white/10 p-2 rounded-full"><X size={35}/></button>
            <button onClick={handlePrev} className="absolute left-4 md:left-10 p-4 bg-white/5 hover:bg-amber-500 rounded-full text-white transition-all z-[260]"><ChevronLeft size={40}/></button>
            <motion.img 
              key={activeImageIndex} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={galleryData[selectedGallery].images[activeImageIndex]} 
              className="max-h-[85vh] max-w-full rounded-lg shadow-[0_0_50px_rgba(0,0,0,1)] object-contain border border-white/10"
            />
            <button onClick={handleNext} className="absolute right-4 md:right-10 p-4 bg-white/5 hover:bg-amber-500 rounded-full text-white transition-all z-[260]"><ChevronRight size={40}/></button>
            <div className="absolute bottom-10 text-white font-black bg-amber-600/20 backdrop-blur-md px-8 py-2 rounded-full border border-amber-500/30">
              IMAGE {activeImageIndex + 1} OF 6
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- GRID GALLERY MODAL --- */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setSelectedGallery(null)} className="absolute top-8 right-8 text-white bg-white/10 p-3 rounded-full hover:bg-red-500/20 transition-all"><X size={30} /></button>
            <div className="max-w-6xl w-full">
              <div className="text-center mb-10">
                <p className="text-amber-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">Detailed Showcase</p>
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{galleryData[selectedGallery].title}</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
                {galleryData[selectedGallery].images.map((img, index) => (
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }} onClick={() => setActiveImageIndex(index)}
                    key={index} className="relative group overflow-hidden rounded-3xl aspect-video border border-white/5 cursor-pointer shadow-2xl"
                  >
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Detail View" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                       <div className="flex flex-col items-center gap-2">
                          <ZoomIn className="text-amber-500" size={30} />
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Enlarge Image</span>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80" alt="Society" className="w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950"></div>
        </div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter italic uppercase animate-fade-down leading-none">
            Society <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Privileges</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold tracking-[0.4em] uppercase mb-12 animate-fade-up">Experience the Gold Standard of Living</p>
        </div>
      </section>

      {/* --- AMENITIES SECTION (ALL ORIGINAL TEXT RESTORED) --- */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-20 md:space-y-32">

        {/* 1. Modern Flat */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-blue-400 bg-blue-900/30 border border-blue-800 rounded-full uppercase tracking-widest">Modern Area</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Modern Flat</h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Every home in our society is a masterpiece of modern architecture, designed to maximize both space and natural ventilation. We focus on "Smart Living" with integrated automated systems.
            </p>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
               <div className="flex text-yellow-500"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-500 font-bold border-l border-slate-700 pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
          <div onClick={() => setSelectedGallery('modernFlat')} className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-left cursor-pointer group/item">
            <img src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=" alt="Flat" className="w-full h-[250px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/20">Click to View 6 Photos</span>
            </div>
          </div>
        </div>
        
        {/* 2. Beautiful Garden */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div onClick={() => setSelectedGallery('garden')} className="order-1 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-right cursor-pointer group/item">
            <img src="https://i.pinimg.com/736x/42/f9/32/42f932ec7fd6568ec8c10f8f5bcf37d6.jpg" alt="Garden" className="w-full h-[250px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/20">View Garden Gallery</span>
            </div>
          </div>
          <div className="order-2 space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-green-400 bg-green-900/30 border border-green-800 rounded-full uppercase tracking-widest">Nature & Peace</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Beautiful Garden</h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Our society's garden is a meticulously landscaped "Lush Green Sanctuary" designed to provide a peaceful escape. It features a wide variety of exotic plants and a dedicated Zen zone.
            </p>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
               <div className="flex text-yellow-500"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-500 font-bold border-l border-slate-700 pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>

        {/* 3. Kids Playground */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-orange-400 bg-orange-900/30 border border-orange-800 rounded-full uppercase tracking-widest">Kids Zone</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Kids Playground</h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Equipped with modern slides, multi-level swings, and interactive climbing frames for the little ones. Safety is our priority with rubberized flooring and 24/7 camera surveillance.
            </p>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
               <div className="flex text-yellow-500"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-500 font-bold border-l border-slate-700 pl-4 text-xs uppercase">Rating 4.9/5</span>
            </div>
          </div>
          <div onClick={() => setSelectedGallery('kidsZone')} className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl cursor-pointer group/item">
            <img src="https://www.shutterstock.com/image-photo/childrens-playground-variety-play-structures-600nw-2501204345.jpg" alt="Kids" className="w-full h-[250px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/20">View Play Area</span>
            </div>
          </div>
        </div>

        {/* 4. Box Cricket Arena */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group">
          <div onClick={() => setSelectedGallery('cricket')} className="order-1 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl cursor-pointer group/item">
            <img src="https://aesports.world/wp-content/uploads/slider/cache/cf6296db3da7bdc1395b227d152c81e7/box-cricket-ground.jpg" alt="Cricket" className="w-full h-[250px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/20">View Sports Turf</span>
            </div>
          </div>
          <div className="order-2 space-y-6 lg:pl-10 animate-fade-left">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-red-400 bg-red-900/30 border border-red-800 rounded-full uppercase tracking-widest">Sports Zone</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Box Cricket Area</h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Unleash your inner athlete in our professional-grade Box Cricket Arena, featuring high-quality artificial turf and floodlights for night matches. Perfect for weekend tournaments.
            </p>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
               <div className="flex text-yellow-500"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-500 font-bold border-l border-slate-700 pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
        </div>

        {/* 5. Infinite Swimming Pool */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group pb-20">
          <div className="order-2 lg:order-1 space-y-6 lg:pr-10 animate-fade-right">
            <div className="inline-block px-4 py-1.5 text-xs md:text-sm font-bold text-cyan-400 bg-cyan-900/30 border border-cyan-800 rounded-full uppercase tracking-widest">Pure Relaxation</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Infinite Swimming Pool</h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Experience the luxury of a temperature-controlled infinite pool with crystal clear waters. It includes a separate deck for sunbathing and a specialized shallow area for children.
            </p>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
               <div className="flex text-yellow-500"><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/><Star fill="currentColor" size={18}/></div>
               <span className="text-slate-500 font-bold border-l border-slate-700 pl-4 text-xs uppercase">Rating 5/5</span>
            </div>
          </div>
          <div onClick={() => setSelectedGallery('pool')} className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl cursor-pointer group/item">
            <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Pool" className="w-full h-[250px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
                <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/20">View Pool Gallery</span>
            </div>
          </div>
        </div>
      </section>

{/* 6. Elite Fitness Center (Gym) - Fully Responsive & Swimming Pool Style */}
<div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center group pb-20">
  
  {/* Content Section: Mobile par 2nd, Desktop par 1st */}
  <div className="order-2 lg:order-1 space-y-4 md:space-y-6 lg:pr-10 animate-fade-right">
    <div className="inline-block px-4 py-1.5 text-[10px] md:text-sm font-bold text-purple-400 bg-purple-900/30 border border-purple-800 rounded-full uppercase tracking-widest">
      Health & Fitness
    </div>
    <h2 className="text-2xl md:text-4xl font-black text-white">Elite Fitness Center</h2>
    <p className="text-sm md:text-lg text-slate-400 leading-relaxed">
      Achieve your fitness goals in our state-of-the-art gymnasium. Equipped with premium cardio machines, heavy-duty weightlifting stations, and a dedicated yoga & pilates studio. Our gym is fully air-conditioned and managed by professional certified trainers to ensure a safe and elite workout experience for all residents.
    </p>
    
    {/* Rating Badge - Adjusted for mobile */}
    <div className="flex items-center gap-3 md:gap-4 bg-slate-900 p-3 md:p-4 rounded-2xl border border-slate-800 shadow-xl w-fit">
       <div className="flex text-yellow-500">
         <Star fill="currentColor" size={14} className="md:w-[18px]"/>
         <Star fill="currentColor" size={14} className="md:w-[18px]"/>
         <Star fill="currentColor" size={14} className="md:w-[18px]"/>
         <Star fill="currentColor" size={14} className="md:w-[18px]"/>
         <Star fill="currentColor" size={14} className="md:w-[18px]"/>
       </div>
       <span className="text-slate-500 font-bold border-l border-slate-700 pl-3 md:pl-4 text-[10px] md:text-xs uppercase tracking-tighter">
         Rating 4.9/5
       </span>
    </div>
  </div>

  {/* Image Section: Mobile par 1st, Desktop par 2nd (Swimming Pool Style) */}
  <div 
    onClick={() => setSelectedGallery('gym')} 
    className="order-1 lg:order-2 relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl animate-fade-left cursor-pointer group/item w-full"
  >
    <div className="aspect-video lg:aspect-auto">
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000" 
        alt="Gym" 
        className="w-full h-full lg:h-[450px] object-cover transition duration-700 group-hover:scale-110" 
      />
    </div>
    
    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all flex items-center justify-center">
        <span className="bg-white/10 backdrop-blur-md px-5 py-2 md:px-6 md:py-2 rounded-full text-white text-xs md:text-base font-bold border border-white/20">
          View Gym Gallery
        </span>
    </div>
  </div>

</div>
        
      {/* --- FOOTER --- */}
      <footer className="bg-black text-slate-400 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-slate-900 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white italic tracking-tighter">E-SOCIETY</h3>
            <p className="leading-relaxed text-sm">
              Redefining society living with smart technology. Trusted by thousands 
              of residents across India.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest">Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[ 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}><Link to={`/${link.toLowerCase()}`} className="hover:text-blue-400 transition">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest">Connect</h4>
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

      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeRight { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-down { animation: fadeDown 1s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-right { animation: fadeRight 1s ease-out forwards; }
        .animate-fade-left { animation: fadeLeft 1s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Home1;