import { z } from "zod";

/**
 * Follows Mapbox's convention: [ longitude, latitude ]
 */
export type Coordinates = z.infer<typeof coordSchema>;
export const coordSchema = z.tuple([
  // The LngLat class on a Mapbox event includes a wrap method to clamp lng bounds to [-180, 180]
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);

export type TimeFormat = z.infer<typeof timeSchema>
export const timeSchema = z.enum(["12", "24"])

export type Units = z.infer<typeof unitSchema>;
export const unitSchema = z.enum(["standard", "metric", "imperial"]);

export type WeatherSearch = z.infer<typeof searchSchema>;
export const searchSchema = z.object({ coordinates: coordSchema, units: unitSchema });
