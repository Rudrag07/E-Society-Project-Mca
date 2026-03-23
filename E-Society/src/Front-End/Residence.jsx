import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Users, Car, Baby, CreditCard, QrCode, Landmark, User, 
  Hash, Bike, Info, Activity, ChevronRight, Lock, 
  ShieldAlert, Trash2, XCircle, Plus, Minus, ShieldCheck,
  Smartphone, Globe, AlertTriangle, CheckCircle2, Zap, Layout, Shield
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * @project Dwarkesh E-Society Registry
 * @author Rudra Gelot (Founder & Admin)
 * @version 2.2.0 (Strict Validation & Readable Edition)
 */

const Residence = () => {
  const navigate = useNavigate();

  // --- WING DATA CONFIGURATION (STRICT VALIDATION) ---
  const wingConfig = {
    'A': { min: 1, max: 100, type: '3BHK', label: 'Wing A (Premium 3BHK) [1-100]' },
    'B': { min: 101, max: 200, type: '3BHK', label: 'Wing B (Premium 3BHK) [101-200]' },
    'C': { min: 201, max: 300, type: '4BHK', label: 'Wing C (Royal 4BHK) [201-300]' },
    'D': { min: 301, max: 400, type: '3BHK', label: 'Wing D (Premium 3BHK) [301-400]' },
    'E': { min: 401, max: 500, type: '4BHK', label: 'Wing E (Royal 4BHK) [401-500]' },
    'F': { min: 501, max: 600, type: '4BHK', label: 'Wing F (Royal 4BHK) [501-600]' }
  };

  const pricingData = {
    '3BHK': { base: 4500000, tax: 225000, maint: 50000 },
    '4BHK': { base: 6500000, tax: 325000, maint: 75000 }
  };

  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    fullName: '',
    wing: 'A',
    flatNumber: 1,
    unitType: '3BHK',
    adults: 1,
    children: 0,
    twoWheeler: 0,
    fourWheeler: 0,
    paymentType: 'Token',
    method: 'QR Code',
    userUpiId: '',
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    bankSelection: '',
    agreeTerms: true
  });

  const [isBooked, setIsBooked] = useState(false);
  const [bookedUnits, setBookedUnits] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // --- VALIDATION: CHECK IF ALL FIELDS ARE FILLED ---
  const isPaymentInfoFilled = () => {
    if (formData.method === 'QR Code') return formData.userUpiId.length > 5;
    if (formData.method === 'Card') return formData.cardNumber.length >= 12 && formData.cvv.length >= 3;
    if (formData.method === 'Net Bank') return formData.bankSelection !== '' && formData.bankSelection !== 'CHOOSE AUTHORIZED BANK';
    return false;
  };

  const canSubmit = formData.fullName.length > 2 && isPaymentInfoFilled() && !isBooked;
  const isPaymentBlocked = formData.paymentType === 'Full' && formData.method === 'QR Code';

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
    setBookedUnits(data);
  }, []);

  useEffect(() => {
    const config = wingConfig[formData.wing];
    setFormData(prev => ({ ...prev, unitType: config.type, flatNumber: config.min }));
  }, [formData.wing]);

  useEffect(() => {
    const exists = bookedUnits.some(
      (b) => b.wing === formData.wing && Number(b.flatNumber) === Number(formData.flatNumber)
    );
    setIsBooked(exists);
  }, [formData.wing, formData.flatNumber, bookedUnits]);

  // --- COUNTER ACTION HANDLERS ---
  const incAdults = () => setFormData(p => ({ ...p, adults: p.adults + 1 }));
  const decAdults = () => setFormData(p => ({ ...p, adults: p.adults > 1 ? p.adults - 1 : 1 }));
  const incChildren = () => setFormData(p => ({ ...p, children: p.children + 1 }));
  const decChildren = () => setFormData(p => ({ ...p, children: p.children > 0 ? p.children - 1 : 0 }));
  const incTwoW = () => setFormData(p => ({ ...p, twoWheeler: p.twoWheeler + 1 }));
  const decTwoW = () => setFormData(p => ({ ...p, twoWheeler: p.twoWheeler > 0 ? p.twoWheeler - 1 : 0 }));
  const incFourW = () => setFormData(p => ({ ...p, fourWheeler: p.fourWheeler + 1 }));
  const decFourW = () => setFormData(p => ({ ...p, fourWheeler: p.fourWheeler > 0 ? p.fourWheeler - 1 : 0 }));

  // --- REGISTRY EXECUTION ---
  const executeRegistry = async (e) => {
    e.preventDefault();
    if (!canSubmit || isPaymentBlocked) {
      toast.error("Complete all details first!");
      return;
    }
    
    setIsVerifying(true);
    const toastId = toast.loading("Syncing with Dwarkesh Cloud Node...");

    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
      const price = pricingData[formData.unitType];
      const payload = { 
        ...formData, 
        timestamp: new Date().toISOString(), 
        totalValue: price.base + price.tax + price.maint 
      };
      
      localStorage.setItem('eSociety_bookings', JSON.stringify([...current, payload]));
      localStorage.setItem('last_pending_booking', JSON.stringify(payload));
      
      toast.success("Success! Node Registry Confirmed.", { id: toastId });
      setIsVerifying(false);
      navigate('/flatbook');
    }, 2800);
  };

  return (
    <div className="w-full min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-10">
      <Toaster position="top-center" />
      
      {/* ATMOSPHERIC BACKGROUND (REDUCED GLOW) */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-amber-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        
        {/* PREMIUM HEADER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-slate-900/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-2xl">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[1.5rem] flex items-center justify-center text-black">
                <Activity size={32} strokeWidth={3} />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Dwarkesh <span className="text-amber-500">E-Society</span></h1>
                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] opacity-80">Identity Management Hub</p>
              </div>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                 <p className="text-xs font-black text-slate-600 uppercase mb-1">Booked</p>
                 <p className="text-2xl font-black text-white italic">{bookedUnits.length}/600</p>
              </div>
           </div>
        </div>

        <form onSubmit={executeRegistry} className="space-y-16">
          
          {/* SECTION 1: IDENTITY CORE */}
          <div className="bg-[#0a0c14] border border-white/10 rounded-[3.5rem] p-8 md:p-14 space-y-12 shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20"><User size={20} /></div>
                <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">Identity Registry Holder</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="md:col-span-2 space-y-4">
                   <label className="text-sm font-black text-slate-500 uppercase ml-4 tracking-widest">Full Legal Name</label>
                   <input required type="text" placeholder="ENTER OWNER NAME" className="w-full bg-black/60 border border-white/10 p-8 rounded-[2rem] text-sm font-black uppercase tracking-widest focus:border-amber-500/40 outline-none transition-all text-white" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                
                <div className="space-y-4">
                   <label className="text-sm font-black text-slate-500 uppercase ml-4 tracking-widest">Residency Wing</label>
                   <div className="relative">
                      <select className="w-full bg-black/60 border border-white/10 p-8 rounded-[2rem] text-sm font-black text-amber-500 outline-none appearance-none cursor-pointer" value={formData.wing} onChange={(e) => setFormData({...formData, wing: e.target.value})}>
                        <option value="A">WING A (3BHK) [1-100]</option>
                        <option value="B">WING B (3BHK) [101-200]</option>
                        <option value="C">WING C (4BHK) [201-300]</option>
                        <option value="D">WING D (3BHK) [301-400]</option>
                        <option value="E">WING E (4BHK) [401-500]</option>
                        <option value="F">WING F (4BHK) [501-600]</option>
                      </select>
                      <ChevronRight size={20} className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-amber-500/40 pointer-events-none" />
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-sm font-black text-slate-500 uppercase ml-4 tracking-widest">Unit Number</label>
                   <div className="relative">
                      <input required type="number" className={`w-full bg-black/60 border p-8 rounded-[2rem] text-base font-black outline-none transition-all ${isBooked ? 'border-red-500 text-red-500 bg-red-500/5' : 'border-white/10 focus:border-emerald-500 text-white'}`} value={formData.flatNumber} onChange={(e) => setFormData({...formData, flatNumber: e.target.value})} />
                      {isBooked && <p className="absolute -bottom-8 left-4 text-xs font-black text-red-500 uppercase italic">⚠️ Allocation Failed: Occupied</p>}
                   </div>
                </div>
             </div>
          </div>

          {/* SECTION 2: OCCUPANCY HUB */}
          <div className="bg-[#0a0c14] border border-white/10 rounded-[3.5rem] p-8 md:p-14 space-y-12 shadow-2xl">
             <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-8 gap-6">
                <div className="flex items-center gap-5">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><Info size={20} /></div>
                   <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">Logistics & Support</h3>
                </div>
                <div className="bg-emerald-500/10 px-6 py-2 rounded-2xl border border-emerald-500/20 text-sm font-black text-emerald-500 uppercase tracking-[0.2em]">
                   Mode: {formData.unitType}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. ADULTS COUNTER */}
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-[1rem] bg-slate-900 flex items-center justify-center text-slate-400"><Users size={22}/></div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Adults</span>
                   </div>
                   <div className="flex items-center gap-6 bg-slate-950 p-2 rounded-[1.8rem] border border-white/5 min-w-[150px] justify-between">
                      <button type="button" onClick={decAdults} className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500"><Minus size={16} /></button>
                      <span className="text-2xl font-black text-white">{formData.adults}</span>
                      <button type="button" onClick={incAdults} className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500"><Plus size={16} /></button>
                   </div>
                </div>
                {/* 2. CHILDREN COUNTER */}
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-[1rem] bg-slate-900 flex items-center justify-center text-slate-400"><Baby size={22}/></div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Minors</span>
                   </div>
                   <div className="flex items-center gap-6 bg-slate-950 p-2 rounded-[1.8rem] border border-white/5 min-w-[150px] justify-between">
                      <button type="button" onClick={decChildren} className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500"><Minus size={16} /></button>
                      <span className="text-2xl font-black text-white">{formData.children}</span>
                      <button type="button" onClick={incChildren} className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500"><Plus size={16} /></button>
                   </div>
                </div>
                {/* 3. 2-WHEELER COUNTER */}
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-[1rem] bg-slate-900 flex items-center justify-center text-slate-400"><Bike size={22}/></div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-widest">2-Wheel</span>
                   </div>
                   <div className="flex items-center gap-6 bg-slate-950 p-2 rounded-[1.8rem] border border-white/5 min-w-[150px] justify-between">
                      <button type="button" onClick={decTwoW} className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500"><Minus size={16} /></button>
                      <span className="text-2xl font-black text-white">{formData.twoWheeler}</span>
                      <button type="button" onClick={incTwoW} className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500"><Plus size={16} /></button>
                   </div>
                </div>
                {/* 4. 4-WHEELER COUNTER */}
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-[1rem] bg-slate-900 flex items-center justify-center text-slate-400"><Car size={22}/></div>
                      <span className="text-xs font-black uppercase text-slate-500 tracking-widest">4-Wheel</span>
                   </div>
                   <div className="flex items-center gap-6 bg-slate-950 p-2 rounded-[1.8rem] border border-white/5 min-w-[150px] justify-between">
                      <button type="button" onClick={decFourW} className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500"><Minus size={16} /></button>
                      <span className="text-2xl font-black text-white">{formData.fourWheeler}</span>
                      <button type="button" onClick={incFourW} className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500"><Plus size={16} /></button>
                   </div>
                </div>
             </div>
          </div>

          {/* SECTION 3: SETTLEMENT HUB */}
          <div className="bg-[#0a0c14] border border-white/10 rounded-[3.5rem] p-8 md:p-14 space-y-12 shadow-2xl relative">
             <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><CreditCard size={20} /></div>
                <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">Registry Settlement Hub</h3>
             </div>

             <div className="flex flex-col sm:flex-row p-2 bg-black rounded-[2rem] gap-4 border border-white/5 shadow-inner">
                <button type="button" onClick={() => setFormData({...formData, paymentType: 'Token'})} className={`flex-1 py-6 rounded-[1.5rem] text-xs font-black uppercase transition-all ${formData.paymentType === 'Token' ? 'bg-amber-500 text-black' : 'text-slate-600'}`}>Token (₹50k)</button>
                <button type="button" onClick={() => setFormData({...formData, paymentType: 'Full'})} className={`flex-1 py-6 rounded-[1.5rem] text-xs font-black uppercase transition-all ${formData.paymentType === 'Full' ? 'bg-amber-500 text-black' : 'text-slate-600'}`}>Full Ownership</button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <button type="button" onClick={() => setFormData({...formData, method: 'QR Code'})} className={`py-10 rounded-[2.5rem] border flex flex-col items-center gap-4 transition-all ${formData.method === 'QR Code' ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500' : 'bg-black border-white/5 text-slate-700'}`}>
                   <QrCode size={30} />
                   <span className="text-xs font-black uppercase tracking-widest">Digital QR</span>
                </button>
                <button type="button" onClick={() => setFormData({...formData, method: 'Card'})} className={`py-10 rounded-[2.5rem] border flex flex-col items-center gap-4 transition-all ${formData.method === 'Card' ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500' : 'bg-black border-white/5 text-slate-700'}`}>
                   <CreditCard size={30} />
                   <span className="text-xs font-black uppercase tracking-widest">Master Card</span>
                </button>
                <button type="button" onClick={() => setFormData({...formData, method: 'Net Bank'})} className={`py-10 rounded-[2.5rem] border flex flex-col items-center gap-4 transition-all ${formData.method === 'Net Bank' ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500' : 'bg-black border-white/5 text-slate-700'}`}>
                   <Landmark size={30} />
                   <span className="text-xs font-black uppercase tracking-widest">Net Banking</span>
                </button>
             </div>

             {/* SETTLEMENT CONTAINER */}
             <div className="bg-black/80 border border-white/10 rounded-[3rem] p-10 min-h-[400px] flex flex-col justify-center shadow-inner">
                <AnimatePresence mode="wait">
                   {isPaymentBlocked ? (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center space-y-8">
                         <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
                         <h4 className="text-2xl font-black text-white uppercase italic">Security Violation</h4>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Full property settlements require Secure Card or Net Banking.</p>
                      </motion.div>
                   ) : formData.method === 'QR Code' ? (
                      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="flex flex-col lg:flex-row items-center gap-12">
                         <div className="bg-white p-6 rounded-[2.5rem] border-[12px] border-slate-900 shadow-2xl">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=8200792488@axl&am=50000`} alt="Secure QR" className="w-40 h-40 grayscale hover:grayscale-0 transition-all" />
                         </div>
                         <div className="flex-1 w-full space-y-8">
                            <div className="space-y-4">
                               <label className="text-sm font-black text-slate-500 uppercase ml-4 tracking-widest">Payer Virtual Identity (UPI)</label>
                               <input type="text" placeholder="rudra@upi" className="w-full bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-sm font-black text-emerald-500 outline-none" value={formData.userUpiId} onChange={(e)=>setFormData({...formData, userUpiId: e.target.value})} />
                            </div>
                         </div>
                      </motion.div>
                   ) : formData.method === 'Card' ? (
                      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="space-y-8">
                         <input placeholder="NAME ON CARD" className="w-full bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-sm font-black text-white outline-none" value={formData.cardHolder} onChange={e=>setFormData({...formData, cardHolder: e.target.value})} />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input placeholder="CARD NUMBER" className="w-full bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-sm font-black text-white outline-none" value={formData.cardNumber} onChange={e=>setFormData({...formData, cardNumber: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                               <input placeholder="MM/YY" className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-sm font-black text-white outline-none" value={formData.expiry} onChange={e=>setFormData({...formData, expiry: e.target.value})} />
                               <input type="password" placeholder="CVV" className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl text-sm font-black text-white outline-none" value={formData.cvv} onChange={e=>setFormData({...formData, cvv: e.target.value})} />
                            </div>
                         </div>
                      </motion.div>
                   ) : (
                      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="space-y-8">
                         <select className="w-full bg-slate-900/60 border border-white/10 p-8 rounded-2xl text-sm font-black text-white outline-none appearance-none" value={formData.bankSelection} onChange={e=>setFormData({...formData, bankSelection: e.target.value})}>
                            <option>CHOOSE AUTHORIZED BANK</option>
                            <option value="SBI">STATE BANK OF INDIA</option>
                            <option value="HDFC">HDFC BANK CORP</option>
                            <option value="ICICI">ICICI PRIVATE NODE</option>
                         </select>
                         <input placeholder="NET BANKING USER IDENTITY" className="w-full bg-slate-900/60 border border-white/10 p-8 rounded-2xl text-sm font-black tracking-widest text-white outline-none" />
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>

          {/* SECTION 4: AUTHORIZATION NODE */}
          <div className="space-y-10">
             <div className="bg-slate-950/80 border border-white/10 p-10 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                <div className="text-center lg:text-left space-y-2">
                   <p className="text-sm font-black text-slate-600 uppercase tracking-widest italic">Authorized Property Valuation</p>
                   <p className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">₹{(pricingData[formData.unitType].base + pricingData[formData.unitType].tax).toLocaleString()}</p>
                </div>
                <div className="flex gap-4">
                   <div className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-slate-500 uppercase tracking-widest">SHA-256 SECURE</div>
                   {canSubmit && <div className="flex items-center gap-2 text-emerald-500"><CheckCircle2 size={16}/> <span className="text-xs font-black uppercase">Valid</span></div>}
                </div>
             </div>

             <motion.button 
              type="submit" 
              disabled={!canSubmit || isVerifying}
              whileHover={canSubmit ? { scale: 1.01, y: -5 } : {}}
              className={`w-full py-12 rounded-[3.5rem] font-black uppercase tracking-[0.5em] text-sm shadow-2xl flex items-center justify-center gap-6 transition-all border-b-8 ${!canSubmit ? 'bg-slate-900 border-slate-950 text-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 border-orange-950 text-black'}`}
             >
                {isVerifying ? (
                   <div className="flex items-center gap-8">
                      <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                      <span className="italic">Initializing Registry...</span>
                   </div>
                ) : !canSubmit ? (
                   <><Lock size={24}/> Protocol Locked: Incomplete Details</>
                ) : (
                   <>Confirm Dwarkesh Registry <ArrowRight size={32} className="animate-bounce-x" /></>
                )}
             </motion.button>
          </div>
        </form>

        {/* ADMIN FOOTER HUB */}
        <footer className="mt-24 border-t-2 border-white/5 pt-16 pb-10 flex flex-col lg:flex-row items-center justify-between gap-12">
           <div className="text-center lg:text-left group">
              <p className="text-sm font-black text-white italic tracking-[0.6em] mb-4 uppercase underline decoration-amber-500 decoration-4 underline-offset-8">Rudra Gelot Authority</p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                 <Shield className="text-amber-500" size={16} />
                 <p className="text-xs font-black text-slate-700 uppercase tracking-widest">Founder & Lead Admin • Dwarkesh Residency</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button onClick={() => {if(window.confirm("Wipe all registry data?")) {localStorage.clear(); window.location.reload();}}} className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-black uppercase hover:bg-red-500 hover:text-white transition-all shadow-xl">
                 <Trash2 size={18} /> Wipe Database
              </button>
           </div>
        </footer>
      </div>

      <style>{`
        @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(15px); } }
        .animate-bounce-x { animation: bounce-x 1.2s infinite; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        select { background-image: none !important; }
      `}</style>
    </div>
  );
};

export default Residence;