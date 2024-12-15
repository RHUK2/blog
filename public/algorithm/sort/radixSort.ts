function getDigit(num: number, i: number) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num: number) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(arr: number[]) {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
}

function radixSort(arr: number[]) {
  const maxDigitCount = mostDigits(arr);
  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets = Array.from({ length: 10 }, (): number[] => []);
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      digitBuckets[digit].push(arr[i]);
    }
    arr = ([] as number[]).concat(...digitBuckets);
  }
}

// Test Case
console.log(JSON.stringify(radixSort([169, 352, 475, 315, 494, 457, 221, 142, 315, 244, 163, 240, 286])));
console.log(JSON.stringify(radixSort([53, 102, 23, 10])));
console.log(JSON.stringify(radixSort([0, 2, 8, 1, 2, 3, 4, 5, 6, 7])));
