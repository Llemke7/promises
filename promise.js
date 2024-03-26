//fact about favorite number (7)
function getFavoriteNumberFact() {
    const favoriteNumber = 7;
    const apiUrl = `http://numbersapi.com/${favoriteNumber}/trivia`;
  
    fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        document.getElementById("favoriteNumberFact").innerText = data;
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }
  
  // Get data on multiple numbers in a single request
  function getMultipleNumbersFacts() {
    const numbers = [3, 5, 7, 9];
    const apiUrl = `http://numbersapi.com/${numbers.join(",")}/trivia`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById("multipleNumbersFacts").innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }
  
  // Get 4 facts about the favorite number (7)
  function getUniqueFacts() {
    const favoriteNumber = 7;
    const numFacts = 4;
    const apiUrl = `http://numbersapi.com/${favoriteNumber}/trivia`;
  
    function fetchFact() {
      return fetch(apiUrl).then(response => response.text());
    }
  
    function getUniqueFacts(number, numFacts) {
      const facts = [];
      const promises = [];
  
      for (let i = 0; i < numFacts; i++) {
        promises.push(fetchFact());
      }
  
      return Promise.all(promises)
        .then(results => {
          results.forEach(fact => {
            if (!facts.includes(fact)) {
              facts.push(fact);
            }
          });
          return facts;
        });
    }
  
    getUniqueFacts(favoriteNumber, numFacts)
      .then(uniqueFacts => {
        document.getElementById("uniqueFacts").innerText = JSON.stringify(uniqueFacts, null, 2);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
  
  // Attach event listeners to buttons
  document.getElementById("btnFact1").addEventListener("click", getFavoriteNumberFact);
  document.getElementById("btnFact2").addEventListener("click", getMultipleNumbersFacts);
  document.getElementById("btnFact3").addEventListener("click", getUniqueFacts);
  