// 정렬된 정수 배열과 목표 평균이 주어졌을 때, 배열에 쌍의 평균이 목표 평균과 같은 값의 쌍이 있는지 확인합니다.
// 목표 평균과 일치하는 쌍이 두 개 이상 있을 수 있습니다.

// Time Complexity - O(n)
// Space Complexity - O(1)

function averagePair(arr: number[], num: number) {
  let leftIdx = 0;
  let rightIdx = 1;

  while (rightIdx < arr.length) {
    const avg = (arr[leftIdx] + arr[rightIdx]) / 2;

    if (avg < num) {
      leftIdx++;
      rightIdx++;
    } else if (avg > num) {
      leftIdx--;
    } else {
      return true;
    }
  }

  return false;
}

//                 i
// [1, 3, 3, 5, 6, 7, 10, 12, 19]
//                     j

// Test Case
console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
console.log(averagePair([], 4)); // false

// Solution Code

function averagePairSolution(arr: number[], num: number) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    const avg = (arr[start] + arr[end]) / 2;
    if (avg === num) return true;
    else if (avg < num) start++;
    else end--;
  }
  return false;
}
