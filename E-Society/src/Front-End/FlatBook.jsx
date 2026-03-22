import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck, Download, Home, Info } from 'lucide-react';
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
      style: { 
        borderRadius: '20px', 
        background: '#0f172a', 
        color: '#fff', 
        border: '1px solid #10b981',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      },
    });
  }, [navigate]);

  const downloadPDF = async () => {
    if (!details) return;
    const loadId = toast.loading("Generating High-Fidelity PDF...");
    try {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: "#ffffff", 
        windowWidth: 800 
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dwarkesh_Receipt_${details.flatNumber}.pdf`);
      toast.dismiss(loadId);
      toast.success("Registry Document Saved!");
    } catch (err) {
      toast.dismiss(loadId);
      toast.error("Generation Failed!");
    }
  };

  const formatAmount = (amt) => {
    const value = parseFloat(amt);
    return isNaN(value) ? "0" : value.toLocaleString('en-IN');
  };

  const total = parseFloat(details?.totalValue || 0);
  const paid = parseFloat(details?.receivedAmount || 0);
  const pending = total - paid;

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-emerald-500/30">
      <Toaster position="top-center" />
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-xl z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 0.7, ease: "circOut" }}
          className="bg-[#0a0c14]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative"
        >
          {/* TOP DECORATIVE BAR */}
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          {/* HEADER SECTION */}
          <div className="p-8 md:p-14 text-center bg-gradient-to-b from-emerald-500/10 to-transparent">
            <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }} 
               transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
               className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <CheckCircle2 size={45} className="text-slate-950" strokeWidth={2.5} />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">Registry Confirmed</h1>
            <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <p className="text-emerald-500/80 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase">Secured Ledger Entry</p>
            </div>
          </div>

          {/* DETAILS BOX */}
          <div className="px-6 md:px-14 pb-10 md:pb-16 pt-2 space-y-8">
            <div className="space-y-1 bg-slate-950/50 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-inner">
              
              <div className="flex flex-col gap-1 border-b border-white/5 pb-5 mb-5">
                <span className="text-slate-500 font-black uppercase text-[9px] tracking-widest">Legal Owner</span>
                <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tight italic">{details?.fullName}</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600 font-bold uppercase text-[8px] tracking-widest">Property ID</span>
                  <span className="text-amber-500 font-black text-lg md:text-xl tabular-nums">W-{details?.wing} | F-{details?.flatNumber}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-slate-600 font-bold uppercase text-[8px] tracking-widest">Type</span>
                  <span className="text-slate-300 font-black text-lg md:text-xl uppercase">{details?.unitType}</span>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-slate-400 font-bold text-[10px] uppercase">Market Valuation</span>
                    <span className="text-white font-black">₹{formatAmount(total)}</span>
                 </div>
                 <div className="flex justify-between items-center bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                    <div className="flex flex-col">
                        <span className="text-emerald-500 font-black text-[10px] uppercase italic">Authorized Payment</span>
                        <span className="text-emerald-600/60 text-[8px] font-bold uppercase">{details?.method} Gateway</span>
                    </div>
                    <span className="text-emerald-400 font-black text-lg">₹{formatAmount(paid)}</span>
                 </div>
                 <div className="flex justify-between items-center p-4">
                    <span className="text-red-500/50 font-black text-[10px] uppercase tracking-widest">Outstanding</span>
                    <span className="text-red-400/80 font-black italic">₹{formatAmount(pending)}</span>
                 </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button 
                   whileHover={{ scale: 1.02 }} 
                   whileTap={{ scale: 0.98 }}
                   onClick={downloadPDF} 
                   className="w-full py-5 md:py-6 bg-emerald-500 text-slate-950 rounded-2xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-[11px] tracking-widest flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
                >
                  <Download size={18} strokeWidth={3} /> Get Document
                </motion.button>

                <motion.button 
                   whileHover={{ scale: 1.02 }} 
                   whileTap={{ scale: 0.98 }}
                   onClick={() => navigate('/home1')} 
                   className="w-full py-5 md:py-6 bg-slate-800/50 hover:bg-slate-800 text-white border border-white/10 rounded-2xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-[11px] tracking-widest flex items-center justify-center gap-3 transition-colors"
                >
                  <Home size={18} /> Dashboard
                </motion.button>
            </div>
          </div>
          
          <div className="bg-slate-950 p-6 text-center border-t border-white/5">
             <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.5em]">Digitally Signed By Dwarkesh Infrastructure</p>
          </div>
        </motion.div>
      </div>

      {/* --- PDF TEMPLATE (Hidden from UI) --- */}
      <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
        <div ref={receiptRef} style={{ width: '800px', background: 'white', color: '#1e293b', border: '20px solid #065f46', padding: '60px', fontFamily: 'sans-serif' }}>
          <div style={{ border: '2px solid #065f46', padding: '40px', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '42px', fontWeight: '900', color: '#064e3b', marginBottom: '10px', textTransform: 'uppercase' }}>DWARKESH E-SOCIETY</h1>
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px', color: '#64748b', marginBottom: '40px' }}>OFFICIAL POSSESSION RECEIPT</p>
            
            <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>RECEIPT NO: #DWK-{Math.floor(Math.random() * 9000) + 1000}</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>DATE: {new Date().toLocaleDateString()}</span>
              </div>

              <div style={{ display: 'grid', gap: '20px', fontSize: '18px' }}>
                <p><b>Resident Name:</b> <span style={{textTransform: 'uppercase', color: '#0f172a'}}>{details?.fullName}</span></p>
                <p><b>Unit Allotted:</b> WING {details?.wing} - FLAT {details?.flatNumber} ({details?.unitType})</p>
                <p><b>Market Value:</b> ₹{formatAmount(total)}/-</p>
                <p style={{color: '#059669', background: '#ecfdf5', padding: '10px', borderRadius: '8px'}}><b>Amount Received:</b> ₹{formatAmount(paid)}/- (Via {details?.method})</p>
                <p style={{color: '#dc2626', fontSize: '24px', marginTop: '10px'}}><b>Balance Due:</b> ₹{formatAmount(pending)}/-</p>
              </div>
            </div>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontSize: '14px' }}>
                <p style={{ marginBottom: '40px' }}>__________________________</p>
                <p><b>Authorized Signature</b><br/>Rudra Gelot (Admin)</p>
              </div>
              <div style={{ width: '120px', height: '120px', border: '5px double #065f46', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-15deg)' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#065f46' }}>PAID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatBook;