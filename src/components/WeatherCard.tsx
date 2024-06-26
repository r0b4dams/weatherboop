import Image from "next/image";

import { Card, CardContent, CardTitle } from "./ui/card";
import { CardArrow } from "./CardArrow";
import { type Units } from "~/lib/schema";
import { TEMP_UNITS } from "~/lib/utils";

function getIconLink(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function getTempUnitSymbol(units: Units = "standard") {
  return TEMP_UNITS[units];
}

interface WeatherCardProps {
  units?: Units;
  temp: number;
  humidity: number;
  pressure: number;
  weather: OWM.WeatherItem[];
}

export function WeatherCard(props: WeatherCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Card className="border-0 w-fit">
        {/* <CardTitle className="p-2 pb-0">boop!</CardTitle> */}
        <CardContent className="p-2 pt-0">
          {props.weather.map((w: any) => (
            <div key={w.id} className="flex items-center">
              <Image
                width={24}
                height={24}
                src={getIconLink(w.icon)}
                alt={w.description}
              />
              <p className="">{w.description}</p>
            </div>
          ))}
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              src="/svg/wi-thermometer.svg"
              alt="thermometer icon"
            />
            <p>
              {props.temp}{" "}
              <span className="font-thin">{getTempUnitSymbol(props.units)}</span>
            </p>
          </div>
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              src="/svg/wi-humidity.svg"
              alt="humidity icon"
            />
            <p>
              {props.humidity} <span className="font-thin">%</span>
            </p>
          </div>
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              src="/svg/wi-barometer.svg"
              alt="barometer icon"
            />
            <p>
              {props.pressure} <span className="font-thin">hPa</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <CardArrow />
    </div>
  );
}
