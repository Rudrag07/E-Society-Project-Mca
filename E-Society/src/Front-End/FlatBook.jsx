import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FlatBook = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const lastBooking = JSON.parse(localStorage.getItem('last_pending_booking'));
    if (!lastBooking) { navigate('/home1'); return; }
    setDetails(lastBooking);
  }, [navigate]);

  const formatAmount = (amt) => {
    const value = parseFloat(amt);
    return isNaN(value) ? "0" : value.toLocaleString('en-IN');
  };

  const downloadPDF = async () => {
    if (!details) return;
    const loadId = toast.loading("Generating Official Document...");
    try {
      const element = receiptRef.current;
      
      // Niche ka part na kate isliye 'windowScrollY: 0' aur 'height' fix kiya hai
      const canvas = await html2canvas(element, { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollY: -window.scrollY // Ye scrolling ki wajah se hone wale cut ko rokta hai
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Agar content A4 se lamba hai toh ye use adjust karega
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.save(`Dwarkesh_Residency_${details.flatNumber}.pdf`);
      toast.dismiss(loadId);
      toast.success("PDF Saved Successfully!");
    } catch (err) {
      toast.dismiss(loadId);
      toast.error("Failed to generate PDF");
    }
  };

  // --- CALCULATIONS (Sahi kiya gaya logic) ---
  const basePrice = details?.unitType === '4BHK' ? 6500000 : 4500000;
  const gstAmount = details?.unitType === '4BHK' ? 325000 : 225000;

  // Yahan bookingData ko details se replace kiya gaya hai error hatane ke liye
  const extraBikes = (details?.twoWheeler > 2) ? (details.twoWheeler - 2) : 0;
  const extraCars = (details?.fourWheeler > 1) ? (details.fourWheeler - 1) : 0;
  const bikeCharges = extraBikes * 3000;
  const carCharges = extraCars * 6000;
 
  const total = parseFloat(details?.totalValue || 0);
  const paid = parseFloat(details?.amountPaid || 0);
  const pending = parseFloat(details?.balanceDue || 0);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden">
      <Toaster position="top-center" />

      <div className="relative w-full max-w-xl z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a0c14]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

          {/* UI HEADER */}
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-black" strokeWidth={3} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase italic">Dwarkesh Residency</h1>
            <p className="text-emerald-500 text-[10px] tracking-[0.3em] font-bold uppercase mt-1">Official Registry Confirmed</p>
          </div>

          {/* UI CONTENT */}
          <div className="px-6 pb-10 space-y-6">
            <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-white/5">
              <div className="border-b border-white/5 pb-4 mb-4">
                <span className="text-slate-500 text-[9px] uppercase font-bold">Owner Name</span>
                <p className="text-white font-black text-xl uppercase italic">{details?.fullName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-600 text-[8px] uppercase font-bold">Flat No</p>
                  <p className="text-amber-500 font-black">W-{details?.wing} | F-{details?.flatNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 text-[8px] uppercase font-bold">Category</p>
                  <p className="text-slate-300 font-black uppercase">{details?.unitType}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-slate-400 text-[10px] font-bold">TOTAL VALUE</span>
                  <span className="text-white font-black">₹{formatAmount(total)}</span>
                </div>
                <div className="flex justify-between p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-500 text-[10px] font-bold uppercase">Amount Received</span>
                  <span className="text-emerald-400 font-black">₹{formatAmount(paid)}</span>
                </div>
                <div className={`flex justify-between p-3 rounded-xl border ${pending > 0 ? 'bg-orange-500/5 border-orange-500/20' : 'bg-blue-500/5 border-blue-500/20'}`}>
                  <span className={`${pending > 0 ? 'text-orange-500' : 'text-blue-400'} text-[10px] font-bold uppercase`}>
                    {pending > 0 ? 'Pending Balance' : 'Payment Settled'}
                  </span>
                  <span className={`${pending > 0 ? 'text-orange-400' : 'text-blue-400'} font-black`}>₹{formatAmount(pending)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={downloadPDF} className="py-5 bg-emerald-500 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                <Download size={18} /> Get PDF
              </button>
              <button onClick={() => navigate('/home1')} className="py-5 bg-slate-800 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                <Home size={18} /> Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- HIDDEN PDF TEMPLATE --- */}
      <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
        <div ref={receiptRef} style={{ width: '800px', background: 'white', color: 'black', padding: '60px', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ border: '12px solid #16042e', padding: '40px', position: 'relative' }}>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '48px', margin: 0, fontWeight: '900', color: '#ff0a0a' }}>DWARKESH RESIDENCY</h1>
              <p style={{ letterSpacing: '8px', color: '#253141', fontSize: '14px', marginTop: '10px' }}>PREMIUM LUXURY LIVING</p>
              <div style={{ height: '4px', width: '100px', background: '#10b981', margin: '20px auto' }}></div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <table style={{ width: '100%', fontSize: '16px', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={{ padding: '5px 0', color: '#1d1c1f' }}>OWNER:</td><td style={{ fontWeight: 'bold', textAlign: 'right', }}>{details?.fullName}</td></tr>
                  <tr><td style={{ padding: '5px 0', color: '#1b1c1f' }}>UNIT:</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>W-{details?.wing} | FLAT {details?.flatNumber} ({details?.unitType})</td></tr>
                  <tr><td style={{ padding: '5px 0', color: '#1b1c1f' }}>DATE:</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{new Date().toLocaleDateString('en-IN')}</td></tr>
                </tbody>
              </table>
            </div>

            {/* BREAKDOWN TABLE */}
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ fontSize: '14px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '15px' }}>PAYMENT BREAKDOWN</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 0' }}>Base Price ({details?.unitType})</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{formatAmount(basePrice)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 0' }}>GST (5% Government Tax)</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{formatAmount(gstAmount)}</td>
                  </tr>
                  
                  {/* --- EXTRA BIKES SECTION (Sahi Condition) --- */}
                  {extraBikes > 0 && (
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 0' }}>Additional 2-Wheeler ({extraBikes} Unit)</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#d97706' }}>+ ₹{formatAmount(bikeCharges)}</td>
                    </tr>
                  )}

                  {/* --- EXTRA CARS SECTION (Sahi Condition) --- */}
                  {extraCars > 0 && (
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 0' }}>Additional 4-Wheeler ({extraCars} Unit)</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#d97706' }}>+ ₹{formatAmount(carCharges)}</td>
                    </tr>
                  )}

                  <tr style={{ fontSize: '20px', fontWeight: '900' }}>
                    <td style={{ padding: '20px 0' }}>TOTAL VALUATION:</td>
                    <td style={{ textAlign: 'right', padding: '20px 0', color: '#1e293b' }}>₹{formatAmount(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '15px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>Amount Received:</span><span style={{ fontWeight: 'bold' }}>₹{formatAmount(paid)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: pending > 0 ? '#dc2626' : '#2563eb' }}>
                <span>{pending > 0 ? 'Pending Balance:' : 'Status:'}</span><span style={{ fontWeight: 'bold' }}>{pending > 0 ? `₹${formatAmount(pending)}` : 'PAID IN FULL'}</span>
              </div>
            </div>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Rudra Gelot</p>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>+91 82007 92488</p>
                <p style={{ margin: '5px 0', color: '#051224' }}>City: C.G Road, Ahmedabad, Gujarat, 380001</p>
                <p style={{ margin: '5px 0', color: '#051224' }}>Founder Of, Dwarkesh Residency</p>
                <div style={{ marginTop: '15px', width: '150px', borderTop: '1px solid black' }}>
                  <p style={{ fontSize: '13px', color: '#05224b' }}>Approved By</p>
                </div>
              </div>

              <div style={{
                width: '140px', height: '140px', border: '4px double #1e40af', borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#1e40af', transform: 'rotate(-15deg)', fontWeight: 'bold', textAlign: 'center'
              }}>
                <span style={{ fontSize: '15px' }}>DWARKESH </span>
                <span style={{ fontSize: '20px', color: 'green' }}>APPROVED</span>
                <span style={{ fontSize: '15px' }}>Official Book</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatBook;