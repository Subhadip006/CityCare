// src/components/OfficerHeader.jsx
import React from 'react';

const OfficerHeader = ({ name, department }) => {
  return (
    <div className="bg-primary text-white rounded-b-xl p-6 shadow mb-6">
      <h1 className="text-2xl font-bold">Welcome, {name}</h1>
      <p className="text-white/80 mt-1">Department: {department}</p>
    </div>
  );
};

export default OfficerHeader;
