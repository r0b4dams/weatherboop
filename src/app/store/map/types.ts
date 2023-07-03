export interface Coordinates {
  lat: number;
  lon: number;
}

export interface MapState extends Coordinates {
  zoom: number;
  weather: any;
  error: string | null;
}
