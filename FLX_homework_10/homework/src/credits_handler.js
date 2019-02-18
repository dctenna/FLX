function userCard(index) {
  let key = index;
  const minKey = 1;
  const maxKey = 3;
  if (index < minKey) {
    key = minKey;
  }
  if (index > maxKey) {
    key = maxKey;
  }

  const historyLogs = [];
  let balance = 100;
  let transactionLimit = 100;

  const logging = (operationType, credits, date) => {
    const pad = '00';
    const day = (pad + date.getDate()).slice(-pad.length);
    const month = (pad + date.getMonth()).slice(-pad.length);
    const year = date.getFullYear();
    const timeBeginSymbol = 0;
    const timeEndSymbol = 8;
    const time = date.toTimeString().substr(timeBeginSymbol, timeEndSymbol);
    historyLogs.push({
      operationType,
      credits,
      operationTime: `${day}/${month}/${year}, ${time}`
    });
  };
  const getCardOptions = () => {
    return {
      balance,
      transactionLimit,
      historyLogs,
      key
    }
  };
  const putCredits = (amountOfCredits) => {
    let operationType = 'Received credits';
    balance += amountOfCredits;
    logging(operationType, amountOfCredits, new Date());
  };
  const takeCredits = (amountOfCredits) => {
    if (transactionLimit > amountOfCredits &&
      balance > amountOfCredits) {
      let operationType = 'Withdrawal of credits';
      balance -= amountOfCredits;
      logging(operationType, amountOfCredits, new Date());
    } else {
      console.error('Your transaction limit and remaining balance should ' +
        'be greater than credits you want to take');
    }
  };
  const setTransactionLimit = (currentTransactionLimit) => {
    let operationType = 'Transaction limit change';
    transactionLimit = currentTransactionLimit;
    logging(operationType, currentTransactionLimit, new Date());
  };
  const transferCredits = (creditsToTransfer, recipientCard) => {
    const taxes = 0.005;
    const creditsToTransferWithTaxes = creditsToTransfer + creditsToTransfer * taxes;
    if (transactionLimit > creditsToTransferWithTaxes &&
      balance > creditsToTransferWithTaxes) {
      takeCredits(creditsToTransferWithTaxes);
      recipientCard.putCredits(creditsToTransfer);
    } else {
      console.error('Your transaction limit and remaining balance should ' +
        'be greater than credits you want to take');
    }
  };
  return {
    getCardOptions,
    putCredits,
    takeCredits,
    setTransactionLimit,
    transferCredits
  }
}

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard() {
    const maxCardsAmount = 3;
    if (this.cards.length < maxCardsAmount) {
      this.cards.push(userCard(this.cards.length + 1));
    }
  }

  getCardByKey(index) {
    return this.cards[index].getCardOptions();
  }
}

