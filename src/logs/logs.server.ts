/// <reference  path="../declaration.d.ts"/>

import debug from "debug";


export type LogLevel = "error" | "warn" | "info" | "verbose" | "debug";
export type LogColor = 'blue' | 'red' | string;

declare let process: any;

let LIB_TOPICS = ["sockjs", "thread"]
// let LOG_TOPIC: string = "*" + "," + LIB_TOPICS.map(l => `-${l}*`).join(","); // change this to suit your needs
let LOG_TOPIC: string = "" + LIB_TOPICS.map(l => `-${l}*`).join(","); // change this to suit your needs
let LOG_LEVEL: string = "info"; // error, warn, info, verbose, or debug


const log = {
  error   (topic: string, ...args: any) {},
  warn    (topic: string, ...args: any) {},
  info    (topic: string, ...args: any) {},
  verbose (topic: string, ...args: any) {},
  debug   (topic: string, ...args: any) {}
};

export const logMessage = ( color: string, topic: string,  message: any = "--",  ...rest: any) => {
  const logger = debug(topic);
  logger.color = color;
  logger(message, ...rest);
};
export const createLogger = (topic: string, color?: string) => {
  const logger = debug(topic);
  if(color) logger.color = color;
  return logger;
}

switch (LOG_LEVEL) {
  case "debug":   log.debug = (topic: string, ...args: any) => logMessage("gray", topic, ...args);
  case "verbose": log.verbose = (topic: string, ...args: any) => logMessage("green", topic, ...args);
  case "info":    log.info = (topic: string, ...args: any) => logMessage("blue", topic, ...args);
  case "warn":    log.warn = (topic: string, ...args: any) => logMessage("brown", topic, ...args);
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

const writeError = log.error;
export function logError(...errors: Error[] | any[]){
  let showError = true;
  errors.forEach(err => {
    if(err instanceof Error){
      if(err.message.includes("WebSocket")) showError = false;
     // else if(err.name.includes("WebSocket")) showError = false;
    }
    else if(err.toString().includes("sockjs-node")) showError = false;
  });
  if(showError) writeError("ERROR", ...errors);
}

const warn = log.warn;
export function logWarning(...warnings: any){
  let showWarning = true;
  warnings.forEach(warning => {
    if     (warning.includes("UNSAFE_"))    showWarning = false;
    else if(warning.includes("SourceMap"))  showWarning = false;
    else if(warning.includes("DevTools"))   showWarning = false;
  });
  if(showWarning) warn("WARN", ...warnings);
}

export function DebugLogger() {
  if(typeof process !== "object") return;
  if ((process as any).env.NODE_ENV === "development")
    return log.debug;
  else return (...message) => undefined
}
export const logDebug = DebugLogger();

const info = log.info;
export function logInfo(...args: any){
  args.forEach(arg => {
    if(arg.toString().includes("UNSAFE_")) return;
    if(arg.toString().includes("SourceMap")) return;
  });
  info("INFO", ...args);
}
