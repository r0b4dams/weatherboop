export const MAPBOX_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY || ""
export const OPENWEATHERMAP_APPID = process.env.OPENWEATHERMAP_APPID || "";
export const OPENWEATHERMAP_BASE_URL = "https://api.openweathermap.org";
export const OPENWEATHERMAP_CURRENT_URL = `${OPENWEATHERMAP_BASE_URL}/data/2.5/weather`;
export const OPENWEATHERMAP_FORECAST_URL = `${OPENWEATHERMAP_BASE_URL}/data/2.5/forecast`;
export const OPENWEATHERMAP_REVERSEGEO_URL = `${OPENWEATHERMAP_BASE_URL}/geo/1.0/reverse`;
