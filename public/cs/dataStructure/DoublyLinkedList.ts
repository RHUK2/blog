/* eslint-disable @typescript-eslint/no-explicit-any */
class DLNode {
  val: any;
  next: any;
  prev: any;

  constructor(val: any) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: any;
  tail: any;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const newNode = new DLNode(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return;

    const poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }

    this.length--;
    return poppedNode;
  }

  unshift(val: any) {
    const newNode = new DLNode(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) return;

    const shiftedNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }

    this.length--;
    return shiftedNode;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return;

    const mid = this.length / 2;

    let current: any;
    let count: number;

    if (index < mid) {
      current = this.head;
      count = 0;

      while (index !== count) {
        current = current.next;
        count++;
      }
    } else {
      current = this.tail;
      count = this.length - 1;

      while (index !== count) {
        current = current.prev;
        count--;
      }
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

    const newNode = new DLNode(val);
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;

    newNode.next = afterNode;
    afterNode.prev = newNode;
    newNode.prev = beforeNode;
    beforeNode.next = newNode;

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

    const removedNode = this.get(index);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;

    this.length--;
    return removedNode;
  }
}

const dLink = new DoublyLinkedList();

dLink.push('hello');
dLink.push('how');
dLink.push('are');
dLink.push('you');

// dLink.pop();
// dLink.pop();
// dLink.pop();
// dLink.pop();

// dLink.unshift('hello');
// dLink.unshift('how');
// dLink.unshift('are');
// dLink.unshift('you');

// dLink.shift();
// dLink.shift();
// dLink.shift();
// dLink.shift();

// console.dir(dLink.get(0), { depth: null });
// console.dir(dLink.get(1), { depth: null });
// console.dir(dLink.get(2), { depth: null });
// console.dir(dLink.get(3), { depth: null });

// dLink.set(0, 'hi');

// dLink.insert(1, 'hi');

// dLink.remove(1);

console.dir(dLink, { depth: null });
