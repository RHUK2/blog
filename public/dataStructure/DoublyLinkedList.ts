/* eslint-disable @typescript-eslint/no-explicit-any */
class DNode {
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
  length: any;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: any) {
    const newNode = new DNode(val);

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
}

const dLink = new DoublyLinkedList();

dLink.push('hello');
dLink.push('how');
dLink.push('are');
dLink.push('you');

dLink.pop();
dLink.pop();

console.dir(dLink, { depth: null });
