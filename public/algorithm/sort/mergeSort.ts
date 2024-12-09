function merge(arr1: number[], arr2: number[]) {
  const results: number[] = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

// Test Case
console.log(JSON.stringify(mergeSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286])));
console.log(JSON.stringify(mergeSort([53, 102, 23, 10])));
console.log(JSON.stringify(mergeSort([8, 1, 2, 3, 4, 5, 6, 7])));
