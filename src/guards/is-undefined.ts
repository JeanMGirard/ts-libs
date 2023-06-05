
export function isNotDefined(x: any): x is undefined { return typeof x === "undefined"; }
export function isDefined(x: any): x is Exclude<any, undefined> { return typeof x !== "undefined"; }
export function isUndefined(x: any): x is undefined { return  typeof x === "undefined"; }
