export const getWeather = async ({ city }) => {
  if (!city || typeof city !== "string" || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather API key is missing.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather information.");
  }

  return {
    city: data.name,
    country: data.sys.country,
    temperature: `${data.main.temp}°C`,
    condition: data.weather[0].description,
    humidity: `${data.main.humidity}%`,
    windSpeed: `${data.wind.speed} m/s`
  };
};