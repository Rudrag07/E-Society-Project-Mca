import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Printer, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FlatBook = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    toast.dismiss();
    const lastBooking = JSON.parse(localStorage.getItem('last_pending_booking'));
    if (!lastBooking) {
      navigate('/home1');
      return;
    }
    setDetails(lastBooking);
    
    toast.success("Booking Verified Successfully!", {
      duration: 5000,
      icon: '✅',
      style: { borderRadius: '15px', background: '#0f172a', color: '#fff', border: '1px solid #10b981' },
    });
  }, [navigate]);

  const downloadPDF = async () => {
    if (!details) return;
    const loadId = toast.loading("Processing High-Quality PDF...");
    try {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: "#ffffff", windowWidth: 800 });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dwarkesh_Receipt_${details.flatNumber}.pdf`);
      toast.dismiss(loadId);
      toast.success("PDF Saved!");
    } catch (err) {
      toast.dismiss(loadId);
      toast.error("PDF Failed!");
    }
  };

  const formatAmount = (amt) => {
    const value = parseFloat(amt);
    return isNaN(value) ? "0" : value.toLocaleString('en-IN');
  };

  // 🟢 FIXED LOGIC: Matching Residence.jsx keys
  const total = parseFloat(details?.totalValue || 0);
  const paid = parseFloat(details?.receivedAmount || 0);
  const pending = total - paid;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden relative">
      <Toaster position="top-center" />
      
      <div className="relative w-full max-w-lg z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="p-10 text-center bg-gradient-to-b from-emerald-500/20 to-transparent border-b border-white/5">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 size={40} className="text-slate-950" />
            </div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Verified</h1>
            <p className="text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase">Dwarkesh E-Society Residency</p>
          </div>

          <div className="px-10 pb-12 pt-8 space-y-6">
            <div className="space-y-4 bg-slate-800/40 p-6 rounded-[2rem] border border-white/5">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-slate-500 font-bold uppercase text-[9px]">Resident</span>
                <span className="text-white font-extrabold text-md uppercase">{details?.fullName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-slate-500 font-bold uppercase text-[9px]">Total Value</span>
                <span className="text-white font-bold">₹{formatAmount(total)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-emerald-500 font-bold uppercase text-[9px]">Received ({details?.method})</span>
                <span className="text-emerald-400 font-bold">₹{formatAmount(paid)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-red-500 font-bold uppercase text-[9px]">Balance Pending</span>
                <span className="text-red-400 font-bold italic">₹{formatAmount(pending)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold uppercase text-[9px]">Unit</span>
                <span className="text-amber-500 font-black text-lg">W-{details?.wing} | F-{details?.flatNumber}</span>
              </div>
            </div>

            <button onClick={downloadPDF} className="w-full py-5 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
              <Printer size={18} /> Get Official PDF
            </button>
            <button onClick={() => navigate('/home1')} className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
              Back to Home <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- PDF TEMPLATE (Hidden from UI) --- */}
      <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
        <div ref={receiptRef} style={{ width: '800px', background: 'white', color: '#1e293b', border: '20px solid #065f46', padding: '60px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '48px', fontWeight: '900', color: '#064e3b', marginBottom: '40px', borderBottom: '4px solid #065f46', paddingBottom: '20px' }}>DWARKESH E-SOCIETY</h1>
          <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '22px', borderBottom: '2px solid #cbd5e1', paddingBottom: '10px' }}>REGISTRY VERIFICATION</h2>
            <div style={{ marginTop: '20px', fontSize: '18px', display: 'grid', gap: '15px' }}>
              <p><b>Resident Name:</b> <span style={{textTransform: 'uppercase'}}>{details?.fullName}</span></p>
              <p><b>Unit Allotted:</b> WING {details?.wing} - FLAT {details?.flatNumber} ({details?.unitType})</p>
              <p><b>Total Property Value:</b> ₹{formatAmount(total)}/-</p>
              <p style={{color: '#059669'}}><b>Amount Received:</b> ₹{formatAmount(paid)}/- (Via {details?.method})</p>
              <p style={{color: '#dc2626', fontSize: '22px'}}><b>Balance Pending:</b> ₹{formatAmount(pending)}/-</p>
              <p style={{marginTop: '20px', fontSize: '14px', fontStyle: 'italic'}}>Status: Payment Recorded Successfully.</p>
            </div>
          </div>
          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p><b>👤 Rudra Gelot</b><br/>Founder & Admin</p>
            <div style={{ width: '100px', height: '100px', border: '4px double #065f46', borderRadius: '50%', textAlign: 'center', padding: '15px' }}><b>PAID</b></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatBook;