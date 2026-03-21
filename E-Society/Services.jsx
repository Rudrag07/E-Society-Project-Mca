import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTools, FaCalendarAlt, FaUserShield, FaUsers, FaDumbbell, FaBuilding, FaTimes, FaStar, FaCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const services = [
  { name: "maintenance", title: "Maintenance Payment", icon: <FaTools size={35} /> },
  { name: "festival", title: "Festival Celebration", icon: <FaCalendarAlt size={35} /> },
  { name: "visitor", title: "Visitor Management", icon: <FaUserShield size={35} /> },
  { name: "event", title: "Society Events", icon: <FaUsers size={35} /> },
  { name: "gym", title: "Gym Facility", icon: <FaDumbbell size={35} /> },
  { name: "amenity", title: "Amenity Booking", icon: <FaBuilding size={35} /> }
];

// REAL-TIME DATA ACCORDING TO MARCH 22, 2026
const liveFestivals = [
  { name: "Holi Dhuleti", date: "March 22, 2026", status: "LIVE NOW", color: "text-pink-500", active: true },
  { name: "Uttarayan", date: "Jan 14, 2026", status: "Completed", color: "text-orange-500", active: false },
  { name: "Diwali 2026", date: "Nov 08, 2026", status: "Upcoming", color: "text-yellow-500", active: false }
];

