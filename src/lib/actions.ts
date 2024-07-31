"use server";

import { cookies } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";

import { searchSchema, type WeatherSearch } from "./schema";
import { OPENWEATHERMAP_APPID, OPENWEATHERMAP_CURRENT_URL } from "~/config";
import { formatCurrentWeather } from "./utils";

export async function getCurrentWeather(search: WeatherSearch) {
  try {
    searchSchema.parse(search);

    const params = new URLSearchParams({
      lon: search.coordinates[0].toString(),
      lat: search.coordinates[1].toString(),
      units: search.units || "standard",
      appid: OPENWEATHERMAP_APPID
    });
    const url = `${OPENWEATHERMAP_CURRENT_URL}?${params.toString()}`;
    const data: OWM.WeatherResponseData = await fetch(url).then((res) => res.json());
    return formatCurrentWeather(data);
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, msg: error.message };
    }
    return { status: 500, msg: "something went wrong..." };
  }
}

export async function deleteUser(userId: string, sessionId: string) {
  const store = cookies();
  store.getAll().forEach((cookie) => {
    store.delete(cookie.name);
  });
  await clerkClient.sessions.revokeSession(sessionId);
  await clerkClient.users.deleteUser(userId);
}
