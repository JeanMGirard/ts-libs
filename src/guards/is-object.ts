
export function isObject<O extends {} = {}>(value: any | O): value is O {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}
