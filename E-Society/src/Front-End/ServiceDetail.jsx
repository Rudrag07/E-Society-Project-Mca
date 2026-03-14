import React from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {

  const { name } = useParams();

  const serviceData = {
    maintenance: "Residents can pay society maintenance bills online easily.",
    festival: "All festivals like Diwali, Holi and Navratri are organized.",
    visitor: "Visitor entry is tracked securely in the society.",
    event: "Society meetings and events are managed here.",
    gym: "Residents can use the gym facility inside the society.",
    amenity: "Book hall, gym and other facilities online."
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-xl">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {name.toUpperCase()} Service
        </h1>

        <p className="text-gray-700 text-lg">
          {serviceData[name]}
        </p>

      </div>

    </div>
  );
};

export default ServiceDetail;