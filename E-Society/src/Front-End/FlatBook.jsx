import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Printer, Share2, ArrowRight, UserCheck, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const FlatBook = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const lastBooking = JSON.parse(localStorage.getItem('last_pending_booking'));
    if (!lastBooking) {
      navigate('/home1');
    } else {
      setDetails(lastBooking);
    }
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  const shareToWhatsApp = () => {
    const message = `*E-Society Booking Confirmed!*%0A%0A*Owner:* ${details?.fullName}%0A*Unit:* Flat ${details?.flatNumber} / Wing ${details?.wing}%0A%0A*Manager:* Rudra Gelot (+91 8200792488)`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleBackToDashboard = () => {
    localStorage.removeItem('last_pending_booking');
    navigate('/home1');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 pt-16 md:pt-24 font-sans overflow-x-hidden">
      <Toaster position="top-center" />
      
      {/* 🟢 SCREEN VIEW (Hidden during print) */}
      <div className="print:hidden relative w-full flex justify-center">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] h-[280px] md:h-[400px] bg-emerald-500/10 blur-[80px] md:blur-[120px] -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full"
        >
          <div className="bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl p-1">
            
            {/* Header Section */}
            <div className="bg-gradient-to-b from-emerald-500/15 to-transparent p-6 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 size={28} className="text-slate-900 md:size-32" />
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tight uppercase">Confirmed!</h1>
              <p className="text-slate-500 text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-1 font-black">E-Society Premium Residency</p>
            </div>

            <div className="px-5 md:px-8 pb-6 md:pb-8 space-y-4 md:space-y-5">
              
              {/* Receipt Details Box */}
              <div className="bg-slate-950/50 rounded-[1.2rem] md:rounded-[1.5rem] p-4 md:p-5 border border-white/5 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-slate-500 text-[9px] font-black uppercase">Owner</span>
                  <span className="text-white text-xs md:text-sm font-bold uppercase truncate max-w-[150px]">{details?.fullName || "Resident"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-slate-500 text-[9px] font-black uppercase">Unit</span>
                  <span className="text-amber-500 text-xs md:text-sm font-black uppercase tracking-tight">Wing {details?.wing} - Flat {details?.flatNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[9px] font-black uppercase">Status</span>
                  <span className="text-emerald-500 font-black text-[8px] md:text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">Success</span>
                </div>
              </div>

              {/* Manager Contact Card */}
              <div className="bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 flex items-center gap-3 md:gap-4">
                <div className="h-8 w-8 md:h-10 md:w-10 bg-slate-800 rounded-full flex items-center justify-center text-amber-500 shrink-0">
                  <UserCheck size={16} md:size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Building Manager</p>
                  <p className="text-white text-xs font-bold truncate">Rudra Gelot</p>
                  <div className="text-slate-400 text-[9px] flex items-center gap-1 mt-0.5">
                    <Phone size={9} className="text-amber-500" /> +91 8200792488
                  </div>
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button 
                  onClick={handlePrint} 
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all text-[9px] md:text-[10px] font-black uppercase text-slate-300 border border-white/5 active:scale-95"
                >
                  <Printer size={12} /> Get PDF
                </button>
                <button 
                  onClick={shareToWhatsApp} 
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-green-500/10 hover:text-green-500 rounded-xl transition-all text-[9px] md:text-[10px] font-black uppercase text-slate-300 border border-white/5 active:scale-95"
                >
                  <Share2 size={12} /> WhatsApp
                </button>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleBackToDashboard}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-[0.15em] flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all"
              >
                Go to Home <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ⚪ PRINT VIEW (Standard A4 formatting) */}
      <div className="hidden print:block p-8 bg-white text-black font-serif w-full max-w-[800px] mx-auto">
        <div className="border-b-4 border-emerald-600 pb-4 mb-8 text-center">
            <h1 className="text-3xl font-bold uppercase tracking-tighter">E-Society Premium Residency</h1>
            <p className="text-gray-500 uppercase tracking-widest text-[10px] mt-1">Booking Confirmation Receipt</p>
        </div>

        <div className="space-y-4 mb-10">
            <div className="flex justify-between border-b pb-2 text-sm uppercase">
                <span className="text-gray-400 font-bold">Owner:</span>
                <span className="font-bold">{details?.fullName}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-sm uppercase">
                <span className="text-gray-400 font-bold">Unit:</span>
                <span className="font-bold text-amber-600">Wing {details?.wing} - Flat {details?.flatNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-sm uppercase">
                <span className="text-gray-400 font-bold">Status:</span>
                <span className="font-bold text-emerald-600 tracking-widest">VERIFIED</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-sm uppercase">
                <span className="text-gray-400 font-bold">Date:</span>
                <span className="font-bold">{new Date().toLocaleDateString()}</span>
            </div>
        </div>

        <div className="mt-10 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Authorized Manager:</p>
            <p className="text-lg font-bold">Rudra Gelot</p>
            <p className="text-gray-600 text-sm font-bold tracking-widest">+91 8200792488</p>
        </div>

        <div className="text-center text-[8px] text-gray-400 uppercase mt-12">
            * This is an electronically generated system confirmation receipt. *
        </div>
      </div>
    </div>
  );
};

export default FlatBook;