interface IWeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICoordinates {
  lon: number;
  lat: number;
}

interface IWeather {
  coord: ICoordinates;
  weather: IWeatherItem[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: 3219;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
