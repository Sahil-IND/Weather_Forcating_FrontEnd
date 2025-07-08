import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherCard from "../src/components/WeatherCard";
import { getWeatherByCoordinates } from "../services/weatherServiceByCords";

const LocationWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeatherData({
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            cloudCover: data.clouds.all,
          });
          setLocation({ lat: latitude, lon: longitude });
        } catch (error) {
          toast.error("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Location access is required to fetch weather.");
        setLoading(false);
      }
    );
  };

  const handlePredictRain = async () => {
    if (!location) {
      toast.warn("Please get weather info first.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/predict?latitude=${location.lat}&longitude=${location.lon}`
      );
      const data = await res.json();

      if (data.will_rain_tomorrow) {
        setPrediction("rain");
        toast.warning("☔ It will rain tomorrow. Carry an umbrella!");
      } else {
        setPrediction("no_rain");
        toast.success("🌤 No rain expected tomorrow. Enjoy your day!");
      }

      setWeatherData(null); // Hide cards
    } catch (err) {
      toast.error("Prediction failed.");
    }
  };

  return (
    <motion.div
      className="min-h-[88vh] bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-6 py-12 flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-2">📍 My Location Weather</h1>
      <p className="text-lg text-center max-w-2xl mb-6">
        Click below to get weather info for your current location and predict if
        it will rain tomorrow using our ML model.
      </p>

      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={handleGetLocationWeather}
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200 transition"
        >
          {loading ? "Loading..." : "📊 See Weather Info"}
        </button>

        <button
          onClick={handlePredictRain}
          className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg shadow hover:bg-yellow-300 transition"
        >
          🌧 Predict Rain Tomorrow
        </button>
      </div>

      {/* Show Weather Cards if data is available and prediction not done */}
      {weatherData && !prediction && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <WeatherCard label="Temperature" value={weatherData.temperature} unit="°C" icon="🌡️" />
          <WeatherCard label="Humidity" value={weatherData.humidity} unit="%" icon="💧" />
          <WeatherCard label="Wind Speed" value={weatherData.windSpeed} unit="m/s" icon="💨" />
          <WeatherCard label="Cloud Cover" value={weatherData.cloudCover} unit="%" icon="☁️" />
        </motion.div>
      )}

      {/* Prediction Result Section */}
      {prediction && (
        <motion.div
          className="mt-10 bg-white/10 p-8 rounded-2xl max-w-xl w-full text-center shadow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {prediction === "rain"
              ? "☔ High chance of rain tomorrow!"
              : "🌤 No rain expected tomorrow!"}
          </h2>
          <p className="text-lg mb-4">
            {prediction === "rain"
              ? "Oh no! Please carry an umbrella with you."
              : "Enjoy your day with sunshine and fresh air!"}
          </p>
          <div className="text-5xl">
            {prediction === "rain" ? "🌧️" : "☀️"}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LocationWeather;
