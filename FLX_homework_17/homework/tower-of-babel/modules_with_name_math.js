const PI = 3.141592;

const _sqrt = function (s, x, last) {
  return x !== last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

const sqrt = function(s) {
  return _sqrt(s, s / 2.0, 0.0);
};
const square = function(x) {
  return x * x;
};

export {PI, sqrt, square};
