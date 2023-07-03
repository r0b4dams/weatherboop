import { Router } from "express";
import { weatherRoutes } from "./weather";

const router = Router();
router.use("/weather", weatherRoutes);

export { router as api };
