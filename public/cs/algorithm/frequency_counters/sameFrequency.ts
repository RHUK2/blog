// 두 개의 양의 정수가 주어졌을 때, 두 숫자의 자릿수가 같은 빈도를 갖는지 구합니다.

// Time Complexity - O(n)

function sameFrequency(num1: number, num2: number) {
  const str1 = String(num1);
  const str2 = String(num2);

  if (str1.length !== str2.length) {
    return false;
  }

  const lookup: Record<string, number> = {};

  for (const char of str1) {
    lookup[char] = (lookup[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!lookup[char]) {
      return false;
    }

    lookup[char]--;
  }

  return true;
}

// Test Case
console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(22, 222)); // false
