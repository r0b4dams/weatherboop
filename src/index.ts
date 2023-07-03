import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import { createServer } from "vite";

import { CONFIG } from "./config";
import { api } from "./api";

// example
// https://github.com/vitejs/vite-plugin-react/blob/main/playground/ssr-react/server.js

const DEV_ENTRY = path.join(__dirname, "entry-server.tsx");

(async () => {
  const app = express();

  const vite = await createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });

  app.use(vite.middlewares);
  app.use(express.json());
  app.use(compression());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/api", api);

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const ctx = { url: "" };

      const { render } = await vite.ssrLoadModule(DEV_ENTRY); // entry-server
      const indexHtml = fs.readFileSync("index.html", "utf-8");
      const template = await vite.transformIndexHtml(url, indexHtml);
      const appHtml = template.replace(`<!--app-->`, await render(url, ctx));

      if (ctx.url) {
        res.redirect(301, ctx.url);
        return;
      }
      res.status(200).set({ "Content-Type": "text/html" }).send(appHtml);
    } catch (err) {
      if (err instanceof Error) {
        vite.ssrFixStacktrace(err);
        console.log(err.stack);
      }
      next(err);
    }
  });

  app.listen(CONFIG.PORT, "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${CONFIG.PORT}`);
  });
})();
