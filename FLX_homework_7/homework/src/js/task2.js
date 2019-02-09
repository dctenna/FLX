let agreeToPlay = confirm('Do you want to play a game?');

if (!agreeToPlay) {
  alert('You did not become a millionaire, but can.');
} else {
  let min = 0;
  let max = 5;
  let prize = 0;
  let maxPrize = 10;

  while (agreeToPlay) {
    let numberInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    let userAnswer;

    for (let i = 0; i < 3; i++) {
      userAnswer = parseInt(prompt(`Enter a number from ${min} to ${max}
Attempt left: ${3 - i}
Total prize: ${prize}
Possible prize on current attempt: ${maxPrize}`));

      if (userAnswer === numberInRange) {
        prize += Math.floor(maxPrize / (i + 1));
        agreeToPlay = confirm(`Congratulation! Your prize is: ${prize}$. Do you want to continue?`);

        if (agreeToPlay) {
          maxPrize = 3 * maxPrize;
          max = 2 * max;
          break;
        } else {
          alert(`Thank you for a game. Your prize is: ${prize}$`);
          agreeToPlay = confirm('Do you want to play a game again?');

          if(agreeToPlay) {
            max = 5;
            prize = 0;
            maxPrize = 10;
            break;
          }
        }
      }
    }
    if (userAnswer !== numberInRange) {
      alert(`Thank you for a game. Your prize is: ${prize}$`);
      agreeToPlay = confirm('Do you want to play a game again?');
      max = 5;
      prize = 0;
      maxPrize = 10;
    }
  }
}



