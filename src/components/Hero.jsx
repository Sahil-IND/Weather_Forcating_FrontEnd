import React from "react";
import { Link } from "react-router-dom";
import { WiCloudy, WiDaySunny, WiRain } from "react-icons/wi";
import { motion } from "framer-motion";



const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 to-blue-900 text-white pb-20 pt-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-4 mb-6 text-yellow-200">
            <WiDaySunny size={64} />
            <WiCloudy size={64} />
            <WiRain size={64} />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
            Know Your Weather Anytime, Anywhere
          </h1>

          <p className="text-lg sm:text-xl mb-8">
            Get accurate forecasts using real-time weather and machine learning
            prediction models.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/city-weather">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 hover:scale-105 transition-all duration-300 shadow cursor-pointer">
                Check City Weather
              </button>
            </Link>
            <Link to="/my-weather">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 hover:scale-105 transition-all duration-300 shadow cursor-pointer">
                Check Your Location Weather
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white text-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
            About Us
          </h2>
          <p className="text-base leading-relaxed text-center">
            WeatherWise uses machine learning models trained on real-time
            weather data to make accurate predictions — especially about
            rainfall. In addition to forecasting, we also provide current
            weather conditions for any city or your location.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
