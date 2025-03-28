/* eslint-disable @typescript-eslint/no-explicit-any */
class MaxBinaryHeap {
  values: any;

  constructor() {
    this.values = [];
  }

  insert(element: any) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const element = this.values[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex];
      if (element <= parent) break;
      this.values[index] = parent;
      index = parentIndex;
    }
    this.values[index] = element;
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return max;
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild: any, rightChild: any;
      let swap: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if ((swap === null && rightChild > element) || (swap !== null && rightChild > leftChild)) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
  }
}

const heap = new MaxBinaryHeap();

heap.insert(10);
heap.insert(5);
heap.insert(13);
heap.insert(2);
heap.insert(7);
heap.insert(11);
heap.insert(16);

heap.extractMax();

console.dir(heap, { depth: null });
