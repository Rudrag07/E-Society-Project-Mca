import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Car, Baby, CreditCard, QrCode, Landmark, Plus, Minus, AlertCircle, Trash2, CheckCircle2, Home } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Residence = () => {
  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem('userEmail') || "";

  const wingConfig = {
    'A': { min: 1, max: 100, type: '3BHK', label: 'Wing A (1 to 100/3BHK)' },
    'B': { min: 101, max: 200, type: '3BHK', label: 'Wing B (101 to 200/3BHK)' },
    'C': { min: 201, max: 300, type: '4BHK', label: 'Wing C (201 to 300/4BHK)' },
    'D': { min: 301, max: 400, type: '3BHK', label: 'Wing D (301 to 400/3BHK)' },
    'E': { min: 401, max: 500, type: '4BHK', label: 'Wing E (401 to 500/4BHK)' },
    'F': { min: 501, max: 600, type: '4BHK', label: 'Wing F (501 to 600/4BHK)' }
  };

  const pricingData = {
    '3BHK': { base: 4500000, tax: 225000 },
    '4BHK': { base: 6500000, tax: 325000 }
  };

  // --- NEW: FETCH BOOKED FLATS ---
  const [bookedFlats, setBookedFlats] = useState(() => {
    const saved = localStorage.getItem('booked_flats_list');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    fullName: '', wing: 'A', flatNumber: 1, unitType: '3BHK',
    adults: 3, children: 0, twoWheeler: 0, fourWheeler: 0,
    paymentType: 'Token', method: 'QR Code',
    userUpiId: '', cardHolder: '', cardNumber: '', expiry: '', cvv: '',
    bankSelection: '', agreeTerms: false
  });

  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const config = wingConfig[formData.wing];
    setFormData(prev => ({ 
      ...prev, 
      unitType: config.type, 
      flatNumber: config.min 
    }));
  }, [formData.wing]);

  // Pricing Logic
  const extraBikeCharge = formData.twoWheeler > 3 ? (formData.twoWheeler - 3) * 3000 : 0;
  const extraCarCharge = formData.fourWheeler > 1 ? (formData.fourWheeler - 1) * 6000 : 0;
  const totalExtra = extraBikeCharge + extraCarCharge;
  const currentBase = pricingData[formData.unitType];
  const totalValuation = currentBase.base + currentBase.tax + totalExtra;

  // --- CHECK IF CURRENT FLAT IS BOOKED ---
  const isAlreadyBooked = bookedFlats.includes(formData.flatNumber);

  const isFormValid = () => {
  // 1. Basic Details Validation
  const nameValid = formData.fullName.trim().split(" ").length >= 2;
  const config = wingConfig[formData.wing];
  const flatValid = 
    formData.flatNumber >= config.min && 
    formData.flatNumber <= config.max && 
    !isAlreadyBooked;
  
  // 2. Payment Method Strict Validation
  let paymentValid = false;

  if (formData.method === 'QR Code') {
    // UPI Validation: Kam se kam 3 characters @ ke baad hone chahiye (e.g. name@axl)
    const upiRegex = /^[a-zA-Z0-9.\-_]+@[a-zA-Z]{3,}$/;
    paymentValid = upiRegex.test(formData.userUpiId);
  } 
  else if (formData.method === 'Card') {
    // Card: 16 digits, Expiry: MM/YY format, CVV: 3 digits
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    paymentValid = 
      formData.cardNumber.replace(/\s/g, '').length === 16 && 
      expiryRegex.test(formData.expiry) && 
      formData.cvv.length === 3;
  } 
  else if (formData.method === 'Net Bank') {
    // Bank selection compulsory
    paymentValid = formData.bankSelection !== "";
  }

  // 3. Final Check (Terms & Conditions bhi check karega)
  return nameValid && flatValid && paymentValid && formData.agreeTerms;
};
 const executeRegistry = (e) => {
  e.preventDefault();
  if (isAlreadyBooked) return;

  setIsVerifying(true);
  const toastId = toast.loading("Finalizing Registry...");
  
  setTimeout(() => {
    const amountPaid = formData.paymentType === 'Token' ? 50000 : totalValuation;
    const balanceDue = totalValuation - amountPaid;

    // YAHAN DHAYAN DEIN: formData ko pura pass karein taaki parking count mil sake
    const payload = { 
      ...formData, // Isse adults, children, twoWheeler, fourWheeler sab save ho jayega
      totalValue: totalValuation,
      amountPaid: amountPaid,
      balanceDue: balanceDue,
      timestamp: new Date().toLocaleString() 
    };
    
    const updatedBookings = [...bookedFlats, formData.flatNumber];
    localStorage.setItem('booked_flats_list', JSON.stringify(updatedBookings));
    localStorage.setItem('last_pending_booking', JSON.stringify(payload));
    
    setBookedFlats(updatedBookings);
    toast.success("Welcome to Dwarkesh Family!", { id: toastId });
    navigate('/flatbook');
  }, 2000);
};


