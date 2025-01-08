// Get the game board element
const board = document.querySelector(".memory-board");

// List of card colors (e.g., hexadecimal color codes)
const cardColors = [
  "#FF5733",
  "#FF5733",
  "#33FF57",
  "#33FF57",
  "#3357FF",
  "#3357FF",
  "#F1C40F",
  "#F1C40F",
  "#9B59B6",
  "#9B59B6",
  "#E74C3C",
  "#E74C3C",
  "#1ABC9C",
  "#1ABC9C",
];

// Shuffle the colors
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
}
shuffle(cardColors);

// Generate the cards on the board
cardColors.forEach((color) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.color = color;

  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundColor = color;
  card.appendChild(back);

  board.appendChild(card);
});

// Game state variables
let flippedCards = [];
let matchedCards = 0;
let preventFlipping = false;

// Event listener for card clicks
board.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");

  // Ignore clicks on already matched or flipped cards
  if (
    !clickedCard ||
    preventFlipping ||
    clickedCard.classList.contains("flipped") ||
    clickedCard.classList.contains("matched")
  ) {
    return;
  }

  flippedCards.push(clickedCard);
  clickedCard.classList.add("flipped");

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    preventFlipping = true;

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.color === secondCard.dataset.color) {
      // If cards match
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matchedCards += 2;
      flippedCards = [];
      preventFlipping = false;

      // Check if the game is complete
      if (matchedCards === cardColors.length) {
        setTimeout(
          () => alert("Congratulations! You've matched all the cards!"),
          500
        );
      }
    } else {
      // If cards do not match
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        flippedCards = [];
        preventFlipping = false;
      }, 1000);
    }
  }
});
