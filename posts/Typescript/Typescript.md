# Typescript

- [Typescript](#typescript)
  - [Cheatsheet](#cheatsheet)
  - [.d.ts](#dts)
    - [선언 방식의 차이](#선언-방식의-차이)
  - [One Line Short Snippets](#one-line-short-snippets)
    - [Array one liners](#array-one-liners)
      - [Check if an array is empty](#check-if-an-array-is-empty)
      - [Clone an array](#clone-an-array)
      - [Compare two arrays](#compare-two-arrays)
      - [Convert an array of objects to a single object](#convert-an-array-of-objects-to-a-single-object)
      - [Convert an array of strings to numbers](#convert-an-array-of-strings-to-numbers)
      - [Count by the properties of an array of objects](#count-by-the-properties-of-an-array-of-objects)
      - [Count the occurrences of a value in an array](#count-the-occurrences-of-a-value-in-an-array)
      - [Count the occurrences of array elements](#count-the-occurrences-of-array-elements)
      - [Create an array of cumulative sum](#create-an-array-of-cumulative-sum)
      - [Create an array of numbers in the given range](#create-an-array-of-numbers-in-the-given-range)
      - [Find the closest number from an array](#find-the-closest-number-from-an-array)
      - [Find the index of the last matching item of an array](#find-the-index-of-the-last-matching-item-of-an-array)
      - [Find the index of the maximum item of an array](#find-the-index-of-the-maximum-item-of-an-array)
      - [Find the index of the minimum item of an array](#find-the-index-of-the-minimum-item-of-an-array)
      - [Find the length of the longest string in an array](#find-the-length-of-the-longest-string-in-an-array)
      - [Find the maximum item of an array by given key](#find-the-maximum-item-of-an-array-by-given-key)
      - [Find the maximum item of an array](#find-the-maximum-item-of-an-array)
      - [Find the minimum item of an array by given key](#find-the-minimum-item-of-an-array-by-given-key)
      - [Find the minimum item of an array](#find-the-minimum-item-of-an-array)
      - [Get all arrays of consecutive elements](#get-all-arrays-of-consecutive-elements)
      - [Get all n-th items of an array](#get-all-n-th-items-of-an-array)
      - [Get indices of a value in an array](#get-indices-of-a-value-in-an-array)
      - [Get the average of an array](#get-the-average-of-an-array)
      - [Get the intersection of arrays](#get-the-intersection-of-arrays)
      - [Get the rank of an array of numbers](#get-the-rank-of-an-array-of-numbers)
      - [Get the sum of an array of numbers](#get-the-sum-of-an-array-of-numbers)
      - [Get the unique values of an array](#get-the-unique-values-of-an-array)
      - [Get union of arrays](#get-union-of-arrays)
      - [Group an array of objects by a key](#group-an-array-of-objects-by-a-key)
      - [Intersperse element between elements](#intersperse-element-between-elements)
      - [Merge two arrays](#merge-two-arrays)
      - [Partition an array based on a condition](#partition-an-array-based-on-a-condition)
      - [Remove duplicate values in an array](#remove-duplicate-values-in-an-array)
      - [Remove falsy values from array](#remove-falsy-values-from-array)
      - [Repeat an array](#repeat-an-array)
      - [Shuffle an array](#shuffle-an-array)
      - [Sort an array of items by given key](#sort-an-array-of-items-by-given-key)
      - [Split an array into chunks](#split-an-array-into-chunks)
      - [Swap the rows and columns of a matrix](#swap-the-rows-and-columns-of-a-matrix)
      - [Swap two array items](#swap-two-array-items)

## Cheatsheet

![TypeScript_Types](TypeScript_Types.png)
![TypeScript_Interfaces](TypeScript_Interfaces.png)
![TypeScript_Control_Flow_Analysis](TypeScript_Control_Flow_Analysis.png)
![TypeScript_Classes](TypeScript_Classes.png)

## .d.ts

타입스크립트로 어플리케이션을 작성할 때 기존 자바스크립트만으로 구성된 라이브러리를 사용할 경우 타입이 필요하다고 에러를 뿜을 것이다. 자바스크립트 이후에 타입스크립트가 탄생하면서 자바스크립트만으로 구성된 라이브러리에게는 타입이 없기 때문에 타입을 작성해주어야 했다.

위에 말한 기능을 제공하는 것이 `.d.ts` 파일이다. 해당 파일은 기존 자바스크립트 파일을 굳이 `.ts`로 바꿔서 재작성할 필요가 없이 `.d.ts` 파일에 타입 정의만 작성해서 추가하면 타입스크립트가 타입을 인식하고 오류를 뿜지 않는다.

`.ts` 파일은 표준 타입스크립트 파일로 타입스크립트 컴파일러에 의해 일반 자바스크립트 문법으로 변환되지만 `.d.ts` 파일은 타입스크립트 컴파일러에서 참조만 할 뿐 컴파일 결과물에 포함되지 않는다.

### 선언 방식의 차이

| .ts                          | .d.ts                                 |
| ---------------------------- | ------------------------------------- |
| var a = 1                    | declare var a: number                 |
| let a = 1                    | declare let a: number                 |
| const a = 1                  | declare const : 1                     |
| function a(b) { ... }        | declare function a(b: number): string |
| class A { b() { return 3 } } | declare class A { b() : number }      |
| namespace A { }              | declare namespace A {}                |
| type A = number              | type A = number                       |
| interface A { b?: string }   | interface A { b?: string }            |

## One Line Short Snippets

### Array one liners

#### Check if an array is empty

```ts
export const isEmpty = <T>(arr: T[]): boolean => Array.isArray(arr) && !arr.length;
// isEmpty([]); // true
// isEmpty([1, 2, 3]); // false
```

#### Clone an array

```ts
export const clone = <T>(arr: T[]): T[] => [...arr];
// clone([1,2,3]); // [1,2,3]
```

#### Compare two arrays

```ts
export const isEqual = <T>(a: T[], b: T[]): boolean => JSON.stringify(a) === JSON.stringify(b);
// isEqual([1, 2, 3], [1, 2, 3]); // true
// isEqual([1, 2, 3], [1, '2', 3]); // false
```

#### Convert an array of objects to a single object

```ts
export const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> =>
  arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});
// toObject(
// [
// { id: '1', name: 'Alpha', gender: 'Male' },
// { id: '2', name: 'Bravo', gender: 'Male' },
// { id: '3', name: 'Charlie', gender: 'Female' },
// ],
// 'id'
// );
// {
// '1': { id: '1', name: 'Alpha', gender: 'Male' },
// '2': { id: '2', name: 'Bravo', gender: 'Male' },
// '3': { id: '3', name: 'Charlie', gender: 'Female' },
// }
```

#### Convert an array of strings to numbers

```ts
export const toNumbers = (arr: string[]): number[] => arr.map(Number);
// toNumbers(['2', '3', '4']); // [2, 3, 4]
```

#### Count by the properties of an array of objects

```ts
export const countBy = <T extends Record<string, string>, K extends keyof T>(
  arr: T[],
  prop: K,
): Record<string, number> =>
  arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {} as Record<string, number>);
// countBy(
// [
// { branch: 'audi', model: 'q8', year: '2019' },
// { branch: 'audi', model: 'rs7', year: '2020' },
// { branch: 'ford', model: 'mustang', year: '2019' },
// { branch: 'ford', model: 'explorer', year: '2020' },
// { branch: 'bmw', model: 'x7', year: '2020' }
// ],
// 'branch'
// );
// { 'audi': 2, 'ford': 2, 'bmw': 1 }
```

#### Count the occurrences of a value in an array

```ts
export const countOccurrences = <T>(arr: T[], val: T): number => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// countOccurrences([2, 1, 3, 3, 2, 3], 2); // 2
```

#### Count the occurrences of array elements

```ts
export const countOccurrencesElements = <T extends string | number>(arr: T[]): Record<T, number> =>
  arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {} as Record<T, number>);
// countOccurrencesElements([2, 1, 3, 3, 2, 3]); // { '1': 1, '2': 2, '3': 3 }
```

#### Create an array of cumulative sum

```ts
export const accumulate = (arr: number[]): number[] =>
  arr.reduce((a, b, i) => (i === 0 ? [b] : [...a, b + a[i #### 1]]), [0]);
// accumulate([1, 2, 3, 4]); // [1, 3, 6, 10]
```

#### Create an array of numbers in the given range

```ts
export const range = (min: number, max: number): number[] => [...Array(max #### min + 1).keys()].map((i) => i + min);
// range(5, 10); // [5, 6, 7, 8, 9, 10]
```

#### Find the closest number from an array

```ts
export const closest = (arr: number[], n: number): number => arr.sort((a, b) => Math.abs(a - n) - Math.abs(b - n))[0];
// closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50); // 33
```

#### Find the index of the last matching item of an array

```ts
export const lastIndex = <T>(arr: T[], predicate: (a: T) => boolean): number =>
  arr.map((item) => predicate(item)).lastIndexOf(true);
// lastIndex([1, 3, 5, 7, 9, 2, 4, 6, 8], (i) => i % 2 === 1); // 4
// lastIndex([1, 3, 5, 7, 9, 8, 6, 4, 2], (i) => i > 6); // 5
```

#### Find the index of the maximum item of an array

```ts
export const indexOfMax = (arr: number[]): number => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
// indexOfMax([1, 3, 9, 7, 5]); // 2
// indexOfMax([1, 3, 7, 7, 5]); // 3
```

#### Find the index of the minimum item of an array

```ts
export const indexOfMin = (arr: number[]): number => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);
// indexOfMin([6, 4, 8, 2, 10]); // 3
// indexOfMin([6, 4, 2, 2, 10]); // 2
```

#### Find the length of the longest string in an array

export const findLongest = (words: string[]): number => Math.max(...words.map((el) => el.length));
// findLongest(['always', 'look', 'on', 'the', 'bright', 'side', 'of', 'life']); // 6

#### Find the maximum item of an array by given key

export const maxBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T =>
arr.reduce((a, b) => (a[key] >= b[key] ? a : b), {} as T);
// const people = [
// { name: 'Bar', age: 24 },
// { name: 'Baz', age: 32 },
// { name: 'Foo', age: 42 },
// { name: 'Fuzz', age: 36 }
// ];
// maxBy(people, 'age'); // { name: 'Foo', age: 42 }

#### Find the maximum item of an array

export const max = (arr: number[]): number => Math.max(...arr);
// max([1, 3, 9, 7, 5]); // 9

#### Find the minimum item of an array by given key

export const minBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T =>
arr.reduce((a, b) => (a[key] < b[key] ? a : b), {} as T);
// const people = [
// { name: 'Bar', age: 24 },
// { name: 'Baz', age: 32 },
// { name: 'Foo', age: 42 },
// { name: 'Fuzz', age: 36 },
// ];
// minBy(people, 'age'); // { name: 'Bar', age: 24 }

#### Find the minimum item of an array

export const min = (arr: number[]): number => Math.min(...arr);
// min([1, 3, 9, 7, 5]); // 1

#### Get all arrays of consecutive elements

export const getConsecutiveArrays = <T, _>(arr: T[], size: number): T[][] =>
size > arr.length ? [] : arr.slice(size #### 1).map((_, i) => arr.slice(i, size + i));
// getConsecutiveArrays([1, 2, 3, 4, 5], 2); // [[1, 2], [2, 3], [3, 4], [4, 5]]
// getConsecutiveArrays([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
// getConsecutiveArrays([1, 2, 3, 4, 5], 6); // []

#### Get all n-th items of an array

export const getNthItems = <T, _>(arr: T[], nth: number): T[] => arr.filter((_, i) => i % nth === nth #### 1);
// getNthItems([1, 2, 3, 4, 5, 6, 7, 8, 9], 2); // [2, 4, 6, 8]
// getNthItems([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [3, 6, 9]

#### Get indices of a value in an array

export const indices = <T>(arr: T[], value: T): number[] =>
arr.reduce((acc, v, i) => (v === value ? [...acc, i] : acc), [] as number[]);
// indices(['h', 'e', 'l', 'l', 'o'], 'l'); // [2, 3]
// indices(['h', 'e', 'l', 'l', 'o'], 'w'); // []

#### Get the average of an array

export const average = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;
// average([1, 2, 3, 4, 5]); // 3

#### Get the intersection of arrays

export const getIntersection = <T, \_>(a: T[], ...arr: T[][]): T[] =>
[...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));
// getIntersection([1, 2, 3], [2, 3, 4, 5]); // [2, 3]
// getIntersection([1, 2, 3], [2, 3, 4, 5], [1, 3, 5]); // [3]

#### Get the rank of an array of numbers

export const ranking = (arr: number[]): number[] => arr.map((x, y, z) => z.filter((w) => w > x).length + 1);
// ranking([80, 65, 90, 50]); // [2, 3, 1, 4]
// ranking([80, 80, 70, 50]); // [1, 1, 3, 4]
// ranking([80, 80, 80, 50]); // [1, 1, 1, 4]

#### Get the sum of an array of numbers

export const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);
// sun([1, 2, 3, 4, 5]); // 15

#### Get the unique values of an array

export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];
// unique([1, 2, 3, 1, 4, 4, 5]); // [1, 2, 3, 4, 5]

#### Get union of arrays

export const union = <T, \_>(...arr: T[][]): T[] => [...new Set(arr.flat())];
// union([1, 2], [2, 3], [3]); // [1, 2, 3]

#### Group an array of objects by a key

export const groupBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T[]> =>
arr.reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {} as Record<string, T[]>);
// groupBy(
// [
// { branch: 'audi', model: 'q8', year: '2019' },
// { branch: 'audi', model: 'rs7', year: '2020' },
// { branch: 'ford', model: 'mustang', year: '2019' },
// { branch: 'ford', model: 'explorer', year: '2020' },
// { branch: 'bmw', model: 'x7', year: '2020' }
// ],
// 'branch'
// );
{
// audi: [
// { branch: 'audi', model: 'q8', year: '2019' },
// { branch: 'audi', model: 'rs7', year: '2020' }
// ],
// bmw: [
// { branch: 'bmw', model: 'x7', year: '2020' }
// ],
// ford: [
// { branch: 'ford', model: 'mustang', year: '2019' },
// { branch: 'ford', model: 'explorer', year: '2020' }
// ],
// }

#### Intersperse element between elements

<!-- export const intersperse = <T>(a: T[], s: T): T[] => [...Array(2 * a.length #### 1)].map((\_, i) => (i % 2 ? s : a[i / 2]));
// intersperse(['A', 'B', 'C'], '/'); // ['A', '/', 'B', '/', 'C']
// intersperse([<li>A</li>, <li>B</li>, <li>C</li>], <li>/</li>); // [<li>A</li>, <li>/</li>, <li>B</li>, <li>/</li>, <li>C</li>] -->

#### Merge two arrays

export const merge = <T, \_>(a: T[], b: T[]): T[] => [...a, ...b];
// merge([1, 2, 3], [4, 5, 6]); // [1, 2, 3, 4, 5, 6]

#### Partition an array based on a condition

// export const partition = <T, \_>(arr: T[], criteria: (a: T) => boolean): T[][] =>
// arr.reduce((acc, i) => (acc[criteria(i) ? 0 : 1].push(i), acc), [[], []]);
// partition([1, 2, 3, 4, 5], (n) => n % 2); // [[1, 3, 5], [2, 4]]

#### Remove duplicate values in an array

export const removeDuplicate = <T, \_>(arr: T[]): T[] => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
// removeDuplicate(['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']); // ['h', 'e', 'w', 'r', 'd']

#### Remove falsy values from array

export const removeFalsy = <T, \_>(arr: T[]): T[] => arr.filter(Boolean);
// ['a string', true, 5, 'another string']

#### Repeat an array

export const repeat = <T, \_>(arr: T[], n: number): T[] => Array(n).fill(arr).flat();
repeat([1, 2, 3], 3); // [1, 2, 3, 1, 2, 3, 1, 2, 3]

#### Shuffle an array

export const shuffle = <T, \_>(arr: T[]): T[] =>
arr
.map((a) => ({ sort: Math.random(), value: a }))
.sort((a, b) => a.sort - b.sort)
.map((a) => a.value);
// shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // [9, 1, 10, 6, 8, 5, 2, 3, 7, 4]

#### Sort an array of items by given key

export const sortBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], k: K): T[] =>
arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0));
// const people = [
// { name: 'Foo', age: 42 },
// { name: 'Bar', age: 24 },
// { name: 'Fuzz', age: 36 },
// { name: 'Baz', age: 32 }
// ];
// sortBy(people, 'age');

// [
// { name: 'Bar', age: 24 },
// { name: 'Baz', age: 32 },
// { name: 'Fuzz', age: 36 },
// { name: 'Foo', age: 42 },
// ] 40. Sort an array of numbers
export const sort = (arr: number[]): number[] => arr.sort((a, b) => a - b);
// sort([1, 5, 2, 4, 3]); // [1, 2, 3, 4, 5] 4

#### Split an array into chunks

export const chunk = <T>(arr: T[], size: number): T[][] =>
arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), [] as T[][]);
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 4); // [[1, 2, 3, 4], [5, 6, 7, 8]]

#### Swap the rows and columns of a matrix

export const transpose = <T>(matrix: T[][]): T[][] => matrix[0].map((col, i) => matrix.map((row) => row[i]));
// transpose([
// // [
// [1, 2, 3], // [1, 4, 7],
// [4, 5, 6], // [2, 5, 8],
// [7, 8, 9] // [3, 6, 9],
// ]); // ]

#### Swap two array items

export const swapItems = <T, \_>(a: T[], i: number, j: number): T[] =>
(a[i] && a[j] && [...a.slice(0, i), a[j], ...a.slice(i + 1, j), a[i], ...a.slice(j + 1)]) || a;
// swapItems([1, 2, 3, 4, 5], 1, 4); // [1, 5, 3, 4, 2] 44. Get all subsets of an array
export const getSubsets = <T>(arr: T[]): T[][] =>
arr.reduce((prev, curr) => prev.concat(prev.map((k) => k.concat(curr))), [[]] as T[][]);
// getSubsets([1, 2]); // [[], [1], [2], [1, 2]]
// getSubsets([1, 2, 3]); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
