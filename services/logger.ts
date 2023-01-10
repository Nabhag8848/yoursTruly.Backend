import dotenv from "dotenv";
dotenv.config();
import { LogtailTransport } from "@logtail/winston";
import { Logtail } from "@logtail/node";
import { createLogger, format, transports, level } from "winston";
const { combine, timestamp, json, cli, errors } = format;
const { Console } = transports;
const LogtailSourceToken: string = process.env.LOGTAIL_SOURCE_TOKEN as string;
const logtail = new Logtail(LogtailSourceToken);
const logTailTransport = new LogtailTransport(logtail);
const consoleTransport = new Console();
const consoleTransportForHandlers = new Console({
  consoleWarnLevels: ["error"],
});

const loglevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const logger = createLogger({
  levels: loglevels,
  level: process.env.LOG_LEVEL || "info",
  transports: [consoleTransport, logTailTransport],
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    cli()
  ),
  exceptionHandlers: [consoleTransportForHandlers, logTailTransport],
  rejectionHandlers: [consoleTransportForHandlers, logTailTransport],
});
