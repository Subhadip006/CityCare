import React from 'react';

const Button = ({ text, color, textColor, hoverColor, onClick, className }) => {
  return (
    <button
      className={`px-6 py-2 rounded font-semibold transition duration-300 ${color} text-[#F9F7F3] hover:${hoverColor} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;