const rawArgs = process.argv.slice(2);
const args = [];

rawArgs.forEach(val => {
  let commaSep = val.split(',');
  commaSep.forEach(val => {
    if(val !== '') args.push(+val);
  });
});

function avg() {
  return args.reduce((acc, current) => acc + current) / args.length;
}

console.log(avg(...args));