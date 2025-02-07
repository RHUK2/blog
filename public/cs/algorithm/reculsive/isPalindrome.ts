// 전달된 문자열이 팔린드롬(앞으로 읽으나 뒤로 읽으나 동일한 문자)인 경우 true 를 반환하는 재귀(recursive) 함수를 작성하시오.
// 팔린드롬이 아닐 경우 false 를 반환합니다.

// function reverse(str: string) {
//   if (str.length <= 1) return str;
//   return reverse(str.slice(1)) + str[0];
// }

function isPalindrome(str: string) {
  return;
}

// Test Case
isPalindrome('awesome'); // false
isPalindrome('foobar'); // false
isPalindrome('tacocat'); // true
isPalindrome('amanaplanacanalpanama'); // true
isPalindrome('amanaplanacanalpandemonium'); // false
