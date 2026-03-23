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
  const [liveDate, setLiveDate] = useState(new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));
 
  // --- MAINTENANCE SPECIFIC STATES (ADD THESE) ---
  const [maintWing, setMaintWing] = useState("");
  const [maintFlat, setMaintFlat] = useState("");
  const [maintUPI, setMaintUPI] = useState("");
  const [flat, setFlat] = useState("");
 // --- VISITOR SECTION STATES ---
  const [visitorName, setVisitorName] = useState(""); 
  const [visitorFlat, setVisitorFlat] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [visWing, setVisWing] = useState(""); 
  const [visTime, setVisTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isVisitorActive, setIsVisitorActive] = useState(false); // Ye missing tha!
 // --- GYM STATES ---
const [gymMemberId, setGymMemberId] = useState("");
const [gymWing, setGymWing] = useState("");
const [gymFlat, setGymFlat] = useState("");
const [gymDate, setGymDate] = useState("");
const [gymTime, setGymTime] = useState("");

// --- AMENITY STATES ---
const [amenityName, setAmenityName] = useState("");
const [amenityWing, setAmenityWing] = useState("");
const [amenityFlat, setAmenityFlat] = useState("");
const [amenityDate, setAmenityDate] = useState("");
const [amenityGuestCount, setAmenityGuestCount] = useState("");
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
    {/* Amount Display */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-8 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center text-center md:text-left backdrop-blur-sm">
        <p className="text-blue-400 text-[12px] font-black uppercase mb-2 italic tracking-[0.3em]">Resident Maintenance</p>
        <h4 className="text-5xl md:text-7xl font-black text-white italic">₹8,000</h4>
      </div>
      <div className="md:col-span-4 bg-white p-6 rounded-[2.5rem] flex flex-col items-center justify-center">
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${UPI_ID}`} className="w-24 h-24 md:w-32" alt="QR" />
        <p className="text-[10px] text-black font-black mt-4 uppercase italic">Scan to Pay</p>
      </div>
    </div>

    {/* Input Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-[11px] font-black text-white/70 ml-3 uppercase">Select Wing</label>
        <select value={maintWing} onChange={(e) => setMaintWing(e.target.value)} className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-white/20 text-white text-sm font-bold outline-none focus:border-blue-500 appearance-none uppercase italic cursor-pointer">
          <option value="">-- CHOOSE WING --</option>
          <option value="A">WING A (1-100)</option>
          <option value="B">WING B (101-200)</option>
          <option value="C">WING C (201-300)</option>
          <option value="D">WING D (301-400)</option>
          <option value="E">WING E (401-500)</option>
          <option value="F">WING F (501-600)</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-black text-white/70 ml-3 uppercase">Flat Number</label>
        <input type="number" placeholder="Ex: 105" value={maintFlat} onChange={(e) => setMaintFlat(e.target.value)} className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-white/20 text-white text-sm font-bold outline-none focus:border-blue-500" />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-[11px] font-black text-white/70 ml-3 uppercase">UPI Transaction ID</label>
      <input type="text" placeholder="user@bank" value={maintUPI} onChange={(e) => setMaintUPI(e.target.value)} className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-white/20 text-blue-400 text-sm font-bold outline-none focus:border-blue-500" />
    </div>

    <button onClick={() => {
      const num = parseInt(maintFlat);
      if (!maintWing || !maintFlat || !maintUPI) return toast.error("Enter all maintenance details!");
      
      // Strict Wing Range Check
      if (maintWing === "A" && (num < 1 || num > 100)) return toast.error("Wing A: Valid Flats 1-100");
      if (maintWing === "B" && (num < 101 || num > 200)) return toast.error("Wing B: Valid Flats 101-200");
      if (maintWing === "C" && (num < 201 || num > 300)) return toast.error("Wing C: Valid Flats 201-300");
      if (maintWing === "D" && (num < 301 || num > 400)) return toast.error("Wing D: Valid Flats 301-400");
      if (maintWing === "E" && (num < 401 || num > 500)) return toast.error("Wing E: Valid Flats 401-500");
      if (maintWing === "F" && (num < 501 || num > 600)) return toast.error("Wing F: Valid Flats 501-600");
      if (!maintUPI.includes("@")) return toast.error("Invalid UPI!");

      // SUCCESS ACTION
      toast.success("Maintenance Paid!");
      setMaintWing(""); setMaintFlat(""); setMaintUPI("");
      setSelectedService(null);
    }} className="w-full py-6 bg-blue-600 text-white font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl shadow-xl hover:bg-blue-500 transition-all">Confirm Payment</button>
  </div>
)}

              {/* VISITOR SECTION (FULL LOGIC) */}
{selectedService === "visitor" && (
  <div className="space-y-6">
    {/* LIVE STATUS - Orange tabhi hoga jab visitor andar ho */}
    <div className="flex justify-center mb-2">
      <div className={`flex items-center gap-3 px-6 py-2 rounded-full border transition-all duration-500 ${
        isVisitorActive 
        ? "bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
        : "bg-slate-900 border-white/5 opacity-40"
      }`}>
        <div className={`w-2 h-2 rounded-full ${isVisitorActive ? "bg-orange-500 animate-pulse" : "bg-slate-700"}`}></div>
        <span className={`text-[9px] font-black uppercase tracking-widest ${isVisitorActive ? "text-orange-500" : "text-slate-500"}`}>
          {isVisitorActive ? "Visitor Inside" : "Status: No Active Entry"}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Visitor Name</label>
        <input type="text" placeholder="FULL NAME" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Select Wing</label>
        <select value={visWing} onChange={(e) => setVisWing(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500 appearance-none uppercase italic cursor-pointer">
          <option value="">-- CHOOSE WING --</option>
          <option value="A">WING A (1-100)</option>
          <option value="B">WING B (101-200)</option>
          <option value="C">WING C (201-300)</option>
          <option value="D">WING D (301-400)</option>
          <option value="E">WING E (401-500)</option>
          <option value="F">WING F (501-600)</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Flat Number</label>
        <input type="number" placeholder="Flat No" value={visitorFlat} onChange={(e) => setVisitorFlat(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-white text-xs font-black outline-none focus:border-blue-500" />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-2 uppercase">Purpose</label>
        <select value={visitPurpose} onChange={(e) => setVisitPurpose(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-slate-400 text-xs font-black outline-none focus:border-blue-500 italic uppercase">
          <option value="">REASON</option>
          <option>GUEST</option>
          <option>DELIVERY</option>
          <option>SERVICE</option>
        </select>
      </div>
    </div>

    <button onClick={() => {
      const num = parseInt(visitorFlat);
      if (!visitorName || !visWing || !visitorFlat) return toast.error("Details fill karo!");

      // --- STRICT WING VALIDATION ---
      if (visWing === "A" && (num < 1 || num > 100)) return toast.error("Wing A: 1-100 Only");
      if (visWing === "B" && (num < 101 || num > 200)) return toast.error("Wing B: 101-200 Only");
      if (visWing === "C" && (num < 201 || num > 300)) return toast.error("Wing C: 201-300 Only");
      if (visWing === "D" && (num < 301 || num > 400)) return toast.error("Wing D: 301-400 Only");
      if (visWing === "E" && (num < 401 || num > 500)) return toast.error("Wing E: 401-500 Only");
      if (visWing === "F" && (num < 501 || num > 600)) return toast.error("Wing F: 501-600 Only");

      // AB ORANGE HOGA
      setIsVisitorActive(true); 
      toast.success("Entry Confirmed! Status: ORANGE");
      
      // Clear inputs
      setVisitorName(""); setVisitorFlat(""); setVisWing("");
    }} className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-xl">
      Confirm & Start Entry
    </button>

    {/* EXIT BUTTON - TO TURN OFF ORANGE */}
    {isVisitorActive && (
      <button onClick={() => setIsVisitorActive(false)} className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest">
        Visitor Checkout (Turn Off Status)
      </button>
    )}
  </div>
)}


              {/* GYM  (FULL LOGIC) */}
  {selectedService === "gym" && (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* HEADER SECTION */}
    <div className="text-center md:text-left mb-4">
      <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Elite Gym Access</h3>
      <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em]">Reserve Your Training Slot</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gym Member ID */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Member ID</label>
        <input 
          type="text" 
          placeholder="G-2026-XXXX" 
          value={gymMemberId} 
          onChange={(e) => setGymMemberId(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-emerald-500 focus:bg-black transition-all shadow-inner" 
        />
      </div>

      {/* Select Wing */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Residency Wing</label>
        <select 
          value={gymWing} 
          onChange={(e) => setGymWing(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-emerald-500 appearance-none uppercase italic cursor-pointer"
        >
          <option value="">-- CHOOSE WING --</option>
          <option value="A">WING A (1-100)</option>
          <option value="B">WING B (101-200)</option>
          <option value="C">WING C (201-300)</option>
          <option value="D">WING D (301-400)</option>
          <option value="E">WING E (401-500)</option>
          <option value="F">WING F (501-600)</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Flat Number */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Flat No.</label>
        <input 
          type="number" 
          placeholder="Ex: 105" 
          value={gymFlat} 
          onChange={(e) => setGymFlat(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-emerald-500" 
        />
      </div>

      {/* Booking Date */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Workout Date</label>
        <input 
          type="date" 
          value={gymDate} 
          onChange={(e) => setGymDate(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-sm font-bold outline-none focus:border-emerald-500" 
        />
      </div>

      {/* Time Slot */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Preferred Slot</label>
        <select 
          value={gymTime} 
          onChange={(e) => setGymTime(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-sm font-bold outline-none focus:border-emerald-500 uppercase italic cursor-pointer"
        >
          <option value="">-- SELECT SLOT --</option>
          <option>06:00 - 08:00 AM</option>
          <option>06:00 - 08:00 PM</option>
          <option>08:00 - 10:00 PM</option>
        </select>
      </div>
    </div>

    {/* CONFIRM BUTTON */}
    <button 
      onClick={() => {
        const num = parseInt(gymFlat);
        if (!gymMemberId || !gymWing || !gymFlat || !gymDate || !gymTime) {
          return toast.error("Please fill all Gym credentials!");
        }
        
        // --- STRICT WING-FLAT VALIDATION ---
        if (gymWing === "A" && (num < 1 || num > 100)) return toast.error("Invalid Unit: Wing A is 1-100");
        if (gymWing === "B" && (num < 101 || num > 200)) return toast.error("Invalid Unit: Wing B is 101-200");
        if (gymWing === "C" && (num < 201 || num > 300)) return toast.error("Invalid Unit: Wing C is 201-300");
        if (gymWing === "D" && (num < 301 || num > 400)) return toast.error("Invalid Unit: Wing D is 301-400");
        if (gymWing === "E" && (num < 401 || num > 500)) return toast.error("Invalid Unit: Wing E is 401-500");
        if (gymWing === "F" && (num < 501 || num > 600)) return toast.error("Invalid Unit: Wing F is 501-600");

        toast.success(`Slot Reserved for Member ${gymMemberId}`);
        
        // Reset States
        setGymMemberId(""); setGymFlat(""); setGymWing(""); setGymDate(""); setGymTime("");
        setSelectedService(null);
      }} 
      className="w-full py-6 bg-emerald-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 hover:-translate-y-1 transition-all active:scale-95"
    >
      Confirm Gym Reservation
    </button>
  </div>
)}



 {/*Amenity Booking Section (FULL LOGIC) */}

{selectedService === "amenity" && (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* HEADER SECTION */}
    <div className="text-center md:text-left mb-4 border-l-4 border-blue-600 pl-4">
      <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Premium Amenities</h3>
      <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em]">Exclusive Residency Facilities</p>
    </div>

    {/* FACILITY SELECTION */}
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Select Facility</label>
      <select 
        value={amenityName} 
        onChange={(e) => setAmenityName(e.target.value)} 
        className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-blue-500 appearance-none uppercase italic cursor-pointer shadow-xl"
      >
        <option value="">-- CHOOSE AMENITY --</option>
        <option>COMMUNITY HALL</option>
        <option>SWIMMING POOL</option>
        <option>MINI THEATER</option>
        <option>KIDS ZONE</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Wing Selection */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Target Wing</label>
        <select 
          value={amenityWing} 
          onChange={(e) => setAmenityWing(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-blue-500 appearance-none uppercase italic"
        >
          <option value="">-- WING --</option>
          <option value="A">WING A (1-100)</option>
          <option value="B">WING B (101-200)</option>
          <option value="C">WING C (201-300)</option>
          <option value="D">WING D (301-400)</option>
          <option value="E">WING E (401-500)</option>
          <option value="F">WING F (501-600)</option>
        </select>
      </div>

      {/* Flat Number */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Unit Number</label>
        <input 
          type="number" 
          placeholder="Ex: 205" 
          value={amenityFlat} 
          onChange={(e) => setAmenityFlat(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-blue-500" 
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Booking Date */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Reservation Date</label>
        <input 
          type="date" 
          value={amenityDate} 
          onChange={(e) => setAmenityDate(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-sm font-bold outline-none focus:border-blue-500 shadow-inner" 
        />
      </div>

      {/* Guest Count */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 ml-3 uppercase tracking-widest">Estimated Guests</label>
        <input 
          type="number" 
          placeholder="No. of Persons" 
          value={amenityGuestCount} 
          onChange={(e) => setAmenityGuestCount(e.target.value)} 
          className="w-full px-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 text-white text-base font-bold outline-none focus:border-blue-500" 
        />
      </div>
    </div>

    {/* CONFIRM BUTTON */}
    <button 
      onClick={() => {
        const num = parseInt(amenityFlat);
        if (!amenityName || !amenityWing || !amenityFlat || !amenityDate) {
          return toast.error("Complete all amenity credentials!");
        }
        
        // --- STRICT WING-FLAT VALIDATION ---
        if (amenityWing === "A" && (num < 1 || num > 100)) return toast.error("Invalid: Wing A is 1-100");
        if (amenityWing === "B" && (num < 101 || num > 200)) return toast.error("Invalid: Wing B is 101-200");
        if (amenityWing === "C" && (num < 201 || num > 300)) return toast.error("Invalid: Wing C is 201-300");
        if (amenityWing === "D" && (num < 301 || num > 400)) return toast.error("Invalid: Wing D is 301-400");
        if (amenityWing === "E" && (num < 401 || num > 500)) return toast.error("Invalid: Wing E is 401-500");
        if (amenityWing === "F" && (num < 501 || num > 600)) return toast.error("Invalid: Wing F is 501-600");

        toast.success(`${amenityName} Booking confirmed for ${amenityDate}`);
        
        // Reset States
        setAmenityName(""); setAmenityWing(""); setAmenityFlat(""); setAmenityDate(""); setAmenityGuestCount("");
        setSelectedService(null);
      }} 
      className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-2xl shadow-blue-900/40 hover:bg-blue-500 hover:-translate-y-1 transition-all active:scale-95"
    >
      Reserve Facility Now
    </button>
  </div>
)}

              {/* FESTIVALS & EVENTS (FULL LOGIC) */}
  {(selectedService === "festival" || selectedService === "event") && (
  <div className="space-y-4">
    <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl mb-2 text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
      <p className="relative z-10 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] italic">
        Society Social Calendar • Live Tracking
      </p>
    </div>

    {/* Yahan humne direct dates fix kar di hain taaki galti na ho */}
    {(selectedService === "festival" 
      ? [
          { name: "Ram Navami", date: "2026-03-26", color: "text-orange-500" },
          { name: "Hanuman Jayanti", date: "2026-04-02", color: "text-yellow-500" },
          { name: "Akshaya Tritiya", date: "2026-04-20", color: "text-red-500" }
        ] 
      : liveEvents
    )
      .filter(item => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(item.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today; // Purani dates (Holi etc.) apne aap gayab
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item, i) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(item.date);
        eventDate.setHours(0, 0, 0, 0);

        const isToday = today.getTime() === eventDate.getTime();

        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1 }} 
            key={i} 
            className={`p-6 bg-black border ${isToday ? 'border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/50' : 'border-white/5'} rounded-[2.5rem] flex justify-between items-center group transition-all duration-500`}
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isToday ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                {isToday && <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500 animate-ping opacity-75"></div>}
              </div>
              
              <div>
                <p className={`font-black text-lg md:text-2xl uppercase italic tracking-tighter ${isToday ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : (item.color || 'text-white')}`}>
                  {/* Aaj ki date match hui toh WISH dikhayega */}
                  {isToday ? `WISH YOU HAPPY ${item.name}` : item.name}
                </p>
                
                <div className="flex items-center gap-3 mt-1.5">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <span className={`text-[8px] md:text-[10px] font-black uppercase px-5 py-2.5 rounded-2xl transition-all duration-500 ${isToday ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white/5 text-slate-500'}`}>
              {isToday ? 'LIVE TODAY' : 'COMING SOON'}
            </span>
          </motion.div>
        );
      })}
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