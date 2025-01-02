// 가변적인 수의 인수를 받아들이고 전달된 인자 중 중복이 있는지 확인하는 areThereDuplicates라는 함수를 구현합니다.

// Time Complexity - O(n)
// Space Complexity - O(n)

function areThereDuplicates(...args: unknown[]) {
  const lookup: Record<string, number> = {};

  for (const arg of args) {
    let str = '';
    if (typeof arg === 'number') {
      str = String(arg);
    } else if (typeof arg === 'string') {
      str = arg;
    }

    lookup[str] = (lookup[str] || 0) + 1;

    if (lookup[str] > 1) {
      return true;
    }
  }

  return false;
}

// Test Case
console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true
