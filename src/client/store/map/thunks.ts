import * as rtk from "@reduxjs/toolkit";
import { Coordinates, MapState } from "./types";

export const getWeather = rtk.createAsyncThunk(
  "map/getWeather",
  async ({ lat, lon }: Coordinates, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue("Unable to fetch weather data");
    }
  },
);

export const updateWeather = (builder: rtk.ActionReducerMapBuilder<MapState>) => {
  builder
    .addCase(getWeather.pending, (state) => {
      state.weather = null;
      state.error = null;
    })
    .addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    })
    .addCase(getWeather.rejected, (state) => {
      state.error = "Unable to get weather data";
    });
};
