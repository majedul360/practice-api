fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => countries(data));

const countries = (data) => {
  const section = document.querySelector(".country");
  section.classList.add("grid");
  data.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("active");
    div.innerHTML = `
    <h1>${data.name.common}</h1>
    <p>${data.capital}</p>
    <button onClick="details('${data.name.common}', '${data.population}', '${data.flags.png}')">details</button>
    `;
    section.appendChild(div);
  });
};

const details = (countryName, population, flag) => {
  /* const url = `https://restcountries.com/v3.1/name/${countryDetails}
  `;
  const detailCountry = document.querySelector(".country-details");
   
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const div = document.getElementById("div");
      div.innerHTML = `
      <h3>${data[0].name.common}</h3>
      <p>${data[0].population}</p>
      <img src="${data[0].flags.png}">
      `;
    }); */
  const div = document.getElementById("div");
  div.innerHTML = `
      <h3>${countryName}</h3>
      <p>${population}</p>
      <img src="${flag}">
      `;
};
const p = document.getElementById("p");
p.innerText = "";
