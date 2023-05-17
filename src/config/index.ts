import path from "path";

const isProd = process.env.NODE_ENV === "production";
const DEV = path.join(__dirname, "./src/client/entry-server.tsx");
const PROD = path.join(__dirname, "./dist/server/entry-server.js");
const SSR_ENTRY = isProd ? PROD : DEV;

export const CONFIG = {
  PORT: process.env.PORT || 3001,
  MAPBOX_PK:
    "pk.eyJ1IjoiY29tYXRvc2lubyIsImEiOiJjbDFyeW5lNngwYnhwM2NybDhuM2hoOHdtIn0.1lW0Js4LKuMX1SFCzP5J5w",
};
