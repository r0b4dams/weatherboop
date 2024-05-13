import { OPENWEATHERMAP_APPID } from "~/config";

/**
 * Returns a string of URL search params from given object.
 * Appends Openweathermap API key.
 *
 * @param params
 * @returns String of URL search params from given object
 */
export function getWeatherParams(params: Record<string, unknown>) {
  return new URLSearchParams({ ...params, appid: OPENWEATHERMAP_APPID }).toString();
}
