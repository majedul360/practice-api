fetch("https://api.kanye.rest/")
  .then((res) => res.json())
  .then((data) => {
    const section = document.querySelector("section");
    const p = document.createElement("p");
    p.innerText = data.quote;
    section.appendChild(p);
  });
