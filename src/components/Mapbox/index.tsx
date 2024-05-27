import "./mapbox-styles.css";

import { useState } from "react";
import Map, {
  useMap,
  Marker,
  type MapLayerMouseEvent,
  type ViewState,
  type ViewStateChangeEvent,
} from "react-map-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./mapstyles";
import { MapboxLoader } from "~/components/MapboxLoader";
import { getCurrentWeather } from "~/lib/actions";
import type { Units, Coordinates } from "~/lib/schema";
import { WeatherCard } from "../WeatherCard";

interface MapState extends Partial<ViewState> {
  zoom: number;
  latitude: number;
  longitude: number;
}

interface CurrentWeather {
  temp: number;
  humidity: number;
  pressure: number;
  weather: OWM.WeatherItem[];
}

export function Mapbox() {
  const { map } = useMap();
  const [mapReady, setMapReady] = useState(false);
  const [units, setUnits] = useState<Units>("imperial");
  const [mapView, setMapView] = useState<MapState>({
    zoom: 2,
    latitude: 0,
    longitude: 0,
  });
  const [marker, setMarker] = useState({
    show: false,
    latitude: 0,
    longitude: 0,
  });
  const [current, setCurrent] = useState<CurrentWeather | null>(null);

  const handleMapLoaded = () => {
    setTimeout(() => {
      setMapReady(true);
    }, 1500);
  };

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setMapView(e.viewState);
  };

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!map) {
      return;
    }
    setCurrent(null);
    const { lng, lat } = e.lngLat.wrap();
    const coordinates = [lng, lat] satisfies Coordinates;
    setMarker({ show: true, latitude: lat, longitude: lng });
    map.easeTo({ center: coordinates });
    const data = await getCurrentWeather({ coordinates, units });
    console.log(data);
    setCurrent(data as CurrentWeather);
  };

  return (
    <>
      {!mapReady && <MapboxLoader />}

      <Map
        id="map"
        reuseMaps
        mapboxAccessToken={MAPBOX_PUBLIC_KEY}
        mapStyle={MAPBOX_STYLE.OUTDOORS}
        onMove={handleMapMove}
        onClick={handleMapClick}
        onLoad={handleMapLoaded}
        {...mapView}
      >
        {marker.show && current && (
          <Marker
            latitude={marker.latitude}
            longitude={marker.longitude}
            anchor="bottom"
          >
            <WeatherCard
              units={units}
              temp={current.temp}
              weather={current.weather}
              humidity={current.humidity}
              pressure={current.pressure}
            />
          </Marker>
        )}
      </Map>
    </>
  );
}
