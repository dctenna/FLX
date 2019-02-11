function addOne(x) {
  return x + 1;
}

function pipe(number) {
  let currentInput = number;

  for (let i = 1; i < arguments.length; i++) {
    currentInput = arguments[i](currentInput);
  }
  return currentInput;
}

pipe(3, addOne, addOne);