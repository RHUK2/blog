// 정렬된 배열과 값을 받아들이고 값이 존재하는 경우 그 인덱스를 반환하는 함수를 작성합니다.
// 값이 존재하지 않으면 -1을 반환합니다.

function binarySearch(arr: number[], num: number) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (arr[mid] !== num && left <= right) {
    if (num < arr[mid]) {
      right = mid - 1;
    } else if (num > arr[mid]) {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
  }

  return arr[mid] === num ? mid : -1;
}

// Test Case
console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 10)); // 2
console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 95)); // 16
console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 100)); // -1
