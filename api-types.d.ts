namespace OWM {
  interface GeoItem {
    name: string;
    state?: string;
    country: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
  }

  type GeoResponse = GeoItem[];

  interface WeatherItem {
    /** Weather condition id */
    id: number;
    /** Group of weather parameters (Rain, Snow, Clouds etc.)*/
    main: string;
    /** Weather condition within the group.
     *  https://openweathermap.org/weather-conditions
     */
    description: string;
    /** Weather icon id */
    icon: string;
  }

  /**
   * https://openweathermap.org/current#fields_json
   */
  interface WeatherResponse {
    /** Response code */
    cod: number;
    coord: {
      /** Longitude of the location */
      lon: number;
      /** Latitude of the location */
      lat: number;
    };
    weather: WeatherItem[];
    main: {
      /** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
      temp: number;
      /**
       * Temperature. This temperature parameter accounts for the human perception of weather.
       * Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
       */
      feels_like: number;
      // temp_min: number;
      // temp_max: number;

      /** Atmospheric pressure on the sea level, hPa */
      pressure: number;

      /** Humidity, % */
      humidity: number;
    };
    /** Visibility, meter. The maximum value of the visibility is 10 km */
    visibility: number;
    wind: {
      /** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour */
      speed: number;
      /** Wind direction, degrees (meteorological) */
      deg: number;
      /** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour */
      gust?: number;
    };
    clouds: {
      /** Cloudiness, % */
      all: number;
    };
    rain?: {
      /** (where available) Rain volume for the last 1 hour, mm.  */
      "1h"?: number;
      /** (where available) Rain volume for the last 3 hours, mm.  */
      "3h"?: number;
    };
    snow?: {
      /** (where available) Snow volume for the last 1 hour, mm.  */
      "1h"?: number;
      /** (where available)Snow volume for the last 3 hours, mm.  */
      "3h"?: number;
    };
    /** Time of data calculation, unix, UTC  */
    dt: number;
    sys: {
      /** Country code (GB, JP etc.) */
      country: string;
      /** Sunrise time, unix, UTC */
      sunrise: number;
      /** Sunset time, unix, UTC */
      sunset: number;
    };
    /** Shift in seconds from UTC  */
    timezone: number;
  }
}

interface AppLocationResponse {
  name: string;
  state?: string;
  country?: string;
}

interface AppWeatherResponse {
  location: AppLocationResponse;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  weather: (OWM.WeatherItem & { icon_url: string })[];
}
