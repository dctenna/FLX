const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const reset = document.getElementById('reset');
const root = document.getElementById('root');
const resultDiv = document.getElementById('result');
let counter = 0;
let gameResult;
let winCount = 0;
let looseCount = 0;
let finalResult;

const playButtonsHandler = (event) => {
  if (gameResult && gameResult.parentNode === root) {
    root.removeChild(gameResult);
  }

  if (counter === 3) {
    resultDiv.removeChild(finalResult);
    counter = 0;
    winCount = 0;
    looseCount = 0;
  }
  counter++;

  gameResult = document.createElement('div');
  gameResult.setAttribute('id', 'game-result');
  root.appendChild(gameResult);

  const randomShape = showRandomShape();
  const result = compareShapes(randomShape, event.target.id);

  if(result ===  'You’ve LOST!') {
    looseCount++;
  }
  if(result ===  'You’ve WON!') {
    winCount++;
  }

  showShape(event.target.id);

  const gameInfo = document.createElement('p');
  gameResult.appendChild(gameInfo);
  const gameInfoText = document.createTextNode(
    `Round ${counter}, 
      ${event.target.id} vs ${randomShape}, 
      ${result}`
  );

  gameInfo.appendChild(gameInfoText);
  showShape(randomShape);

  if (counter > 2) {
    return showFinalResult(winCount, looseCount);
  }
};

const resetHandler = () => {
  counter = 0;
  winCount = 0;
  looseCount = 0;

  if (finalResult && finalResult.parentNode === resultDiv) {
    resultDiv.removeChild(finalResult);
  }

  if (gameResult && gameResult.parentNode === root) {
    root.removeChild(gameResult);
  }
};

rockButton.addEventListener('click', playButtonsHandler);
paperButton.addEventListener('click', playButtonsHandler);
scissorsButton.addEventListener('click', playButtonsHandler);
reset.addEventListener('click', resetHandler);
