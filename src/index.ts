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

const isProd = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 3050;
const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const SSR = path.resolve(DIRNAME, "ssr");

console.log({
  isProd,
  ENV: process.env.NODE_ENV,
  DIRNAME,
  SSR,
});

main();

async function main() {
  try {
    const app = express();
    const { render, middlewares } = await init(isProd);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.resolve(DIRNAME, "client"), { index: false }));
    } else {
      app.use(logger);
      if (middlewares) {
        app.use(middlewares);
      }
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/api", api);
    app.use(render);

    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

function init(prod = false): Promise<{
  render: RequestHandler;
  middlewares?: Connect.Server;
}> {
  return prod ? production() : development();
}

/**
 *
 * @returns a render RequestHandler
 */
async function production() {
  const ssr = await import("./ssr");
  const template = await fs.readFile(path.join(DIRNAME, "client", "index.html"), "utf-8");

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

  return { render };
}

/**
 * setup a vite dev server
 * @returns object containing a render RequestHandler and vite dev middleware
 */
async function development() {
  const vite = await import("vite");

  const { ssrLoadModule, transformIndexHtml, middlewares } = await vite.createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });

  const ssr = await ssrLoadModule(path.resolve(DIRNAME, "ssr"));

  const render: RequestHandler = async (req, res) => {
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

  return { render, middlewares };
}
