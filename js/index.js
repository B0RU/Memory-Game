/*
 list that holds all of cards Classes
 */
let cardsList = [
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bolt",
  "fa fa-bolt"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const restart = document.querySelector(".restart");
const timer = document.querySelector(".timer");
const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minutes");
const hours = document.querySelector(".hours");
const cardsDeck = document.querySelector(".deck");
const playground = document.querySelector("#playground");
const movesElement = document.querySelector(".moves");
const modal = document.querySelector('.modal');
const finishTime = document.querySelector('.time-modal');
const finishRating = document.querySelector('.rating-modal');
const finishMoves = document.querySelector('.moves-modal');
const btnModal = document.querySelector('.btn-modal');
const starsAll = document.querySelector('.stars');
const stars = document.querySelector('.stars').childNodes;


let secondsTimer = 0;
let minutesTimer = 0;
let hoursTimer = 0;
let counter;
let cardsCheckList = [];
let matchedCardsList = [];
let moves = 0;



const timeFormat = (value, element) => {
  if (value < 10) {
    return (element.innerHTML = `0${value}`);
  } else {
    return (element.innerHTML = `${value}`);
  }
};

const startTimer = () => {
  secondsTimer = 1;

  counter = setInterval(function () {
    seconds.innerHTML = `${secondsTimer}`;
    minutes.innerHTML = `${minutesTimer}`;
    hours.innerHTML = `${hoursTimer}`;

    timeFormat(secondsTimer, seconds);
    timeFormat(minutesTimer, minutes);
    timeFormat(hoursTimer, hours);

    secondsTimer++;
    if (secondsTimer == 60) {
      minutesTimer++;
      secondsTimer = 0;
    } else if (minutesTimer == 60) {
      hoursTimer++;
      minutesTimer = 0;
    }
  }, 1000);
};

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const buildPlayground = () => {
  cardsDeck.innerHTML = '';
  const shuffleCards = shuffle(cardsList);
  for (let i = 0; i < shuffleCards.length; i++) {
    const cardElement = document.createElement('li');
    cardElement.classList.add('card');
    cardElement.innerHTML = `<i class="${shuffleCards[i]}"></i>`;
    cardsDeck.appendChild(cardElement);
  }
  playground.addEventListener('click', startPlaying);
  playground.addEventListener('click', startTimer, {
    once: true
  });

}

const startPlaying = e => {
  const selectedCard = e.target;

  if (selectedCard.classList.contains('card') && !selectedCard.classList.contains("open", "show", "match")) {

    selectedCard.classList.add("open", "show");
    cardsCheckList.push(selectedCard);

  }
  if (cardsCheckList.length == 2) {
    movesIncrement();
    if (cardsCheckList[0].innerHTML === cardsCheckList[1].innerHTML) {
      matched();

    } else {

      setTimeout(noMatch, 700);
    }
    finish();
  }

}

const matched = () => {
  cardsCheckList[0].classList.add("match");
  cardsCheckList[1].classList.add("match");
  matchedCardsList.push(cardsCheckList[0]);
  matchedCardsList.push(cardsCheckList[1]);
  cardsCheckList = [];
}

const noMatch = () => {
  cardsCheckList[0].classList.remove("open", "show");
  cardsCheckList[1].classList.remove("open", "show");
  cardsCheckList = [];
}

const movesIncrement = () => {
  moves++;
  movesElement.innerHTML = `${moves}  Moves`;
  starsRating();
}

function starsRating() {
  // if the moves number is between 12 and 19
  if (moves === 12) {
    // change the color of the third star to grey
    stars[5].classList.add('grey');
    // if the moves number is 20 or more 
  } else if (moves === 20) {
    // change the color of the second star to grey
    stars[3].classList.add('grey');
  }
}

const finish = () => {
  if (matchedCardsList.length === 16) {
    finishTime.innerText = timer.innerText;
    finishMoves.innerHTML = movesElement.innerHTML.slice(0, 3);
    finishRating.innerHTML = starsAll.innerHTML;
    clearInterval(counter);
    modal.style.display = 'block';
  }
}

const restartGame = () => {

  moves = 0;
  cardsCheckList = [];
  matchedCardsList = [];
  secondsTimer = 0;
  minutesTimer = 0;
  hoursTimer = 0;
  movesElement.innerHTML = "0 Move";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
  hours.innerHTML = "00";

  clearInterval(counter);
  buildPlayground();

  stars[5].classList.remove('grey');
  stars[3].classList.remove('grey');
}

restart.addEventListener("click", restartGame);
btnModal.addEventListener('click', () => {
  modal.style.display = 'none';
  restartGame();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
buildPlayground();