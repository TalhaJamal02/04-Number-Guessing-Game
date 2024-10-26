// /Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export  const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    {...props}
  />
);
