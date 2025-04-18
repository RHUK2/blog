// 밑과 지수를 받아들이는 power라는 함수를 작성합니다.
// 이 함수는 밑의 거듭제곱을 지수로 반환해야 합니다.
// 이 함수는 Math.pow()의 기능을 모방해야 합니다.
//  음의 밑과 지수에 대해서는 신경쓰지 마세요.

function power(num1: number, num2: number): number {
  if (num2 === 0) return 1;
  return num1 * power(num1, num2 - 1);
}

// Test Case
console.log(power(2, 0)); // 1
console.log(power(2, 2)); // 4
console.log(power(2, 4)); // 16
