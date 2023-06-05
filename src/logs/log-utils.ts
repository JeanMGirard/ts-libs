/// <reference  path="../declaration.d.ts"/>
export * from "./logs"
import { __ENV__ } from "../globals"

const writeError = console.error;

export function logError(...errors: Error[] | any[]){
  let showError = true;
  errors.forEach(err => {
    if(err instanceof Error){
      if(err.message.includes("WebSocket")) showError = false;
     // else if(err.name.includes("WebSocket")) showError = false;
    }
    else if(err.toString().includes("sockjs-node")) showError = false;
  });
  if(showError) writeError(...errors);
}

const warn = console.warn;
export function logWarning(...warnings: any){
  let showWarning = true;
  warnings.forEach(warning => {
    if     (warning.includes("UNSAFE_"))    showWarning = false;
    else if(warning.includes("SourceMap"))  showWarning = false;
    else if(warning.includes("DevTools"))   showWarning = false;
  });
  if(showWarning) warn(...warnings);
}

export function DebugLogger() {
  if (__ENV__ === "development")
    return console.log;
  else return (...message) => undefined
}
export const logDebug = DebugLogger();

const info = console.info;
export function logInfo(...args: any){
  args.forEach(arg => {
    if(arg.toString().includes("UNSAFE_")) return;
    if(arg.toString().includes("SourceMap")) return;
  });
  info(...args);
}
