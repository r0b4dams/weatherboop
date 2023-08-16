import * as rtk from "@reduxjs/toolkit";
import { updateWeather } from "./thunks";
import { MapState } from "./types";

const initialState = {
  lat: 0,
  lon: 0,
  zoom: 10,
  weather: null,
  error: null,
} as MapState;

export const mapSlice = rtk.createSlice({
  name: "map",
  initialState,
  reducers: {
    setLat: (state, action: rtk.PayloadAction<number>) => {
      state.lat = action.payload;
    },
    setLon: (state, action: rtk.PayloadAction<number>) => {
      state.lon = action.payload;
    },
    setZoom: (state, action: rtk.PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    updateWeather(builder);
  },
});

export default mapSlice.reducer;

export const { setLat, setLon, setZoom } = mapSlice.actions;
