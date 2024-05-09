import { type FC } from "react";

interface DEBUGGER_PROPS {
  lng: string;
  lat: string;
  zoom: string;
}

export const DEBUGGER: FC<DEBUGGER_PROPS> = ({ lng, lat, zoom }) => {
  return (
    <div className="absolute w-[150px] bg-slate-900 text-slate-100 rounded-br-lg">
      <p>DEBUG</p>
      <p>Longitude: {lng}</p>
      <p>Latitude: {lat}</p>
      <p>Zoom: {zoom}</p>
    </div>
  );
};
