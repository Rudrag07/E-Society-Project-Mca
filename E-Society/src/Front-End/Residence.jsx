import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Users, Car, Baby, CreditCard, QrCode, Landmark, User, 
  Hash, Banknote, Bike, Info, Activity, ChevronRight, Lock, 
  CheckCircle2, ShieldAlert, ShieldCheck as ShieldIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
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

  // 🔴 FIXED THIS FUNCTION - DATA LINKING WITH FLATBOOK
  const executeRegistry = async (e) => {
    e.preventDefault();
    if (isBooked) return toast.error("Unit Occupied");
    
    setIsVerifying(true);
    const toastId = toast.loading("Processing Registry...");

    setTimeout(() => {
      // Calculation Logic for FlatBook.jsx
      const pricing = pricingModel[formData.unitType];
      const totalAmount = pricing.base + pricing.tax + pricing.maintenance;

      const payload = { 
        ...formData, 
        timestamp: new Date().toISOString(), 
        totalValue: totalAmount, // This sends the total price
        receivedAmount: formData.paymentType === 'Token' ? 50000 : totalAmount, // This sends paid amount
      };

      // Save for Receipt
      localStorage.setItem('last_pending_booking', JSON.stringify(payload));
      
      // Update Master Booking List
      const currentBookings = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
      localStorage.setItem('eSociety_bookings', JSON.stringify([...currentBookings, payload]));

      toast.success("Identity Authorized!", { id: toastId });
      setTimeout(() => navigate('/flatbook'), 1000);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#010208] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-20">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-3">
               <span className="bg-amber-500 text-black px-3 py-1 rounded-xl">D</span>
               Dwarkesh <span className="text-amber-500">E-Society</span>
             </h1>
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mt-2 ml-1">Registry Management System</p>
          </motion.div>
          
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
             <div className="text-right">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Total Units</p>
                <p className="text-xl font-black text-white mt-1">600</p>
             </div>
             <div className="w-[1px] h-8 bg-white/10" />
             <div className="text-left">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Available</p>
                <p className="text-xl font-black text-emerald-500 mt-1">{600 - bookedUnits.length}</p>
             </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-[#050810] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden relative">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-1.5 w-full" />

          <div className="p-6 md:p-14">
            <form onSubmit={executeRegistry} className="space-y-12">
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20"><User size={20} /></div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Resident Identification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                    <input required type="text" placeholder="Full Name (As per Aadhar)" className="w-full bg-slate-900/30 border border-white/5 rounded-3xl pl-16 pr-8 py-6 font-bold text-sm outline-none focus:border-amber-500" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <select className="w-full bg-slate-900/30 border border-white/5 rounded-3xl px-8 py-6 text-amber-500 font-black outline-none text-xs appearance-none" value={formData.wing} onChange={(e) => setFormData({...formData, wing: e.target.value})}>
                    {Object.keys(wingConfig).map(w => <option key={w} value={w} className="bg-slate-950">{wingConfig[w].label}</option>)}
                  </select>
                  <div className="relative">
                    <Hash className={`absolute left-6 top-1/2 -translate-y-1/2 ${isBooked ? 'text-red-500' : 'text-slate-700'}`} size={18} />
                    <input required type="number" value={formData.flatNumber} className={`w-full bg-slate-900/30 border rounded-3xl pl-16 pr-8 py-6 font-black outline-none text-sm ${isBooked ? 'border-red-500 text-red-500' : 'border-white/5 focus:border-emerald-500'}`} onChange={(e) => handleFlatNumberValidation(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-10 space-y-8">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><Info size={20} /></div>
                      <h3 className="text-sm font-black uppercase tracking-widest">Family & Vehicle Details</h3>
                    </div>
                    <div className="bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                        Smart {formData.unitType} Allocation
                    </div>
                 </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { label: 'Adults', k: 'adults', icon: <Users size={20}/>, color: 'text-amber-500' },
                    { label: 'Kids', k: 'children', icon: <Baby size={20}/>, color: 'text-blue-400' },
                    { label: '2-Wheelers', k: 'twoWheeler', icon: <Bike size={20}/>, color: 'text-emerald-400' },
                    { label: '4-Wheelers', k: 'fourWheeler', icon: <Car size={20}/>, color: 'text-purple-400' }
                  ].map((item) => (
                    <div key={item.k} className="bg-[#03050a] border border-white/5 rounded-[2rem] p-5 flex flex-col items-center">
                      <div className={`${item.color} mb-3 opacity-40`}>{item.icon}</div>
                      <span className="text-[9px] font-black text-slate-600 uppercase mb-4 tracking-widest">{item.label}</span>
                      <div className="flex items-center gap-5">
                         <button type="button" onClick={() => handleCounter(item.k, 'dec')} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white font-bold">−</button>
                         <span className="font-black text-xl text-white w-6 text-center">{formData[item.k]}</span>
                         <button type="button" onClick={() => handleCounter(item.k, 'inc')} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white font-bold">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><CreditCard size={20} /></div>
                    <h3 className="text-sm font-black uppercase tracking-widest">Transaction Gateway</h3>
                 </div>

                 <div className="flex p-2 bg-black border border-white/5 rounded-[2rem] gap-3">
                  {['Token', 'Full'].map(t => (
                    <button key={t} type="button" onClick={() => setFormData({...formData, paymentType: t})} className={`flex-1 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${formData.paymentType === t ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}>
                      {t === 'Token' ? 'Reserve via Token (₹50k)' : 'Full Settlement'}
                    </button>
                  ))}
                 </div>

                 <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {[{ id: 'QR Code', icon: <QrCode size={24}/>, label: 'Digital QR' }, { id: 'Card', icon: <CreditCard size={24}/>, label: 'Credit Card' }, { id: 'Net Bank', icon: <Landmark size={24}/>, label: 'E-Banking' }].map((m) => (
                    <button key={m.id} type="button" onClick={() => setFormData({...formData, method: m.id})} className={`flex flex-col items-center py-8 rounded-[2.5rem] border-2 transition-all ${formData.method === m.id ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500 shadow-xl' : 'bg-[#03050a] border-white/5 text-slate-700'}`}>
                      {m.icon}
                      <span className="text-[9px] font-black mt-4 uppercase tracking-[0.2em]">{m.label}</span>
                    </button>
                  ))}
                 </div>

                 <AnimatePresence mode="wait">
                  <motion.div key={formData.method + formData.paymentType} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#03050a] border border-white/10 rounded-[3rem] p-8 md:p-12 min-h-[350px] flex flex-col justify-center relative">
                    {formData.method === 'QR Code' && (
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        {formData.paymentType === 'Full' ? (
                          <div className="w-full text-center space-y-4">
                             <ShieldAlert className="text-amber-500 mx-auto" size={48} />
                             <h4 className="text-sm font-black text-amber-500 uppercase">Use Net Banking for Full Payments</h4>
                          </div>
                        ) : (
                          <>
                            <div className="bg-white p-5 rounded-[2.5rem] shrink-0 shadow-2xl"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=8200792488@axl&pn=Rudra&am=50000&cu=INR`} alt="QR" className="w-40 h-40 md:w-48 md:h-48" /></div>
                            <div className="flex-1 w-full space-y-6">
                               <div className="bg-slate-900/80 px-6 py-5 rounded-2xl border border-white/5 text-amber-500 font-mono text-xs flex justify-between">8200792488@axl <Lock size={12} className="opacity-30" /></div>
                               <input type="text" placeholder="Your UPI ID" className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-xs text-emerald-500 font-black outline-none focus:border-emerald-500" value={formData.userUpiId} onChange={(e) => setFormData({...formData, userUpiId: e.target.value})} />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {formData.method === 'Card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                         <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-slate-600 uppercase ml-4">Cardholder Name</label>
                            <input type="text" placeholder="FULL NAME" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-xs outline-none focus:border-amber-500 font-bold" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} />
                         </div>
                         <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-slate-600 uppercase ml-4">Card Number</label>
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-xs outline-none focus:border-amber-500 font-mono" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
                         </div>
                         <input type="text" placeholder="MM / YY" className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-xs outline-none focus:border-amber-500 font-bold" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
                         <input type="password" placeholder="CVV" className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-5 text-xs outline-none focus:border-amber-500 font-bold" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
                      </div>
                    )}

                    {formData.method === 'Net Bank' && (
                      <div className="space-y-6 relative z-10">
                         <div className="relative space-y-2">
                            <label className="text-[10px] font-black text-slate-600 uppercase ml-4">Select Bank</label>
                            <select className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-6 text-xs outline-none appearance-none text-slate-300 font-black" value={formData.bankSelection} onChange={(e) => setFormData({...formData, bankSelection: e.target.value})}>
                              <option value="">SELECT BANK</option>
                              <option value="sbi">SBI</option><option value="hdfc">HDFC</option><option value="icici">ICICI</option>
                            </select>
                            <ChevronRight className="absolute right-8 bottom-6 text-slate-700 rotate-90" size={20} />
                         </div>
                         <input type="text" placeholder="CUSTOMER ID" className="w-full bg-slate-900 border border-white/5 rounded-2xl px-8 py-6 text-xs outline-none focus:border-emerald-500 font-bold" />
                      </div>
                    )}
                  </motion.div>
                 </AnimatePresence>
              </div>

              <div className="bg-gradient-to-br from-[#0a0a0f] to-black border border-white/10 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-inner">
                <div>
                  <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] mb-3">Investment Valuation</p>
                  <p className="text-3xl md:text-5xl font-black text-white tracking-tighter">₹{pricingModel[formData.unitType].base.toLocaleString()}<span className="text-[11px] text-slate-700 ml-4">+ Maintenance</span></p>
                </div>
                <div className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${isBooked ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse'}`}>
                  {isBooked ? 'ALLOCATION STATUS: LOCKED' : 'ALLOCATION STATUS: OPEN'}
                </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start gap-4 px-8 py-6 bg-white/[0.01] border border-white/5 rounded-[2rem]">
                    <input type="checkbox" checked={formData.agreedTerms} onChange={(e) => setFormData({...formData, agreedTerms: e.target.checked})} className="w-5 h-5 mt-0.5 rounded-lg accent-amber-500 cursor-pointer" />
                    <p className="text-[9px] text-slate-700 font-bold leading-relaxed uppercase tracking-wider">I authorize the society administration to process my registry application. I acknowledge all property taxes and maintenance fees.</p>
                 </div>

                 <motion.button
                  whileHover={!isBooked && formData.agreedTerms ? { scale: 1.01, y: -4 } : {}}
                  type="submit"
                  disabled={isBooked || isVerifying || !formData.agreedTerms}
                  className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center gap-5 text-xs ${isBooked || !formData.agreedTerms ? 'bg-slate-900 text-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black'}`}
                 >
                    {isVerifying ? "AUTHORIZING..." : (isBooked ? 'RESIDENCY LOCKED' : `AUTHORIZE UNIT ${formData.flatNumber} REGISTRY`)}
                    {!isVerifying && <ArrowRight size={20} strokeWidth={3} />}
                 </motion.button>
              </div>
            </form>
          </div>

          <footer className="bg-black/90 p-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 px-16">
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.6em] mb-2">Dwarkesh E-Society Core</p>
                <div className="flex gap-3">
                   <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-slate-800">Admin Node: 8200792488</div>
                   <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-slate-800">Ahmedabad, IN</div>
                </div>
             </div>
             <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Designed by Rudra Gelot</p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Residence;