document.getElementById("button").addEventListener("click", () => {
  const inputValue = document.querySelector("input").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((meals) => {
      const arry = meals.meals;
      arry.forEach((meal) => {
        const cardContainer = document.querySelector(".row");
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
      <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
          </div>
      `;
        cardContainer.appendChild(div);
      });
    });
  document.querySelector("input").value = "";
});
