/* eslint-disable @typescript-eslint/no-explicit-any */
class Node {
  val: any;
  priority: number;

  constructor(val: any, priority: number) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: any;

  constructor() {
    this.values = [];
  }

  enqueue(val: any, priority: number) {
    this.values.push(new Node(val, priority));
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const node = this.values[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex];
      if (node.priority <= parent.priority) break;
      this.values[index] = parent;
      index = parentIndex;
    }
    this.values[index] = node;
  }

  dequeue() {
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

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue('medium', 10);
priorityQueue.enqueue('little high', 5);
priorityQueue.enqueue('little low', 13);
priorityQueue.enqueue('very high', 2);
priorityQueue.enqueue('high', 7);
priorityQueue.enqueue('low', 11);
priorityQueue.enqueue('very low', 16);

// priorityQueue.dequeue();

console.dir(priorityQueue, { depth: null });
