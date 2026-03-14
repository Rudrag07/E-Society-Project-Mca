import React from 'react';
import { Shield, CreditCard, Bell, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  const features = [
    {
      icon: <CreditCard className="text-yellow-400" size={32} />,
      title: "Automated Maintenance",
      desc: "Say goodbye to paper receipts. Pay online and get instant digital invoices."
    },
    {
      icon: <Shield className="text-yellow-400" size={32} />,
      title: "Advanced Gate Protocol",
      desc: "OTP-based visitor entry for maximum security. Track every entry/exit live."
    },
    {
      icon: <Bell className="text-yellow-400" size={32} />,
      title: "Digital Bulletin",
      desc: "Instant notifications for society meetings and urgent notices directly on your phone."
    },
    {
      icon: <Users className="text-yellow-400" size={32} />,
      title: "Resident Directory",
      desc: "Connect with your neighbors securely without sharing private phone numbers."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
            Why Choose <span className="text-yellow-400">E-SOCIETY?</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We are redefining community living by bringing transparency, security, and convenience to your doorstep.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((f, index) => (
            <div key={index} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300 group">
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-b from-yellow-400/10 to-transparent p-12 rounded-[3rem] border border-white/5 text-center mb-20">
          <h2 className="text-3xl font-bold mb-6 italic text-yellow-400">Our Vision 2026</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
            "To empower every residential community with smart technology that ensures 100% transparency in finances and 24/7 peace of mind."
          </p>
          
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-black text-white">100%</p>
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70 font-bold">Secure</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <p className="text-4xl font-black text-white">24/7</p>
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70 font-bold">Smart Support</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <p className="text-4xl font-black text-white">Zero</p>
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70 font-bold">Paperwork</p>
            </div>
          </div>
        </div>

        {/* --- Back Button with Animation --- */}
        <div className="flex justify-center mt-10">
          <Link to="/">
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-lg font-semibold overflow-hidden transition-all hover:pr-12 hover:bg-yellow-400 hover:text-black">
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-2" />
              <span>Back to Home</span>
              
              {/* Subtle shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;