import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, DoorOpen, CreditCard, ArrowLeft, Send, Wallet } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ElectricityForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    flat: "",
    amount: "",
    payment: "UPI"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.flat || !formData.amount) {
      toast.error("⚠ Please fill all fields before payment.");
      return;
    }

    toast.success("Payment Successful ✅");
    setFormData({
      flat: "",
      amount: "",
      payment: "UPI"
    });
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-slate-950 px-4 overflow-hidden pt-20">
      <Toaster position="top-center" />

      {/* --- BACKGROUND ANIMATION BLOBS --- */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      {/* --- FORM CARD --- */}
      <div className="relative w-full max-w-md animate-zoom-in">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-6"
        >
          {/* Back Link - Inside Card as per your theme */}
          <Link 
            to="/MainServices"
            className="inline-flex items-center gap-2 text-yellow-400 font-bold mb-2 hover:text-white transition-colors group text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-yellow-500 rounded-2xl text-slate-900 mb-4 shadow-lg shadow-yellow-500/30">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Electricity <span className="text-yellow-400">Bill</span>
            </h2>
            <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-[0.2em]">Pay your utility dues online</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="relative group">
              <DoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
              <input
                name="flat"
                value={formData.flat}
                onChange={handleChange}
                placeholder="Flat Number"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Bill Amount (₹)"
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-sm appearance-none"
                required
              >
                <option value="UPI">UPI Payment</option>
                <option value="Card">Debit / Credit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg mt-4">
            <Send size={20} /> Pay Now
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

export default ElectricityForm;