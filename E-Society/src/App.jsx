import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

// Components (Imports same rahenge)
import Navbar from "./Front-End/Navbar";
import Login from "./Front-End/Login";
import HomePage from "./Front-End/HomePage";
import Signup from "./Front-End/Signup";
import About from "./Front-End/About";
import Services from "../Services";
import Contact from "../Contact";
import Home1 from "./Front-End/Home1";
import ServiceDetail from "./Front-End/ServiceDetail";
import PaymentHistory from "./Front-End/PaymentHistory";
import MainServices from "./Front-End/MainServices";
import ParkingForm from "./Front-End/ParkingForm";
import SecurityForm from "./Front-End/SecurityForm";
import ElectricityForm from "./Front-End/ElectricityForm";
import WaterForm from "./Front-End/WaterForm";
import LearnMore from "./Front-End/LernMore";
// import Payment from "./Front-End/Payment "; 
import FlatBook from "./Front-End/FlatBook";
import Residence from "./Front-End/Residence";

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  
  // Agar login nahi hai toh Login page par bhejein (Signup par nahi, kyunki user pehle login try karega)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Har route change par check karega ki user login hai ya nahi
  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(authStatus);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#020617]">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- NAVBAR LOGIC --- */}
      {/* Agar aap chahte hain ki Login/Signup page par Navbar na dikhe, toh ye condition lagayein */}
      {isLoggedIn && <Navbar />}
      
      <div className={isLoggedIn ? "pt-16 md:pt-20" : ""}> 
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lernmore" element={<LearnMore />} />

          {/* --- PROTECTED ROUTES (Login ke baad hi dikhenge) --- */}
          <Route path="/home1" element={<ProtectedRoute><Home1 /></ProtectedRoute>} />
          
          {[
            { path: "/residence", element: <Residence /> },
            // { path: "/payment", element: <Payment /> },
            { path: "/flatbook", element: <FlatBook /> },
            { path: "/ServiceDetail", element: <ServiceDetail /> },
            { path: "/payments", element: <PaymentHistory /> },
            { path: "/MainServices", element: <MainServices /> },
            { path: "/parking", element: <ParkingForm /> },
            { path: "/security", element: <SecurityForm /> },
            { path: "/electricity", element: <ElectricityForm /> },
            { path: "/waterForm", element: <WaterForm /> },
            { path: "/services", element: <Services /> }
          ].map((route) => (
            <Route 
              key={route.path}
              path={route.path} 
              element={<ProtectedRoute>{route.element}</ProtectedRoute>} 
            />
          ))}

          {/* Spelling Correction & 404 */}
          <Route path="/residance" element={<Navigate to="/residence" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

// Chhota UI Component for 404
const NotFound = () => (
  <div className="text-white text-center flex items-center justify-center min-h-[60vh] flex-col gap-4">
    <h1 className="text-6xl font-black opacity-20">404</h1>
    <p className="text-xl font-bold italic text-slate-500 uppercase tracking-widest">Page Not Found</p>
    <button onClick={() => window.location.href="/"} className="mt-4 text-amber-500 border border-amber-500 px-6 py-2 rounded-full font-bold">
      Go Home
    </button>
  </div>
);

export default App;