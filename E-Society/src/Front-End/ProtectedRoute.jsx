import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Yahan aap apna logic check karein (e.g., localStorage ya state se)
  const isAuthenticated = localStorage.getItem("isLoggedIn"); 

  if (!isAuthenticated) {
    // Agar login nahi hai toh Signup page par bhej do
    return <Navigate to="/signup" replace />;
  }

  return children;
};