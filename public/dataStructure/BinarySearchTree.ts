/* eslint-disable @typescript-eslint/no-explicit-any */
class BSNode {
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
    const newNode = new BSNode(val);

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

  bfs(val: any) {
    const visited = [];
    const queue = [];

    let current = this.root;

    while (true) {
      if (val !== current.val) {
        visited.push(current);

        queue.unshift(current.left);
        queue.unshift(current.right);

        current = current.left;
      }
    }
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

console.dir(tree.find(16), { depth: null });

console.dir(tree, { depth: null });
