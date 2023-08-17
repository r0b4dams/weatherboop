import { Router } from "express";

const router = Router();

const query_config = {
  appid: process.env.OPENWEATHERMAP_KEY,
  units: "imperial",
};

const buildQueryParams = ({ lat, lon }: { [key: string]: unknown }) => {
  return Object.entries({
    ...query_config,
    lat,
    lon,
  }).reduce((acc, param, i) => {
    if (i === 0) {
      return "?" + param.join("=");
    }
    return acc + "&" + param.join("=");
  }, "");
};

// /api/weather
router.get("/", async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params = buildQueryParams({ lat, lon });
    const response = await fetch(url + params);
    const data = await response.json();
    if (!data) {
      throw new Error("no data found");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export { router as weatherRoutes };
