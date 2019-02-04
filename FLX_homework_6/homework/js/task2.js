function calculatePriceWithDiscount() {
  const amountOfMoney = parseFloat(prompt('Please, input amount of money'));
  const discount = parseFloat(prompt('Please, input a discount'));

  if (amountOfMoney > 9999999
    || amountOfMoney < 0
    || discount < 0
    || discount > 99
    || isNaN(amountOfMoney)
    || isNaN(discount)) {
    return 'Invalid input data';
  }
  const priceWithDiscount = Math.round((amountOfMoney - (amountOfMoney * discount) / 100) * 100) / 100;
  return `Price without discount: ${ Math.round( (amountOfMoney * 100) ) / 100 }
Discount: ${ Math.round(discount * 100) / 100 }%
Price with discount: ${priceWithDiscount}`;
}

alert( calculatePriceWithDiscount() );