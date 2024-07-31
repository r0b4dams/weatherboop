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
    dt: getDateTime(current.dt, current.timezone),
    temp: current.main.temp,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    weather: current.weather,
  };
}

interface IDate {
  weekday: string
  day: string;
  month: string;
  year: string;
}
interface ITime {
  hour: string;
  minute: string;
  second: string;
}

export interface IDateTime {
  date: IDate,
  time: ITime
}

function getDateTime(dt: number, offset: number): IDateTime {
  const [weekday, day, month, year, time] = new Date((dt + offset) * 1000).toUTCString().split(" ")
  const [hour, minute, second] = time.split(":")
  return {
    date: {
      weekday: weekday.substring(0, weekday.length - 1),
      day,
      month,
      year
    },
    time: {
      hour,
      minute,
      second
    }
  }
}