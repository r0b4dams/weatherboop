// https://github.com/vitejs/vite-plugin-react/blob/main/playground/ssr-react/server.js
import "dotenv/config";

import fs from "fs/promises";
import url from "url";
import path from "path";
import express from "express";

import { api } from "./api";
import { logger } from "./middleware";
import { type RequestHandler } from "express";
import { type Connect } from "vite";

const PRODUCTION = process.env.NODE_ENV === "production";
const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const SERVER_ENTRY = path.join(DIRNAME, `entry-server`);

console.log({
  NODE_ENV: process.env.NODE_ENV,
  PRODUCTION,
  DIRNAME,
  SERVER_ENTRY,
});

(async () => {
  const app = express();
  const { render, middlewares } = await init();

  if (!PRODUCTION) {
    app.use(middlewares!);
    app.use(logger);
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(DIRNAME, "public")));
  app.use("/api", api);
  app.use(render);

  app.listen(3002, () => {
    console.log(`App is listening on http://localhost:${3002}`);
  });
})();

interface Init {
  render: RequestHandler;
  middlewares?: Connect.Server;
}

function init() {
  return PRODUCTION ? production() : development();
}

async function development() {
  const vite = await import("vite");

  const { ssrLoadModule, transformIndexHtml, middlewares } = await vite.createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });
  const ssr = await ssrLoadModule(path.join(DIRNAME, "entry-server"));

  const render: RequestHandler = async (req, res, next) => {
    const url = req.originalUrl;
    const ctx = { url: "" };

    const template = await transformIndexHtml(
      url,
      await fs.readFile("index.html", "utf-8"), // always get fresh template in dev
    );
    const html = template.replace(`<!--app-->`, ssr.render(url, ctx));
    if (ctx.url) {
      res.redirect(301, ctx.url);
      return;
    }
    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  };

  return { render, middlewares } as Init;
}

async function production() {
  const ssr = await import("./entry-server");
  const template = await fs.readFile("index.html", "utf-8");

  const render: RequestHandler = async (req, res) => {
    const url = req.originalUrl;
    const ctx = { url: "" };
    const html = template.replace(`<!--app-->`, ssr.render(url));
    if (ctx.url) {
      res.redirect(301, ctx.url);
      return;
    }
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  };

  return { render } as Init;
}
