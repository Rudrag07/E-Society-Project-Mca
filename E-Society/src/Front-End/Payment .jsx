// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CreditCard, ShieldCheck, Zap, ArrowLeft, CheckCircle2, Building2, Smartphone, Banknote, Lock, Eye, EyeOff, Info } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const Payment = () => {
//   const navigate = useNavigate();
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [method, setMethod] = useState('card');
//   const [showBankLogin, setShowBankLogin] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // Eye icon state
//   const [payFullAmount, setPayFullAmount] = useState(false); // Full Payment vs Token Toggle

//   const [formData, setFormData] = useState({
//     cardNo: '', expiry: '', cvv: '', upiId: '', bank: '', bankUser: '', bankPass: ''
//   });

//   // --- PRICING & DATA LOGIC ---
//   const bookingData = JSON.parse(localStorage.getItem('last_pending_booking')) || { 
//     fullName: 'Resident', flatNumber: '000', wing: 'A', unitType: '3BHK' 
//   };

//   const prices = { '3BHK': 4500000, '4BHK': 6000000 };
//   const totalPropertyValue = prices[bookingData.unitType] || 4500000;
  
//   // Logic: Calculate based on toggle
//   const tokenAmount = 50000;
//   const currentPayable = (payFullAmount) ? totalPropertyValue : tokenAmount;
//   const pendingCashAmount = totalPropertyValue - currentPayable;

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateAndPay = () => {
//     if (method === 'card') {
//       if (formData.cardNo.length !== 16) return toast.error("Enter 16-digit card number");
//       if (!formData.expiry.includes('/') || formData.expiry.length < 5) return toast.error("Use MM/YY format");
//       if (formData.cvv.length < 3) return toast.error("Invalid CVV");
//       processFinalPayment();
//     } else if (method === 'upi') {
//       if (!formData.upiId.includes('@')) return toast.error("Invalid UPI ID! (e.g. name@upi)");
//       processFinalPayment();
//     } else if (method === 'net') {
//       if (!formData.bank) return toast.error("Please select your bank");
//       setShowBankLogin(true);
//     }
//   };

//   const processFinalPayment = () => {
//     const loadingToast = toast.loading("Processing Secure Transaction...", {
//       style: { background: '#0f172a', color: '#fbbf24', border: '1px solid #fbbf24' }
//     });

//     setTimeout(() => {
//       toast.dismiss(loadingToast);
//       const allConfirmed = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
//       localStorage.setItem('eSociety_bookings', JSON.stringify([...allConfirmed, { 
//           ...bookingData, 
//           paidAmount: currentPayable, 
//           balancePending: pendingCashAmount,
//           status: pendingCashAmount === 0 ? 'Fully Paid' : 'Token Paid' 
//       }]));
//       setPaymentDone(true);
//       toast.success(pendingCashAmount === 0 ? "Full Payment Successful!" : "Token Received!");
//       setTimeout(() => navigate('/flatbook'), 2500); 
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] pt-20 md:pt-28 pb-10 px-4 flex flex-col items-center font-sans overflow-x-hidden">
//       <Toaster position="top-center" />
      
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[100px] md:blur-[130px]"></div>
//       </div>

//       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        
//         {/* --- LEFT SIDE: Summary --- */}
//         <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
//           <button onClick={() => navigate(-1)} className="hidden md:flex items-center gap-2 text-slate-500 hover:text-white transition-all group">
//             <ArrowLeft size={18} className="group-hover:-translate-x-1" /> 
//             <span className="text-xs font-black uppercase tracking-widest text-white">Back</span>
//           </button>

