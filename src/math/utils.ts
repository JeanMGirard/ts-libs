export const SUM = (arr: number[]) => arr.reduce((a, b) => (a+b), 0)
export const MIN_MAX = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max))

export function seconds(x=1) { return isNaN(x) ? NaN : Number(x) * 1000 }
export function minutes(x=1) { return isNaN(x) ? NaN : Number(x) * 60 * 1000 }
export function hours  (x=1) { return isNaN(x) ? NaN : Number(x) * 60 * 60 * 1000 }
export function days   (x=1) { return isNaN(x) ? NaN : Number(x) * 24 * 60 * 60 * 1000 }
export function weeks  (x=1) { return isNaN(x) ? NaN : Number(x) * 7 * 24 * 60 * 60 * 1000 }

