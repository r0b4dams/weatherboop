import React, { useReducer } from "react";
import MapBox from "./components/MapBox";
import SideBar from "./components/SideBar";
import AppReducer from "./store/reducer";
import INITIAL_STATE from "./store/init";

import mapboxgl from "mapbox-gl";
import MAPBOXGL_ACCESS_TOKEN from "./utils/token";
mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  return (
    <>
      <SideBar lng={state.lng} lat={state.lat} zoom={state.zoom} />
      <MapBox state={state} dispatch={dispatch} />
    </>
  );
};

export default App;
