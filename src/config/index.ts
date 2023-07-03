import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env)

const IS_PROD = process.env.NODE_ENV === "production";
const DEV = path.join(__dirname, "./src/client/entry-server.tsx");
const PROD = path.join(__dirname, "./dist/server/entry-server.js");
const SSR_ENTRY = IS_PROD ? PROD : DEV;

export const CONFIG = {
  PORT: process.env.PORT || 3001,
};
