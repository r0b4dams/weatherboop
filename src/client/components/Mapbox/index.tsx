import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/src/css/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export const Mapbox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      center: [0, 0],
      zoom: 10,
      style: "mapbox://styles/mapbox/streets-v11",
    });
    return () => {
      map.current?.remove();
      map.current = null;
      marker.current?.remove();
      marker.current = null;
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      ref={mapContainer}
    />
  );
};
