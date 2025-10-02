# Leetcode

| 문제                                                      | 난이도 | 완료 여부 |
| --------------------------------------------------------- | ------ | --------- |
| 🚀 연결 리스트                                            |        |           |
| Reverse Linked List                                       | 쉬움   | ✅        |
| Linked List Cycle                                         | 쉬움   | ✅        |
| Remove Duplicates from Sorted List                        | 쉬움   | ✅        |
| Linked List Cycle II                                      | 중간   |           |
| Remove Duplicates from Sorted List II                     | 중간   |           |
| Add Two Numbers                                           | 중간   |           |
| 🚀 스택                                                   |        |           |
| Valid Parentheses                                         | 쉬움   | ✅        |
| 🚀 힙, 우선순위 큐                                        |        |           |
| Kth Largest Element in a Stream                           | 쉬움   |           |
| Top K Frequent Elements                                   | 중간   |           |
| Find K Pairs with Smallest Sums                           | 중간   |           |
| 🚀 해시맵                                                 |        |           |
| Two Sum                                                   | 쉬움   | ✅        |
| Intersection of Two Arrays                                | 쉬움   | ✅        |
| Unique Email Addresses                                    | 쉬움   | ✅        |
| First Unique Character in a String                        | 쉬움   | ✅        |
| Group Anagrams                                            | 중간   |           |
| Subarray Sum Equals K                                     | 중간   |           |
| 🚀 그래프, BFS, DFS                                       |        |           |
| Number of Islands                                         | 중간   |           |
| Max Area of Island                                        | 중간   |           |
| Number of Connected Components in an Undirected Graph     | 중간   |           |
| Word Ladder                                               | 중간   |           |
| 🚀 트리, 이진 탐색 트리                                   |        |           |
| Maximum Depth of Binary Tree                              | 쉬움   | ✅        |
| Minimum Depth of Binary Tree                              | 쉬움   | ✅        |
| Merge Two Binary Trees                                    | 쉬움   |           |
| Convert Sorted Array to Binary Search Tree                | 쉬움   |           |
| Path Sum                                                  | 쉬움   |           |
| Binary Tree Level Order Traversal                         | 중간   |           |
| Binary Tree Zigzag Level Order Traversal                  | 중간   |           |
| Validate Binary Search Tree                               | 중간   |           |
| Construct Binary Tree from Preorder and Inorder Traversal | 중간   |           |
| 🚀 동적 프로그래밍                                        |        |           |
| Paint Fence                                               | 쉬움   |           |
| Maximum Subarray                                          | 쉬움   |           |
| House Robber                                              | 쉬움   |           |
| Best Time to Buy and Sell Stock                           | 쉬움   |           |
| Best Time to Buy and Sell Stock II                        | 쉬움   |           |
| Longest Increasing Subsequence                            | 중간   |           |
| Unique Paths                                              | 중간   |           |
| Unique Paths II                                           | 중간   |           |
| House Robber II                                           | 중간   |           |
| Word Break                                                | 중간   |           |
| Coin Change                                               | 중간   |           |
| 🚀 이진 탐색                                              |        |           |
| Search Insert Position                                    | 쉬움   | ✅        |
| Find Minimum in Rotated Sorted Array                      | 중간   |           |
| Search in Rotated Sorted Array                            | 중간   |           |
| Capacity To Ship Packages Within D Days                   | 중간   |           |
| 🚀 재귀                                                   |        |           |
| Pow(x, n)                                                 | 중간   |           |
| K-th Symbol in Grammar                                    | 중간   |           |
| Split BST                                                 | 중간   |           |
| 🚀 슬라이딩 윈도우                                        |        |           |
| Longest Substring Without Repeating Characters            | 중간   |           |
| Minimum Size Subarray Sum                                 | 중간   |           |
| 🚀 그리디 + 백트래킹                                      |        |           |
| Permutations                                              | 중간   |           |
| Subsets                                                   | 중간   |           |
| Combination Sum                                           | 중간   |           |
| Generate Parentheses                                      | 중간   |           |
| 🚀 기타                                                   |        |           |
| Move Zeroes                                               | 쉬움   |           |
| Meeting Rooms                                             | 쉬움   |           |
| Meeting Rooms II                                          | 중간   |           |
| Is Subsequence                                            | 중간   |           |
| Next Permutation                                          | 중간   |           |
| String to Integer (atoi)                                  | 중간   |           |
| ZigZag Conversion                                         | 중간   |           |

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
