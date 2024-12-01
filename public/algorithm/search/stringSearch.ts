function stringSearch(long: string, short: string) {
  let count = 0;

  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (long[i + j] !== short[j]) {
        break;
      }
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

// Test Case
console.log(stringSearch('hello, new world', 'wo'));
console.log(stringSearch('i do not know who you are, who am I', 'who'));
