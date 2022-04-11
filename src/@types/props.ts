import { AppState, AppReducerAction } from "./store";

export type MapBoxProps = {
  state: AppState;
  dispatch: React.Dispatch<AppReducerAction>;
};

export type SideBarProps = {
  lng: number;
  lat: number;
  zoom: number;
};
