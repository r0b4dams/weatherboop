export const setLng = (payload: number) => {
  return {
    type: ACTIONS.SET_LNG,
    payload,
  } as NumberAction;
};

export const setLat = (payload: number) => {
  return {
    type: ACTIONS.SET_LAT,
    payload,
  } as NumberAction;
};

export const setZoom = (payload: number) => {
  return {
    type: ACTIONS.SET_ZOOM,
    payload,
  } as NumberAction;
};
