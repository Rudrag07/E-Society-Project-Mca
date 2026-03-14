import React, { useEffect, useState } from "react";

const PaymentHistory = () => {

  const [payments,setPayments] = useState([]);

  useEffect(()=>{

    const data = JSON.parse(localStorage.getItem("maintenance")) || [];
    setPayments(data);

  },[]);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Maintenance Payment History
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Flat</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((p,index)=>(
            <tr key={index} className="text-center border-b">
              <td className="p-3">{p.flat}</td>
              <td className="p-3">₹ {p.amount}</td>
              <td className="p-3">{p.date}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PaymentHistory;