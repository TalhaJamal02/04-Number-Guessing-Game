import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export  const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black ${className}`}
    {...props}
  >
    {children}
  </button>
);
