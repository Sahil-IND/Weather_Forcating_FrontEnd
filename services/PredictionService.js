const baseURL = "https://weather-forcating-backend.onrender.com";

export const predictRainTomorrow = async (lat, lon) => {
  const res = await fetch(`${baseURL}/predict?latitude=${lat}&longitude=${lon}`);
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
};
