import { type NextRequest } from "next/server";

import { OPENWEATHERMAP_APPID } from "~/config";
import { getWeather } from "./helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  searchParams.append("appid", OPENWEATHERMAP_APPID);
  const weather = await getWeather(searchParams.toString());
  return Response.json(weather);
}
