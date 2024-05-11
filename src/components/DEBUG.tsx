import { type FC } from "react";

interface DEBUG_PROPS {
  lng: number;
  lat: number;
  zoom: number;
}

const format = (n: number, digits = 2) => {
  return n.toFixed(digits);
};

export const DEBUG: FC<DEBUG_PROPS> = ({ lng, lat, zoom }) => {
  return (
    <div className="absolute w-[150px] bg-slate-900 text-slate-100 rounded-br-lg">
      <p className="my-2">DEBUG</p>
      <p>Longitude: {format(lng)}</p>
      <p>Latitude: {format(lat)}</p>
      <p>Zoom: {format(zoom)}</p>
    </div>
  );
};
