function bubbleSort(arr: number[]) {
  const swap = (arr: number[], idx1: number, idx2: number) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
    }
    if (!noSwaps) break;
  }

  return arr;
}

// Test Case
console.log(bubbleSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286]));
console.log(bubbleSort([53, 102, 23, 10]));
console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]));
