import { type NextRequest } from "next/server";

import { getCurrentWeather } from "~/lib/actions";
import { WeatherSearch } from "~/lib/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coordinates = [
    parseFloat(searchParams.get("lon")!),
    parseFloat(searchParams.get("lat")!),
  ];
  const units = searchParams.get("units")!;
  const search = { coordinates, units } as WeatherSearch;
  const weather = await getCurrentWeather(search);
  return Response.json(weather);
}
