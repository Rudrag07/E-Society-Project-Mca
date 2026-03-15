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
        className="relative min-h-screen bg-cover bg-center flex items-center py-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')"
        }}
      >
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-black/70 to-blue-900/80"></div>

        <div className="relative max-w-6xl mx-auto w-full px-6 z-10">
          
          {/* Animated Main Title */}
          <div className="text-center mb-16 animate-fade-down">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Get In <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-blue-100/70 mt-4 text-lg font-medium">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            
            {/* --- INFO CARD (Left Side) --- */}
            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl text-white animate-fade-right">
              <h2 className="text-3xl font-black mb-8 border-b border-white/10 pb-4 italic tracking-tighter">
                Contact Information
              </h2>

              <p className="text-blue-50/80 text-lg mb-10 leading-relaxed">
                If you have any questions about E-Society management or need technical support, feel free to reach out.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-yellow-400 rounded-2xl text-blue-900 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 text-sm uppercase tracking-widest">Email Us</h4>
                    <a href="mailto:dwarkeshsociety@gmail.com" className="text-xl font-medium hover:underline block">dwarkeshsociety@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-blue-500 rounded-2xl text-white group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 text-sm uppercase tracking-widest">Call Us</h4>
                    <a href="tel:+918200792488" className="text-xl font-medium hover:underline block">+91 82007 92488</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-green-500 rounded-2xl text-white group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                 <div className="space-y-6">
  {/* Location Text */}
  {/* {/* <div className="flex items-start gap-4 group">
    <div className="p-3 bg-green-500/20 rounded-xl text-green-400 group-hover:bg-green-500 group-hover:text-slate-900 transition-all duration-300">
      <MapPin size={24} />
    </div> */}
    <div>
      <h4 className="font-bold text-green-400 text-sm uppercase tracking-widest">Location</h4>
      <p className="text-xl font-medium text-white">Ahmedabad, Gujarat, India</p>
    </div>
  

  {/* Interactive Google Map */}
  <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-4">
    <iframe
      title="Society Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.299110115!2d72.41492991203001!3d23.020181763001273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709456000000!5m2!1sen!2sin"
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
            </div>

            {/* --- FORM CARD (Right Side) --- */}
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl animate-fade-left">
              <h2 className="text-3xl font-black text-slate-800 mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
                >
                  <Send size={20} /> Send Feedback
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <Link to="/home1" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-blue-600 transition-colors">
                  <ArrowLeft size={18} /> Back to Dashboard
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 border-b border-white/5 pb-16">
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white italic tracking-tighter">E-SOCIETY</h3>
            <p className="text-sm leading-relaxed">Smart society management system providing seamless services to every doorstep.</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li><Link to="/home1" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition">Services</Link></li>
              {/* <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Address</h4>
            <p className="text-sm">Ahmedabad, Gujarat, India</p>
            <p className="text-sm mt-2">dwarkeshsociety@gmail.com</p>
          </div>
        </div>
        <div className="text-center mt-10 text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
          © 2026 E-Society. Developed By Rudra
        </div>
      </footer>

      {/* --- ANIMATION STYLES --- */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-down { animation: fadeDown 1s ease-out forwards; }
        .animate-fade-right { animation: fadeRight 1s ease-out forwards; }
        .animate-fade-left { animation: fadeLeft 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Contact;