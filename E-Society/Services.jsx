import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTools, FaCalendarAlt, FaUserShield, FaUsers, FaDumbbell,
  FaBuilding, FaTimes, FaCircle, FaArrowRight, FaQrcode,
  FaCar, FaMotorcycle, FaHistory, FaCreditCard, FaDoorOpen
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

// --- GLOBAL CONSTANTS (TARA VARIABLES) ---
const MAINTENANCE_FIXED = 8000;
const UPI_ID = "8200792488@axl";

const services = [
  { name: "maintenance", title: "Maintenance Payment", icon: <FaTools size={35} /> },
  { name: "festival", title: "Festival Celebration", icon: <FaCalendarAlt size={35} /> },
  { name: "visitor", title: "Visitor Management", icon: <FaUserShield size={35} /> },
  { name: "event", title: "Society Events", icon: <FaUsers size={35} /> },
  { name: "gym", title: "Gym Facility", icon: <FaDumbbell size={35} /> },
  { name: "amenity", title: "Amenity Booking", icon: <FaBuilding size={35} /> }
];

const liveFestivals = [
  { name: "Holi Dhuleti", date: "March 22, 2026", status: "LIVE NOW", color: "text-pink-500", active: true },
  { name: "Ram Navami", date: "April 06, 2026", status: "Upcoming", color: "text-orange-500", active: false },
  { name: "Hanuman Jayanti", date: "April 12, 2026", status: "Upcoming", color: "text-yellow-500", active: false },
  { name: "Akshaya Tritiya", date: "April 20, 2026", status: "Upcoming", color: "text-red-500", active: false }
];

