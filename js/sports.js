const playerContainer = document.querySelector(".player-container");
const preLoader = document.getElementById("pre-loader");
document.getElementById("search-btn").addEventListener("click", () => {
  // error handleling
  document.querySelector(".error").innerText = "";
  // prloader
  preLoader.style.display = "block";
  // search input field
  const input = document.querySelector("input");
  const inputValue = input.value;
  // player container empty
  playerContainer.innerHTML = "";
  if (isNaN(inputValue)) {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`
    )
      .then((res) => res.json())
      .then((players) => displayPlayer(players));
  } else {
    if (inputValue == "") {
      document.querySelector(".error").innerText = "please fill up input field";
      // preloader
      preLoader.style.display = "none";
    } else if (inputValue <= 0 || inputValue > 0)
      document.querySelector(".error").innerText =
        "please enter your player name";
    // preloader
    preLoader.style.display = "none";
  }

  // empty input field
  input.value = "";
});

// display players in UI
const displayPlayer = (getPlayers) => {
  // error
  const players = getPlayers.player;
  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("text-center");
    div.classList.add("w-50");
    div.classList.add("mx-auto");
    div.classList.add("mb-5");
    div.innerHTML = `
  <img src="${player.strThumb}" class="mx-auto w-50" alt="...">
  <div class="card-body">
    <h5 class="card-title">${player.strPlayer}</h5>
    <p class="card-text">${player.strDescriptionEN?.slice(0, 100)}</p>
    <a href="#" onClick="seeDetails('${
      player.idPlayer
    }')" class="btn btn-primary">see details</a>
  </div>
    `;
    playerContainer.appendChild(div);
  });

  // preloader
  preLoader.style.display = "none";
};

// see details
const seeDetails = (playerId) => {
  const playerDetailsContainer = document.querySelector(".player-details");
  fetch(
    `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
  )
    .then((res) => res.json())
    .then((player) => {
      const fixPlayer = player.players[0];
      if (fixPlayer.strGender == "Male") {
        document.querySelector(".male-player").style.display = "block";
        document.querySelector(".female-player").style.display = "none";
      } else if (fixPlayer.strGender == "Female") {
        document.querySelector(".female-player").style.display = "block";
        document.querySelector(".male-player").style.display = "none";
      }

      playerDetailsContainer.innerHTML = `
  <img src="${fixPlayer.strBanner}" class="my-5 card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${fixPlayer.strPlayer}</h5>
    <p class="card-text">${fixPlayer.strDescriptionEN?.slice(0, 100)}</p>
      </div>
    `;
    });
};
