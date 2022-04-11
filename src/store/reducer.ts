import { Reducer } from "react";
import { AppState, AppReducerAction, AppActions } from "../@types/store";
import { __setLng, __setLat, __setZoom } from "./reducerFns";

const AppReducer: Reducer<AppState, AppReducerAction> = (
  state,
  action
): AppState => {
  switch (action.type) {
    case AppActions.SET_LNG:
      return __setLng(state, action.payload);

    case AppActions.SET_LAT:
      return __setLat(state, action.payload);

    case AppActions.SET_ZOOM:
      return __setZoom(state, action.payload);

    default:
      throw new Error();
  }
};

export default AppReducer;
