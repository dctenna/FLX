function solveQuadraticEquation() {
  const a = parseFloat(prompt('Please, input value a'));
  const b = parseFloat(prompt('Please, input value b'));
  const c = parseFloat(prompt('Please, input value c'));

  if (isNaN(a)
    || isNaN(b)
    || isNaN(c)
    || a === 0
    || !isFinite(a)
    || !isFinite(b)
    || !isFinite(c)) {
    return 'Invalid input data';
  }
  const d = Math.pow(b, 2) - 4 * a * c;

  if (d === 0) {
    const x = -b / (2 * a);
    return `x = ${x}`;
  }

  if (d > 0) {
    const x1 = (-b + Math.sqrt(d)) / (2 * a);
    const x2 = (-b - Math.sqrt(d)) / (2 * a);
    return `x1 = ${x1} and x2 = ${x2}`;
  }
  return `no solution`;
}

alert( solveQuadraticEquation() );




