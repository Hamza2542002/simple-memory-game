const gameContainer = document.getElementById("game-container");
const resetButton = document.getElementById("reset-button");
const message = document.getElementById("message");
const imageCount = 16;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timeoutId;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * 10);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function createCardElement(id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = id;

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.textContent = id;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

function initializeGame() {
  message.textContent = "";
  matchedPairs = 0;
  flippedCards = [];
  cards = [];
  clearTimeout(timeoutId);

  for (let i = 1; i <= imageCount / 2; i++) {
    cards.push(i);
    cards.push(i);
  }
  shuffle(cards);

  gameContainer.innerHTML = "";
  cards.forEach((id) => {
    const card = createCardElement(id);
    gameContainer.appendChild(card);
    card.addEventListener("click", handleCardClick);
  });
}

function handleCardClick(event) {
  const card = event.target.parentElement.parentElement;
  if (card.classList.contains("flipped") || flippedCards.length === 2) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 1) {
    timeoutId = setTimeout(() => {
      flippedCards[0].classList.remove("flipped");
      flippedCards = [];
    }, 5000);
  } else if (flippedCards.length === 2) {
    clearTimeout(timeoutId);
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.id === secondCard.dataset.id) {
      setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        matchedPairs++;
        if (matchedPairs === imageCount / 2) {
          message.textContent = "You win!";
        }
      }, 1000);
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
      }, 1000);
    }
    flippedCards = [];
  }
}

resetButton.addEventListener("click", () => {
  initializeGame();
  message.textContent = "";
});

initializeGame();

setTimeout(() => {
  if (matchedPairs < imageCount / 2) {
    message.textContent = "You lost!";
  }
}, 10000);
