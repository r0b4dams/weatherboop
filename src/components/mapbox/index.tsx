"use client";

import { useEffect, useRef, useState, type FC } from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./mapstyles";
import { DEBUG } from "../DEBUG";

export const Mapbox: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const [forecast, setForecast] = useState();

  const [lng, setLng] = useState(7.18);
  const [lat, setLat] = useState(51.25);
  const [zoom, setZoom] = useState(10);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       console.log(pos.coords);
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //     },
  //   );
  // }, []);

  useEffect(() => {
    if (!mapboxgl.supported()) {
      alert("Your browser does not support Mapbox GL");
      return;
    }

    const map = new mapboxgl.Map({
      accessToken: MAPBOX_PUBLIC_KEY,
      style: MAPBOX_STYLE.OUTDOORS,
      projection: { name: "globe" },
      container: mapContainer.current!,
      center: [lng, lat],
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker();

    map.on("move", () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      setLng(mapCenter.lng);
      setLat(mapCenter.lat);
      setZoom(mapZoom);
    });

    map.on("click", async (e) => {
      const coords: LngLatLike = [e.lngLat.lng, e.lngLat.lat];
      map.flyTo({ center: coords, speed: 0.5 });
      marker.setLngLat(coords).addTo(map);
    });

    return () => {
      marker.remove();
      map.remove();
    };
    // This hook should only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0" ref={mapContainer} />
      <DEBUG lng={lng} lat={lat} zoom={zoom} />
    </>
  );
};
