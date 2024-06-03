import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const TEMP_UNITS = {
  standard: "K",
  metric: "°C",
  imperial: "°F",
};

export const WIND_SPEED_UNITS = {
  standard: "m/s",
  metric: "m/s",
  imperial: "mph",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrentWeather(current: OWM.WeatherResponseData) {
  return {
    temp: current.main.temp,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    weather: current.weather,
  };
}