return (
    <div className="w-full min-h-screen bg-[#02040a] text-slate-200 p-4 md:p-10 font-sans">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-center backdrop-blur-md gap-4">
           <div>
              <h1 className="text-xl font-black italic text-amber-500 uppercase">Dwarkesh Registry</h1>
              {/* NEW LIVE COUNTER */}
              <div className="flex gap-4 mt-1">
                <span className="text-[12px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                  <CheckCircle2 size={20}/> Available: {600 - bookedFlats.length}
                </span>
                <span className="text-[12px] font-bold text-red-500 uppercase flex items-center gap-1">
                  <Home size={20}/> Booked: {bookedFlats.length}
                </span>
              </div>
           </div>
           <div className="text-[14px] font-bold text-slate-500 border border-white/10 px-4 py-2 rounded-full uppercase italic">V4.0 Secure Access</div>
        </div>

        <form onSubmit={executeRegistry} className="space-y-6">
          <div className="bg-[#0a0c14] p-8 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl">
            <input required placeholder="ENTER FULL NAME" className="w-full bg-black border border-white/10 p-5 rounded-2xl text-sm font-bold uppercase focus:border-amber-500 outline-none transition-all" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                 <label className="text-[13px] text-slate-500 font-bold ml-2 uppercase">Select Your Wing</label>
                 <select className="w-full bg-black border border-white/10 p-5 rounded-2xl text-sm font-bold text-amber-500 outline-none cursor-pointer" value={formData.wing} onChange={(e) => setFormData({...formData, wing: e.target.value})}>
                    {Object.keys(wingConfig).map(w => <option key={w} value={w}>{wingConfig[w].label}</option>)}
                 </select>
               </div>
               
               <div className="space-y-1 relative">
                 <label className="text-[13px] text-slate-500 font-bold ml-2 uppercase">Flat Number (Range: {wingConfig[formData.wing].min}-{wingConfig[formData.wing].max})</label>
                 <input 
                  type="number" 
                  className={`w-full bg-black border p-5 rounded-2xl text-sm font-bold outline-none transition-all ${isAlreadyBooked ? 'border-red-600 text-red-500 ring-2 ring-red-600/20' : 'border-white/10 focus:border-emerald-500'}`} 
                  value={formData.flatNumber} 
                  onChange={(e) => setFormData({...formData, flatNumber: parseInt(e.target.value) || ''})} 
                 />
                 {/* ALREADY BOOKED MESSAGE */}
                 <AnimatePresence>
                   {isAlreadyBooked && (
                     <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute -bottom-6 left-2 flex items-center gap-1 text-red-500 font-black text-[9px] uppercase italic">
                       <AlertCircle size={18}/> Unit Already Booked! Please Select Another Flat No.
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </div>

      
          {/* Counters Block */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'Adults (Min 3)', key: 'adults', min: 3 },
               { label: 'Children', key: 'children', min: 0 },
               { label: '2-Wheeler (Limit 2)', key: 'twoWheeler', min: 0, extra: formData.twoWheeler > 2 },
               { label: '4-Wheeler (Limit 1)', key: 'fourWheeler', min: 0, extra: formData.fourWheeler > 1 }
             ].map((item) => (
               <div key={item.key} className="bg-black/40 p-5 rounded-3xl border border-white/5 flex flex-col items-center relative overflow-hidden h-32 justify-center">
                  <span className="text-[12px] font-black text-slate-500 uppercase mb-4">{item.label}</span>
                  <div className="flex items-center gap-4 z-10">
                     <button type="button" onClick={() => setFormData(p => ({...p, [item.key]: Math.max(item.min, p[item.key] - 1)}))} className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"><Minus size={12}/></button>
                     <span className="text-xl font-bold">{formData[item.key]}</span>
                     <button type="button" onClick={() => setFormData(p => ({...p, [item.key]: p[item.key] + 1}))} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full hover:bg-emerald-500 hover:text-white transition-all"><Plus size={12}/></button>
                  </div>
                  {item.extra && (
                    <motion.div initial={{y:20}} animate={{y:0}} className="absolute bottom-0 left-0 right-0 bg-orange-600 py-1 text-[10px] font-white text-center text-white uppercase tracking-tighter">
                      Extra Charge Added!
                    </motion.div>
                  )}
               </div>
             ))}
          </div>







     {/* Payment UI Section */}
<div className="bg-[#0a0c14] p-8 rounded-[2.5rem] border border-white/10 space-y-8">
  <div className="flex bg-black p-2 rounded-2xl border border-white/5">
    <button 
      type="button" 
      onClick={() => setFormData({...formData, paymentType: 'Token', method: 'QR Code'})} 
      className={`flex-1 py-4 rounded-xl text-[12px] font-bold uppercase transition-all ${formData.paymentType === 'Token' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-slate-600'}`}
    >
      Token Pay (50,000)
    </button>
    
    <button 
      type="button" 
      onClick={() => setFormData({...formData, paymentType: 'Full', method: 'Card'})} 
      className={`flex-1 py-4 rounded-xl text-[12px] font-bold uppercase transition-all ${formData.paymentType === 'Full' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-slate-600'}`}
    >
      Full Payment
    </button>
  </div>

  <div className="grid grid-cols-3 gap-4">
    {formData.paymentType === 'Token' && (
      <button type="button" onClick={() => setFormData({...formData, method: 'QR Code'})} className={`py-6 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.method === 'QR Code' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500' : 'border-white/5 text-slate-700'}`}>
        <QrCode size={25}/><span className="text-[13px] font-bold">QR</span>
      </button>
    )}
    <button type="button" onClick={() => setFormData({...formData, method: 'Card'})} className={`py-6 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.method === 'Card' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500' : 'border-white/5 text-slate-700'}`}>
      <CreditCard size={25}/><span className="text-[13px] font-bold">CARD</span>
    </button>
    <button type="button" onClick={() => setFormData({...formData, method: 'Net Bank'})} className={`py-6 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.method === 'Net Bank' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500' : 'border-white/5 text-slate-700'}`}>
      <Landmark size={25}/><span className="text-[13px] font-bold">BANK</span>
    </button>
  </div>

  <AnimatePresence mode="wait">
    {/* QR & UPI VALIDATION */}
{formData.method === 'QR Code' && (
  <motion.div key="qr" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="flex flex-col md:flex-row items-center gap-8 bg-black/40 p-6 rounded-3xl border border-white/5">
    <div className="bg-white p-3 rounded-2xl shadow-2xl">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=8200792488@axl&am=50000`} className="w-24 h-24" alt="Payment QR" />
    </div>
    <div className="w-full space-y-2">
       <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
         Enter UPI ID (e.g. name@axl)
       </label>
       <input 
         required 
         placeholder="username@bankid" 
         className={`w-full bg-black border p-5 rounded-xl text-sm font-bold lowercase outline-none transition-all ${
           formData.userUpiId === "" 
             ? "border-white/10 text-slate-400" 
             : /^[a-zA-Z0-9.\-_]+@[a-zA-Z]{3,}$/.test(formData.userUpiId)
               ? "border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
               : "border-red-500 text-red-500 animate-pulse"
         }`} 
         value={formData.userUpiId} 
         onChange={e => setFormData({...formData, userUpiId: e.target.value.toLowerCase().trim()})} 
       />
       {formData.userUpiId !== "" && !/^[a-zA-Z0-9.\-_]+@[a-zA-Z]{3,}$/.test(formData.userUpiId) && (
         <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
           Invalid Format: Must include '@' and bank provider (e.g. @axl, @ybl)
         </p>
       )}
    </div>
  </motion.div>
)}

    {/* CARD VALIDATION (STRICT) */}
    {formData.method === 'Card' && (
      <motion.div key="card" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-4 bg-black/40 p-6 rounded-3xl border border-white/5">
        <input required placeholder="CARD HOLDER NAME" className="w-full bg-black border border-white/10 p-5 rounded-xl text-sm font-bold text-amber-500 uppercase outline-none" value={formData.cardHolder} onChange={e=>setFormData({...formData, cardHolder: e.target.value})} />
        
        <input 
          required 
          maxLength="19" 
          placeholder="XXXX XXXX XXXX XXXX" 
          className="w-full bg-black border border-white/10 p-5 rounded-xl text-sm font-bold text-amber-500 outline-none" 
          value={formData.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()} 
          onChange={e => setFormData({...formData, cardNumber: e.target.value.replace(/\s/g, '')})} 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            required 
            placeholder="MM / YY" 
            maxLength="5"
            className="w-full bg-black border border-white/10 p-5 rounded-xl text-sm font-bold text-amber-500 outline-none" 
            value={formData.expiry} 
            onChange={e => {
              let val = e.target.value.replace(/\D/g, '');
              if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
              setFormData({...formData, expiry: val});
            }} 
          />
          <input 
            required 
            maxLength="3" 
            placeholder="CVV" 
            className="w-full bg-black border border-white/10 p-5 rounded-xl text-sm font-bold text-amber-500 outline-none" 
            value={formData.cvv} 
            onChange={e => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})} 
          />
        </div>
      </motion.div>
    )}

    {/* BANK VALIDATION (DEEP DETAILS) */}
    {formData.method === 'Net Bank' && (
      <motion.div key="bank" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-4 bg-black/40 p-6 rounded-3xl border border-white/5">
        <select required className="w-full bg-black border border-white/10 p-5 rounded-xl text-sm font-bold text-amber-500 outline-none cursor-pointer uppercase" value={formData.bankSelection} onChange={e=>setFormData({...formData, bankSelection: e.target.value})}>
          <option value="">-- SELECT YOUR BANK --</option>
          <option value="SBI">STATE BANK OF INDIA</option>
          <option value="HDFC">HDFC BANK</option>
          <option value="ICICI">ICICI BANK</option>
        </select>
        
        {formData.bankSelection && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="NETBANKING USER ID" className="w-full bg-black border border-white/10 p-4 rounded-xl text-[12px] font-bold text-emerald-500 outline-none" />
            <input required type="password" placeholder="SECURE PIN / PASSWORD" className="w-full bg-black border border-white/10 p-4 rounded-xl text-[12px] font-bold text-emerald-500 outline-none" />
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>

          {/* FINAL CHECK */}
          <div className="flex items-center gap-4 bg-amber-500/5 p-6 rounded-[2rem] border border-amber-500/10">
             <input type="checkbox" required className="w-8 h-8 rounded-xl accent-amber-500 cursor-pointer shadow-lg" checked={formData.agreeTerms} onChange={e=>setFormData({...formData, agreeTerms: e.target.checked})} />
             <p className="text-[13px] font-bold uppercase text-slate-500 italic tracking-widest leading-relaxed">I authorize Dwarkesh Registry to process this booking under my legal name.</p>
          </div>

          <button 
            type="submit" 
            disabled={!isFormValid() || isVerifying} 
            className={`w-full py-10 rounded-[3rem] text-sm font-black uppercase tracking-[0.5em] transition-all shadow-2xl ${isFormValid() ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.01] active:scale-95 cursor-pointer' : 'bg-slate-800 text-slate-700 cursor-not-allowed opacity-50'}`}
          >
             {isVerifying ? "Processing Global Registry..." : isAlreadyBooked ? "Flat Already Taken" : "Finalize Dwarkesh Booking"}
          </button>
        </form>

        {currentUserEmail === "rudragelot212@gmail.com" && (
           <button onClick={() => {if(window.confirm("Nuclear Option?")) { localStorage.removeItem('booked_flats_list'); setBookedFlats([]); }}} className="w-full py-4 text-[10px] font-black text-red-500/40 hover:text-red-500 transition-all uppercase flex items-center justify-center gap-2"><Trash2 size={12}/> Reset Booking Data</button>
        )}
      </div>
    </div>
  );
};

export default Residence;