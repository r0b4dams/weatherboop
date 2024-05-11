import {
  OPENWEATHERMAP_APPID,
  OPENWEATHERMAP_CURRENT_URL,
  OPENWEATHERMAP_FORECAST_URL,
  OPENWEATHERMAP_REVERSEGEO_URL,
} from "~/config";

type Coordinates = [number, number];

export async function getData(coords: Coordinates) {
  try {
    const [current, forecast, geo] = await Promise.all([
      getCurrentWeather(coords),
      getFiveDayForecast(coords),
      getReverseGeo(coords),
    ]);
    return {
      current,
      forecast,
      geo,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentWeather([lng, lat]: Coordinates) {
  const params = createSearchParams({ lat, lon: lng });
  const url = `${OPENWEATHERMAP_CURRENT_URL}?${params}`;
  return fetch(url).then((res) => res.json());
}

async function getFiveDayForecast([lng, lat]: Coordinates) {
  const params = createSearchParams({ lat, lon: lng });
  const url = `${OPENWEATHERMAP_FORECAST_URL}?${params}`;
  return fetch(url).then((res) => res.json());
}

async function getReverseGeo([lng, lat]: Coordinates) {
  const params = createSearchParams({ lat, lon: lng });
  const url = `${OPENWEATHERMAP_REVERSEGEO_URL}?${params}`;
  return fetch(url).then((res) => res.json());
}

function createSearchParams(paramsObj: Record<string, unknown>) {
  const searchParams = new URLSearchParams({
    ...paramsObj,
    appid: OPENWEATHERMAP_APPID,
  });
  return searchParams.toString();
}
