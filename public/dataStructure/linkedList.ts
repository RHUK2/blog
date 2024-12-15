/* eslint-disable @typescript-eslint/no-explicit-any */
class _Node {
  val: any;
  next: any;

  constructor(val: any) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: any;
  tail: any;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const newNode = new _Node(val);
    if (this.head == null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;

    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return;

    const currentHead = this.head;

    this.head = currentHead.next;

    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  unshift(val: any) {
    const newNode = new _Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }
}

const link = new SinglyLinkedList();

// link.push('hello');
// link.push('how');
// link.push('are');
// link.push('you');

// console.dir(link.pop(), { depth: null });
// console.dir(link.pop(), { depth: null });
// console.dir(link.pop(), { depth: null });
// console.dir(link.pop(), { depth: null });

// link.unshift('hello');
// link.unshift('how');
// link.unshift('are');
// link.unshift('you');

// console.dir(link.shift(), { depth: null });
// console.dir(link.shift(), { depth: null });
// console.dir(link.shift(), { depth: null });
// console.dir(link.shift(), { depth: null });

console.dir(link, { depth: null });
