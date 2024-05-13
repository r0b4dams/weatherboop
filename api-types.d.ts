interface GeoItem {
  name: string;
  state?: string;
  country: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
}

type GeoResponse = GeoItem[];

interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/**
 * https://openweathermap.org/current#fields_json
 */
interface CurrentWeatherResponse {
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherItem[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  rain: {
    "1h": number;
    "3h": number;
  };
  snow: {
    "1h": number;
    "3h": number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}
