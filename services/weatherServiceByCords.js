// weatherService.js
export const getWeatherByCoordinates = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch live weather data");
  return res.json();
};
