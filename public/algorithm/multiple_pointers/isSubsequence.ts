// 두 문자열을 받아 첫 번째 문자열의 문자가 두 번째 문자열의 문자의 일부에 포함되는지 확인합니다.
// 즉, 이 함수는 첫 번째 문자열의 문자가 순서가 바뀌지 않고 두 번째 문자열의 어딘가에 나타나는지 확인해야 합니다.

// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(str1: string, str2: string) {
  let str1Idx = 0;
  let str2Idx = 0;

  if (!str1) return true;

  while (str1Idx < str1.length) {
    if (str1[str1Idx] === str2[str2Idx]) {
      str1Idx++;
      str2Idx++;
    } else {
      str2Idx++;
      if (str2Idx >= str2.length) {
        return false;
      }
    }
  }

  return true;
}

//                   i
// ['h','e','l','l','o']

//                                  j
// ['h','e','l','l','o', ' ', 'w', 'o', 'r', 'l', 'd']

// Test Case
console.log(isSubsequence('hello', 'hello world')); // true
console.log(isSubsequence('sing', 'sting')); // true
console.log(isSubsequence('abc', 'abracadabra')); // true
console.log(isSubsequence('abc', 'acb')); // false (order matters)

// Solution Code

function isSubsequenceSolution(str1: string, str2: string) {
  let i = 0;
  let j = 0;

  if (!str1) return true;

  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}
