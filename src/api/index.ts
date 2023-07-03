import { Router } from "express";

const router = Router();

const apikey = "fe40caaf410f6ac1e2f9c09b8ee35df8";

// /api/weather
router.get("/weather", async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    const url = "https://api.openweathermap.org/data/2.5/onecall";
    const params = `?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
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

export { router as api };
