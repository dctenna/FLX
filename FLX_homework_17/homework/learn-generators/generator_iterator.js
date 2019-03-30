function* factorial(number) {
  let result = 1;
  for (let i = 1; i <= number; i++) {
    yield result *= i;
  }
}

for (let n of factorial(5)) {
  console.log(n);
}