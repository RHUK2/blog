# template

```ts
function dfs(node, result = []) {
  // 1. 탈출 조건
  if (!node || typeof node !== 'object') return result;

  // 2. 해야할 행동 로직
  if (typeof node.message === 'string') {
    result.push({ message: node.message });
  }

  // 3. 다음 탐색
  for (const key of Object.keys(node)) {
    dfs(node[key], result);
  }

  // 4. 결과 반환
  return result;
}
```

```ts
function bfs(root, result = []) {
  const queue = [root]; // 큐에 시작 노드 넣기

  while (queue.length > 0) {
    const node = queue.shift(); // 앞에서 꺼내기

    // 1. 탈출 조건
    if (!node || typeof node !== 'object') continue;

    // 2. 해야할 행동 로직
    if (typeof node.message === 'string') {
      result.push({ message: node.message });
    }

    // 3. 다음 탐색 (자식을 큐에 추가)
    for (const key of Object.keys(node)) {
      queue.push(node[key]);
    }
  }

  // 4. 결과 반환
  return result;
}
```

```ts
if (!root) return 0;

return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
```

```ts
if (!root) return 0;

// 스택에 [노드, 현재깊이] 저장
const stack = [[root, 1]];
let maxDepth = 0;

while (stack.length > 0) {
  const [node, depth] = stack.pop();

  if (node) {
    maxDepth = Math.max(maxDepth, depth);

    // 자식 노드들을 스택에 추가
    if (node.left) stack.push([node.left, depth + 1]);
    if (node.right) stack.push([node.right, depth + 1]);
  }
}

return maxDepth;
```

```ts
if (!root) return 0;

const stack = [[root, 1]];
let minDepth = 0;

while (stack.length > 0) {
  const [node, depth] = stack.pop();

  if (node) {
    minDepth = Math.min(minDepth, depth);

    if (node.left) stack.push([node.left, depth + 1]);
    if (node.right) stack.push([node.right, depth + 1]);
  }
}

return minDepth;
```
