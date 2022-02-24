const cardsContainer = document.querySelector(".row");
document.getElementById("button").addEventListener("click", () => {
  const input = document.querySelector("input");
  const inputValue = parseInt(input.value);
  const error = document.querySelector("#error");
  cardsContainer.innerText = "";
  if (isNaN(inputValue)) {
    error.innerText = "please enter a number";
    cardsContainer.innerText = "";
  } else if (inputValue == "") {
    error.innerText = "please fill up input field";
    cardsContainer.innerText = "";
  } else if (inputValue <= 0) {
    error.innerText = "please enter a positive number";
    cardsContainer.innerText = "";
  } else {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
      .then((res) => res.json())
      .then((cards) => displayCards(cards.cards));
    error.innerText = "";
  }

  input.value = "";
});

// add in ui
const displayCards = (cards) => {
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("mb-5");
    div.innerHTML = `
        <div class="card">
            <img  src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${card.value}</h5>
              <p class="card-text">${card.suit}</p>
              <button class="py-2 px-3" onClick="details('${card.code}')">see details</button>
            </div>
          </div>
        `;

    cardsContainer.appendChild(div);
  });
};

// see details
const details = (name) => {
  cardsContainer.innerText = "";
  fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
    .then((res) => res.json())
    .then((cards) => {
      const cardDetails = cards.cards.find((card) => card.code == name);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card">
            <img  src="${cardDetails.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${cardDetails.value}</h5>
              <p class="card-text">${cardDetails.suit}</p>
              <p class="card-text">${cardDetails.code}</p>
              <button class="py-2 px-3" onClick="details('${cardDetails.suit}')">see details</button>
            </div>
          </div>
      `;
      cardsContainer.appendChild(div);
    });
};
