function deleteDuplicatesArrayV1<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function deleteDuplicatesArrayV2<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function createMatrix(row: number, column: number) {
  return Array.from({ length: row }, () => Array.from({ length: column }, () => 0));
}

function circularQueue(min: number, max: number, index: number) {
  const rangeSize = max - min;

  const relativeIndex = index - min;

  // index가 음수인 경우 고려
  return (((relativeIndex % rangeSize) + rangeSize) % rangeSize) + min;
}

function storePrevValue(initValue: number) {
  let prevValue = 0;
  let currValue = initValue;

  for (let i = 0; i < 10; i++) {
    prevValue = currValue;
    currValue = prevValue + 1;
    console.log(`prevValue: ${prevValue}, currValue: ${currValue}`);
  }
}

function checkFrequency<T extends string | number | symbol>(arr: T[]) {
  return arr.reduce<Record<T, number>>(
    (obj, curr) => {
      obj[curr] = (obj[curr] || 0) + 1;
      return obj;
    },
    {} as Record<T, number>,
  );
}
