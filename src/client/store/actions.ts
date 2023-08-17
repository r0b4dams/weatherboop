export const ACTIONS = {
  SET_LNG: "SET_LNG",
  SET_LAT: "SET_LAT",
  SET_ZOOM: "SET_ZOOM",
  SET_WEATHER: "SET_WEATHER",
} as const;

export type NumberAction = {
  payload: number;
  type: (typeof ACTIONS)["SET_LNG" | "SET_LAT" | "SET_ZOOM"];
};

export type WeatherAction = {
  payload: unknown;
  type: (typeof ACTIONS)["SET_WEATHER"];
};

export type AppReducerAction = NumberAction | WeatherAction;
export type AppDispatch = React.Dispatch<AppReducerAction>;

// action creators

export const setLng = (payload: number): NumberAction => {
  return {
    type: ACTIONS.SET_LNG,
    payload,
  };
};

export const setLat = (payload: number): NumberAction => {
  return {
    type: ACTIONS.SET_LAT,
    payload,
  };
};

export const setZoom = (payload: number): NumberAction => {
  return {
    type: ACTIONS.SET_ZOOM,
    payload,
  };
};

export const setWeather = (payload: unknown): WeatherAction => {
  return {
    type: ACTIONS.SET_WEATHER,
    payload,
  };
};
