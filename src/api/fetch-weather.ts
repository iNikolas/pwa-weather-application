const API_URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = process.env.REACT_APP_API_KEY ?? "";

export const fetchWeather = async (query: string) => {
  const url = new URL(API_URL);

  url.searchParams.append("q", query);
  url.searchParams.append("key", API_KEY);

  const response = await fetch(url);

  if (response.ok) return await response.json();

  const error = (await response.json()) as {
    error: { code: number; message: string };
  };

  return error;
};
