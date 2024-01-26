function solution(name, yearning, photo) {
  const scoreList = name.reduce((pr, cu, i) => {
    return { ...pr, [cu]: yearning[i] };
  }, {});

  const answer = photo.map((val) => {
    return val.reduce((pr, cu) => {
      return pr + (scoreList[cu] ?? 0);
    }, 0);
  });

  return answer;
}

console.log(
  JSON.stringify([19, 15, 6]) ===
    JSON.stringify(
      solution(
        ['may', 'kein', 'kain', 'radi'],
        [5, 10, 1, 3],
        [
          ['may', 'kein', 'kain', 'radi'],
          ['may', 'kein', 'brin', 'deny'],
          ['kon', 'kain', 'may', 'coni'],
        ],
      ),
    ),
);

console.log(
  JSON.stringify([67, 0, 55]) ===
    JSON.stringify(
      solution(
        ['kali', 'mari', 'don'],
        [11, 1, 55],
        [
          ['kali', 'mari', 'don'],
          ['pony', 'tom', 'teddy'],
          ['con', 'mona', 'don'],
        ],
      ),
    ),
);

console.log(
  JSON.stringify([5, 15, 0]) ===
    JSON.stringify(
      solution(['may', 'kein', 'kain', 'radi'], [5, 10, 1, 3], [['may'], ['kein', 'deny', 'may'], ['kon', 'coni']]),
    ),
);
