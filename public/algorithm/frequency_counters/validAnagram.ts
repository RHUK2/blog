// 두 개의 문자열이 주어졌을 때, 두 번째 문자열이 첫 번째 문자열의 애너그램인지 확인하는 함수를 작성합니다.
// 애너그램은 다른 글자의 글자를 재배열하여 형성된 단어, 구 또는 이름입니다. (예시: cinema -> iceman)
// 안내: 문자열에 소문자만 포함되어 있다고 가정해도 됩니다.

// Time Complexity - O(n)

function validAnagram(str1: string, str2: string) {
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
    } else {
      lookup[char]--;
    }
  }

  return true;
}

// Test Case
console.log(validAnagram('', '')); // true
console.log(validAnagram('aaz', 'zza')); // false
console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
console.log(validAnagram('awesome', 'awesom')); // false
console.log(validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana')); // false
console.log(validAnagram('qwerty', 'qeywrt')); // true
console.log(validAnagram('texttwisttime', 'timetwisttext')); // true
