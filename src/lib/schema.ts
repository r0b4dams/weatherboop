import { z } from "zod";

/**
 * [longitude, latitude]
 */
export type Coordinates = z.infer<typeof coordSchema>;
export const coordSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);

export type Units = z.infer<typeof unitSchema>;
export const unitSchema = z.enum(["standard", "metric", "imperial"]);

export type WeatherSearch = z.infer<typeof searchSchema>;
export const searchSchema = z.object({ coordinates: coordSchema, units: unitSchema });
