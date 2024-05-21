import { OPENWEATHERMAP_CURRENT_URL } from "~/config";

export async function getWeather(params: string): Promise<OWM.WeatherResponse> {
  return fetch(`${OPENWEATHERMAP_CURRENT_URL}?${params}`).then((res) => res.json());
}

export function formatWeather(current: OWM.WeatherResponse) {
  return {
    temp: current.main.temp,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    weather: current.weather,
  };
}
