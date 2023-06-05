
export function isNumberLike(x: any): x is number { return !isNaN(x) && x !== null; }
