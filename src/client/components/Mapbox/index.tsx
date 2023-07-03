import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "mapbox-gl/src/css/mapbox-gl.css";
import "./mapbox.css";

import { flyToBoop, updateBoop, updateCoords } from "./handlers";
import { selectMap } from "../../store/map/selectors";
import { getWeather } from "../../store/map/thunks";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
// "pk.eyJ1IjoiY29tYXRvc2lubyIsImEiOiJjbDFyeW5lNngwYnhwM2NybDhuM2hoOHdtIn0.1lW0Js4LKuMX1SFCzP5J5w";

export const Mapbox: React.FC = () => {
  const map = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const { lat, lon, zoom } = useAppSelector(selectMap);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (map.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      center: [lon, lat],
      zoom,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    marker.current = new mapboxgl.Marker();

    map.current.on("move", updateCoords(map.current, dispatch));
    map.current.on("click", updateBoop(map.current, marker.current));
    map.current.on("click", flyToBoop(map.current));
    map.current.on("click", (e) => {
      dispatch(
        getWeather({
          lat: e.lngLat.lat,
          lon: e.lngLat.lng,
        }),
      );
    });

    return () => {
      map.current?.remove();
      map.current = null;

      marker.current?.remove();
      marker.current = null;
    };
  }, []);

  return <div className="map-container" ref={mapContainer} />;
};
