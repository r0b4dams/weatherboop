import { create } from 'zustand'
import { z } from "zod"

import { timeSchema, } from './schema'

const stateSchema = z.object({
  timeFormat: timeSchema,
})

const actionSchema = z.object({
  setTimeFormat: z.function().args(timeSchema).returns(z.void()),
})

const storeSchema = z.intersection(stateSchema, actionSchema)
type Store = z.infer<typeof storeSchema>

export const useStore = create<Store>((set) => ({
  timeFormat: "24",
  setTimeFormat: (timeFormat) => set(() => ({ timeFormat })),
}))
