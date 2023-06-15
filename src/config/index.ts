import path from "path";

const isProd = process.env.NODE_ENV === "production";
const DEV = path.join(__dirname, "./src/client/entry-server.tsx");
const PROD = path.join(__dirname, "./dist/server/entry-server.js");
const SSR_ENTRY = isProd ? PROD : DEV;

export const CONFIG = {
  PORT: process.env.PORT || 3001,
};
