function solution(park, routes) {
  let x = 0;
  let y = 0;

  const index = park.join('').indexOf('S');

  y = Math.floor(index / park.length);
  x = index % park[0].length;

  routes.map((route) => {
    const direction = route.split(' ')[0];
    const move = parseInt(route.split(' ')[1]);

    switch (direction) {
      case 'N':
        if (y - move < 0) break;
        for (let i = 0; i < move; i++) {
          if (park[y - i]?.[x] === 'X') return;
        }
        y = y - move;
        break;
      case 'S':
        if (y + move > park.length - 1) break;
        for (let i = 0; i < move; i++) {
          if (park[y + i]?.[x] === 'X') return;
        }
        y = y + move;
        break;
      case 'E':
        if (x + move > park[0].length - 1) break;
        for (let i = 0; i < move; i++) {
          if (park[y]?.[x + i] === 'X') return;
        }
        x = x + move;
        break;
      case 'W':
        if (x - move < 0) break;
        for (let i = 0; i < move; i++) {
          if (park[y]?.[x - i] === 'X') return;
        }
        x = x - move;
        break;
    }
  });

  return [y, x];
}

console.log(JSON.stringify([2, 1]) === JSON.stringify(solution(['SOO', 'OOO', 'OOO'], ['E 2', 'S 2', 'W 1'])));
console.log(JSON.stringify([0, 1]) === JSON.stringify(solution(['SOO', 'OXX', 'OOO'], ['E 2', 'S 2', 'W 1'])));
console.log(JSON.stringify([0, 0]) === JSON.stringify(solution(['OSO', 'OOO', 'OXO', 'OOO'], ['E 2', 'S 3', 'W 1'])));
