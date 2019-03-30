const max = process.argv[2];
const FizzBuzz = {
  [Symbol.iterator]() {
    let current = 1;
    let value;

    return {
      next() {
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

        if (current > max) return {done: true};
        current += 1;

        return {done: false, value};
      }
    };
  }
};

for (const n of FizzBuzz) {
  console.log(n);
}
