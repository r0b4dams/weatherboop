import { type NextRequest } from "next/server";

import {
  OPENWEATHERMAP_APPID,
  OPENWEATHERMAP_CURRENT_URL,
  OPENWEATHERMAP_REVERSEGEO_URL,
} from "~/config";

const getLocation = async (params: string): Promise<OWM.GeoResponse> => {
  return fetch(`${OPENWEATHERMAP_REVERSEGEO_URL}?${params}`).then((res) => res.json());
};

const formatLocation = (geo: OWM.GeoResponse) => {
  const [location] = geo;
  if (!location) {
    return null;
  }
  const result: AppLocationResponse = {
    name: location.name,
  };
  if (location.state) {
    result.state = location.state;
  }
  if (location.country) {
    result.country = location.country;
  }
  return result;
};

const getWeather = async (params: string): Promise<OWM.WeatherResponse> => {
  return fetch(`${OPENWEATHERMAP_CURRENT_URL}?${params}`).then((res) => res.json());
};

const formatWeather = (current: OWM.WeatherResponse) => {
  return {
    temp: current.main.temp,
    feels_like: current.main.feels_like,
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    weather: current.weather.map((item) => {
      return {
        ...item,
        icon_url: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
      };
    }),
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  searchParams.append("appid", OPENWEATHERMAP_APPID);
  const params = searchParams.toString();

  const [location, weather] = await Promise.all([
    getLocation(params),
    getWeather(params),
  ]);

  return Response.json({
    location: formatLocation(location),
    ...formatWeather(weather),
  });
}
