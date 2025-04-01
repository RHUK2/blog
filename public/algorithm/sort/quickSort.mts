function pivot(arr: number[], start = 0, end = arr.length + 1) {
  const swap = (arr: number[], idx1: number, idx2: number) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  const pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr: number[], left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);

    quickSort(arr, left, pivotIndex - 1);

    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

// Test Case
console.log(JSON.stringify(quickSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286])));
console.log(JSON.stringify(quickSort([53, 102, 23, 10])));
console.log(JSON.stringify(quickSort([0, 2, 8, 1, 2, 3, 4, 5, 6, 7])));
