
/**
 *
 * @param {string} val1
 * @param {string} val2
 * @param {string[]} values
 * @return {number}
 */
export function compareValuePosInList(val1, val2, values=[]) {
    const pos1 = values.findIndex((v) => v === val1);
    const pos2 = values.findIndex((v) => v === val2);
    if (pos1 > pos2) return 1;
    if (pos1 < pos2) return -1;
    return 0;
}



// /**
//  * @deprecated use compareValuePosInList instead
//  */
export function sortByValuePosInList(obj1, obj2, values=[]) {
  return compareValuePosInList(values, obj1, obj2);
}
