import React from "react";

function Card({ icon, title, description }) {
  return (
    <div className="rounded-xl  shadow-xl p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow text-center">
      <div className="flex items-center justify-center">{icon}</div>
      <h3 className="text-lg font-semibold text-text pt-4">{title}</h3>
      <p className="text-md text-gray-500 max-w-sm pt-4 pb-3">{description}</p>
    </div>
  );
}

export default Card;
