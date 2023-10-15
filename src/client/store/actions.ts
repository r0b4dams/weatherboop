export const ACTIONS = {
  SET_LNG: "SET_LNG",
  SET_LAT: "SET_LAT",
  SET_ZOOM: "SET_ZOOM",
  SET_WEATHER: "SET_WEATHER",
  SET_THEME: "SET_THEME",
} as const;

export type NumberAction = {
  payload: number;
  type: (typeof ACTIONS)["SET_LNG" | "SET_LAT" | "SET_ZOOM"];
};

export type WeatherAction = {
  payload: IWeather;
  type: (typeof ACTIONS)["SET_WEATHER"];
};

export type StringAction = {
  payload: string;
  type: (typeof ACTIONS)["SET_THEME"];
};

export type AppReducerAction = NumberAction | StringAction | WeatherAction;
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

export const setWeather = (payload: IWeather): WeatherAction => {
  return {
    type: ACTIONS.SET_WEATHER,
    payload,
  };
};

export const setTheme = (payload: string): StringAction => {
  return {
    type: ACTIONS.SET_THEME,
    payload,
  };
};
