import { type NextRequest } from "next/server";

import { OPENWEATHERMAP_APPID } from "~/config";
import { getWeather } from "./helpers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  searchParams.append("appid", OPENWEATHERMAP_APPID);
  const weather = await getWeather(searchParams.toString());
  return Response.json(weather);
}
