import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Users, Car, Baby, CreditCard, QrCode, Landmark, User, 
  Hash, Banknote, Bike, Info, Activity, ChevronRight, Lock, 
  CheckCircle2, ShieldAlert, ShieldCheck as ShieldIcon
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Residence = () => {
  const navigate = useNavigate();
  
  const wingConfig = useMemo(() => ({
    'A': { min: 1, max: 100, type: '3BHK', label: 'Wing A (Premium 3BHK) [1-100]' },
    'B': { min: 101, max: 200, type: '3BHK', label: 'Wing B (Premium 3BHK) [101-200]' },
    'C': { min: 201, max: 300, type: '4BHK', label: 'Wing C (Royal 4BHK) [201-300]' },
    'D': { min: 301, max: 400, type: '3BHK', label: 'Wing D (Premium 3BHK) [301-400]' },
    'E': { min: 401, max: 500, type: '4BHK', label: 'Wing E (Royal 4BHK) [401-500]' },
    'F': { min: 501, max: 600, type: '4BHK', label: 'Wing F (Royal 4BHK) [501-600]' } 
  }), []);

  const pricingModel = { 
    '3BHK': { base: 4500000, tax: 250000, maintenance: 50000 },
    '4BHK': { base: 6000000, tax: 350000, maintenance: 75000 }
  };

  const [formData, setFormData] = useState({
    fullName: '', unitType: '3BHK', wing: 'A', flatNumber: 1, 
    adults: 1, children: 0, twoWheeler: 0, fourWheeler: 0,
    paymentType: 'Token', method: 'QR Code', userUpiId: '',
    cardHolder: '', cardNumber: '', expiry: '', cvv: '',
    bankSelection: '', agreedTerms: true
  });

  const [isBooked, setIsBooked] = useState(false);
  const [bookedUnits, setBookedUnits] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
    setBookedUnits(data);
  }, []);

  useEffect(() => {
    const config = wingConfig[formData.wing];
    setFormData(prev => ({ ...prev, unitType: config.type, flatNumber: config.min }));
  }, [formData.wing, wingConfig]);

  useEffect(() => {
    const isTaken = bookedUnits.some(
      (b) => b.wing === formData.wing && Number(b.flatNumber) === Number(formData.flatNumber)
    );
    setIsBooked(isTaken);
  }, [formData.wing, formData.flatNumber, bookedUnits]);

  const handleFlatNumberValidation = (value) => {
    const val = parseInt(value) || 0;
    const currentWing = wingConfig[formData.wing];
    if (val < currentWing.min) setFormData(prev => ({ ...prev, flatNumber: currentWing.min }));
    else if (val > currentWing.max) setFormData(prev => ({ ...prev, flatNumber: currentWing.max }));
    else setFormData(prev => ({ ...prev, flatNumber: val }));
  };

  const handleCounter = (key, action) => {
    setFormData(prev => {
      const newValue = action === 'inc' ? prev[key] + 1 : prev[key] - 1;
      return { ...prev, [key]: newValue < 0 ? 0 : newValue };
    });
  };

  const executeRegistry = async (e) => {
    e.preventDefault();
    if (isBooked) return toast.error("Unit Occupied");
    
    setIsVerifying(true);
    const toastId = toast.loading("Processing Registry...");

    setTimeout(() => {
      const pricing = pricingModel[formData.unitType];
      const totalAmount = pricing.base + pricing.tax + pricing.maintenance;

      const payload = { 
        ...formData, 
        timestamp: new Date().toISOString(), 
        totalValue: totalAmount, 
        receivedAmount: formData.paymentType === 'Token' ? 50000 : totalAmount, 
      };

      localStorage.setItem('last_pending_booking', JSON.stringify(payload));
      const currentBookings = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
      localStorage.setItem('eSociety_bookings', JSON.stringify([...currentBookings, payload]));

      toast.success("Identity Authorized!", { id: toastId });
      setTimeout(() => navigate('/flatbook'), 1000);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-20">
      <Toaster position="top-center" />
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
             <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4">
               <span className="bg-gradient-to-br from-amber-400 to-orange-600 text-black px-4 py-1 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">D</span>
               Dwarkesh <span className="text-amber-500">E-Society</span>
             </h1>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.6em] mt-3 ml-1 opacity-60 text-center md:text-left">Registry Management System • 2026</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6 bg-slate-900/40 p-5 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl">
             <div className="text-center px-4">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Total Units</p>
                <p className="text-2xl font-black text-white">600</p>
             </div>
             <div className="w-[1px] h-10 bg-white/10" />
             <div className="text-center px-4">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Available</p>
                <p className="text-2xl font-black text-emerald-500">{600 - bookedUnits.length}</p>
             </div>
          </motion.div>
        </div>

        {/* MAIN FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-[#0a0c14] border border-white/10 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
          <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 h-2 w-full animate-pulse" />

          <div className="p-8 md:p-16">
            <form onSubmit={executeRegistry} className="space-y-16">
              
              {/* SECTION 1: IDENTITY */}
              <div className="space-y-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"><User size={22} /></div>
                  <h3 className="text-base font-black uppercase tracking-[0.2em] text-white">Resident Identification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 relative group">
                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors" size={20} />
                    <input required type="text" placeholder="Full Name (As per Aadhar Card)" className="w-full bg-slate-950 border border-white/5 rounded-[2rem] pl-20 pr-8 py-7 font-bold text-sm outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  
                  <div className="relative group">
                     <select className="w-full bg-slate-950 border border-white/5 rounded-[2rem] px-10 py-7 text-amber-500 font-black outline-none text-xs appearance-none focus:border-amber-500/50 transition-all cursor-pointer" value={formData.wing} onChange={(e) => setFormData({...formData, wing: e.target.value})}>
                        {Object.keys(wingConfig).map(w => <option key={w} value={w} className="bg-slate-950">{wingConfig[w].label}</option>)}
                     </select>
                     <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 text-amber-500/40 rotate-90 pointer-events-none" size={18} />
                  </div>

                  <div className="relative group">
                    <Hash className={`absolute left-8 top-1/2 -translate-y-1/2 ${isBooked ? 'text-red-500 animate-bounce' : 'text-slate-600'}`} size={20} />
                    <input required type="number" value={formData.flatNumber} className={`w-full bg-slate-950 border rounded-[2rem] pl-20 pr-8 py-7 font-black outline-none text-sm transition-all ${isBooked ? 'border-red-500/50 text-red-500 bg-red-500/5' : 'border-white/5 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5'}`} onChange={(e) => handleFlatNumberValidation(e.target.value)} />
                    {isBooked && <span className="absolute -bottom-6 left-8 text-[10px] text-red-500 font-bold uppercase tracking-widest">This unit is already booked</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: FAMILY & VEHICLE */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 md:p-14 space-y-12">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-500/5"><Info size={22} /></div>
                      <h3 className="text-base font-black uppercase tracking-[0.2em] text-white">Inventory & Logistics</h3>
                    </div>
                    <div className="bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] shadow-inner">
                        Auto {formData.unitType} Pricing Active
                    </div>
                 </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { label: 'Adults', k: 'adults', icon: <Users size={24}/>, color: 'from-amber-400 to-orange-500' },
                    { label: 'Kids', k: 'children', icon: <Baby size={24}/>, color: 'from-blue-400 to-indigo-500' },
                    { label: '2-Wheeler', k: 'twoWheeler', icon: <Bike size={24}/>, color: 'from-emerald-400 to-teal-500' },
                    { label: '4-Wheeler', k: 'fourWheeler', icon: <Car size={24}/>, color: 'from-purple-400 to-pink-500' }
                  ].map((item) => (
                    <div key={item.k} className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center hover:border-white/10 transition-colors group">
                      <div className={`mb-4 opacity-30 group-hover:opacity-100 transition-opacity text-slate-400`}>{item.icon}</div>
                      <span className="text-[10px] font-black text-slate-600 uppercase mb-6 tracking-widest text-center">{item.label}</span>
                      <div className="flex items-center gap-6">
                         <button type="button" onClick={() => handleCounter(item.k, 'dec')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition-all font-bold text-xl">−</button>
                         <span className="font-black text-2xl text-white w-8 text-center tabular-nums">{formData[item.k]}</span>
                         <button type="button" onClick={() => handleCounter(item.k, 'inc')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all font-bold text-xl">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: PAYMENTS */}
              <div className="space-y-10">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5"><CreditCard size={22} /></div>
                    <h3 className="text-base font-black uppercase tracking-[0.2em] text-white">Financial Settlement</h3>
                 </div>

                 <div className="flex p-2 bg-slate-950 border border-white/5 rounded-[2.5rem] gap-3 shadow-inner">
                  {['Token', 'Full'].map(t => (
                    <button key={t} type="button" onClick={() => setFormData({...formData, paymentType: t})} className={`flex-1 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-500 ${formData.paymentType === t ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-[0_10px_30px_rgba(245,158,11,0.2)]' : 'text-slate-600 hover:text-slate-400'}`}>
                      {t === 'Token' ? 'Reserve via Token (₹50,000)' : 'Full Property Settlement'}
                    </button>
                  ))}
                 </div>

                 <div className="grid grid-cols-3 gap-6">
                  {[{ id: 'QR Code', icon: <QrCode size={28}/>, label: 'UPI QR' }, { id: 'Card', icon: <CreditCard size={28}/>, label: 'Card' }, { id: 'Net Bank', icon: <Landmark size={28}/>, label: 'E-Bank' }].map((m) => (
                    <button key={m.id} type="button" onClick={() => setFormData({...formData, method: m.id})} className={`flex flex-col items-center py-10 rounded-[3rem] border-2 transition-all duration-500 ${formData.method === m.id ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500 shadow-2xl scale-[1.02]' : 'bg-slate-950 border-white/5 text-slate-700 hover:border-white/10'}`}>
                      {m.icon}
                      <span className="text-[10px] font-black mt-5 uppercase tracking-[0.3em]">{m.label}</span>
                    </button>
                  ))}
                 </div>

                 <AnimatePresence mode="wait">
                  <motion.div 
                    key={formData.method + formData.paymentType} 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="bg-slate-950 border border-white/10 rounded-[3.5rem] p-10 md:p-16 min-h-[400px] flex flex-col justify-center relative shadow-inner overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-30" />
                    
                    {formData.method === 'QR Code' && (
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                        {formData.paymentType === 'Full' ? (
                          <div className="w-full text-center space-y-6 py-10">
                             <ShieldAlert className="text-amber-500 mx-auto animate-pulse" size={60} />
                             <h4 className="text-base font-black text-amber-500 uppercase tracking-widest">Digital Limit Exceeded</h4>
                             <p className="text-[10px] text-slate-500 max-w-xs mx-auto font-bold tracking-wider leading-relaxed">For security reasons, full settlements are restricted via QR. Please use Net Banking or Card.</p>
                          </div>
                        ) : (
                          <>
                            <div className="bg-white p-7 rounded-[3rem] shrink-0 shadow-[0_20px_50px_rgba(255,255,255,0.1)] border-8 border-slate-900">
                               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=8200792488@axl&pn=Rudra&am=50000&cu=INR`} alt="Secure QR" className="w-44 h-44 md:w-56 md:h-56 grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex-1 w-full space-y-8">
                               <div className="bg-slate-900 px-8 py-6 rounded-3xl border border-white/5 text-amber-500 font-mono text-sm flex justify-between items-center group">
                                  8200792488@axl 
                                  <Lock size={16} className="opacity-30 group-hover:text-emerald-500 transition-colors" />
                               </div>
                               <div className="space-y-3">
                                  <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Verify Your UPI ID</label>
                                  <input type="text" placeholder="username@upi" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-6 text-sm text-emerald-500 font-black outline-none focus:border-emerald-500 transition-all" value={formData.userUpiId} onChange={(e) => setFormData({...formData, userUpiId: e.target.value})} />
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {formData.method === 'Card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                         <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Cardholder Name</label>
                            <input type="text" placeholder="AS PRINTED ON CARD" className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-6 text-xs outline-none focus:border-amber-500 transition-all font-bold uppercase tracking-widest" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} />
                         </div>
                         <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-6 text-sm outline-none focus:border-amber-500 transition-all font-mono tracking-[0.3em]" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Expiry</label>
                            <input type="text" placeholder="MM / YY" className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-6 text-xs outline-none focus:border-amber-500 transition-all font-bold" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Security CVV</label>
                            <input type="password" placeholder="***" className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-6 text-xs outline-none focus:border-amber-500 transition-all font-bold" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
                         </div>
                      </div>
                    )}

                    {formData.method === 'Net Bank' && (
                      <div className="space-y-10 relative z-10">
                         <div className="relative space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Core Banking Gateway</label>
                            <select className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-7 text-xs outline-none appearance-none text-slate-300 font-black cursor-pointer focus:border-emerald-500 transition-all" value={formData.bankSelection} onChange={(e) => setFormData({...formData, bankSelection: e.target.value})}>
                              <option value="">SELECT YOUR BANK</option>
                              <option value="sbi">STATE BANK OF INDIA</option>
                              <option value="hdfc">HDFC BANK</option>
                              <option value="icici">ICICI BANK LTD</option>
                            </select>
                            <ChevronRight className="absolute right-10 bottom-7 text-emerald-500 rotate-90 pointer-events-none" size={20} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-700 uppercase ml-4 tracking-widest">Authenticated Customer ID</label>
                            <input type="text" placeholder="BANK-USER-ID" className="w-full bg-slate-900 border border-white/5 rounded-[2rem] px-10 py-7 text-xs outline-none focus:border-emerald-500 transition-all font-black tracking-widest" />
                         </div>
                      </div>
                    )}
                  </motion.div>
                 </AnimatePresence>
              </div>

              {/* SECTION 4: SUMMARY & SUBMIT */}
              <div className="bg-gradient-to-br from-slate-900 to-[#02040a] border border-white/5 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity size={120} className="text-white" />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">Final Valuation</p>
                  <p className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                    ₹{pricingModel[formData.unitType].base.toLocaleString()}
                    <span className="text-xs text-slate-500 ml-6 uppercase tracking-widest">+ Maintenance Ledger</span>
                  </p>
                </div>
                <div className={`relative z-10 px-10 py-4 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] border shadow-2xl transition-all duration-700 ${isBooked ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 animate-pulse'}`}>
                  {isBooked ? 'Unit Registry: Unavailable' : 'Unit Registry: Open'}
                </div>
              </div>

              <div className="space-y-10">
                 <div className="flex items-start gap-6 px-10 py-8 bg-slate-950 border border-white/5 rounded-[2.5rem] group hover:border-amber-500/20 transition-all">
                    <input type="checkbox" checked={formData.agreedTerms} onChange={(e) => setFormData({...formData, agreedTerms: e.target.checked})} className="w-6 h-6 mt-1 rounded-lg accent-amber-500 cursor-pointer shadow-lg" />
                    <p className="text-[10px] text-slate-600 font-bold leading-loose uppercase tracking-[0.1em] group-hover:text-slate-400 transition-colors">I hereby authorize the Dwarkesh E-Society administration to initialize the official registry of the specified property unit. I understand that token amounts are subject to legal terms.</p>
                 </div>

                 <motion.button
                  whileHover={!isBooked && formData.agreedTerms ? { scale: 1.02, y: -5 } : {}}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isBooked || isVerifying || !formData.agreedTerms}
                  className={`w-full py-10 rounded-[3rem] font-black uppercase tracking-[0.5em] shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all flex items-center justify-center gap-6 text-sm ${isBooked || !formData.agreedTerms ? 'bg-slate-900 text-slate-700 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-black hover:shadow-amber-500/20'}`}
                 >
                    {isVerifying ? (
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Records...</span>
                      </div>
                    ) : (
                      <>
                        {isBooked ? 'Allocation Locked' : `Authorize Registry for Unit ${formData.flatNumber}`}
                        <ArrowRight size={22} strokeWidth={3} className="animate-bounce-x" />
                      </>
                    )}
                 </motion.button>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <footer className="bg-slate-950/80 p-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 px-20">
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-[12px] font-black text-white italic tracking-[0.6em] mb-4">E-SOCIETY CORE</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <div className="px-5 py-2 bg-white/5 rounded-2xl text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5 hover:border-amber-500/30 transition-all">Support: 82007 92488</div>
                   <div className="px-5 py-2 bg-white/5 rounded-2xl text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5">Nodes: Ahmedabad</div>
                </div>
             </div>
             <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-2">Designed & Engineered By</p>
                <p className="text-xl font-black text-white italic tracking-tighter">Rudra Gelot</p>
             </div>
          </footer>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-x { animation: bounce-x 1s infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default Residence;