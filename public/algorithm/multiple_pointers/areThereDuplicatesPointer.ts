// 가변적인 수의 인수를 받아들이고 전달된 인자 중 중복이 있는지 확인하는 areThereDuplicates라는 함수를 구현합니다.

// Time Complexity - O(n)
// Space Complexity - O(n)

function isStringArray(arr: unknown[]): arr is string[] {
  return arr.every((item) => typeof item === 'string');
}

function isNumberArray(arr: unknown[]): arr is number[] {
  return arr.every((item) => typeof item === 'number');
}

function areThereDuplicatesPointer(...args: unknown[]) {
  if (args.length === 0) {
    return false;
  }

  if (isNumberArray(args)) {
    args.sort((a, b) => a - b);
  } else if (isStringArray(args)) {
    args.sort((a, b) => a.localeCompare(b));
  }

  let leftIdx = 0;

  for (let rightIdx = 1; rightIdx < args.length; rightIdx++) {
    if (args[leftIdx] !== args[rightIdx]) {
      leftIdx++;
    } else {
      return true;
    }
  }

  return false;
}

//           i
// [1, 2, 3, 4, 4, 4]
//              j

console.log(areThereDuplicatesPointer(1, 2, 3)); // false
console.log(areThereDuplicatesPointer(1, 2, 2)); // true
console.log(areThereDuplicatesPointer('a', 'b', 'c', 'a')); // true
