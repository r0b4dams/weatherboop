import { getWeatherParams } from "~/utils";
import { OPENWEATHERMAP_REVERSEGEO_URL } from "~/config";

/**
 * Returns the geographic name at the given coordinates.
 * @param coords A tuple with sequence [longitude, latitude]
 * @returns Name of the location, or null if no name found
 */
export async function getReverseGeo(coords: [number, number]) {
  const [lon, lat] = coords;
  const params = getWeatherParams({ lat, lon, limit: 1 });
  const res = await fetch(`${OPENWEATHERMAP_REVERSEGEO_URL}?${params}`);

  const [location]: GeoResponse = await res.json();
  if (!location) {
    return null;
  }

  const result = [location.local_names["en"] || location.name];
  if (location.state) {
    result.push(location.state);
  }
  if (location.country) {
    result.push(location.country);
  }
  return result.join(", ");
}
