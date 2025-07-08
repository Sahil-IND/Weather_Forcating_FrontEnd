import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-blue-900 py-4">
      <div className="marquee-wrapper w-full">
        <div className="marquee-content text-sm text-blue-800 cursor-pointer">
          &copy; {new Date().getFullYear()} WeatherWise. All rights reserved. &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/terms" className="hover:underline">Terms of Service</a> &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="/contact" className="hover:underline">Contact</a> &nbsp;&nbsp;|&nbsp;&nbsp;
          Version 1.0.0 &nbsp;&nbsp;|&nbsp;&nbsp;
          Powered by OpenWeather API
        </div>
      </div>
    </footer>
  );
};

export default Footer;
