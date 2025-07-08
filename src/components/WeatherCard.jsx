import React from "react";

const WeatherCard = ({ icon, title, value, unit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[160px] text-center text-white shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-base font-medium text-blue-100 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white">
        {value} {unit}
      </p>
    </div>
  );
};

export default WeatherCard;
