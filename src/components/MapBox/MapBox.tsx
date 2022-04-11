import "./MapBox.css";
import React, { useRef, useEffect } from "react";
import { Map, Marker, NavigationControl, GeolocateControl } from "mapbox-gl";
import { updateBoop, updateCoords, flyToBoop, fetchData } from "../../handlers";
import { MapBoxProps } from "../../@types/props";

const MapBox: React.FC<MapBoxProps> = ({ state, dispatch }): JSX.Element => {
  const { lng, lat, zoom } = state;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const marker = useRef(new Marker());

  useEffect(() => {
    const map = initMap();
    addControls(map);
    addListeners(map);
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initMap = () =>
    new Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });

  const addControls = (map: Map) => {
    map.addControl(new NavigationControl(), "top-right");
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: false,
        showUserHeading: false,
      })
    );
  };

  const addListeners = (map: Map) => {
    map.on("move", updateCoords(map, dispatch));
    map.on("click", updateBoop(map, marker.current));
    map.on("click", flyToBoop(map));
    map.on("click", fetchData);
  };

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapBox;
