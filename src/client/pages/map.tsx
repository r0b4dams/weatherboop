import { Mapbox } from "../components";
import { Weather } from "../components/Weather";
import { useAppContext } from "../store";

if (!import.meta.env.SSR) {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
}

export default function Map() {
  const { state } = useAppContext();

  return (
    <>
      <Mapbox />
      {state.weather && <Weather data={state.weather} />}
    </>
  );
}
