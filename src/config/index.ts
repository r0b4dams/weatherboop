import * as dotenv from "dotenv";

dotenv.config();

const normalizePort = (port: any) => {
  if (typeof port === "number") {
    return port;
  }
  const result = parseInt(port);
  return Number.isNaN(result) ? null : result;
};

export const CONFIG = {
  PORT: normalizePort(process.env.PORT) ?? 3002,
};
