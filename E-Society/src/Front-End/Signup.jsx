import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, Phone, Lock, ShieldCheck, ArrowLeft, KeyRound, Send, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [tempData, setTempData] = useState(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Agar user pehle se login hai toh use bhej do
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home1");
    }
  }, [navigate]);

  const onSignupClick = (data) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp);
    setTempData(data);
    
    console.log("Your OTP is:", otp);
    alert(`E-Society Verification Code: ${otp}`); 
    
    setShowOtpField(true);
    toast.success("OTP sent! Please check your alerts.");
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp?.toString()) {
      localStorage.setItem("user", JSON.stringify(tempData));
      localStorage.setItem("isLoggedIn", "true");
      
      toast.success("🎉 Signup Successful!");
      
      // --- REDIRECT LOGIC ---
      // Check karo ki user kisi specific service (Payment/Visitor) se aaya hai kya?
      const redirectTo = localStorage.getItem("pendingAction") || "/home1";
      
      setTimeout(() => {
        localStorage.removeItem("pendingAction"); // Use karne ke baad delete kar do
        window.location.href = redirectTo; 
      }, 1000);
    } else {
      toast.error("Invalid OTP! Try again.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-slate-950 py-20">
      <Toaster position="top-center" />
      
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
        alt="society"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>

      <div className="relative z-10 w-full max-w-md animate-zoom-in">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-[2.5rem] p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-yellow-500 rounded-2xl text-slate-900 mb-4 shadow-lg shadow-yellow-500/30">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Create <span className="text-yellow-400">Account</span>
            </h2>
          </div>

          {!showOtpField ? (
            <>
              <form onSubmit={handleSubmit(onSignupClick)} className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input type="text" placeholder="Full Name" {...register("name", { required: "Name is required" })} className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input type="email" placeholder="Email Address" {...register("email", { required: "Email is required" })} className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    {...register("phone", { 
                      required: "Phone is required",
                      minLength: { value: 10, message: "Exactly 10 digits required" },
                      maxLength: { value: 10, message: "Max 10 digits allowed" }
                    })} 
                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create Password" 
                    {...register("password", { required: "Password is required" })} 
                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-12 py-3.5 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-400">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20">
                  <Send size={18} /> Get OTP
                </button>
              </form>

              <div className="mt-8 text-center animate-fade-in">
                <p className="text-slate-400 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors underline underline-offset-4 decoration-yellow-400/30">
                    Login instead
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-sm">OTP sent to</p>
                <p className="font-black text-yellow-400 tracking-widest">{tempData?.phone}</p>
              </div>

              <div className="relative group">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" size={20} />
                <input
                  type="text"
                  maxLength="4"
                  placeholder="XXXX"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full bg-slate-900/50 border-2 border-yellow-500/30 text-white pl-12 pr-4 py-4 text-center text-3xl tracking-[0.5em] font-black rounded-2xl focus:border-yellow-400 outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowOtpField(false)} className="w-1/3 bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={verifyOtp} className="w-2/3 bg-yellow-500 text-black py-4 rounded-2xl font-black hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20">
                  Verify & Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-zoom-in { animation: zoomIn 0.5s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Signup;