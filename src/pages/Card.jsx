// src/components/Card.jsx
import React from "react";

const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`flex items-center gap-4 p-6 rounded-xl shadow-lg bg-white`}>
      <div className={`p-4 rounded-full text-white ${color}`}>{icon}</div>
      <div>
        <h3 className="text-gray-500 font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-[#01497C]">{value}</p>
      </div>
    </div>
  );
};

export default Card;
