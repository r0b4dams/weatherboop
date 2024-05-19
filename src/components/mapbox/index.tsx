"use client";

import { useEffect, useRef, useState, type FC } from "react";

import Map, {
  type LngLatLike,
  type MapRef,
  type MapLayerMouseEvent,
  type ViewState,
  type ViewStateChangeEvent,
} from "react-map-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./styles";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

interface MapState extends Partial<ViewState> {
  zoom: number;
  latitude: number;
  longitude: number;
}

async function getCurrentWeather(coords: [number, number], units: string) {
  const params = new URLSearchParams({
    lon: coords[0].toString(),
    lat: coords[1].toString(),
    units,
  });
  const url = `/api/boop?${params.toString()}`;
  return fetch(url).then((res) => res.json());
}

export function Mapbox() {
  console.log("map");
  const mapRef = useRef<MapRef>(null);
  const [ready, setReady] = useState(false);

  const [units, setUnits] = useState<"metric" | "imperial">("imperial");

  const [viewState, setViewState] = useState<MapState>({
    zoom: 2,
    latitude: 0,
    longitude: 0,
  });

  const handleMapLoaded = () => {
    setReady(true);
  };

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  };

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!mapRef.current) {
      return;
    }
    const coords: LngLatLike = [e.lngLat.lng, e.lngLat.lat];
    mapRef.current.flyTo({ center: coords, speed: 0.25 });
    const data = await getCurrentWeather(coords, units);
    console.log(data);
  };

  return (
    <>
      {!ready && (
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
