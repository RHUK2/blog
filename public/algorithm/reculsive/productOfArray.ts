// 숫자 배열을 받아 모든 숫자의 곱을 반환하는 함수를 작성하시오.

function productOfArray(arr: number[]): number {
  if (arr.length === 0) return 1;
  return arr[arr.length - 1] * productOfArray(arr.slice(0, -1));
}

// Test Case
console.log(productOfArray([1, 2, 3])); // 6
console.log(productOfArray([1, 2, 3, 10])); // 60
