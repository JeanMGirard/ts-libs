

// export function isObject(x: any): x is object { return typeof x === "object"; }
export function isNull(x: any): x is null { return x === null; }
export function isString(x: any): x is string { return typeof x === "string"; }
export function isBoolean(x: any): x is boolean { return typeof x === "boolean"; }
export function isFunction(x: any): x is Function { return typeof x === "function"; }
export function isSymbol(x: any): x is symbol { return typeof x === "symbol"; }
