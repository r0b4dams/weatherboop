import "./Map.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, {
  Map,
  Marker,
  NavigationControl,
  GeolocateControl,
} from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29tYXRvc2lubyIsImEiOiJjbDFyeW5lNngwYnhwM2NybDhuM2hoOHdtIn0.1lW0Js4LKuMX1SFCzP5J5w";

const MapBox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const marker = useRef(new Marker());

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(51.48);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const map = init();
    addControllers(map);
    addListeners(map);
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const init = () => {
    return new Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat], //Note: Mapbox GL uses longitude, latitude coordinate order to match GeoJSON.
      zoom: zoom,
    });
  };

  const addControllers = (map: mapboxgl.Map) => {
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

  const testHandler =
    (map: mapboxgl.Map) => (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      console.log(map);
      console.log(e);
    };

  const addListeners = (map: mapboxgl.Map) => {
    map.on("click", testHandler(map));

    map.on("move", (e) => {
      try {
        setLng(parseFloat(map.getCenter().lng.toFixed(2)));
        setLat(parseFloat(map.getCenter().lat.toFixed(2)));
        setZoom(parseFloat(map.getZoom().toFixed(2)));
      } catch (error) {
        console.error(error);
      }
    });

    map.on("click", (e) => {
      try {
        map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 10,
          speed: 0.2,
        });
      } catch (error) {
        console.error(error);
      }
    });

    map.on("click", (e) => {
      try {
        marker.current
          .remove()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);
      } catch (error) {
        console.error(error);
      }
    });

    map.on("click", async (e) => {
      try {
        const url = getUrl(e.lngLat.lng, e.lngLat.lat);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const getUrl = (lng: number, lat: number) => {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=imperial&exclude=minutely,hourly&appid=fe40caaf410f6ac1e2f9c09b8ee35df8`;
  };

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapBox;
