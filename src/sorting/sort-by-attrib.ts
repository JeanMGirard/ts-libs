

export function compareAttrib(attrib, obj1, obj2) {
  const attrib1 = obj1[attrib];
  const attrib2 = obj2[attrib];
  if (attrib1 < attrib2) return -1;
  if (attrib1 > attrib2) return 1;
  return 0;
}
export function compareBoolAttrib(attrib, obj1, obj2) {
  const attrib1 = obj1[attrib];
  const attrib2 = obj2[attrib];
  if (attrib1 && !attrib2) return 1;
  if (!attrib1 && attrib2) return -1;
  return 0;
}
export function compareStringAttrib(attrib, obj1, obj2) {
  const attrib1 = obj1[attrib]?.toLowerCase();
  const attrib2 = obj2[attrib]?.toLowerCase();
  if (attrib1 < attrib2) return -1;
  if (attrib1 > attrib2) return 1;
  return 0;
}
export function compareAttribAndSub(attrib1, attrib2, obj1, obj2) {
  const attrib1_1 = obj1[attrib1];
  const attrib2_1 = obj2[attrib1];
  const attrib1_2 = obj1[attrib2];
  const attrib2_2 = obj2[attrib2];

  if (attrib1_1 < attrib2_1) return -1;
  if (attrib1_1 > attrib2_1) return 1;
  if (attrib1_2 < attrib2_2) return -1;
  if (attrib1_2 > attrib2_2) return 1;
  return 0;
}



/** ==== Array.sort() ======================= */
/**
 * @deprecated use compareAttrib instead
 */
export function sortByAttrib(attrib, obj1, obj2) {
    return compareAttrib(attrib, obj1, obj2);
}
// /**
//  * @deprecated use compareBoolAttrib instead
//  */
export function sortByBoolAttrib(attrib, obj1, obj2) {
    return compareBoolAttrib(attrib, obj1, obj2);
}
// /**
//  * @deprecated use compareStringAttrib instead
//  */
export function sortByStringAttrib(attrib, obj1, obj2) {
    return compareStringAttrib(attrib, obj1, obj2);
}
// /**
//  * @deprecated use compareAttribAndSub instead
//  */
export function sortByAttribAndSub(attrib1, attrib2, obj1, obj2) {
    return compareAttribAndSub(attrib1, attrib2, obj1, obj2);
}
