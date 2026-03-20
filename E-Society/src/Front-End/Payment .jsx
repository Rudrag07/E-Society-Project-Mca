import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, Zap, ArrowLeft, CheckCircle2, Building2, Smartphone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [method, setMethod] = useState('card');

  const [formData, setFormData] = useState({
    cardNo: '', expiry: '', cvv: '', upiId: '', bank: ''
  });

  const bookingData = JSON.parse(localStorage.getItem('last_pending_booking')) || { fullName: 'Resident', flatNumber: '401', wing: 'A' };
  const bookingAmount = 500000;
  const maintenance = 15000;
  
  const totalToPay = method === 'card' ? bookingAmount : maintenance; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateAndPay = () => {
    if (method === 'card') {
      if (formData.cardNo.length < 16) return toast.error("Enter valid 16-digit card number");
      if (!formData.expiry.includes('/')) return toast.error("Enter expiry in MM/YY format");
      if (formData.cvv.length < 3) return toast.error("Invalid CVV");
    } else if (method === 'upi') {
      if (!formData.upiId.includes('@')) return toast.error("Please enter a valid UPI ID");
    } else if (method === 'net' && !formData.bank) {
      return toast.error("Please select your bank");
    }

    const loadingToast = toast.loading("Connecting to Gateway...", {
      style: { background: '#0f172a', color: '#fbbf24', border: '1px solid #fbbf24' }
    });

    setTimeout(() => {
      toast.dismiss(loadingToast);
      const pendingData = JSON.parse(localStorage.getItem('last_pending_booking'));
      if (pendingData) {
        const allConfirmed = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
        localStorage.setItem('eSociety_bookings', JSON.stringify([...allConfirmed, pendingData]));
      }
      setPaymentDone(true);
      toast.success("Payment Successful!");
      setTimeout(() => navigate('/flatbook'), 2500); 
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-20 md:pt-28 pb-10 px-4 flex flex-col items-center font-sans overflow-x-hidden">
      <Toaster position="top-center" />
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[100px] md:blur-[130px]"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        
        {/* --- LEFT SIDE: Order & Card Visual --- */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <button onClick={() => navigate(-1)} className="hidden md:flex items-center gap-2 text-slate-500 hover:text-white transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1" /> 
            <span className="text-xs font-black uppercase tracking-widest">Back</span>
          </button>

          {/* Card Visual with Responsive Width */}
          <AnimatePresence mode="wait">
            {method === 'card' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative h-48 md:h-64 w-full perspective-1000">
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/20 shadow-2xl">
                  <div className="flex justify-between items-start mb-6 md:mb-12">
                    <div className="h-8 w-12 md:h-12 md:w-16 bg-amber-500/20 rounded-lg border border-amber-500/30"></div>
                    <Zap className="text-amber-500 size-5 md:size-6" fill="currentColor" />
                  </div>
                  <div className="text-lg md:text-2xl font-mono text-white tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6">
                    {formData.cardNo ? formData.cardNo.replace(/\d{4}(?=.)/g, '$& ') : "**** **** **** 8892"}
                  </div>
                  <div className="flex justify-between items-end uppercase">
                    <div className="max-w-[140px] md:max-w-[180px]">
                      <p className="text-[8px] md:text-[10px] text-slate-500 font-black tracking-widest">Resident</p>
                      <p className="text-xs md:text-sm font-bold text-white truncate">{bookingData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] text-slate-500 font-black tracking-widest">Expiry</p>
                      <p className="text-xs md:text-sm font-bold text-white">{formData.expiry || "12/28"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price Summary Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-black text-base md:text-lg italic tracking-tight uppercase">Premium Unit {bookingData.wing}-{bookingData.flatNumber}</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">E-Society Ahmedabad</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-2 py-1 rounded-md border border-emerald-500/20">VERIFIED</div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="text-sm md:text-base font-black text-slate-400 italic">TOTAL PAYABLE</span>
              <span className="text-2xl md:text-3xl font-black text-amber-500 tracking-tighter">₹{totalToPay.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Gateway Container --- */}
        <div className="bg-[#0f172a] border border-white/10 rounded-[1.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl min-h-[500px] flex flex-col order-1 lg:order-2">
          {paymentDone ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center my-auto">
               <div className="h-20 w-20 md:h-28 md:w-28 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-emerald-500/20">
                  <CheckCircle2 size={40} className="text-emerald-500 md:size-60" />
               </div>
               <h2 className="text-2xl md:text-4xl font-black text-white italic">Payment Done!</h2>
               <p className="text-slate-500 text-sm mt-2">Check your email for receipt.</p>
            </motion.div>
          ) : (
            <div className="space-y-6 h-full flex flex-col"> 
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">Secure Checkout</h2>
                <ShieldCheck className="text-slate-600 size-6 md:size-8" />
              </div>

              {/* Method Selector */}
              <div className="flex bg-slate-950 p-1.5 rounded-2xl gap-1 border border-white/5">
                {[
                    {id: 'card', icon: <CreditCard size={14}/>, label: 'Card'},
                    {id: 'upi', icon: <Smartphone size={14}/>, label: 'UPI'},
                    {id: 'net', icon: <Building2 size={14}/>, label: 'Net'}
                ].map((item) => (
                  <button key={item.id} onClick={() => setMethod(item.id)} className={`flex-1 py-3 md:py-4 rounded-xl flex flex-col items-center gap-1 font-black text-[9px] uppercase transition-all ${method === item.id ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Inputs */}
              <div className="flex-grow py-4">
                <AnimatePresence mode="wait">
                  {method === 'card' && (
                    <motion.div key="cardIn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <input name="cardNo" onChange={handleInputChange} maxLength={16} type="text" placeholder="Card Number (16 Digits)" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                      <div className="grid grid-cols-2 gap-4">
                          <input name="expiry" onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                          <input name="cvv" onChange={handleInputChange} maxLength={3} type="password" placeholder="CVV" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                      </div>
                    </motion.div>
                  )}
                  {method === 'upi' && (
                    <div className="space-y-4 text-center">
                       <input name="upiId" onChange={handleInputChange} type="text" placeholder="UPI ID (e.g. name@upi)" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Or scan static QR below</p>
                       <div className="bg-white p-2 rounded-xl inline-block">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=esociety@bank&am=${totalToPay}`} alt="QR" className="w-24 h-24" />
                       </div>
                    </div>
                  )}
                  {method === 'net' && (
                    <div className="space-y-2">
                      {['HDFC Bank', 'ICICI Bank', 'SBI Bank'].map(bank => (
                        <button key={bank} onClick={() => setFormData({...formData, bank})} className={`w-full p-4 rounded-xl border flex justify-between items-center ${formData.bank === bank ? 'border-amber-500 bg-amber-500/5 text-white' : 'border-white/5 bg-slate-950 text-slate-500'}`}>
                          <span className="font-bold text-xs">{bank}</span>
                          <div className={`w-3 h-3 rounded-full ${formData.bank === bank ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
                        </button>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pay Button */}
              <button 
                onClick={validateAndPay} 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm"
              >
                Confirm Payment <Zap size={16} fill="currentColor"/>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
};

export default Payment;