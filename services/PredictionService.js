export const predictRainTomorrow = async (lat, lon) => {
  const res = await fetch(`http://localhost:8000/predict?latitude=${lat}&longitude=${lon}`);
  if (!res.ok) throw new Error("Prediction request failed");
  return res.json();
};
