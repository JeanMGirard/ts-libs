/// <reference  path="../declaration.d.ts"/>

import debug from "debug";


declare let window: any;
declare let localStorage: any;

export type LogLevel = "error" | "warn" | "info" | "verbose" | "debug";
export type LogColor = 'blue' | 'red' | string;
export type ILogFunction = ((...args: any[]) => void) & {
  [arg: string]: any
  enabled?: boolean
  extend: (topic: string) => ((...args: any[]) => void)
  error: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  warnOnce: (...args: any[]) => void
  verbose: (...args: any[]) => void
}

let LIB_TOPICS = ["sockjs", "thread"]
// let LOG_TOPIC: string = "*" + "," + LIB_TOPICS.map(l => `-${l}*`).join(","); // change this to suit your needs
let LOG_TOPIC: string = "" + LIB_TOPICS.map(l => `-${l}*`).join(","); // change this to suit your needs
let LOG_LEVEL: LogLevel = "info"; // error, warn, info, verbose, or debug
let ToLogOnce: string[] = []

if (typeof localStorage !== "undefined" && localStorage) {
  if(localStorage.getItem("debug")) LOG_TOPIC = localStorage.getItem("debug");
  if(localStorage.getItem("debug:level"))  LOG_LEVEL = localStorage.getItem("debug:level") as LogLevel;
}

const log = {
  error   (topic: string, ...args: any[]) {},
  warn    (topic: string, ...args: any[]) {},
  warnOnce(topic: string, ...args: any[]) {},
  info    (topic: string, ...args: any[]) {},
  verbose (topic: string, ...args: any[]) {},
  debug   (topic: string, ...args: any[]) {}
};

export const logMessage = ( color: string, topic: string,  message: any = "--",  ...rest: any) => {
  const logger = debug(topic);
  logger.color = color;
  logger(message, ...rest);
};
export const createLogger = (topic: string, color?: string): ILogFunction => {
  const logger = debug(topic);
  if(color) logger.color = color;
  logger.info = logger.info || ((...args: any[]) => log.info(topic, ...args))
  logger.verbose = logger.verbose || ((...args: any[]) => log.verbose(topic, ...args))
  logger.warn = logger.warn || ((...args: any[]) => log.warn(topic, ...args))
  logger.warnOnce = logger.warnOnce || ((...args: any[]) => log.warnOnce(topic, ...args))
  logger.error = logger.error || ((...args: any[]) => log.error(topic, ...args))
  return logger as ILogFunction;
}


if (typeof window !== "undefined" && window) (window as any).debug = (topic: string, lvl?: LogLevel, libs = false) => {
    if (lvl && ["error", "warn", "info", "verbose", "debug"].includes(lvl)) LOG_LEVEL = lvl
    LOG_TOPIC = topic + (topic ? "," : "") + (libs ? "" : LIB_TOPICS.map(l => `-${l}*`).join(","))

    if(typeof localStorage !== "undefined"){
      localStorage.setItem("debug", LOG_TOPIC)
      localStorage.setItem("debug:level", LOG_LEVEL)
    }
    return "updated";
}

/*
/* eslint-disable no-fallthrough */
switch (LOG_LEVEL) {
  case "debug":   log.debug = (topic: string, ...args: any) => logMessage("gray", topic, ...args);
  case "verbose": log.verbose = (topic: string, ...args: any) => logMessage("green", topic, ...args);
  case "info":    log.info = (topic: string, ...args: any) => logMessage("blue", topic, ...args);
  case "warn":
    log.warn = (topic: string, ...args: any[]) => logMessage("brown", topic, ...args);
    log.warnOnce = (topic: string, id: string, ...args) => {
      if(ToLogOnce.includes(id)) return;
      ToLogOnce.push(id);
     // console.warn(chalk.yellow(topic), ...args)
    }
  case "error":
  default:        log.error = (topic: string, ...args: any) => logMessage("red", topic, ...args);
}

let initLog = (mess: string) => logMessage("yellow", "debug", mess)

// initLog(" =============================================================================== ")
// initLog(" === Logging '" + LOG_LEVEL + "' & higher for topic(s): '" + LOG_TOPIC + "'" + (" ".repeat(Math.max(0, 33 - LOG_TOPIC.length))))
// initLog(" === To stop seeing this, change 'debug:level' in your localStorage or use  ==== ")
// initLog(" ===   the 'debug(topic, lvl?, libs?)' method.  eg: debug('*', 'error')     ==== ")
// initLog(" =============================================================================== ")

export { log };
