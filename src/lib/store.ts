import { create } from "zustand";
import { z } from "zod";

import { timeSchema, unitSchema } from "./schema";

const stateSchema = z.object({
  timeFormat: timeSchema,
  units: unitSchema,
});

const actionSchema = z.object({
  setTimeFormat: z.function().args(timeSchema).returns(z.void()),
  setUnits: z.function().args(unitSchema).returns(z.void()),
});

const storeSchema = z.intersection(stateSchema, actionSchema);
type Store = z.infer<typeof storeSchema>;

export const useStore = create<Store>((set) => ({
  timeFormat: "24",
  setTimeFormat: (timeFormat) => set(() => ({ timeFormat })),
  units: "imperial",
  setUnits: (units) => set(() => ({ units })),
}));
