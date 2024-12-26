/* eslint-disable @typescript-eslint/no-explicit-any */
class SNode {
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
    const newNode = new SNode(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return;

    let poppedNode = this.head;
    let newTail = poppedNode;

    while (poppedNode.next) {
      newTail = poppedNode;
      poppedNode = poppedNode.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return poppedNode;
  }

  unshift(val: any) {
    const newNode = new SNode(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) return;

    const shiftedNode = this.head;

    this.head = shiftedNode.next;
    shiftedNode.next = null;

    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return shiftedNode;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return;

    let current = this.head;
    let counter = 0;

    while (index !== counter) {
      current = current.next;
      counter++;
    }

    return current;
  }

  set(index: number, val: any) {
    const foundNode = this.get(index);

    if (foundNode) {
      foundNode.val = val;
      return true;
    } else {
      return false;
    }
  }

  insert(index: number, val: any) {
    if (index < 0 || index > this.length) return;

    if (index === 0) {
      return this.unshift(val);
    }

    if (index === this.length) {
      return this.push(val);
    }

    const newNode = new SNode(val);
    const prevNode = this.get(index - 1);

    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
    return this;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return;

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;

    beforeNode.next = afterNode.next;
    afterNode.next = null;

    this.length--;
    return afterNode;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next = null;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}

const sLink = new SinglyLinkedList();

sLink.push('hello');
sLink.push('how');
sLink.push('are');
sLink.push('you');

// console.dir(sLink.pop(), { depth: null });
// console.dir(sLink.pop(), { depth: null });
// console.dir(sLink.pop(), { depth: null });
// console.dir(sLink.pop(), { depth: null });

// sLink.unshift('hello');
// sLink.unshift('how');
// sLink.unshift('are');
// sLink.unshift('you');

// console.dir(sLink.shift(), { depth: null });
// console.dir(sLink.shift(), { depth: null });
// console.dir(sLink.shift(), { depth: null });
// console.dir(sLink.shift(), { depth: null });

// console.dir(sLink.get(-1), { depth: null });
// console.dir(sLink.get(2), { depth: null });
// console.dir(sLink.get(100), { depth: null });

// sLink.set(0, 'hi');

// sLink.insert(1, 'hi');

// sLink.remove(1);

// sLink.reverse();

console.dir(sLink, { depth: null });
