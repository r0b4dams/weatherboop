"use client";

import { useRef, useState, type FC, type MouseEventHandler } from "react";
import NextImage from "next/image";
import Map, {
  // Marker,
  Popup,
  type MapRef,
  type MapLayerMouseEvent,
  type ViewState,
  type ViewStateChangeEvent,
} from "react-map-gl";
import { type LngLatLike } from "react-map-gl";

import { MAPBOX_PUBLIC_KEY } from "~/config";
import { MAPBOX_STYLE } from "./styles";

interface MapState extends Partial<ViewState> {
  zoom: number;
  latitude: number;
  longitude: number;
}

interface PopupState extends Partial<AppWeatherResponse> {
  show: boolean;
  latitude: number;
  longitude: number;
}

export const Mapbox: FC = () => {
  const mapRef = useRef<MapRef>(null);

  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const [viewState, setViewState] = useState<MapState>({
    zoom: 5,
    latitude: 0,
    longitude: 0,
  });

  const [popup, setPopup] = useState<PopupState>({
    show: false,
    latitude: 0,
    longitude: 0,
  });

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  };

  const getCurrentWeather = async (coords: [number, number]) => {
    const params = new URLSearchParams({
      lon: coords[0].toString(),
      lat: coords[1].toString(),
    }).toString();
    const res = await fetch(`/api/boop?${params}`);
    const data = await res.json();
    return data;
  };

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    const coords: LngLatLike = [e.lngLat.lng, e.lngLat.lat];
    mapRef.current?.flyTo({ center: coords, speed: 0.25 });
    setPopup((prev: any) => ({ ...prev, show: false }));
    const data = await getCurrentWeather(coords);
    setPopup((prev: any) => ({
      ...prev,
      ...data,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
      show: true,
    }));
  };

  const handleClosePopup: MouseEventHandler<HTMLButtonElement> = () => {
    setPopup((prev: any) => ({ ...prev, show: false }));
  };

  return (
    <>
      <Map
        reuseMaps
        ref={mapRef}
        mapboxAccessToken={MAPBOX_PUBLIC_KEY}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        mapStyle={MAPBOX_STYLE.OUTDOORS}
        onMove={handleMapMove}
        onClick={handleMapClick}
        {...viewState}
      >
        {popup.show && (
          <Popup
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeButton={false}
            offset={0}
          >
            <div id="weather-content">
              <div>{popup.location?.name}</div>

              <div>
                {popup.weather?.map((item) => (
                  <div key={item.id}>
                    <i className={`wi wi-owm-${item.id}`} />
                    <span className="pl-1">{item.description}</span>
                  </div>
                ))}
              </div>

              {/* metric: Celsius, imperial: Fahrenheit */}
              <div>
                <i className="wi wi-thermometer" />
                <span className="text-slate-700">{popup.temp}</span>
                <i
                  className={`wi ${units === "imperial" ? "wi-fahrenheit" : "wi-celsius"}`}
                />
              </div>

              {/* Humidity, % */}
              <div>
                <i className="wi wi-humidity"></i>
                <span className="text-slate-700">{popup.humidity} %</span>
              </div>

              {/* Atmospheric pressure on the sea level, hPa */}
              <div>
                <div>
                  <i className="wi wi-barometer" />
                  <span className="pl-1 text-slate-700">{popup.pressure} hPa</span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};
