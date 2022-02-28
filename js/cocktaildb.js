const cocktailContainer = document.querySelector(".row");
const error = document.getElementById("error");
// spinner add
const spinner = document.getElementById("spinner");
document.getElementById("button").addEventListener("click", async () => {
  spinner.style.display = "block";
  cocktailContainer.textContent = "";
  const input = document.querySelector("input");
  const inputValue = input.value;
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
  );
  const cocktails = await res.json();
  if (parseInt(inputValue) <= 0 || parseInt(inputValue) > 0) {
    error.innerText = "please enter drinks name";
    cocktailContainer.textContent = "";
  } else if (cocktails.drinks === null) {
    error.innerText = "no iteam found";
    cocktailContainer.textContent = "";
  } else if (isNaN(inputValue)) {
    // empty error message
    error.innerText = "";
    const drinks = cocktails.drinks;
    drinks.forEach((drink) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.classList.add("mb-5");
      div.innerHTML = `
          <div class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${drink.strIngredient1}</h5>
              <p class="card-text">${drink.strInstructions}</p>
              <button onClick="seeDetails('${drink.idDrink}')">see details</button>
            </div>
          </div>    
      `;
      cocktailContainer.appendChild(div);
    });
  }
  // empty input field
  input.value = "";
  // spinner
  spinner.style.display = "none";
});

// see details
const seeDetails = async (id) => {
  // add spinner
  spinner.style.display = "block";
  cocktailContainer.textContent = "";
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const drinks = await res.json();
  const drink = drinks.drinks[0];
  const div = document.createElement("div");
  div.classList.add("col");
  div.classList.add("w-50");
  div.classList.add("mx-auto");

  div.innerHTML = `
    <div class="card h-100">
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${drink.strIngredient1}</h5>
      <p class="card-text">${drink.strInstructions}</p>
      <button onClick="seeDetails('${drink.idDrink}')">see details</button>
    </div>
  </div>
    `;
  cocktailContainer.appendChild(div);

  // spinner remove
  spinner.style.display = "none";
};
