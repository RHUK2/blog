// 문자열을 받아 모든 고유 문자가 포함된 가장 긴 하위 문자열의 길이를 반환하는 함수를 작성하세요.

// Time Complexity - O(N)

function findLongestSubstring(str: string) {
  let len = 0;
  const lookup: Record<string, number> = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (lookup[char]) {
      start = Math.max(start, lookup[char]);
    }

    len = Math.max(len, i + 1 - start);

    lookup[char] = i + 1;
  }

  return len;
}

// Test Case
console.log(findLongestSubstring('')); // 0
console.log(findLongestSubstring('rithmschool')); // 7
console.log(findLongestSubstring('thisisawesome')); // 6
console.log(findLongestSubstring('thecatinthehat')); // 7
console.log(findLongestSubstring('bbbbbb')); // 1
console.log(findLongestSubstring('longestsubstring')); // 8
console.log(findLongestSubstring('thisishowwedoit')); // 6
