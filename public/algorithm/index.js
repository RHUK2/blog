const fs = require('fs');

const filePath = process.env.USER === 'rhuk' ? `${__dirname}/input.txt` : 0;

const [a, b] = fs.readFileSync(filePath, 'utf-8').trim().split(/\s/);

const reverseA = a
  .split('')
  .map((v, idx, arr) => {
    return arr[arr.length - (idx + 1)];
  })
  .join('');

const reverseB = b
  .split('')
  .map((v, idx, arr) => {
    return arr[arr.length - (idx + 1)];
  })
  .join('');

console.log(parseInt(reverseA) > parseInt(reverseB) ? reverseA : reverseB);
