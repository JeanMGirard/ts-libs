import { defaultToString } from '../util';
import { ValuePairLazy } from './models/value-pair-lazy';

export class HashTableLinearProbingLazy<K, V> {
  protected table: { [key: string]: ValuePairLazy<K, V> };

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {};
  }

  private loseloseHashCode(key: K) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key: K) {
    return this.loseloseHashCode(key);
  }

  put(key: K, value: V) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      if (
        this.table[position] == null ||
        (this.table[position] != null && this.table[position].isDeleted)
      ) {
        this.table[position] = new ValuePairLazy(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null && !this.table[position].isDeleted) {
          index++;
        }
        this.table[index] = new ValuePairLazy(key, value);
      }
      return true;
    }
    return false;
  }

  get(key: K) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined;
        }
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        return this.table[position].value;
      }
    }
    return undefined;
  }

  remove(key: K) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true;
        return true;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true;
        return true;
      }
    }
    return false;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    let count = 0;
    Object.values(this.table).forEach(valuePair => {
      count += valuePair.isDeleted === true ? 0 : 1;
    });
    return count;
  }

  clear() {
    this.table = {};
  }

  getTable() {
    return this.table;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
export default HashTableLinearProbingLazy
