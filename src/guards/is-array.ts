
export function isArray<T=any>(x: T|T[]): x is Array<T> { return Array.isArray(x) }
export function isNotArray<T=any>(x: T|T[]): x is T { return !Array.isArray(x) }
