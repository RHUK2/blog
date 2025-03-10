function deleteDuplicatesArrayV1<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function deleteDuplicatesArrayV2<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
