"use client";

import { MapProvider } from "react-map-gl";
import { Mapbox } from "~/components/Mapbox";

export default function MapPage() {
  return (
    <MapProvider>
      <Mapbox />
    </MapProvider>
  );
}
