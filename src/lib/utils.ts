import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
