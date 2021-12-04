import { Variables } from "./variables";

export function createLogger(category: string){
  return function logger(level: typeof Variables.logLevel, ...message: string[]){
    log(level, `[${category}]`, ...message)
  }
}

export function log(level: typeof Variables.logLevel, ...message: string[]) {
  if (Variables.logLevel == "None") return;
  if (level == "Debug" && Variables.logLevel == "Debug")
    console.log(`(dbg) ${message.join(",")}`);
  else if (
    level == "Warn" &&
    (Variables.logLevel == "Warn" || Variables.logLevel == "Debug")
  )
    console.log(`(wrn) ${message.join(",")}`);
}

export const logDbg = log.bind(null, "Debug")
export const logWrn = log.bind(null, "Warn")