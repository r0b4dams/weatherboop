export interface AppState {
  lng: number;
  lat: number;
  zoom: number;
}

export enum AppActions {
  SET_LNG,
  SET_LAT,
  SET_ZOOM,
}

export type AppReducerAction = NumberPayloadAction;

export type NumberPayloadAction = {
  type: AppActions.SET_LNG | AppActions.SET_LAT | AppActions.SET_ZOOM;
  payload: number;
};
