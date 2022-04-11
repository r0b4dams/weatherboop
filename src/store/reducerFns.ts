import { Reducer } from "react";
import { AppState } from "../@types/store";

export const __setLng: Reducer<AppState, number> = (
  state,
  payload
): AppState => ({ ...state, lng: payload });

export const __setLat: Reducer<AppState, number> = (
  state,
  payload
): AppState => ({ ...state, lat: payload });

export const __setZoom: Reducer<AppState, number> = (
  state,
  payload
): AppState => ({ ...state, zoom: payload });
