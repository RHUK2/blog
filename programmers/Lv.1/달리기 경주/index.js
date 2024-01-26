function solution(players, callings) {
  const playersMap = new Map();

  players.forEach((player, index) => playersMap.set(player, index));

  callings.forEach((calling) => {
    const passed = players[playersMap.get(calling) - 1];

    const temp = players[playersMap.get(calling)];
    players[playersMap.get(calling)] = players[playersMap.get(calling) - 1];
    players[playersMap.get(calling) - 1] = temp;

    playersMap.set(calling, playersMap.get(calling) - 1);
    playersMap.set(passed, playersMap.get(passed) + 1);
  });

  return players;
}

console.log(
  JSON.stringify(['mumu', 'kai', 'mine', 'soe', 'poe']) ===
    JSON.stringify(solution(['mumu', 'soe', 'poe', 'kai', 'mine'], ['kai', 'kai', 'mine', 'mine'])),
);
