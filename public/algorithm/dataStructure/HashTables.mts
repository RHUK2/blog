/* eslint-disable @typescript-eslint/no-explicit-any */
class HashTable {
  keyMap: any[];

  constructor(size: number = 4) {
    this.keyMap = new Array(size);
  }

  _hash(key: string) {
    let total = 0;
    const WEIRD_PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  set(key: string, value: any) {
    const index = this._hash(key);

    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        this.keyMap[index][i][1] = value;
        return;
      }
    }

    this.keyMap[index].push([key, value]);
  }

  get(key: string) {
    const index = this._hash(key);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }

    return undefined;
  }

  values() {
    const values: any[] = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!values.includes(this.keyMap[i][j][1])) {
            values.push(this.keyMap[i][j][1]);
          }
        }
      }
    }

    return values;
  }

  keys() {
    const keys: any[] = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          keys.push(this.keyMap[i][j][0]);
        }
      }
    }

    return keys;
  }
}

const hashTables = new HashTable();

hashTables.set('grapes', 10000);
hashTables.set('apples', 54);
hashTables.set('oranges', 2);
hashTables.set('pears', 100);
hashTables.set('pears', 100);

console.log(hashTables.get('grapes'));
console.log(hashTables.get('apples'));
console.log(hashTables.get('oranges'));
console.log(hashTables.get('pears'));

console.log(hashTables.values());

console.log(hashTables.keys());

console.log(hashTables.keyMap);
