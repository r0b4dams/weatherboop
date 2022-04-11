import { AppActions, NumberPayloadAction } from "../@types/store";

export const setLng = (lng: number): NumberPayloadAction => {
  return {
    type: AppActions.SET_LNG,
    payload: lng,
  };
};

export const setLat = (lat: number): NumberPayloadAction => {
  return {
    type: AppActions.SET_LAT,
    payload: lat,
  };
};

export const setZoom = (zoom: number): NumberPayloadAction => {
  return {
    type: AppActions.SET_ZOOM,
    payload: zoom,
  };
};