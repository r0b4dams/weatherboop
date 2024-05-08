"use client";

import { useEffect, useRef, useState, type FC } from "react";
import mapboxgl from "mapbox-gl";

import { Sidebar } from "./sidebar";

const MAPBOX_PUBLIC_KEY =
  "pk.eyJ1IjoiYXRyYXNhZG8iLCJhIjoiY2x2eDQ4YXpwMjgwNzJrcDZ6c2pvZDZqeSJ9.DYCKFYw19PI4BCMvy2CbIQ";

const MAPBOX_STYLE = {
  DARK: "mapbox://styles/mapbox/dark-v11",
  LIGHT: "mapbox://styles/mapbox/light-v11",
} as const;

mapboxgl.accessToken = MAPBOX_PUBLIC_KEY;

export const Mapbox: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const [lng, setLng] = useState(15);
  const [lat, setLat] = useState(36);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: MAPBOX_STYLE.DARK,
      projection: { name: "globe" },
      container: mapContainer.current!,
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("style.load", () => {
      // map.setFog({});
    });

    map.on("move", () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      setLng(mapCenter.lng);
      setLat(mapCenter.lat);
      setZoom(mapZoom);
    });

    return () => {
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Sidebar lng={lng.toFixed(2)} lat={lat.toFixed(2)} zoom={zoom.toFixed(2)} />
      <div className="absolute top-0 right-0 bottom-0 left-0" ref={mapContainer} />
    </>
  );
};
