import React, { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import WeatherCard from "../src/components/WeatherCard";
import {
  WiStrongWind,
  WiHumidity,
  WiCloudy,
  WiThermometer,
} from "react-icons/wi";
import { motion } from "framer-motion";

const CityWeather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Goa's weather by default
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      try {
        setLoading(true);
        const res = await getWeatherByCity("Goa");
        setData(res.data);
      } catch (err) {
        setError("Failed to load default weather");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await getWeatherByCity(city);
      setData(res.data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const realCards =
    data &&
    [
      {
        title: "Temperature",
        value: data.main.temp,
        unit: "°C",
        icon: <WiThermometer className="text-white text-5xl" />,
      },
      {
        title: "Humidity",
        value: data.main.humidity,
        unit: "%",
        icon: <WiHumidity className="text-white text-5xl" />,
      },
      {
        title: "Wind Speed",
        value: data.wind.speed,
        unit: "m/s",
        icon: <WiStrongWind className="text-white text-5xl" />,
      },
      {
        title: "Cloudiness",
        value: data.clouds.all,
        unit: "%",
        icon: <WiCloudy className="text-white text-5xl" />,
      },
    ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-blue-900 text-white font-sans">
      <div className="flex-grow px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-10"
          >
            🌦️ City Weather Search
          </motion.h1>

          {/* Form */}
          <motion.form
            onSubmit={handleFetch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City Name "
              className="w-full sm:w-2/3 px-5 py-3 text-2xl rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-200 transition-all duration-200 text-lg shadow-md"
            >
              Search
            </button>
          </motion.form>

          {/* Spinner */}
          {loading && (
            <div className="flex justify-center items-center my-10">
              <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error */}
          {error && !loading && <p className="text-red-300 mb-6">{error}</p>}

          {/* Weather Info */}
          {data && !loading && (
            <>
              {/* Location & Weather Description */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold">
                  {data.name}, {data.sys.country}
                </h2>
                <p className="capitalize text-blue-200 text-lg mt-2">
                  {data.weather[0].description}
                </p>
              </motion.div>

              {/* Weather Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center mb-10"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {realCards.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <WeatherCard
                      icon={item.icon}
                      title={item.title}
                      value={item.value}
                      unit={item.unit}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-blue-200"
              >
                Powered by{" "}
                <a
                  href="https://openweathermap.org/"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenWeather API
                </a>
              </motion.p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
