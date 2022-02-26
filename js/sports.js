const player = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=messi")
    .then((res) => res.json())
    .then((player) => {
      const section = document.querySelector("section");
      const players = player.player;
      console.log(players);
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${players[0].strThumb}"/>
        <h3>${players[0].strPlayer}</h3>
        <p>${players[0].strBirthLocation}</p>
        <p>${players[0].strDescriptionEN.slice(0, 100)}</p>
        `;
      section.appendChild(div);
    });
};

player();
