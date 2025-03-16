import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">📋</h1>
      {isLoggedIn && ( 
        <Link to="/"
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Nav;
