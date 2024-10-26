import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional custom prop
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div>
    {label && <label className="text-gray-700">{label}</label>}
    <input className="bg-gray-800 border border-gray-600 rounded-lg py-2 px-4 w-full text-white" {...props} />
  </div>
);

export default Input; // Ensure you have this line
