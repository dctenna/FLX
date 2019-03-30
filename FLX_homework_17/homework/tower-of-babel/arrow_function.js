const inputs = process.argv.slice(2);
const result = inputs.map((item) => item[0].toUpperCase())
                     .reduce((acc, current) => acc + current);

console.log(result);