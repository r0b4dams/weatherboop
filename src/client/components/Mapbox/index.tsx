import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/src/css/mapbox-gl.css";

import { useAppContext } from "../../store";
import { updateCoordinates } from "./handlers";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export const Mapbox: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      center: [state.lng, state.lat],
      zoom: state.zoom,
      style: "mapbox://styles/mapbox/streets-v11",
    });
    marker.current = new mapboxgl.Marker();

    map.current.on("move", updateCoordinates(map.current, dispatch));
    // map.current.on("click", setMarker(map.current, marker.current));
    // map.current.on("click", flyToMarker(map.current));

    return () => {
      map.current?.remove();
      map.current = null;
      marker.current?.remove();
      marker.current = null;
    };
  }, []);

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
