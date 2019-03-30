const max = process.argv[2];
const FizzBuzz = function*() {
  let current = 1;
  let value;
  while (current <= max) {
    if (current % 3 === 0) {

      if (current % 5 === 0) {
        value = 'FizzBuzz';
      } else {
        value = 'Fizz';
      }
    } else if (current % 5 === 0) {
      value = 'Buzz';
    } else {
      value = current;
    }
    current += 1;
    yield value;
  }
}();

for (const n of FizzBuzz) {
  console.log(n);
}
