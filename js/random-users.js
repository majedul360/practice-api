fetch("https://randomuser.me/api/?results=5")
  .then((res) => res.json())
  .then((data) => {
    const datas = data.results;
    datas.forEach((data) => {
      console.log(datas);
      const section = document.querySelector("section");
      const img = document.createElement("img");
      img.src = data.picture.large;
      section.appendChild(img);
      const h3 = document.createElement("h3");
      h3.innerText = `${data.name.title}. ${data.name.first} ${data.name.last}`;
      section.appendChild(h3);
      const p = document.createElement("p");
      p.innerText = `${data.location.city}, ${data.location.country} `;
      section.appendChild(p);
    });
  });
