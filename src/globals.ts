// import _configs from "vars/_configs";


// let configs: any = typeof globalThis !== "undefined" ? globalThis : {}
// if(typeof globalThis !== "undefined" && globalThis.env) configs = globalThis.env;

let __ENV__: string;
let __DEV__: boolean;
let __PROD__ : boolean;
let __DEBUG__: boolean;

if(typeof window !== "undefined"){
  __ENV__ = (window as any).__ENV__ || "production"
  __DEV__ = (window as any).__DEV__
  __PROD__ = (window as any).__PROD__
  __DEBUG__ = (window as any).__DEBUG__
}
else if(typeof process !== "undefined"){
  __ENV__ = process.env?.NODE_ENV || "production"
  __DEBUG__ = !!process.env.DEBUG;
}

if(__ENV__){
  __DEV__ = __DEV__ ?? __ENV__ === "development";
  __PROD__ = !__DEV__;
  __DEBUG__ = !!__DEBUG__;
}



export {
  __ENV__,
  __DEV__,
  __PROD__,
  __DEBUG__
}
