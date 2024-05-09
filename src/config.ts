export const CONFIG = {
  OPENWEATHERMAP_BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  OPENWEATHERMAP_APPID: process.env.OPENWEATHERMAP_APPID || "",
} as const;
