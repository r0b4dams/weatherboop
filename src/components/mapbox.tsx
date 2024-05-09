"use client";

import { useEffect, useRef, useState, type FC } from "react";
import mapboxgl from "mapbox-gl";

import { DEBUGGER } from "./DEBUGGER";

const MAPBOX_PUBLIC_KEY =
  "pk.eyJ1IjoiYXRyYXNhZG8iLCJhIjoiY2x2eDQ4YXpwMjgwNzJrcDZ6c2pvZDZqeSJ9.DYCKFYw19PI4BCMvy2CbIQ";

const MAPBOX_STYLE = {
  STANDARD: "mapbox://styles/mapbox/standard",
  STREETS: "mapbox://styles/mapbox/streets-v12",
  OUTDOORS: "mapbox://styles/mapbox/outdoors-v12",
  LIGHT: "mapbox://styles/mapbox/light-v11",
  DARK: "mapbox://styles/mapbox/dark-v11",
  SAT: "mapbox://styles/mapbox/satellite-v9",
  SAT_STREETS: "mapbox://styles/mapbox/satellite-streets-v12",
  NAV_DAY: "mapbox://styles/mapbox/navigation-day-v1",
  NAV_NIGHT: "mapbox://styles/mapbox/navigation-night-v1",
} as const;

export const Mapbox: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const [lng, setLng] = useState(7.18);
  const [lat, setLat] = useState(51.25);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: MAPBOX_PUBLIC_KEY,
      style: MAPBOX_STYLE.OUTDOORS,
      projection: { name: "globe" },
      container: mapContainer.current!,
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      setLng(mapCenter.lng);
      setLat(mapCenter.lat);
      setZoom(mapZoom);
    });

    map.on("click", (e) => {
      map.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        speed: 0.5,
        essential: false,
      });
    });

    return () => {
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0" ref={mapContainer} />
      <DEBUGGER lng={lng.toFixed(2)} lat={lat.toFixed(2)} zoom={zoom.toFixed(2)} />
    </>
  );
};
