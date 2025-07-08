import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

export const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return await axios.get(url);
};
