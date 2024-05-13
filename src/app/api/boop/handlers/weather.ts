import { OPENWEATHERMAP_CURRENT_URL, OPENWEATHERMAP_FORECAST_URL } from "~/config";
import { getWeatherParams } from "~/utils";

export async function getCurrent([lat, lon]: [number, number]) {
  const params = getWeatherParams({ lat, lon });
  const url = `${OPENWEATHERMAP_CURRENT_URL}?${params}`;
  const res = await fetch(url);
  return res.json();
}

export async function getForecast([lat, lon]: [number, number]) {
  const params = getWeatherParams({ lat, lon });
  const url = `${OPENWEATHERMAP_FORECAST_URL}?${params}`;
  const res = await fetch(url);
  return res.json();
}
