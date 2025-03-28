/* eslint-disable @typescript-eslint/no-explicit-any */
class Node {
  val: any;
  next: any;

  constructor(val: any) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  first: any;
  last: any;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(val: any) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const old = this.first;
      this.first = newNode;
      this.first.next = old;
    }

    return ++this.size;
  }

  pop() {
    if (!this.first) return;

    const old = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;

    this.size--;
    return old.value;
  }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

// stack.pop();

console.dir(stack, { depth: null });
