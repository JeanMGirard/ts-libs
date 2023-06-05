
export const replaceAll = (str: string, replace: string, replaceWith: string) => str.split(replace).join(replaceWith)
/**
 * @example let newString = replaceMap('multiple.to_replace', {  '.': '-', '_': '-' })
 * @param str
 * @param replaceMap
 */
export const replaceMap = (str: string, replaceMap: { [initial: string]: string }) => {
  let newStr = str;
  Object.keys(replaceMap).forEach(replace => { newStr = replaceAll(newStr, replace, replaceMap[replace]) })
  return newStr
}
