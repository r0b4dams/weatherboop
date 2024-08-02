"use client";

import { MapProvider } from "react-map-gl";
import { Mapbox } from "~/components/Mapbox";
import { UI } from "~/components/UI";

export default function MapPage() {
  return (
    <MapProvider>
      <UI />
      <Mapbox />
    </MapProvider>
  );
}
