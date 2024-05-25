"use client";

import "./mapbox-styles.css";

import { useRef, useState } from "react";
import Map, {
  type MapRef,
  type MapLayerMouseEvent,
  type ViewState,
  type ViewStateChangeEvent,
} from "react-map-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./mapstyles";
import { getCurrentWeather } from "~/lib/actions";
import type { Units, Coordinates } from "~/lib/schema";

interface MapState extends Partial<ViewState> {
  zoom: number;
  latitude: number;
  longitude: number;
}

export function Mapbox() {
  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState(false);
  const [units, setUnits] = useState<Units>("imperial");
  const [viewState, setViewState] = useState<MapState>({
    zoom: 2,
    latitude: 0,
    longitude: 0,
  });

  const handleMapLoaded = () => {
    setMapReady(true);
  };

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  };

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!mapRef.current) {
      return;
    }
    const coordinates: Coordinates = [e.lngLat.lng, e.lngLat.lat];
    mapRef.current.flyTo({ center: coordinates, speed: 0.25 });
    const data = await getCurrentWeather({ coordinates, units });
    console.log(data);
  };

  return (
    <>
      {!mapReady && (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-50 bg-slate-400">
          <p className="m-auto">LOADING</p>
        </div>
      )}

      <Map
        reuseMaps
        ref={mapRef}
        mapboxAccessToken={MAPBOX_PUBLIC_KEY}
        mapStyle={MAPBOX_STYLE.OUTDOORS}
        onMove={handleMapMove}
        onClick={handleMapClick}
        onLoad={handleMapLoaded}
        {...viewState}
      ></Map>
    </>
  );
}
