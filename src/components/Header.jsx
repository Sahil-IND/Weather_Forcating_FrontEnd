// src/components/Header.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyle = (path) =>
    location.pathname === path
      ? "text-blue-500 border-b-2 border-blue-500"
      : "text-gray-700 hover:text-blue-500";

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold text-blue-600">
          WeatherWise
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-xl">
          <Link to="/" className={navLinkStyle("/")}>
            Home
          </Link>
          <Link to="/city-weather" className={navLinkStyle("/city-weather")}>
            City Weather
          </Link>
          <Link to="/location-weather" className={navLinkStyle("/location-weather")}>
            My Location
          </Link>
        </nav>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block cursor-pointer text-gray-700 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            to="/city-weather"
            onClick={() => setIsOpen(false)}
            className="block cursor-pointer text-gray-700 hover:text-blue-500"
          >
            City Weather
          </Link>
          <Link
            to="/location-weather"
            onClick={() => setIsOpen(false)}
            className="block cursor-pointer text-gray-700 hover:text-blue-500"
          >
            My Location
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
