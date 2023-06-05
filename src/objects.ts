


export function toDefinedAttrib(obj: any, attrib: string){
  definedAttrib.bind(obj).call(attrib)
}
export function definedAttrib(attrib: string){
  return this[attrib] || this;
}
export function getObjectNestedKeys(obj: any, prefix = ''){
  return Object.entries(obj).reduce((collector, [key, val]) => {
    // To get all the keys, event with children, always add the current key to the array
    // not only when we don't go in the condition.
    // Add the next line to the newKeys array and remove the push before the return not in the
    // next IF condition
    // prefix ? `${prefix}.${key}` : key
    const newKeys: string[] = [...collector]
    if (Object.prototype.toString.call(val) === '[object Object]') {
      const newPrefix = prefix ? `${prefix}.${key}` : key
      const otherKeys = getObjectNestedKeys(val, newPrefix)
      return [...newKeys, ...otherKeys]
    }
    newKeys.push(prefix ? `${prefix}.${key}` : key)

    // Gets arrays
    if(Array.isArray(val)) for(let i=0; i<Math.min(4, val.length); i++)
      newKeys.push(prefix ? `${prefix}.${key}[${i}]` : `${key}[${i}]`)

    return newKeys
  }, [])
}
export function clean<T=any>(obj: T, keepNulls=false): T {
  return obj ? Object.assign({},
    ...(Object.keys(obj)
        .filter(k => (typeof obj[k] !== "undefined" && (!keepNulls ||  obj[k]!==null)))
        .map(k => ({ [k]: obj[k] }))  as any)
  ) : obj
}
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}
