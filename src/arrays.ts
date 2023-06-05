/**
 * @version 1.0
 */
import {isArray} from "./guards";
import { compareAttrib } from "./sorting/sort-by-attrib"


export * from "./sorting/sort-by-attrib"
export * from "./sorting/sort-by-position"



export function toArray<T=any>(data: T | T[]){
    return data ? (Array.isArray(data) ? data : [data]) : []
}
export function toFlatArray<T=any>(array: T[][]): T[]{
    return [].concat.apply([], array);
}
export function toChunks<T=any, F=T>(data: T[], chunkSize: number): T[][]
export function toChunks<T=any, F=T>(data: T[], chunkSize: number, fill?: F): (T|F)[][] {
    let base: (T|F)[] = data;
    let R = [];

    if(typeof fill !== "undefined"){
        const append = chunkSize - (base.length % chunkSize);
        if(append !== chunkSize)
            for (let a = 0; a < append; a++) base.push(fill);
    }

    for (let i = 0; i < base.length; i += chunkSize)
        R.push(base.slice(i, i + chunkSize));

    return R;
}

export function moveItemInList<T=any>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
export function InsertInList<T=any>(list: T[], item: T, index): T[] {
    const result = Array.from(list);
    result.splice(index, 0, item);
    return result;
}
export function createArrayOf<T=any>(length: number=0, fill: (() => T)|T = null):T[] {
    let arr1 = [fill];
    let arr2 = [];
    while (length > 0) {
        if (length & 1) arr2 = arr2.concat(arr1);
        arr1 = arr1.concat(arr1);
        length >>>= 1;
    }
    return typeof fill === 'function' ? arr2.map(a => a()) : arr2;
}
export function cleanArray<T=any>(data: T[]=[]): T[] {
    return data.filter(d => !!d);
}
// console.log(getUnique(arr,'id'));

function onlyUnique(value, index, self) {  return self.indexOf(value) === index; }
export function getDistinct<T=any>(list: T[], attrib?: keyof T): T[] {
    if(!attrib) return list.filter( onlyUnique );
    else return getDistinctValues(list, attrib)
}
export function getDistinctValues<T=any>(list: T[], attribute: keyof T | null = null): T[] {
    const results = [];
    for (let i = 0; i < list.length; i++) {
        if (attribute && !results.includes(list[i][attribute]))
            results.push(list[i][attribute]);
        else if (!attribute && !results.includes(list[i])) results.push(list[i]);
    }
    return results;
}
/**
 * Same as getDistinct but for a list of objects according to a propriety
 * @param arr
 * @param propriety
 */
export function getUniques<T=any>(arr: T[], propriety: string) {
    // store the comparison  values in array
    return arr.map(e => e[propriety])
        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the false indexes & return unique objects
        .filter((e) => arr[e]).map(e => arr[e]);
}
export function getFirst<T=any>(arr: T[]): T {
    return isArray(arr) ? arr[0] : undefined
}
export function getLast<T=any>(arr: T[]): T {
    return isArray(arr) ? arr[arr.length - 1] : undefined
}
export function swap<O=any>(array: O[], a: number, b: number): O[] {
    /* const temp = array[a];
    array[a] = array[b];
    array[b] = temp; */
    [array[a], array[b]] = [array[b], array[a]];
    return array
}


export const createGroupBy = <T=any, K extends keyof T = any>(key: K) => <T>(array: T[]): { [attr: string]: T[] } => array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key as string];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
}, {});
export const createSortBy = (attrib: string) => (list: any[]) => list.sort((a1, a2) => compareAttrib(attrib, a1, a2))


// export function attributeSort(attrib: string){ }




/**
 * @deprecated use createGroupBy instead
 */
export const groupBy = createGroupBy
