const cardContainer = document.querySelector(".row");
const mealDetailsContainer = document.querySelector(".meal-details");

document.getElementById("button").addEventListener("click", () => {
  // mealDetailsContainer empty
  mealDetailsContainer.innerHTML = "";
  // empty input field value
  const inputValue = document.querySelector("input").value;
  // empty previous meal
  cardContainer.innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((meals) => {
      const arry = meals.meals;
      arry.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
      <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
              <button onClick="seeDetails('${
                meal.idMeal
              }')">see details</button>
            </div>
          </div>
      `;
        cardContainer.appendChild(div);
      });
    });
  document.querySelector("input").value = "";
});

// see details
const seeDetails = (compareIdMeal) => {
  cardContainer.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${compareIdMeal}`)
    .then((res) => res.json())
    .then((meals) => {
      const meal = meals.meals[0];
      mealDetailsContainer.innerHTML = `
      <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(
                0,
                100
              )}</p>        
             
            </div>
          </div>
      
      `;
    });
};
