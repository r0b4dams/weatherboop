import { type FC } from "react";

interface SidebarProps {
  lng: string;
  lat: string;
  zoom: string;
}

export const Sidebar: FC<SidebarProps> = ({ lng, lat, zoom }) => {
  return (
    <div className="absolute w-[150px] z-10 bg-slate-900 text-slate-100 rounded-br-lg">
      <p>Longitude: {lng}</p>
      <p>Latitude: {lat}</p>
      <p>Zoom: {zoom}</p>
    </div>
  );
};
