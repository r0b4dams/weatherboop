"use client";

import { FC, useEffect, useState } from "react";
import Map, {
  Marker,
  type ViewStateChangeEvent,
  type MapLayerMouseEvent,
} from "react-map-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./styles";

export const Mapbox: FC = () => {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 5,
  });

  const [marker, setMarker] = useState({
    show: false,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 5,
      });
    });
  }, []);

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    setMarker({ show: true, latitude: e.lngLat.lat, longitude: e.lngLat.lng });
    setViewState({ ...viewState, latitude: e.lngLat.lat, longitude: e.lngLat.lng });
  };

  return (
    <Map
      reuseMaps
      mapboxAccessToken={MAPBOX_PUBLIC_KEY}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      mapStyle={MAPBOX_STYLE.OUTDOORS}
      onMove={handleMapMove}
      onClick={handleMapClick}
      {...viewState}
    >
      {marker.show && <Marker {...marker} />}
    </Map>
  );
};
