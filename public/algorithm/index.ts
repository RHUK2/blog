function recul(num: number): number {
  if (num <= 1) return 1;

  return num + recul(num - 1);
}

console.log(recul(5));
