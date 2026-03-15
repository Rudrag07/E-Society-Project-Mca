import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./Front-End/Login"
import React from "react"
import HomePage from "./Front-End/HomePage"
import Navbar from "./Front-End/Navbar"
import Signup from "./Front-End/Signup"
import About from "./Front-End/About"
import Services from "../Services"
import Contact from "../Contact"
import Home1 from "./Front-End/Home1"
import ServiceDetail from "./Front-End/ServiceDetail"
import PaymentHistory from "./Front-End/PaymentHistory"
import MainServices from "./Front-End/MainServices"
import ParkingForm from "./Front-End/ParkingForm"
import SecurityForm from "./Front-End/SecurityForm"
import ElectricityForm from "./Front-End/ElectricityForm"
import WaterForm from "./Front-End/WaterForm"
import { Toaster } from "react-hot-toast";
import LearnMore from "./Front-End/LernMore"

// --- PROTECTED ROUTE COMPONENT ---
// Ye check karega ki user logged in hai ya nahi
const ProtectedRoute = ({ children }) => {
  // Har baar check karega jab page badlega
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};
function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />

      <Routes>
        {/* Public Routes (Sab dekh sakte hain) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lernmore" element={<LearnMore/>} />

        {/* Protected Routes (Sirf Signup ke baad dikhenge) */}
        {/* <Route 
          path="/Home1" 
          element={
            <ProtectedRoute>
              <Home1 />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="/ServiceDetail" 
          element={
            <ProtectedRoute>
              <ServiceDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/MainServices" 
          element={
            <ProtectedRoute>
              <MainServices />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parking" 
          element={
            <ProtectedRoute>
              <ParkingForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/security" 
          element={
            <ProtectedRoute>
              <SecurityForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/electricity" 
          element={
            <ProtectedRoute>
              <ElectricityForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/waterForm" 
          element={
            <ProtectedRoute>
              <WaterForm />
            </ProtectedRoute>
          } 
        />
        
        {/* Purana services path agar use karna ho toh protected rakha hai */}
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App;