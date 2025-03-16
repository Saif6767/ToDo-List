import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation(); // Current route check karne ke liye

  return (
    <div className="bg-blue-600 flex items-center justify-between px-4 py-3 shadow-md">
      {/* Left Side - Logo */}
      <h2 className="text-lg font-medium text-white">📋</h2>

      {/* Right Side - Buttons */}
      <div className="flex gap-3">
        <Link
          to="/"
          className={`px-3 py-1 text-sm rounded transition ${
            location.pathname === '/' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'
          }`}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className={`px-3 py-1 text-sm rounded transition ${
            location.pathname === '/signup' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:text-blue-600'
          }`}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
