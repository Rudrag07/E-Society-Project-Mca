import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplets, DoorOpen, MessageSquare, ArrowLeft, Send, AlertCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const WaterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    flat: "",
    issue: "Low Water Pressure",
    details: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.flat || !formData.details) {
      toast.error("⚠ Please fill all fields before submitting.");
      return;
    }

    toast.success("Water Issue Submitted Successfully ✅");
    setFormData({
      flat: "",
      issue: "Low Water Pressure",
      details: ""
    });
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-slate-950 px-4 overflow-hidden pt-20">
      <Toaster position="top-center" />

      {/* --- BACKGROUND ANIMATION BLOBS --- */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      {/* --- FORM CARD --- */}
      <div className="relative w-full max-w-md animate-zoom-in">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-6"
        >
          {/* Back Link - Inside Card */}
          <Link 
            to="/MainServices"
            className="inline-flex items-center gap-2 text-cyan-400 font-bold mb-2 hover:text-white transition-colors group text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-cyan-600 rounded-2xl text-white mb-4 shadow-lg shadow-cyan-500/30">
              <Droplets size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Water <span className="text-cyan-400">Supply</span>
            </h2>
            <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-[0.2em]">Report supply or leakage issues</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="relative group">
              <DoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                name="flat"
                value={formData.flat}
                onChange={handleChange}
                placeholder="Flat Number"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <select
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-sm appearance-none"
                required
              >
                <option value="Low Water Pressure">Low Water Pressure</option>
                <option value="No Water Supply">No Water Supply</option>
                <option value="Water Leakage">Water Leakage</option>
              </select>
            </div>

            <div className="relative group">
              <MessageSquare className="absolute left-4 top-6 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Additional Details (e.g. since when?)"
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500 text-sm resize-none"
                required
              />
            </div>
          </div>

          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg mt-4">
            <Send size={20} /> Submit Issue
          </button>
        </form>
      </div>

      {/* --- ANIMATION STYLES --- */}
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

export default WaterForm;