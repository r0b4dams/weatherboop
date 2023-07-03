import { RootState } from "..";

export const selectMap = (state: RootState) => state.map;
export const selectLat = (state: RootState) => state.map.lat;
export const selectLon = (state: RootState) => state.map.lon;
export const selectZoom = (state: RootState) => state.map.zoom;
export const selectWeather = (state: RootState) => state.map.weather;
