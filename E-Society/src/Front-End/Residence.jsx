import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Users, Car, Baby } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Residence = () => {
  const navigate = useNavigate();
  
  // Naya Range System: A(1-100), B(101-200), etc.
  const wingConfig = {
    'A': { min: 1, max: 100 },
    'B': { min: 101, max: 200 },
    'C': { min: 201, max: 300 },
    'D': { min: 301, max: 400 },
    'E': { min: 401, max: 500 }
  };

  const [formData, setFormData] = useState({
    fullName: '', 
    wing: 'A', 
    flatNumber: 1, // Default A ka pehla flat
    adults: 1, 
    children: 0, 
    vehicles: 0
  });

  const [bookedCount, setBookedCount] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('eSociety_bookings')) || [];
    setBookedCount(saved.length);
  }, []);

  // Jab Wing badle, toh Flat Number bhi range ke hisab se badle
  const handleWingChange = (e) => {
    const selectedWing = e.target.value;
    setFormData({
      ...formData,
      wing: selectedWing,
      flatNumber: wingConfig[selectedWing].min
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { wing, flatNumber, fullName } = formData;
    const range = wingConfig[wing];

    if(!fullName.trim()) return toast.error("Please enter Name");
    
    // Range Validation
    if (flatNumber < range.min || flatNumber > range.max) {
      return toast.error(`Wing ${wing} range is ${range.min} to ${range.max}`);
    }

    localStorage.setItem('last_pending_booking', JSON.stringify(formData));
    toast.success(`Wing ${wing} - Unit ${flatNumber} Verified!`);
    setTimeout(() => navigate('/payment'), 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-4 md:py-10 min-h-[85vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] rounded-[1.5rem] border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header Stats */}
        <div className="bg-[#1e1b4b] p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg shadow-lg">
              <ShieldCheck size={20} className="text-slate-900" />
            </div>
            <h2 className="text-sm font-black uppercase italic text-white tracking-tighter">
              Unit <span className="text-amber-500">Registry</span>
            </h2>
          </div>
          <div className="text-[10px] font-bold text-slate-400 bg-black/20 px-3 py-1 rounded-full border border-white/5">
            TOTAL CAPACITY: <span className="text-white">500 UNITS</span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Owner Name */}
            <div className="space-y-1.5">
              <label className="text-amber-500 text-[9px] font-black uppercase tracking-widest ml-1">Owner Name</label>
              <input
                required type="text" placeholder="Full Name"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none font-bold text-sm transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            {/* Wing & Flat Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-500 text-[9px] font-black uppercase ml-1">Select Wing</label>
                <select 
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-amber-500 font-black outline-none text-sm appearance-none cursor-pointer"
                  value={formData.wing}
                  onChange={handleWingChange}
                >
                  {Object.keys(wingConfig).map(w => (
                    <option key={w} value={w}>WING {w} ({wingConfig[w].min}-{wingConfig[w].max})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-500 text-[9px] font-black uppercase ml-1">Flat No.</label>
                <input
                  required type="number" 
                  min={wingConfig[formData.wing].min}
                  max={wingConfig[formData.wing].max}
                  value={formData.flatNumber}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white font-black outline-none text-sm"
                  onChange={(e) => setFormData({...formData, flatNumber: parseInt(e.target.value)})}
                />
              </div>
            </div>

            {/* Occupants grid */}
            <div className="bg-slate-950/40 p-3 rounded-xl grid grid-cols-3 gap-1 border border-white/5">
               {[{l:'Adults', k:'adults', i:<Users size={14}/>}, {l:'Kids', k:'children', i:<Baby size={14}/>}, {l:'Cars', k:'vehicles', i:<Car size={14}/>}].map((item) => (
                 <div key={item.k} className="text-center py-1">
                    <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">{item.l}</p>
                    <input 
                      type="number" min="0" value={formData[item.k]}
                      className="w-full bg-transparent text-center font-black text-amber-500 text-base outline-none"
                      onChange={(e) => setFormData({...formData, [item.k]: parseInt(e.target.value) || 0})}
                    />
                 </div>
               ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
            >
              Verify Wing {formData.wing} Unit <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Residence;