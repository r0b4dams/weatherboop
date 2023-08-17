import { type Reducer } from "react";

import { ACTIONS, type AppReducerAction } from "./actions";

export const appReducer: Reducer<AppState, AppReducerAction> = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LNG:
      return { ...state, lng: action.payload };

    case ACTIONS.SET_LAT:
      return { ...state, lat: action.payload };

    case ACTIONS.SET_ZOOM:
      return { ...state, zoom: action.payload };

    default:
      throw new Error(`UNRECOGNIZED ACTION: ${action}`);
  }
};
