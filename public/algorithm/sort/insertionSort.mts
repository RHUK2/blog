function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const currentVal = arr[i];
    let j = i - 1;

    for (; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentVal;
  }

  return arr;
}

// Test Case
console.log(JSON.stringify(insertionSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286])));
console.log(JSON.stringify(insertionSort([53, 102, 23, 10])));
console.log(JSON.stringify(insertionSort([8, 1, 2, 3, 4, 5, 6, 7])));
