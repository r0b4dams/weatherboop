import { Mapbox, Sidebar } from "../components";

if (!import.meta.env.SSR) {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
}

export default function Map() {
  return (
    <>
      <Sidebar />
      <Mapbox />
    </>
  );
}
