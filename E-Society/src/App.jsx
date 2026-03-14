import { Routes, Route } from "react-router-dom"
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


function App() {
  return (
    <>
      <Navbar />

      {/* Toast Container */}
      <Toaster position="top-center" />
    
      

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Home1" element={<Home1/>} />
        <Route path="/ServiceDetail" element={<ServiceDetail/>} />
        <Route path="/payments" element={<PaymentHistory/>} />
        <Route path="/MainServices" element={<MainServices/>} />
        <Route path="/parking" element={<ParkingForm/>} />
        <Route path="/security" element={<SecurityForm/>} />
        <Route path="/electricity" element={<ElectricityForm/>} />
        <Route path="/waterForm" element={<WaterForm />} />
        <Route path="/lernmore" element={<LearnMore/>} />
      </Routes>
    </>
  )
}

export default App