const liveEvents = [
  { name: "Society Clean Drive", date: "March 25, 2026", venue: "Main Gate", time: "08:00 AM" },
  { name: "Annual General Meeting", date: "March 28, 2026", venue: "Club House", time: "10:30 AM" },
  { name: "Summer Cricket Cup", date: "April 15, 2026", venue: "Common Plot", time: "04:00 PM" }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [flat, setFlat] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorFlat, setVisitorFlat] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [gymDate, setGymDate] = useState("");
  const [gymTime, setGymTime] = useState("");
  const [amenity, setAmenity] = useState("");
  const [amenityDate, setAmenityDate] = useState("");
  const [liveDate, setLiveDate] = useState("");

  // --- TARA FUNCTIONS (ZERO CODE CUT) ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
      setLiveDate(now.toLocaleDateString('en-US', options).toUpperCase());
    };
    updateTime();
  }, []);

  const saveData = (key, newData) => {
    let existingData = [];
    try {
      const saved = localStorage.getItem(key);
      existingData = saved ? JSON.parse(saved) : [];
    } catch (e) { existingData = []; }
    const entry = { ...newData, id: Date.now(), timestamp: new Date().toLocaleString() };
    existingData.push(entry);
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  const handleMaintenancePay = () => {
    if (!flat || !visitorFlat || !visitorName) return toast.error("Enter all details!");
    saveData("payments", { flat, amount: MAINTENANCE_FIXED, upi: visitorName });
    toast.success(`₹${MAINTENANCE_FIXED} Payment Saved ✅`);
    setSelectedService(null);
  };

  const handleGymBooking = () => {
    if (!gymDate || !gymTime) return toast.error("Select Date/Time!");
    saveData("gym", { date: gymDate, time: gymTime });
    toast.success(`Gym Booked ✅`);
    setSelectedService(null);
  };

  const handleAmenityBooking = () => {
    if (!amenity || !amenityDate) return toast.error("Select Facility!");
    saveData("amenities", { type: amenity, date: amenityDate });
    toast.success(`${amenity} Reserved ✅`);
    setSelectedService(null);
  };

  const handleVisitorEntry = () => {
    if (!visitorName || !visitorFlat || !visitPurpose) return toast.error("Fill Details!");
    saveData("visitors", { name: visitorName, flat: visitorFlat, purpose: visitPurpose });
    toast.success("Visitor Registered ✅");
    setVisitorName(""); setVisitorFlat(""); setSelectedService(null);
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-slate-200 overflow-x-hidden pb-10">
      <Toaster position="top-center" />

      {/* --- RESPONSIVE HERO --- */}
      <section className="relative h-[35vh] md:h-[45vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-[#020617]/90 to-[#020617] z-10"></div>
        <motion.img
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }}
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
          className="absolute w-full h-full object-cover opacity-20"
        />
        <div className="relative z-20 mt-5">
          <div className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] inline-block mb-4 border border-blue-500/20 uppercase">
            {liveDate || "SYSTEM ONLINE"}
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none">
            E-Society <span className="text-blue-500 block sm:inline">Hub</span>
          </h1>
        </div>
      </section>

      {/* --- RESPONSIVE GRID (1 COL ON MOBILE, 3 ON DESKTOP) --- */}
      <div className="px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 -mt-10 md:-mt-12 relative z-30">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }} whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedService(service.name)}
            className="bg-slate-900/70 backdrop-blur-2xl border border-white/5 p-7 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] cursor-pointer shadow-2xl group transition-all duration-300"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 md:mb-8 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {service.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3 uppercase italic tracking-tight">{service.title}</h3>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Secure Access Protocol 0.1</p>
          </motion.div>
        ))}
      </div>

      {/* --- FULL RESPONSIVE MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-0 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/95 backdrop-blur-lg" />
            
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-[#0f172a] border-t md:border border-white/10 rounded-t-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 w-full max-w-2xl relative z-50 shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll"
            >
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 md:top-10 md:right-10 text-slate-500 hover:text-white transition-colors"><FaTimes size={24} /></button>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-8 capitalize italic border-l-8 border-blue-500 pl-4 md:pl-6">{selectedService.replace("-", " ")}</h2>

              {/* MAINTENANCE SECTION (FULL LOGIC) */}
              {selectedService === "maintenance" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 bg-slate-950 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-center text-center md:text-left">
                      <p className="text-blue-500 text-[9px] font-black uppercase mb-1 italic tracking-widest">Resident Maintenance</p>
                      <h4 className="text-4xl md:text-5xl font-black text-white italic">₹8,000</h4>
                    </div>
                    <div className="md:col-span-4 bg-white p-5 rounded-[2rem] flex flex-col items-center justify-center shadow-lg">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=${UPI_ID}`} className="w-20 h-20 md:w-24 md:h-24" alt="UPI QR" />
                      <p className="text-[8px] text-black font-black mt-3 uppercase tracking-tighter italic">Scan via any UPI</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-[0.2em]">Select Unit</label>
                      <select value={flat} onChange={(e) => setFlat(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 appearance-none uppercase italic cursor-pointer transition-all">
                        <option value="">-- WING --</option><option value="A">A-WING (101-505)</option><option value="B">B-WING (101-505)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-[0.2em]">Flat Number</label>
                      <input type="text" placeholder="E.G. 402" value={visitorFlat} onChange={(e) => setVisitorFlat(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 transition-all uppercase" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-[0.2em]">UPI Transaction ID / Ref</label>
                    <input type="text" placeholder="ENTER TRANSACTION ID" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-blue-400 text-xs font-black outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <button onClick={handleMaintenancePay} className="w-full py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl shadow-xl hover:bg-blue-700 active:scale-[0.98] transition-all">Submit Payment Proof</button>
                </div>
              )}

              {/* VISITOR SECTION (FULL LOGIC) */}
              {selectedService === "visitor" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-widest">Visitor Name</label>
                      <input type="text" placeholder="FULL NAME" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-widest">Meeting Unit</label>
                      <input type="text" placeholder="FLAT NO." value={visitorFlat} onChange={(e) => setVisitorFlat(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 ml-2 uppercase tracking-widest">Purpose of Visit</label>
                    <select value={visitPurpose} onChange={(e) => setVisitPurpose(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-slate-400 text-xs font-black outline-none focus:border-blue-500 appearance-none uppercase italic transition-all cursor-pointer">
                      <option value="">SELECT REASON</option><option>GUEST VISIT</option><option>DELIVERY / PARCEL</option><option>MAINTENANCE WORK</option><option>OFFICIAL</option>
                    </select>
                  </div>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleVisitorEntry} className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-xl flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                    Generate Entry Pass <FaArrowRight size={12} />
                  </motion.button>
                </div>
              )}

              {/* GYM & AMENITY (FULL LOGIC) */}
              {(selectedService === "gym" || selectedService === "amenity") && (
                <div className="space-y-6">
                  {selectedService === "amenity" && (
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Select Facility</label>
                      <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white font-black text-xs uppercase italic transition-all cursor-pointer">
                        <option value="">-- FACILITIES --</option><option>COMMUNITY HALL</option><option>SWIMMING POOL</option><option>MINI THEATER</option><option>KIDS ZONE</option>
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Preferred Date</label>
                      <input type="date" value={amenityDate || gymDate} onChange={(e) => selectedService === "gym" ? setGymDate(e.target.value) : setAmenityDate(e.target.value)} className="w-full px-6 py-4 rounded-xl bg-black border border-white/10 text-white font-black text-xs uppercase" />
                    </div>
                    {selectedService === "gym" && (
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Time Slot</label>
                        <select value={gymTime} onChange={(e) => setGymTime(e.target.value)} className="w-full px-6 py-4 rounded-xl bg-black border border-white/10 text-white font-black text-xs uppercase italic transition-all cursor-pointer">
                          <option value="">-- SLOTS --</option><option>06:00 AM - 08:00 AM</option><option>06:00 PM - 08:00 PM</option><option>08:00 PM - 10:00 PM</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <button onClick={selectedService === "gym" ? handleGymBooking : handleAmenityBooking} className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl italic shadow-2xl hover:bg-blue-700 transition-all">Confirm Reservation</button>
                </div>
              )}

              {/* FESTIVALS & EVENTS (FULL LOGIC) */}
              {(selectedService === "festival" || selectedService === "event") && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl mb-2 text-center">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] italic leading-relaxed">Society Social Calendar • Live Tracking</p>
                  </div>
                  {(selectedService === "festival" ? liveFestivals : liveEvents).map((item, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="p-6 bg-black border border-white/5 rounded-[2rem] flex justify-between items-center group hover:border-blue-500/30 transition-all cursor-default">
                      <div className="flex items-center gap-5">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.active ? 'bg-blue-500 animate-pulse ring-4 ring-blue-500/20' : 'bg-slate-700'}`}></div>
                        <div>
                          <p className={`font-black text-base md:text-xl uppercase italic ${item.color || 'text-white'}`}>{item.name}</p>
                          <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1.5 leading-none">{item.date} {item.time && `• ${item.time}`}</p>
                        </div>
                      </div>
                      <span className={`text-[8px] md:text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-500'}`}>{item.status || 'Active'}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-20 px-6 text-center border-t border-white/5 pt-12 pb-5 opacity-40">
        <div className="flex justify-center gap-10 mb-8 grayscale">
          <FaDoorOpen size={20} /> <FaUserShield size={20} /> <FaHistory size={20} />
        </div>
        <p className="text-[9px] font-black tracking-[0.6em] text-slate-600 uppercase italic">Designed & Engineered by Rudra Gelot • Hub v4.5.9</p>
      </footer>

      {/* --- SCROLLBAR STYLING --- */}
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: #020617; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        @media (max-width: 640px) { .custom-scroll { scrollbar-width: none; } }
      `}</style>
    </div>
  );
};

export default Services;