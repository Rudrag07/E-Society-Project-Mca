import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.text) {
      toast.error("⚠️ Please fill all the fields");
      return;
    }

    toast.success("Thank you for your Feedback 😊");
    setFormData({ name: "", email: "", text: "" });
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 overflow-x-hidden">
      <Toaster position="top-center" />

      {/* --- HERO & BACKGROUND SECTION --- */}
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center py-12 md:py-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-black/70 to-blue-900/90"></div>

        <div className="relative max-w-6xl mx-auto w-full px-4 md:px-6 z-10">
          
          {/* Animated Main Title */}
          <div className="text-center mb-10 md:mb-16 animate-fade-down">
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight">
              Get In <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-blue-100/70 mt-4 text-base md:text-lg font-medium px-4">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            
            {/* --- INFO CARD (Left Side) --- */}
            <div className="bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/20 shadow-2xl text-white animate-fade-right">
              <h2 className="text-2xl md:text-3xl font-black mb-6 border-b border-white/10 pb-4 italic tracking-tighter">
                Contact Information
              </h2>

              <p className="text-blue-50/80 text-base md:text-lg mb-8 leading-relaxed">
                If you have any questions about E-Society management or need technical support, feel free to reach out.
              </p>

              <div className="space-y-6 md:space-y-8">
                {/* Email */}
                <div className="flex items-center gap-4 md:gap-5 group">
                  <div className="p-3 md:p-4 bg-yellow-400 rounded-2xl text-blue-900 group-hover:scale-110 transition-transform">
                    <Mail size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-yellow-400 text-xs uppercase tracking-widest">Email Us</h4>
                    <a href="mailto:dwarkeshsociety@gmail.com" className="text-sm md:text-xl font-medium hover:underline block truncate">dwarkeshsociety@gmail.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 md:gap-5 group">
                  <div className="p-3 md:p-4 bg-blue-500 rounded-2xl text-white group-hover:scale-110 transition-transform">
                    <Phone size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 text-xs uppercase tracking-widest">Call Us</h4>
                    <a href="tel:+918200792488" className="text-sm md:text-xl font-medium hover:underline block">+91 82007 92488</a>
                  </div>
                </div>

                {/* Location & Map */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 md:gap-5 group">
                    <div className="p-3 md:p-4 bg-green-500 rounded-2xl text-white group-hover:scale-110 transition-transform">
                      <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 text-xs uppercase tracking-widest">Location</h4>
                      <p className="text-sm md:text-xl font-medium text-white">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>

                  {/* Responsive Map Container */}
                  <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-4">
                    <iframe
                      title="Society Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29910624022!2d72.4149272306772!3d23.02018176378415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* --- FORM CARD (Right Side) --- */}
            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl animate-fade-left">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 md:mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium resize-none text-sm md:text-base"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-base md:text-lg"
                >
                  <Send size={18} /> Send Feedback
                </button>
              </form>

              <div className="mt-6 md:mt-8 pt-6 border-t border-slate-100 text-center">
                <Link to="/home1" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-blue-600 transition-colors text-sm md:text-base">
                  <ArrowLeft size={16} /> Back to Dashboard
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 pt-12 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 border-b border-white/5 pb-12 md:pb-16">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">E-SOCIETY</h3>
            <p className="text-sm leading-relaxed">Smart society management system providing seamless services to every doorstep.</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold uppercase tracking-widest mb-4 md:mb-6">Explore</h4>
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <li><Link to="/home1" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition">Services</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold uppercase tracking-widest mb-4 md:mb-6">Address</h4>
            <p className="text-sm">Ahmedabad, Gujarat, India</p>
            <p className="text-sm mt-2">dwarkeshsociety@gmail.com</p>
          </div>
        </div>
        <div className="text-center mt-10 text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-30 px-4">
          © 2026 E-Society. Developed By Rudra
        </div>
      </footer>

      {/* --- ANIMATION STYLES --- */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-down { animation: fadeDown 0.8s ease-out forwards; }
        .animate-fade-right { animation: fadeRight 0.8s ease-out forwards; }
        .animate-fade-left { animation: fadeLeft 0.8s ease-out forwards; }
        
        /* Mobile adjustment for animations */
        @media (max-width: 768px) {
          .animate-fade-right, .animate-fade-left {
            animation-name: fadeDown;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;