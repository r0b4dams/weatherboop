import { Router } from "express";

const router = Router();

router.get("/hello", (req, res, next) => {
  try {
    res.json({ msg: "hello, world" });
  } catch (err) {
    next(err);
  }
});

export { router as api };
