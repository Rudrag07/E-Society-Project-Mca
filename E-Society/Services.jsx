import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTools, FaCalendarAlt, FaUserShield, FaUsers, FaDumbbell,
  FaBuilding, FaTimes, FaCircle, FaArrowRight, FaQrcode,
  FaCar, FaMotorcycle, FaHistory, FaCreditCard, FaDoorOpen
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

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

  // --- ALL STATES RESTORED ---
  const [maintWing, setMaintWing] = useState("");
  const [maintFlat, setMaintFlat] = useState("");
  const [maintUPI, setMaintUPI] = useState("");
  
  const [visitorName, setVisitorName] = useState(""); 
  const [visitorFlat, setVisitorFlat] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [visWing, setVisWing] = useState(""); 
  const [isVisitorActive, setIsVisitorActive] = useState(false);

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

  // --- VALIDATION LOGIC ---
  const validateWing = (wing, flat) => {
    const num = parseInt(flat);
    if (!wing || !flat) return "Please fill Wing and Flat!";
    if (wing === "A" && (num < 1 || num > 100)) return "Wing A: 1-100 Only";
    if (wing === "B" && (num < 101 || num > 200)) return "Wing B: 101-200 Only";
    if (wing === "C" && (num < 201 || num > 300)) return "Wing C: 201-300 Only";
    if (wing === "D" && (num < 301 || num > 400)) return "Wing D: 301-400 Only";
    if (wing === "E" && (num < 401 || num > 500)) return "Wing E: 401-500 Only";
    if (wing === "F" && (num < 501 || num > 600)) return "Wing F: 501-600 Only";
    return null;
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-slate-200 overflow-x-hidden pb-10">
      <Toaster position="top-center" />

      {/* --- RE-DESIGNED HERO (Lower Height for Mobile) --- */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-[#020617]/90 to-[#020617] z-10"></div>
        <div className="relative z-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-[10px] font-black tracking-widest inline-block mb-4 border border-blue-500/20">
            {liveDate || "SYSTEM ONLINE"}
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none">
            E-SOCIETY <span className="text-blue-500">HUB</span>
          </h1>
        </div>
      </section>

      {/* --- SERVICE GRID --- */}
      <div className="px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 -mt-6 relative z-30">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedService(service.name)}
            className="bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] cursor-pointer group transition-all"
          >
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {service.icon}
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{service.title}</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Active Protocol 0.1</p>
          </motion.div>
        ))}
      </div>

      {/* --- DASHBOARD MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 rounded-[3rem] w-full max-w-3xl relative z-50 shadow-2xl max-h-[85vh] overflow-y-auto custom-scroll flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 pb-4 sticky top-0 bg-[#0f172a] z-10 flex justify-between items-center">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic border-l-8 border-blue-500 pl-6">
                  {selectedService.replace("-", " ")}
                </h2>
                <button onClick={() => setSelectedService(null)} className="text-slate-500 hover:text-white transition-colors"><FaTimes size={28} /></button>
              </div>

              <div className="p-8 md:p-12 pt-0">
                
              
              
                {/* ---1 MAINTENANCE SECTION (UPDATED WITH AUTO-FILL & NAME) --- */}
{selectedService === "maintenance" && (
  <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-300 md:mt-4">
    {/* Info Card */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-white/5 items-center">
      <div>
        <p className="text-blue-400 text-[10px] font-black uppercase mb-1 italic tracking-widest">Standard Maintenance</p>
        <h4 className="text-5xl md:text-6xl font-black text-white italic">₹8,000</h4>
        <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase">Due Date: 10th of every month</p>
      </div>
      <div className="bg-white p-3 md:p-4 rounded-3xl flex flex-col items-center shadow-2xl">
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${UPI_ID}`} className="w-20 h-20 md:w-24 md:h-24" alt="QR" />
        <p className="text-[8px] text-black font-black mt-2 uppercase italic tracking-tighter text-center">Scan with Any UPI App</p>
      </div>
    </div>

    {/* Input Fields */}
    <div className="space-y-4">
      {/* Name Field (Added as requested) */}
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Resident Name</label>
        <input 
          type="text" 
          placeholder="ENTER FULL NAME" 
          value={visitorName} // Using visitorName state or create a new 'maintName'
          onChange={(e) => setVisitorName(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 transition-all" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Wing</label>
          <select 
            value={maintWing} 
            onChange={(e) => {
              const wing = e.target.value;
              setMaintWing(wing);
              // --- AUTO FILL STARTING NUMBER ---
              if (wing === "A") setMaintFlat("1");
              else if (wing === "B") setMaintFlat("101");
              else if (wing === "C") setMaintFlat("201");
              else if (wing === "D") setMaintFlat("301");
              else if (wing === "E") setMaintFlat("401");
              else if (wing === "F") setMaintFlat("501");
              else setMaintFlat("");
            }} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 appearance-none uppercase italic"
          >
            <option value="">WING</option>
            <option value="A">A (3BHK | 1-100)</option>
            <option value="B">B (3BHK | 101-200)</option>
            <option value="C">C (4BHK | 201-300)</option>
            <option value="D">D (3BHK | 301-400)</option>
            <option value="E">E (4BHK | 401-500)</option>
            <option value="F">F (4BHK | 501-600)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Flat No</label>
          <input 
            type="number" 
            min="1"
            placeholder="FLAT NO" 
            value={maintFlat} 
            onChange={(e) => setMaintFlat(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Transaction ID</label>
        <input 
          type="text" 
          placeholder="UPI (e.g. user@bank name)" 
          value={maintUPI} 
          onChange={(e) => setMaintUPI(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-blue-400 font-bold outline-none focus:border-blue-500 lowercase tracking-widest" 
        />
      </div>
    </div>

    <button 
      onClick={() => {
        const num = parseInt(maintFlat);
        if (!visitorName || !maintWing || !maintFlat || !maintUPI) {
          return toast.error("Please fill all details!");
        }

        // Strict Validation Logic
        const ranges = {
          A: { min: 1, max: 100 },
          B: { min: 101, max: 200 },
          C: { min: 201, max: 300 },
          D: { min: 301, max: 400 },
          E: { min: 401, max: 500 },
          F: { min: 501, max: 600 }
        };

        const range = ranges[maintWing];
        if (num < range.min || num > range.max) {
          return toast.error(`Invalid Flat! Wing ${maintWing} is between ${range.min}-${range.max}`);
        }

        toast.success("Payment Details Submitted for Verification!");
        
        // Resetting fields
        setMaintWing("");
        setMaintFlat("");
        setMaintUPI("");
        setVisitorName("");
        setSelectedService(null);
      }} 
      className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-blue-500 transition-all shadow-xl active:scale-95"
    >
      Confirm Payment
    </button>
  </div>
)}

                
  {/* ---2 VISITOR SECTION (AUTO-RANGE LOGIC) --- */}
{selectedService === "visitor" && (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    
    {/* Status Indicator */}
    <div className="flex flex-col items-center gap-2">
      <div className={`flex items-center gap-3 px-6 py-2.5 rounded-full border transition-all duration-500 ${
        isVisitorActive 
        ? "bg-orange-500/20 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]" 
        : "bg-slate-900 border-white/5 opacity-50"
      }`}>
        <div className={`w-2 h-2 rounded-full ${isVisitorActive ? "bg-orange-500 animate-pulse" : "bg-slate-700"}`}></div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isVisitorActive ? "text-orange-500" : "text-slate-500"}`}>
          {isVisitorActive ? "Visitor Inside Society" : "Ready for New Entry"}
        </span>
      </div>
      {isVisitorActive && (
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
          Entry Logged at: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </div>

    {/* Input Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Visitor Name</label>
        <input 
          type="text" 
          placeholder="ENTER FULL NAME" 
          value={visitorName} 
          onChange={(e) => setVisitorName(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-orange-500 transition-all" 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Select Wing</label>
        <select 
          value={visWing} 
          onChange={(e) => {
            const selectedWing = e.target.value;
            setVisWing(selectedWing);
            
            // --- AUTO FILL FLAT STARTING NUMBER ---
            if (selectedWing === "A") setVisitorFlat("1");
            else if (selectedWing === "B") setVisitorFlat("101");
            else if (selectedWing === "C") setVisitorFlat("201");
            else if (selectedWing === "D") setVisitorFlat("301");
            else if (selectedWing === "E") setVisitorFlat("401");
            else if (selectedWing === "F") setVisitorFlat("501");
            else setVisitorFlat("");
          }} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-orange-500 appearance-none uppercase italic"
        >
          <option value="">-- CHOOSE WING --</option>
          <option value="A">WING A (3BHK | 1-100)</option>
          <option value="B">WING B (3BHK | 101-200)</option>
          <option value="C">WING C (4BHK | 201-300)</option>
          <option value="D">WING D (3BHK | 301-400)</option>
          <option value="E">WING E (4BHK | 401-500)</option>
          <option value="F">WING F (4BHK | 501-600)</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Flat Number</label>
        <input 
          type="number" 
          min="1"
          placeholder="FLAT NO" 
          value={visitorFlat} 
          onChange={(e) => setVisitorFlat(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-orange-500" 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Visit Purpose</label>
        <select 
          value={visitPurpose} 
          onChange={(e) => setVisitPurpose(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-slate-400 font-bold outline-none focus:border-orange-500 italic uppercase"
        >
          <option value="">REASON FOR VISIT</option>
          <option>GUEST VISIT</option>
          <option>DELIVERY (SWIGGY/ZOMATO)</option>
          <option>COURIER SERVICE</option>
          <option>MAINTENANCE/REPAIR</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="space-y-3 pt-4">
      <button 
        onClick={() => {
          const num = parseInt(visitorFlat);
          
          // --- FULL VALIDATION LOGIC ---
          if (!visitorName || !visWing || !visitorFlat || !visitPurpose) {
            return toast.error("Please fill all details!");
          }

          const ranges = {
            A: { min: 1, max: 100, type: "3BHK" },
            B: { min: 101, max: 200, type: "3BHK" },
            C: { min: 201, max: 300, type: "4BHK" },
            D: { min: 301, max: 400, type: "3BHK" },
            E: { min: 401, max: 500, type: "4BHK" },
            F: { min: 501, max: 600, type: "4BHK" }
          };

          const selectedRange = ranges[visWing];
          if (num < selectedRange.min || num > selectedRange.max) {
            return toast.error(`Error: Wing ${visWing} handles flats ${selectedRange.min} to ${selectedRange.max} only!`);
          }

          // --- SUCCESS & RESET ---
          setIsVisitorActive(true); 
          toast.success(`Entry Saved for ${visitorName} (Flat ${num})`);
          
          setVisitorName("");
          setVisWing("");
          setVisitorFlat("");
          setVisitPurpose("");
        }} 
        className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-xl"
      >
        Confirm & Start Entry
      </button>

      {isVisitorActive && (
        <button 
          onClick={() => {
            setIsVisitorActive(false);
            toast.success("Visitor Session Ended ✅");
          }} 
          className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
        >
          Visitor Exit (Checkout)
        </button>
      )}
    </div>
  </div>
)}



                {/* ---3 GYM SECTION (UPDATED WITH AUTO-FILL & RANGE VALIDATION) --- */}
{selectedService === "gym" && (
  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl mb-4">
      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">
        Modern Fitness Hub | Slot Booking Active
      </p>
    </div>

    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black text-slate-500 ml-4 uppercase tracking-wider">Gym Member ID</label>
        <input 
          type="text" 
          placeholder="Member Name" 
          value={gymMemberId} 
          onChange={(e) => setGymMemberId(e.target.value)} 
          className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 transition-all lowercase" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Select Wing</label>
          <select 
            value={gymWing} 
            onChange={(e) => {
              const wing = e.target.value;
              setGymWing(wing);
              // --- AUTO FILL STARTING FLAT NUMBER ---
              if (wing === "A") setGymFlat("1");
              else if (wing === "B") setGymFlat("101");
              else if (wing === "C") setGymFlat("201");
              else if (wing === "D") setGymFlat("301");
              else if (wing === "E") setGymFlat("401");
              else if (wing === "F") setGymFlat("501");
              else setGymFlat("");
            }} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 appearance-none uppercase italic"
          >
            <option value="">WING</option>
            <option value="A">A (3BHK | 1-100)</option>
            <option value="B">B (3BHK | 101-200)</option>
            <option value="C">C (4BHK | 201-300)</option>
            <option value="D">D (3BHK | 301-400)</option>
            <option value="E">E (4BHK | 401-500)</option>
            <option value="F">F (4BHK | 501-600)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Flat No</label>
          <input 
            type="number" 
            min="1"
            placeholder="FLAT NO" 
            value={gymFlat} 
            onChange={(e) => setGymFlat(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Booking Date</label>
          <input 
            type="date" 
            value={gymDate} 
            onChange={(e) => setGymDate(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Time Slot</label>
          <select 
            value={gymTime} 
            onChange={(e) => setGymTime(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-emerald-500 italic uppercase"
          >
            <option value="">CHOOSE SLOT</option>
            <option>06:00 - 08:00 AM</option>
            <option>08:00 - 10:00 AM</option>
            <option>05:00 - 7:00 PM</option>
            <option>07:00 - 9:00 PM</option>
          </select>
        </div>
      </div>
    </div>

    <button 
      onClick={() => {
        const num = parseInt(gymFlat);
        if (!gymMemberId || !gymWing || !gymFlat || !gymDate || !gymTime) {
          return toast.error("Complete all details to book!");
        }

        // Strict Validation Check
        const ranges = {
          A: { min: 1, max: 100 },
          B: { min: 101, max: 200 },
          C: { min: 201, max: 300 },
          D: { min: 301, max: 400 },
          E: { min: 401, max: 500 },
          F: { min: 501, max: 600 }
        };

        const range = ranges[gymWing];
        if (num < range.min || num > range.max) {
          return toast.error(`Range Error: Wing ${gymWing} is ${range.min} to ${range.max} only!`);
        }

        toast.success(`Gym Slot Reserved: ${gymTime} for ${gymMemberId}`);
        
        // Clear all fields
        setGymMemberId("");
        setGymWing("");
        setGymFlat("");
        setGymDate("");
        setGymTime("");
        setSelectedService(null);
      }} 
      className="w-full py-6 bg-emerald-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
    >
      Reserve Workout Slot
    </button>
  </div>
)}



             {/*4 --- AMENITY SECTION (SMART LOGIC & TIME SLOTS) --- */}
{selectedService === "amenity" && (
  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
    
    {/* Header Info */}
    <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl">
      <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
        Premium Society Amenities | Reservation Portal
      </p>
    </div>

    <div className="space-y-4">
      {/* Name & Facility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Applicant Name</label>
          <input 
            type="text" 
            placeholder="FULL NAME" 
            value={visitorName} // Reusing name state
            onChange={(e) => setVisitorName(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Select Facility</label>
          <select 
            value={amenityName} 
            onChange={(e) => setAmenityName(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 uppercase italic"
          >
            <option value="">-- BOOKING FOR   --</option>
            <option>Community Hall</option>
            <option>Swimming Pool</option>
            <option>Mini Theater</option>
            <option>Kids Zone</option>
          </select>
        </div>
      </div>

      {/* Wing & Flat Logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Wing</label>
          <select 
            value={amenityWing} 
            onChange={(e) => {
              const wing = e.target.value;
              setAmenityWing(wing);
              // --- AUTO FILL STARTING NUMBER ---
              if (wing === "A") setAmenityFlat("1");
              else if (wing === "B") setMaintFlat("101"); // Using maintFlat state or amenityFlat
              else if (wing === "C") setAmenityFlat("201");
              else if (wing === "D") setAmenityFlat("301");
              else if (wing === "E") setAmenityFlat("401");
              else if (wing === "F") setAmenityFlat("501");
              else setAmenityFlat("");
            }} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 appearance-none uppercase italic"
          >
            <option value="">WING</option>
            <option value="A">A (3BHK | 1-100)</option>
            <option value="B">B (3BHK | 101-200)</option>
            <option value="C">C (4BHK | 201-300)</option>
            <option value="D">D (3BHK | 301-400)</option>
            <option value="E">E (4BHK | 401-500)</option>
            <option value="F">F (4BHK | 501-600)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Flat No</label>
          <input 
            type="number" 
            min="1"
            placeholder="FLAT NO" 
            value={amenityFlat} 
            onChange={(e) => setAmenityFlat(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      {/* Date, Day & Guest Count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Date</label>
          <input 
            type="date" 
            value={amenityDate} 
            onChange={(e) => setAmenityDate(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500" 
          />
          {amenityDate && (
            <p className="text-[10px] text-blue-400 font-bold mt-1 ml-2 uppercase">
              Day: {new Date(amenityDate).toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Time Slot</label>
          <select className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500 italic uppercase">
            <option>10:00 AM - 02:00 PM</option>
            <option>04:00 PM - 08:00 PM</option>
            <option>08:00 PM - 11:30 PM</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 ml-4 uppercase">Guest Count (Min 30)</label>
          <input 
            type="number" 
            min="30"
            placeholder="GUESTS MIN 30" 
            value={amenityGuestCount} 
            onChange={(e) => setAmenityGuestCount(e.target.value)} 
            className="w-full px-6 py-4 bg-black rounded-2xl border border-white/10 text-white font-bold outline-none focus:border-blue-500" 
          />
        </div>
      </div>
    </div>

    <button 
      onClick={() => {
        const num = parseInt(amenityFlat);
        const guests = parseInt(amenityGuestCount);
        
        // --- FULL VALIDATIONS ---
        if (!amenityName || !amenityWing || !amenityFlat || !amenityDate) {
          return toast.error("Please fill all mandatory fields!");
        }

        // Wing Validation
        const ranges = {
          A: { min: 1, max: 100 }, B: { min: 101, max: 200 }, C: { min: 201, max: 300 },
          D: { min: 301, max: 400 }, E: { min: 401, max: 500 }, F: { min: 501, max: 600 }
        };
        const range = ranges[amenityWing];
        if (num < range.min || num > range.max) {
          return toast.error(`Wing ${amenityWing} range is ${range.min} to ${range.max}!`);
        }

        // Guest Count Validation (Min 30 & No Negative)
        if (guests < 30 || isNaN(guests)) {
          return toast.error("Guest count must be at least 30!");
        }

        toast.success(`${amenityName} reserved for ${new Date(amenityDate).toLocaleDateString('en-US', { weekday: 'long' })}!`);
        
        // --- CLEAN UP ---
        setAmenityName(""); setAmenityWing(""); setAmenityFlat("");
        setAmenityDate(""); setAmenityGuestCount(""); setVisitorName("");
        setSelectedService(null);
      }} 
      className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-blue-500 transition-all shadow-xl active:scale-95"
    >
      Confirm Reservation
    </button>
  </div>
)}
                {/* ---5 FESTIVAL & EVENTS SECTION --- */}
                {(selectedService === "festival" || selectedService === "event") && (
                  <div className="space-y-4">
                    {(selectedService === "festival" 
                      ? [
                          { name: "Ram Navami", date: "2026-03-26", color: "text-orange-500" },
                          { name: "Hanuman Jayanti", date: "2026-04-02", color: "text-yellow-500" },
                          { name: "Akshaya Tritiya", date: "2026-04-20", color: "text-red-500" }
                        ] 
                      : liveEvents
                    ).map((item, i) => {
                      const isToday = new Date().toDateString() === new Date(item.date).toDateString();
                      return (
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className={`p-6 bg-black border ${isToday ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/5'} rounded-3xl flex justify-between items-center`}>
                          <div>
                            <p className={`font-black text-xl uppercase italic ${isToday ? 'text-blue-400' : (item.color || 'text-white')}`}>
                              {isToday ? `HAPPY ${item.name}` : item.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                              {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long' })} • 2026
                            </p>
                          </div>
                          <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl ${isToday ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>
                            {isToday ? 'LIVE' : 'SOON'}
                          </span>
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

      <footer className="mt-20 px-6 text-center border-t border-white/5 pt-12 opacity-30">
        <div className="flex justify-center gap-10 mb-8 grayscale">
          <FaDoorOpen size={20} /> <FaUserShield size={20} /> <FaHistory size={20} />
        </div>
        <p className="text-[9px] font-black tracking-[0.5em] text-slate-600 uppercase italic">Designed by Rudra Gelot • Hub v4.5.9</p>
      </footer>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        @media (max-width: 640px) { .custom-scroll { scrollbar-width: none; } }
      `}</style>
    </div>
  );
};

export default Services;