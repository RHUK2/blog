function circularQueue(min: number, max: number, index: number) {
  const rangeSize = max - min;

  const relativeIndex = index - min;

  // index가 음수인 경우 고려
  return (((relativeIndex % rangeSize) + rangeSize) % rangeSize) + min;
}
