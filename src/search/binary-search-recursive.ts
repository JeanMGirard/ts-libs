import { Compare, DOES_NOT_EXIST } from '../util';
import { defaultCompare } from "../util"
import { quickSort } from '../sorting/quicksort';

function SearchRecursive<T>(
  array: T[],
  value: T,
  low: number,
  high: number,
  compareFn: any = defaultCompare
): number {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      return SearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      return SearchRecursive(array, value, low, mid - 1, compareFn);
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIST;
}

export function binarySearchRecursive<T>(array: T[], value: T, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);
  const low: number = 0;
  const high = sortedArray.length - 1;

  return SearchRecursive(array, value, low, high, compareFn as any);
}
