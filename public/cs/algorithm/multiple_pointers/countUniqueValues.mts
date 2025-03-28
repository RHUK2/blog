// 정렬된 배열을 받아들이고 배열의 고유 값을 세는 countUniqueValues라는 함수를 구현합니다.
// 배열에 음수가 있을 수 있지만 항상 정렬됩니다.

// Time Complexity - O(n)
// Space Complexity - O(n)

function countUniqueValues(arr: number[]) {
  let leftIdx = 0;
  let count = arr.length > 0 ? 1 : 0;

  for (let rightIdx = 1; rightIdx < arr.length; rightIdx++) {
    if (arr[leftIdx] !== arr[rightIdx]) {
      arr[++leftIdx] = arr[rightIdx];
      count++;
    }
  }

  return count;
}

//            i
//  [1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]
//               j

// Test Case
console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
console.log(countUniqueValues([-100, 0, -20, 4, 4, 4, 7, 7, 8, 20, 20, 120])); // 8
