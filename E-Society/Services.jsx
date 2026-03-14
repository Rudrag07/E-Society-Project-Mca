import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTools, FaCalendarAlt, FaUserShield, FaUsers, FaDumbbell, FaBuilding, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const services = [
  { name: "maintenance", title: "Maintenance Payment", icon: <FaTools size={35} /> },
  { name: "festival", title: "Festival Celebration", icon: <FaCalendarAlt size={35} /> },
  { name: "visitor", title: "Visitor Management", icon: <FaUserShield size={35} /> },
  { name: "event", title: "Society Events", icon: <FaUsers size={35} /> },
  { name: "gym", title: "Gym Facility", icon: <FaDumbbell size={35} /> },
  { name: "amenity", title: "Amenity Booking", icon: <FaBuilding size={35} /> }
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
      if (!Array.isArray(existingData)) existingData = [];
    } catch (e) { existingData = []; }
    
    existingData.push({ ...newData, id: Date.now() });
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  const handlePayment = () => {
    if (!flat || !amount) return toast.error("Please fill all fields!");
    saveData("maintenance", { flat, amount, date: new Date().toLocaleDateString() });
    toast.success("Maintenance Paid Successfully ✅");
    setFlat(""); setAmount(""); setSelectedService(null);
  };

  const handleVisitor = () => {
    if (!visitorName || !visitorFlat) return toast.error("Please fill all fields!");
    saveData("visitors", { name: visitorName, flat: visitorFlat, date: new Date().toLocaleString() });
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
    saveData("amenityBooking", { flat, amenity, date: new Date().toLocaleDateString() });
    toast.success(`${amenity} Booked Successfully ✅`);
    setAmenity(""); setFlat(""); setSelectedService(null);
  };

  return (
    <>
    <div className="bg-gray-50 min-h-screen font-sans">
      <Toaster position="top-center" />

      {/* HERO SECTION - With Text Animations */}
      <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=3840&q=80" className="absolute w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40"></div>
        
        <div className="relative z-10 px-4">
          {/* Animated Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl animate-fade-down">
            Society <span className="text-yellow-400">Services</span>
          </h1>
          
          {/* Animated Tagline */}
          <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto font-medium animate-fade-up delay-300">
            Smart digital solutions for a hassle-free community living experience.
          </p>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedService(service.name)} 
              className="group bg-white rounded-3xl p-10 text-center cursor-pointer border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-blue-600 mb-6 flex justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <div className="p-5 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h2>
              <p className="text-gray-500 text-sm">Click to access {service.title.toLowerCase()} dashboard.</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SECTION */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full shadow-2xl relative animate-zoom-in">
            <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <FaTimes size={24} />
            </button>

            <h2 className="text-3xl font-black text-gray-800 mb-6 text-center capitalize border-b pb-4 border-gray-100">
              {selectedService.replace("-", " ")}
            </h2>

            <div className="space-y-5">
              {/* Maintenance Form */}
              {selectedService === "maintenance" && (
                <>
                  <input type="text" placeholder="Flat Number" value={flat} onChange={(e) => setFlat(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400" />
                  <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400" />
                  <button onClick={handlePayment} className="w-full py-4 rounded-2xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-lg transition-all active:scale-95">Pay Maintenance</button>
                </>
              )}
              {/* Visitor Form */}
              {selectedService === "visitor" && (
                <>
                  <input type="text" placeholder="Visitor Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none" />
                  <input type="text" placeholder="Flat Number" value={visitorFlat} onChange={(e) => setVisitorFlat(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none" />
                  <button onClick={handleVisitor} className="w-full py-4 rounded-2xl text-white font-bold bg-slate-800 hover:bg-slate-900 shadow-lg transition-all">Register Entry</button>
                </>
              )}
              {/* Gym Form */}
              {selectedService === "gym" && (
                <>
                  <input type="date" value={gymDate} onChange={(e) => setGymDate(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none" />
                  <button onClick={handleGymBooking} className="w-full py-4 rounded-2xl text-white font-bold bg-blue-600 hover:bg-blue-700 shadow-lg transition-all">Book Slot</button>
                </>
              )}
              {/* Amenity Form */}
              {selectedService === "amenity" && (
                <>
                  <input type="text" placeholder="Flat Number" value={flat} onChange={(e) => setFlat(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none" />
                  <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none">
                    <option value="">Select Amenity</option>
                    <option>Community Hall</option>
                    <option>Swimming Pool</option>
                    <option>Garden Area</option>
                  </select>
                  <button onClick={handleAmenity} className="w-full py-4 rounded-2xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all">Book Now</button>
                </>
              )}
              {/* Default Message */}
              {(selectedService === "festival" || selectedService === "event") && (
                <p className="text-center text-gray-400 py-10 italic">No upcoming {selectedService}s found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-down { animation: fadeDown 0.8s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.8s ease-out both; }
        .animate-zoom-in { animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
    
    {/* --- FOOTER --- */}
          <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white italic">E-SOCIETY</h3>
                <p className="leading-relaxed">
                  Redefining society living with smart technology. Trusted by thousands 
                  of residents across India.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white uppercase tracking-widest">Quick Navigation</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {['Home', 'About','Contact'].map((link) => (
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
            <div className="text-center pt-8 text-xs font-medium tracking-widest uppercase opacity-50">
              © 2026 E-Society. Crafted with ❤️ By Rudra
            </div>
          </footer>
    </>
  );
};

export default Services;