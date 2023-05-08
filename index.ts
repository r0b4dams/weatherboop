import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer } from "vite";

// example
// https://github.com/vitejs/vite-plugin-react/blob/main/playground/ssr-react/server.js

const resolve = (p: string) => path.resolve(__dirname, p);

const port = process.env.PORT || 7456;
const isProd = process.env.NODE_ENV === "production";
const DEV = path.join(__dirname, "./src/client/entry-server.tsx");
const PROD = path.join(__dirname, "./dist/server/entry-server.js");
const SSR_ENTRY = isProd ? PROD : DEV;

const indexHtml = fs.readFileSync(
  isProd ? resolve("dist/client/index.html") : resolve("index.html"),
  "utf-8",
);

(async () => {
  const app = express();

  const vite = await createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
  app.use(compression());

  if (isProd) {
    app.use(serveStatic(resolve("dist/client"), { index: false }));
  }

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const { render } = await vite.ssrLoadModule(SSR_ENTRY);
      const template = await vite.transformIndexHtml(url, indexHtml);
      const ctx = { url: "" };
      const appHtml = template.replace(`<!--app-->`, await render(url, ctx));

      // <Redirect> rendered
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

  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
})();