const liveEvents = [
  { name: "Janmashtami Mahotsav", date: "Aug 04, 2026", venue: "Society Temple" },
  { name: "Ganesh Chaturthi", date: "Sept 14, 2026", venue: "Main Plaza" },
  { name: "Navratri Dandiya", date: "Oct 10, 2026", venue: "Grand Ground" }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [flat, setFlat] = useState("");
  const [amount, setAmount] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorFlat, setVisitorFlat] = useState("");
  const [gymDate, setGymDate] = useState("");
  const [amenity, setAmenity] = useState("");

  const saveData = (key, newData) => {
    let existingData = [];
    try {
      const saved = localStorage.getItem(key);
      existingData = saved ? JSON.parse(saved) : [];
    } catch (e) { existingData = []; }
    existingData.push({ ...newData, id: Date.now() });
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  const handlePayment = () => {
    if (!flat || !amount) return toast.error("Please fill all fields!");
    saveData("maintenance", { flat, amount, date: "22-03-2026" });
    toast.success("Maintenance Paid Successfully ✅");
    setFlat(""); setAmount(""); setSelectedService(null);
  };

  const handleVisitor = () => {
    if (!visitorName || !visitorFlat) return toast.error("Please fill all fields!");
    saveData("visitors", { name: visitorName, flat: visitorFlat, date: "22-03-2026 01:11 AM" });
    toast.success("Visitor Entry Added ✅");
    setVisitorName(""); setVisitorFlat(""); setSelectedService(null);
  };

  const handleGymBooking = () => {
    if (!gymDate) return toast.error("Please select a date!");
    saveData("gymBooking", { date: gymDate });
    toast.success(`Gym Booked for ${gymDate.split("-").reverse().join("-")} ✅`);
    setGymDate(""); setSelectedService(null);
  };

  const handleAmenity = () => {
    if (!amenity || !flat) return toast.error("Please fill all fields!");
    saveData("amenityBooking", { flat, amenity, date: "22-03-2026" });
    toast.success(`${amenity} Booked Successfully ✅`);
    setAmenity(""); setFlat(""); setSelectedService(null);
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200">
      <Toaster position="top-center" />

      {/* --- PREMIUM HERO --- */}
      <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-slate-950/80 to-slate-950 z-10"></div>
        <img src="https://images.unsplash.com/photo-1449156003053-c306a0482905?auto=format&fit=crop&w=3840&q=80" className="absolute w-full h-full object-cover opacity-30 animate-slow-zoom" alt="society" />
        <div className="relative z-20 px-4 animate-fade-down">
          <div className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-xs font-bold inline-block mb-4 border border-blue-500/30">
            SUNDAY • 22 MARCH 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
            Smart <span className="text-blue-500">Living</span>
          </h1>
        </div>
      </section>

      {/* --- SERVICE GRID --- */}
      <div className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedService(service.name)} 
            className="group bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] hover:border-blue-500/50 hover:-translate-y-3 transition-all duration-500 cursor-pointer animate-fade-up shadow-2xl overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-slate-500 text-sm">Tap to access digital {service.name} dashboard.</p>
          </div>
        ))}
      </div>

      {/* --- DYNAMIC MODAL --- */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 max-w-md w-full animate-zoom-in relative">
            <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-all">
              <FaTimes size={20} />
            </button>

            <h2 className="text-3xl font-black text-white mb-8 capitalize tracking-tight border-b border-slate-800 pb-4">
              {selectedService.replace("-", " ")}
            </h2>

            <div className="space-y-4">
              {selectedService === "maintenance" && (
                <>
                  <input type="text" placeholder="Flat Number" value={flat} onChange={(e) => setFlat(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={handlePayment} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95">Pay Maintenance</button>
                </>
              )}

              {selectedService === "visitor" && (
                <>
                  <input type="text" placeholder="Visitor Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none" />
                  <input type="text" placeholder="Flat Number" value={visitorFlat} onChange={(e) => setVisitorFlat(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none" />
                  <button onClick={handleVisitor} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl transition-all">Check-in</button>
                </>
              )}

              {/* GYM & AMENITY LOGIC - UNCHANGED */}
              {selectedService === "gym" && (
                <>
                  <input type="date" value={gymDate} onChange={(e) => setGymDate(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none" />
                  <button onClick={handleGymBooking} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl transition-all">Confirm Slot</button>
                </>
              )}

              {selectedService === "amenity" && (
                <>
                  <input type="text" placeholder="Flat Number" value={flat} onChange={(e) => setFlat(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none" />
                  <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-850 border border-slate-700 text-white outline-none">
                    <option value="">Select Amenity</option>
                    <option>Community Hall</option>
                    <option>Swimming Pool</option>
                    <option>Garden Area</option>
                  </select>
                  <button onClick={handleAmenity} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl transition-all">Book Now</button>
                </>
              )}

              {/* LIVE FESTIVALS AS PER MARCH 22, 2026 */}
              {selectedService === "festival" && (
                <div className="space-y-4">
                  {liveFestivals.map((f, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${f.active ? 'bg-blue-600/10 border-blue-500/50' : 'bg-slate-950/50 border-slate-800'} flex justify-between items-center group`}>
                      <div>
                        <p className={`font-black ${f.color} flex items-center gap-2`}>
                          {f.name} {f.active && <FaCircle className="animate-pulse text-[8px]" />}
                        </p>
                        <p className="text-xs text-slate-500 font-bold">{f.date}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${f.active ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {f.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* UPCOMING SOCIETY EVENTS */}
              {selectedService === "event" && (
                <div className="space-y-4">
                  {liveEvents.map((ev, i) => (
                    <div key={i} className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center gap-5 hover:border-blue-500/30 transition-all">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 font-bold">
                        {ev.date.split(" ")[0].substring(0,3)}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-tight">{ev.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{ev.date} • {ev.venue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-black text-slate-500 pt-16 pb-10 border-t border-slate-900 text-center">
        <p className="text-xs font-bold tracking-[0.4em] uppercase opacity-40">© 2026 E-SOCIETY • Ahmedabad, Gujarat</p>
        <p className="text-[10px] mt-2 italic">Handcrafted with ❤️ By Rudra Gelot</p>
      </footer>

      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-fade-down { animation: fadeDown 0.8s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.8s ease-out both; }
        .animate-zoom-in { animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slow-zoom { animation: slowZoom 20s infinite alternate linear; }
        .bg-slate-850 { background-color: #0f172a; }
      `}</style>
    </div>
  );
};

export default Services;