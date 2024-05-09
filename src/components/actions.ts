"use server";

import { CONFIG } from "~/config";

export async function getWeather(c: [number, number]) {
  const [lng, lat] = c;
  const params = new URLSearchParams({
    lon: lng.toString(),
    lat: lat.toString(),
    appid: CONFIG.OPENWEATHERMAP_APPID,
  });

  const url = `${CONFIG.OPENWEATHERMAP_BASE_URL}?${params.toString()}`;
  return fetch(url).then((res) => res.json());
}
