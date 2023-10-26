
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/
document.querySelector('.js-autoPlayButton').addEventListener('click', () => {
  autoPlay();
});

let isAutoPlay = false;
let intervalid;

function autoPlay() {
  if (!isAutoPlay) {
    intervalid = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalid);
    isAutoPlay = false;
  }
}

document.querySelector('.js-autoPlayButton').addEventListener('click', () => {
  changeAutoPlayButton();
});
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
    changeAutoPlayButton();
  }
});

function changeAutoPlayButton() {
  const autoPlayElement = document.querySelector('.js-autoPlayButton');
  if (autoPlayElement.innerText === 'Auto Play'){
    autoPlayElement.innerHTML = 'Stop Playing';
  } else {
    autoPlayElement.innerHTML = 'Auto Play';
  }
}


document.querySelector('.js-rockButton').addEventListener("click", () => {
  playGame('rock');
});
document.querySelector('.js-paperButton').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissorsButton').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    playGame('rock');
  if (event.key === 'p')
    playGame('paper');
  if (event.key ===  's')
    playGame('scissors');
})

document.querySelector('.js-resetButton')
  .addEventListener('click', () => {
    displayConfirmation();
})
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
      displayConfirmation();
  }
})

function displayConfirmation() {
  document.querySelector('.js-displayConfirmation').innerHTML = 'Are you sure you want to reset the score? <button class="yes-button js-yesButton">Yes</button><button class="no-button js-noButton">No</button>';

  document.querySelector('.js-yesButton').addEventListener('click', () => {
    resetScore();
    document.querySelector('.js-displayConfirmation').innerHTML = '';
  });
  document.querySelector('.js-noButton').addEventListener('click', () => {
    document.querySelector('.js-displayConfirmation').innerHTML = '';
  });
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector(".js-moves").innerHTML = '';
    document.querySelector(".js-result").innerHTML = '';
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" />
Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber2 = Math.random();
  let computerMove = "";

  if (randomNumber2 >= 0 && randomNumber2 < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber2 >= 1 / 3 && randomNumber2 < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber2 >= 2 / 3 && randomNumber2 < 3 / 3) {
    computerMove = "scissors";
  }

  return computerMove;
}