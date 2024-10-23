const cardsArray = [
    { name: 'A', value: 'A' },
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' },
    { name: 'H', value: 'H' }
  ];
  
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedCards = 0;
  
  const resetButton = document.getElementById('reset-btn');
  const messageElement = document.getElementById('message');
  
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear board for reset
    matchedCards = 0; // Reset matched cards count
    shuffle(cardsArray);
  
    cardsArray.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = card.value;
  
      const back = document.createElement('div');
      back.classList.add('back');
  
      cardElement.appendChild(front);
      cardElement.appendChild(back);
  
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
    });
  }
  
  function flipCard() {
    if (lockBoard || this === firstCard) return;
  
    this.classList.add('flipped');
  
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      checkForMatch();
    }
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  
    if (isMatch) {
      disableCards();
      matchedCards += 2; // Increment matched cards count
      if (matchedCards === cardsArray.length) {
        showMessage(); // Display success message when all cards are matched
      }
    } else {
      unflipCards();
    }
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
  
  function showMessage() {
    messageElement.classList.remove('hidden');
  }
  
  function hideMessage() {
    messageElement.classList.add('hidden');
  }
  
  resetButton.addEventListener('click', () => {
    hideMessage();
    createBoard();
  });
  
  document.addEventListener('DOMContentLoaded', createBoard);