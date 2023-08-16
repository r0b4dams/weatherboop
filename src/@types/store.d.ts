interface AppState {
  lng: number;
  lat: number;
  zoom: number;
  weather: unknown;
  error: unknown;
}

const enum ACTIONS {
  SET_LNG,
  SET_LAT,
  SET_ZOOM,
  SET_WEATHER,
  SET_ERROR,
}

type NumberAction = {
  payload: number;
  type: ACTIONS.SET_LNG | ACTIONS.SET_LAT | ACTIONS.SET_ZOOM;
};

type WeatherAction = {
  payload: unknown;
  type: ACTIONS.SET_WEATHER;
};

type ErrorAction = {
  payload: unknown;
  type: ACTIONS.SET_ERROR;
};

type AppReducerAction = NumberAction | WeatherAction | ErrorAction;

type AppDispatch = React.Dispatch<AppReducerAction>;
