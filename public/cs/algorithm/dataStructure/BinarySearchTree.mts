/* eslint-disable @typescript-eslint/no-explicit-any */
class Node {
  val: any;
  left: any;
  right: any;

  constructor(val: any) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: any;

  constructor() {
    this.root = null;
  }

  insert(val: any) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;

      while (true) {
        if (val < current.val) {
          if (!current.left) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (val > current.val) {
          if (!current.right) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        } else {
          return;
        }
      }
    }
  }

  find(val: any) {
    if (!this.root) return;

    let current = this.root;

    while (current) {
      if (val > current.val) {
        current = current.right;
      } else if (val < current.val) {
        current = current.left;
      } else {
        return current;
      }
    }

    return;
  }

  BFS() {
    let node = this.root;
    const queue: any[] = [];
    const data: any[] = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  DFSPreOrder() {
    const data: any[] = [];

    function traverse(node: any) {
      data.push(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return data;
  }

  DFSPostOrder() {
    const data: any[] = [];

    function traverse(node: any) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node);
    }

    traverse(this.root);

    return data;
  }

  DFSInOrder() {
    const data: any[] = [];

    function traverse(node: any) {
      if (node.left) traverse(node.left);
      data.push(node);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return data;
  }
}

const tree = new BinarySearchTree();

tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(2);
tree.insert(7);
tree.insert(11);
tree.insert(16);

// console.dir(tree.find(16), { depth: null });

// console.dir(tree.BFS(), { depth: null });

// console.dir(tree.DFSPreOrder(), { depth: null });

// console.dir(tree.DFSPostOrder(), { depth: null });

// console.dir(tree.DFSInOrder(), { depth: null });

console.dir(tree, { depth: null });
