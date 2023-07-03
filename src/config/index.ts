import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env);

export const CONFIG = {
  PORT: Number(process.env.PORT) || 3002,
};
