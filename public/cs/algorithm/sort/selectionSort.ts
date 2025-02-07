function selectionSort(arr: number[]) {
  const swap = (arr: number[], idx1: number, idx2: number) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }

    if (i !== lowest) {
      swap(arr, i, lowest);
    }
  }

  return arr;
}

// Test Case
console.log(JSON.stringify(selectionSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286])));
console.log(JSON.stringify(selectionSort([53, 102, 23, 10])));
console.log(JSON.stringify(selectionSort([0, 2, 8, 1, 2, 3, 4, 5, 6, 7])));
