"use client";

import { MapProvider } from "react-map-gl";
import { Mapbox } from "~/components/Mapbox";
import { UserInterface } from "~/components/UserInterface";

export default function MapPage() {
  return (
    <MapProvider>
      <UserInterface />
      <Mapbox />
    </MapProvider>
  );
}
