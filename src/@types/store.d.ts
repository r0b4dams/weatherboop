interface AppState {
  lng: number;
  lat: number;
  zoom: number;
  weather?: IWeather;
  error?: unknown;
  theme: string;
}
