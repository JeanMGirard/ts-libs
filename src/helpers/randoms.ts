let allLetters = 'abcdefghijklmnopqrstuvwxyz'

export const random_letter = (characters: string=allLetters, randomUpperCase=false) => {
  let char = characters.charAt(Math.floor(Math.random() * characters.length));
  if(randomUpperCase && random_boolean()) char = char.toUpperCase()
  return char
}
export const random_boolean = () => (Math.random() >= 0.5);
export const random_between = (start: number, end: number) => Math.floor(Math.random() * end) + start;
export const random_subArray = (arr: any[], n: number) => {
  let result = new Array<any>(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function randomOf<T=any>(options: T[]=[]): T{
  if(options.length === 0) return undefined;
  else return options[randomBetween(0, options.length - 1)]
}
export function randomBetween(min: number, max: number, decimals = 0): number{
  return Math.floor((Math.random() * (max - min + 1))) + min;
}
export function randomInArray<T=any>(array: T[]=[]): T{
  return array[Math.floor(Math.random() * array.length)]
}
