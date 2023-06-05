import "debug"



declare global {
  namespace debug {
    export interface Debugger {
      error:   (topic: string, ...args: any)=>void
      warn:    (topic: string, ...args: any)=>void
      warnOnce:    (topic: string, ...args: any)=>void
      info:    (topic: string, ...args: any)=>void
      verbose: (topic: string, ...args: any)=>void
      debug:   (topic: string, ...args: any)=>void
    }
  }
}
