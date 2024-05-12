import { type FC } from "react";
import NextImage from "next/image";

interface PopupProps {
  lng: number;
  lat: number;
  current: any;
  geo: any;
}

const fmt = (n: number, digits = 2) => {
  return n.toFixed(digits);
};

export const Popup: FC<PopupProps> = ({ lng, lat, current, geo }) => {
  // console.log(geo);
  console.log(current);

  const location = [];

  if (geo.length > 0) {
    const { name, state, country } = geo[0];
    if (name) {
      location.push(name);
    }
    if (state && state !== name) {
      location.push(state);
    }
    if (country) {
      location.push(country);
    }
  }

  return (
    <div className="p-2 border-2 border-slate-100 rounded-lg backdrop-blur-lg">
      {geo.length > 0 && <p>{location.join(", ")}</p>}

      <p>Latitude: {fmt(lat)}</p>
      <p>Longitude: {fmt(lng)}</p>

      {current.weather.map((w: any) => (
        <div key={w.id}>
          <NextImage
            width={48}
            height={48}
            src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
            alt={w.description}
            className="m-auto"
          />
          <p>{w.description}</p>
        </div>
      ))}
    </div>
  );
};