//           {/* Visual Card (Always shown if Card Method) */}
//           <AnimatePresence mode="wait">
//             {method === 'card' && (
//               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative h-48 md:h-64 w-full perspective-1000">
//                 <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/20 shadow-2xl">
//                   <div className="flex justify-between items-start mb-6 md:mb-12">
//                     <div className="h-8 w-12 md:h-12 md:w-16 bg-amber-500/20 rounded-lg border border-amber-500/30"></div>
//                     <Zap className="text-amber-500 size-5 md:size-6" fill="currentColor" />
//                   </div>
//                   <div className="text-lg md:text-2xl font-mono text-white tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6">
//                     {formData.cardNo ? formData.cardNo.replace(/\d{4}(?=.)/g, '$& ') : "**** **** **** 8892"}
//                   </div>
//                   <div className="flex justify-between items-end uppercase">
//                     <div>
//                       <p className="text-[8px] md:text-[10px] text-slate-500 font-black tracking-widest">Resident</p>
//                       <p className="text-xs md:text-sm font-bold text-white truncate">{bookingData.fullName}</p>
//                     </div>
//                     <div>
//                       <p className="text-[8px] md:text-[10px] text-slate-500 font-black tracking-widest">Expiry</p>
//                       <p className="text-xs md:text-sm font-bold text-white">{formData.expiry || "12/28"}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Summary Card */}
//           <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 space-y-4 shadow-2xl">
//             <h3 className="text-white font-black text-lg italic uppercase tracking-tighter">Billing Details</h3>
//             <div className="space-y-2 pt-2 border-t border-white/5">
//                 <div className="flex justify-between text-[11px] font-bold text-slate-400">
//                     <span>UNIT VALUE</span>
//                     <span>₹{totalPropertyValue.toLocaleString()}</span>
//                 </div>
//                 {pendingCashAmount > 0 && (
//                   <div className="flex justify-between text-[11px] font-bold text-amber-500 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 uppercase tracking-tighter">
//                       <span className="flex items-center gap-2 font-black"><Banknote size={14}/> Pending Cash</span>
//                       <span className="font-black">₹{pendingCashAmount.toLocaleString()}</span>
//                   </div>
//                 )}
//             </div>
//             <div className="flex justify-between items-center pt-4 border-t border-white/5">
//               <span className="text-sm md:text-base font-black text-slate-400 italic">TOTAL TO PAY</span>
//               <span className="text-2xl md:text-3xl font-black text-amber-500 tracking-tighter italic">₹{currentPayable.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: Gateway --- */}
//         <div className="bg-[#0f172a] border border-white/10 rounded-[1.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl min-h-[550px] flex flex-col order-1 lg:order-2">
//           {paymentDone ? (
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center my-auto">
//                <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-emerald-500/20 text-emerald-500"><CheckCircle2 size={40} /></div>
//                <h2 className="text-2xl md:text-4xl font-black text-white italic uppercase">Success!</h2>
//                <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-tight">{pendingCashAmount === 0 ? "Property Fully Paid" : "Token Paid Successfully"}</p>
//             </motion.div>
//           ) : showBankLogin ? (
//             /* BANK LOGIN PORTAL */
//             <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
//                 <button onClick={() => setShowBankLogin(false)} className="text-amber-500 text-[10px] font-bold uppercase flex items-center gap-1"><ArrowLeft size={12}/> Choose Another</button>
//                 <div className="text-center py-4">
//                     <Building2 className="mx-auto text-amber-500 mb-2" size={32}/>
//                     <h2 className="text-white font-black uppercase text-xs tracking-widest">{formData.bank} Portal</h2>
//                 </div>
//                 <form onSubmit={(e) => { e.preventDefault(); processFinalPayment(); }} className="space-y-4">
//                     <input required name="bankUser" onChange={handleInputChange} type="text" placeholder="User ID" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                     <div className="relative">
//                         <input required name="bankPass" onChange={handleInputChange} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
//                             {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
//                         </button>
//                     </div>
//                     <button type="submit" className="w-full bg-amber-500 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">Authorize ₹{currentPayable.toLocaleString()} <Lock size={16}/></button>
//                 </form>
//             </motion.div>
//           ) : (
//             <div className="space-y-6 h-full flex flex-col"> 
//               <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">Secure Checkout</h2>

//               <div className="flex bg-slate-950 p-1.5 rounded-2xl gap-1 border border-white/5">
//                 {[{id: 'card', icon: <CreditCard size={14}/>, label: 'Card'}, {id: 'upi', icon: <Smartphone size={14}/>, label: 'UPI'}, {id: 'net', icon: <Building2 size={14}/>, label: 'Net'}].map((item) => (
//                   <button key={item.id} onClick={() => { setMethod(item.id); setPayFullAmount(false); }} className={`flex-1 py-3 md:py-4 rounded-xl flex flex-col items-center gap-1 font-black text-[9px] uppercase transition-all ${method === item.id ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}>{item.icon} {item.label}</button>
//                 ))}
//               </div>

//               {/* Token vs Full Toggle (For Card & Net Banking) */}
//               {(method === 'card' || method === 'net') && (
//                 <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3">
//                     <p className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-2"><Info size={12}/> Select Payment Plan:</p>
//                     <div className="flex gap-2">
//                         <button onClick={() => setPayFullAmount(false)} className={`flex-1 py-2 rounded-lg text-[9px] font-black border transition-all ${!payFullAmount ? 'bg-amber-500 text-slate-900 shadow-md' : 'border-white/5 text-slate-500'}`}>Token (₹50,000)</button>
//                         <button onClick={() => setPayFullAmount(true)} className={`flex-1 py-2 rounded-lg text-[9px] font-black border transition-all ${payFullAmount ? 'bg-amber-500 text-slate-900 shadow-md' : 'border-white/5 text-slate-500'}`}>Full (₹{totalPropertyValue.toLocaleString()})</button>
//                     </div>
//                 </div>
//               )}

//               <div className="flex-grow py-2">
//                 {method === 'card' ? (
//                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//                     <input name="cardNo" onChange={handleInputChange} maxLength={16} placeholder="16 Digit Card Number" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                     <div className="grid grid-cols-2 gap-4">
//                         <input name="expiry" onChange={handleInputChange} placeholder="MM/YY" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                         <input name="cvv" onChange={handleInputChange} maxLength={3} type="password" placeholder="CVV" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                     </div>
//                   </motion.div>
//                 ) : method === 'upi' ? (
//                   <div className="space-y-4 text-center">
//                     <input name="upiId" onChange={handleInputChange} placeholder="Enter UPI ID (must contain @)" className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-amber-500 transition-all" />
//                     <div className="bg-white p-2 rounded-xl inline-block shadow-xl"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=esociety@bank&am=${currentPayable}`} alt="QR" className="w-24 h-24" /></div>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     {['HDFC Bank', 'ICICI Bank', 'Union Bank of India', 'SBI Bank'].map(bank => (
//                       <button key={bank} onClick={() => setFormData({...formData, bank})} className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${formData.bank === bank ? 'border-amber-500 bg-amber-500/5 text-white' : 'border-white/5 bg-slate-950 text-slate-500'}`}>
//                         <span className="font-bold text-xs uppercase tracking-widest">{bank}</span>
//                         <div className={`w-3 h-3 rounded-full ${formData.bank === bank ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <button onClick={validateAndPay} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 text-sm active:scale-95 transition-all">Pay ₹{currentPayable.toLocaleString()} <Zap size={16} fill="currentColor"/></button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;