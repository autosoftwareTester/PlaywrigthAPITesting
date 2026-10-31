import { error, info, trace, warn } from "node:console";
import pino from "pino";
import pinoHttp from "pino-http";

// Configure the main logger instance for general app logging
const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      destination: 1,
      colorize: true,
      levelFirst: true,
      messageFormat: `{msg}`,
      ignore: "pid,hostname",
      customeLevels: { error: 50, warn: 40, info, debug: 20, trace: 10 },
      customColors: "error:red,warn:yellow,info:green,debug:blue,trace:magenta",
    },
  },
});

// Configure an HTTP logger instance for incoming HTTTP request/response
const httpLogger = pinoHttp({
  logger: logger,
  customLogLevel: (res, err) => {
    if (res.statusCode && res.statusCode >= 400 && res.statusCode < 500)
      return "warn";
    if ((res.statusCode && res.statusCode >= 500) || err) return "error";
    return "info";
  },
});

export { logger, httpLogger };
