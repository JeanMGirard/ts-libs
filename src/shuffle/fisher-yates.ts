import { swap } from '../arrays';


export function shuffleFisherYates<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }

  return array;
}
