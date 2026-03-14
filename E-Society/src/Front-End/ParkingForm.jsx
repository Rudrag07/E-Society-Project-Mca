import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, User, Hash, DoorOpen, ArrowLeft, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ParkingForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    flat: "",
    vehicle: "",
    number: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.flat || !form.vehicle || !form.number) {
      toast.error("⚠ Please fill all the fields before submitting.");
      return;
    }

    toast.success("✅ Parking Request Submitted Successfully!");
    setForm({ name: "", flat: "", vehicle: "", number: "" });
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-slate-950 px-4 overflow-hidden pt-20">
      <Toaster position="top-center" />

      {/* --- BACKGROUND ANIMATION BLOBS --- */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      {/* --- FORM CARD --- */}
      <div className="relative w-full max-w-md animate-zoom-in">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-6"
        >
          {/* Back Link - Ab Card ke andar hai, hamesha visible rahega */}
          <Link 
            to="/MainServices"
            className="inline-flex items-center gap-2 text-blue-400 font-bold mb-2 hover:text-yellow-400 transition-colors group text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl text-white mb-4 shadow-lg shadow-blue-500/30">
              <Car size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Parking <span className="text-yellow-400">Registration</span>
            </h2>
            <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-[0.2em]">Secure your slot today</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="name"
                value={form.name}
                placeholder="Resident Name"
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
              />
            </div>

            <div className="relative group">
              <DoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="flat"
                value={form.flat}
                placeholder="Flat Number (e.g. A-101)"
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
              />
            </div>

            <div className="relative group">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="vehicle"
                value={form.vehicle}
                placeholder="Vehicle Type (2 / 4 Wheeler)"
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
              />
            </div>

            <div className="relative group">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                name="number"
                value={form.number}
                placeholder="Vehicle Number (GJ-01...)"
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-sm"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg mt-4">
            <Send size={20} /> Submit Registration
          </button>
        </form>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-zoom-in { animation: zoomIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ParkingForm;