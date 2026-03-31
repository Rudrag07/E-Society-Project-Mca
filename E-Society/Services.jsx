import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTools, FaCalendarAlt, FaUserShield, FaUsers, FaDumbbell,
  FaBuilding, FaTimes, FaCircle, FaArrowRight, FaQrcode,
  FaCar, FaMotorcycle, FaHistory, FaCreditCard, FaDoorOpen
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, Send, ArrowLeft, MessageSquare, MapPin } from "lucide-react";

// --- GLOBAL CONSTANTS ---
const MAINTENANCE_FIXED = 8000;
const UPI_ID = "8200792488@axl";

const services = [
  { name: "maintenance", title: "Maintenance Payment", icon: <FaTools size={32} /> },
  { name: "festival", title: "Festival Celebration", icon: <FaCalendarAlt size={32} /> },
  { name: "visitor", title: "Visitor Management", icon: <FaUserShield size={32} /> },
  { name: "event", title: "Society Events", icon: <FaUsers size={32} /> },
  { name: "gym", title: "Gym Facility", icon: <FaDumbbell size={32} /> },
  { name: "amenity", title: "Amenity Booking", icon: <FaBuilding size={32} /> }
];

const liveEvents = [
  { name: "Society Clean Drive", date: "2026-03-25", venue: "Main Gate", time: "08:00 AM" },
  { name: "Annual General Meeting", date: "2026-03-28", venue: "Club House", time: "10:30 AM" },
  { name: "Summer Cricket Cup", date: "2026-04-15", venue: "Common Plot", time: "04:00 PM" }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [liveDate, setLiveDate] = useState("");

  // --- STATES ---
  const [maintWing, setMaintWing] = useState("");
  const [maintFlat, setMaintFlat] = useState("");
  const [maintUPI, setMaintUPI] = useState("");
  const [maintName, setMaintName] = useState("");

  const [visitorName, setVisitorName] = useState(""); 
  const [visitPurpose, setVisitPurpose] = useState("");
  const [isVisitorActive, setIsVisitorActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundResident, setFoundResident] = useState(null);

  const [gymMemberId, setGymMemberId] = useState("");
  const [gymWing, setGymWing] = useState("");
  const [gymFlat, setGymFlat] = useState("");
  const [gymDate, setGymDate] = useState("");
  const [gymTime, setGymTime] = useState("");

  const [amenityName, setAmenityName] = useState("");
  const [amenityWing, setAmenityWing] = useState("");
  const [amenityFlat, setAmenityFlat] = useState("");
  const [amenityDate, setAmenityDate] = useState("");
  const [amenityGuestCount, setAmenityGuestCount] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    setLiveDate(now.toLocaleDateString('en-US', options).toUpperCase());
  }, []);

  const getAutoFlat = (wing) => {
    if (wing === "A") return "1";
    if (wing === "B") return "101";
    if (wing === "C") return "201";
    if (wing === "D") return "301";
    if (wing === "E") return "401";
    if (wing === "F") return "501";
    return "";
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-slate-200 overflow-x-hidden pb-10">
      <Toaster position="top-center" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[35vh] md:h-[45vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-[#020617]/95 to-[#020617] z-10"></div>
        <div className="relative z-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] inline-block mb-6 border border-blue-500/20">
            {liveDate || "SYSTEM ONLINE"}
          </motion.div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none">
            E-SOCIETY <span className="text-blue-500">HUB</span>
          </h1>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <div className="px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 -mt-10 md:-mt-16 relative z-30">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedService(service.name)}
            className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] cursor-pointer group transition-all shadow-2xl"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
              {service.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight leading-tight">{service.title}</h3>
            <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-3 opacity-60">Active Protocol 4.5.9</p>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] w-full max-w-3xl relative z-50 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto custom-scroll flex flex-col"
            >
              <div className="p-7 md:p-12 pb-4 sticky top-0 bg-[#0f172a]/95 backdrop-blur-md z-10 flex justify-between items-center">
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic border-l-8 border-blue-500 pl-4 md:pl-6 leading-none">
                  {selectedService.replace("-", " ")}
                </h2>
                <button onClick={() => setSelectedService(null)} className="text-slate-500 hover:text-white transition-colors p-2"><FaTimes size={24} /></button>
              </div>

              <div className="p-7 md:p-12 pt-0">
                
                {/* --- MAINTENANCE --- */}
                {selectedService === "maintenance" && (
                  <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-white/5 items-center">
                      <div className="text-center md:text-left">
                        <p className="text-blue-400 text-[10px] font-black uppercase mb-1 italic tracking-widest">Standard Maintenance</p>
                        <h4 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter">₹8,000</h4>
                        <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest opacity-70">Due: 10th Monthly</p>
                      </div>
                      <div className="bg-white p-4 rounded-3xl flex flex-col items-center shadow-2xl mx-auto md:mx-0 w-fit">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${UPI_ID}`} className="w-24 h-24 md:w-28 md:h-28" alt="QR" />
                        <p className="text-[8px] text-black font-black mt-2 uppercase italic text-center">Scan to Pay</p>
                      </div>
                    </div>
                    {/* ... Rest of Maintenance Inputs ... */}
                    <div className="space-y-4">
                      <input type="text" placeholder="ENTER FULL NAME" value={maintName} onChange={(e) => setMaintName(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase text-sm" />
                      <div className="grid grid-cols-2 gap-4">
                        <select value={maintWing} onChange={(e) => { setMaintWing(e.target.value); setMaintFlat(getAutoFlat(e.target.value)); }} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 appearance-none uppercase italic text-sm">
                          <option value="">WING</option>
                          <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option>
                        </select>
                        <input type="number" placeholder="FLAT NO" value={maintFlat} onChange={(e) => setMaintFlat(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 text-sm" />
                      </div>
                      <input type="text" placeholder="username@bankid" value={maintUPI} onChange={(e) => setMaintUPI(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-blue-400 font-bold outline-none focus:border-blue-500 lowercase tracking-widest text-sm" />
                    </div>
                    <button onClick={() => { if(!maintName || !maintWing || !maintFlat || !maintUPI) return toast.error("Missing Details!"); toast.success("Payment Logged!"); setSelectedService(null); }} className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl md:rounded-3xl hover:bg-blue-500 transition-all shadow-xl text-xs">Confirm Submission</button>
                  </div>
                )}

                {/* --- VISITOR MANAGEMENT (FIXED FULL HISTORY SEARCH) --- */}
                {selectedService === "visitor" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 italic">Resident Lookup Mode</span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter opacity-60">Full Database Sync</span>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-500 ml-4 uppercase tracking-widest leading-none">Search Any Resident (Full History)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="SEARCH NAME (e.g. PAWAN...)" 
                          className="w-full px-6 py-5 bg-black rounded-2xl md:rounded-3xl border border-white/10 text-white font-bold outline-none focus:border-orange-500 transition-all placeholder:text-slate-800 tracking-wide uppercase text-sm"
                          onChange={(e) => {
                            const query = e.target.value.toUpperCase();
                            
                            // 1. Fetching EVERYTHING from the registry database
                            const savedResidents = JSON.parse(localStorage.getItem('society_residents')) || [];
                            
                            // 2. Sample Data for testing
                            const defaultList = [
                              { name: "RUDRA GELOT", wing: "A", flat: "101", type: "3BHK" },
                              { name: "PAWAN MEVADA", wing: "C", flat: "201", type: "4BHK" }
                            ];

                            // 3. Merging lists and searching through the WHOLE list
                            const fullDatabase = [...savedResidents, ...defaultList];
                            
                            // Finding match anywhere in the history
                            const found = fullDatabase.find(r => r.name.includes(query) && query.length > 1);
                            
                            setSearchQuery(e.target.value);
                            setFoundResident(found);
                          }}
                        />
                      </div>

                      <AnimatePresence>
                        {foundResident && searchQuery.length > 1 && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="mt-4 p-7 md:p-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:scale-125 transition-transform"><MapPin size={120} /></div>
                            <div className="relative z-10 text-white">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-70">Resident Identified</p>
                              <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 leading-none">{foundResident.name}</h3>
                              <div className="grid grid-cols-3 gap-3 md:gap-4">
                                <div className="bg-black/20 backdrop-blur-md px-3 py-4 rounded-2xl border border-white/10 text-center">
                                  <p className="text-[8px] md:text-[9px] font-bold uppercase opacity-60 mb-1">Wing</p><p className="text-xl md:text-2xl font-black">{foundResident.wing}</p>
                                </div>
                                <div className="bg-black/20 backdrop-blur-md px-3 py-4 rounded-2xl border border-white/10 text-center">
                                  <p className="text-[8px] md:text-[9px] font-bold uppercase opacity-60 mb-1">Flat</p><p className="text-xl md:text-2xl font-black">{foundResident.flat}</p>
                                </div>
                                <div className="bg-black/20 backdrop-blur-md px-3 py-4 rounded-2xl border border-white/10 text-center">
                                  <p className="text-[8px] md:text-[9px] font-bold uppercase opacity-60 mb-1">Unit</p><p className="text-base md:text-lg font-black tracking-tighter">{foundResident.type}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Visitor Inputs */}
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <input type="text" placeholder="VISITOR NAME" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-6 py-4 bg-slate-900/50 rounded-2xl border border-white/5 text-white font-bold outline-none focus:border-orange-500 transition-all italic uppercase text-sm" />
                      <select value={visitPurpose} onChange={(e) => setVisitPurpose(e.target.value)} className="w-full px-6 py-4 bg-slate-900/50 rounded-2xl border border-white/5 text-slate-400 font-bold outline-none focus:border-orange-500 uppercase italic text-sm">
                        <option value="">SELECT REASON</option><option>ZOMATO / SWIGGY</option><option>COURIER</option><option>GUEST</option>
                      </select>
                    </div>

                    <button onClick={() => { if (!foundResident || !visitorName) return toast.error("Missing Data!"); setIsVisitorActive(true); toast.success(`Confirmed!`); setSearchQuery(""); setFoundResident(null); }} className="w-full py-5 md:py-6 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl md:rounded-3xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl active:scale-95 text-xs">Execute Dispatch</button>
                    {isVisitorActive && <button onClick={() => setIsVisitorActive(false)} className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Visitor Checkout</button>}
                  </div>
                )}

                {/* --- GYM, AMENITY & EVENTS (SAME AS BEFORE) --- */}
                {selectedService === "gym" && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 md:p-5 rounded-2xl text-center">
                      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] italic">Fitness Node</p>
                    </div>
                    <div className="space-y-4">
                      <input type="text" placeholder="NAME" value={gymMemberId} onChange={(e) => setGymMemberId(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 transition-all uppercase text-sm" />
                      <div className="grid grid-cols-2 gap-4">
                        <select value={gymWing} onChange={(e) => { setGymWing(e.target.value); setGymFlat(getAutoFlat(e.target.value)); }} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 appearance-none uppercase italic text-sm">
                          <option value="">WING</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option>
                        </select>
                        <input type="number" placeholder="FLAT" value={gymFlat} onChange={(e) => setGymFlat(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={gymDate} onChange={(e) => setGymDate(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 text-sm" />
                        <select value={gymTime} onChange={(e) => setGymTime(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 italic uppercase text-sm">
                          <option value="">SLOT</option><option>06-08 AM</option><option>08-10 AM</option><option>05-07 PM</option><option>07-09 PM</option>
                        </select>
                      </div>
                    </div>
                    <button onClick={() => { if(!gymMemberId || !gymWing || !gymFlat || !gymDate || !gymTime) return toast.error("Error!"); toast.success("Gym Reserved!"); setSelectedService(null); }} className="w-full py-6 bg-emerald-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl md:rounded-3xl hover:bg-emerald-500 transition-all text-xs">Register Slot</button>
                  </div>
                )}

                {selectedService === "amenity" && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-blue-600/10 border border-blue-500/20 p-4 md:p-5 rounded-2xl text-center"><p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] italic">Amenities reservation</p></div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="NAME" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 uppercase text-sm" />
                        <select value={amenityName} onChange={(e) => setAmenityName(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 uppercase italic text-sm">
                          <option value="">FACILITY</option><option>Community Hall</option><option>Pool</option><option>Theater</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <select value={amenityWing} onChange={(e) => { setAmenityWing(e.target.value); setAmenityFlat(getAutoFlat(e.target.value)); }} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 appearance-none uppercase italic text-sm">
                          <option value="">WING</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option>
                        </select>
                        <input type="number" placeholder="FLAT" value={amenityFlat} onChange={(e) => setAmenityFlat(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={amenityDate} onChange={(e) => setAmenityDate(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 text-sm" />
                        <input type="number" placeholder="GUESTS" value={amenityGuestCount} onChange={(e) => setAmenityGuestCount(e.target.value)} className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 text-sm" />
                      </div>
                    </div>
                    <button onClick={() => { if(!amenityName || !amenityWing || !amenityFlat || !amenityDate || amenityGuestCount < 30) return toast.error("Error!"); toast.success("Confirmed!"); setSelectedService(null); }} className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl md:rounded-3xl hover:bg-blue-500 transition-all text-xs">Confirm Reservation</button>
                  </div>
                )}

                {(selectedService === "festival" || selectedService === "event") && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                    {(selectedService === "festival" 
                      ? [{ name: "Ram Navami", date: "2026-03-26", color: "text-orange-500" }, { name: "Akshaya Tritiya", date: "2026-04-20", color: "text-red-500" }, { name: "Ramadan Eid", date: "2026-03-31", color: "text-emerald-500" }] 
                      : liveEvents
                    ).map((item, i) => {
                      const isToday = new Date().toDateString() === new Date(item.date).toDateString();
                      return (
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className={`p-6 md:p-8 bg-black border ${isToday ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/5'} rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                          <div className="space-y-1">
                            <p className={`font-black text-xl md:text-2xl uppercase italic tracking-tighter ${isToday ? 'text-blue-400' : (item.color || 'text-white')}`}>{item.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long' })}</p>
                          </div>
                          <span className={`text-[10px] font-black uppercase px-6 py-2 rounded-xl tracking-widest leading-none ${isToday ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-800 text-slate-500 opacity-50'}`}>{isToday ? 'LIVE' : 'SOON'}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-20 px-6 md:px-10 text-center border-t border-white/5 pt-16 md:pt-20 pb-10">
        <div className="flex justify-center flex-wrap gap-8 md:gap-12 mb-10 opacity-20">
          <FaDoorOpen size={24} /> <FaUserShield size={24} /> <FaHistory size={24} /> <FaUsers size={24} />
        </div>
        <p className="text-[9px] md:text-[10px] font-black tracking-[0.6em] md:tracking-[1em] text-slate-600 uppercase italic leading-loose">Designed by Rudra Gelot • Hub v4.5.9 <br/> © 2026 Core Ecosystem. All Rights Reserved.</p>
      </footer>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #020617; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        @media (max-width: 640px) { .custom-scroll { scrollbar-width: none; } }
      `}</style>
    </div>
);
};

export default Services;