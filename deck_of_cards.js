fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  .then(response => response.json())
  .then(data => {
    const card = data.cards[0];
    console.log(`Card drawn: ${card.value} of ${card.suit}`);
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });


  // Function to draw a card 
  let deckId;

  function drawCard() {
    if (!deckId) {
      console.log("Deck ID is not available.");
      return;
    }
  
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          console.log("No cards remaining in the deck.");
          return;
        }
        const card = data.cards[0];
        console.log(`Card drawn: ${card.value} of ${card.suit}`);
        displayCard(card);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }
  
  // Function to display card
  function displayCard(card) {
    const cardDisplay = document.getElementById("cardDisplay");
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerText = `${card.value} of ${card.suit}`;
    cardDisplay.appendChild(cardElement);
  }
  
  // Make a request to create a new deck
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      console.log("New deck created with ID:", deckId);
    })
    .catch(error => {
      console.log("Error creating new deck:", error);
    });
  
  // Event listener for the draw card button
  document.getElementById("drawCardBtn").addEventListener("click", drawCard);
  