const error = document.querySelector(".error");
// food container
const foodContainer = document.querySelector(".row");

document.getElementById("button").addEventListener("click", () => {
  foodContainer.innerHTML = "";
  const input = document.querySelector("input");
  const inputValue = input.value;
  if (isNaN(inputValue)) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then((res) => res.json())
      .then((meals) => {
        if (meals.meals === null) {
          error.innerText = "no iteams found";
          foodContainer.innerHTML = "";
        } else {
          const foods = meals.meals;
          foods.forEach((food) => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.classList.add("px-3");
            div.classList.add("my-4");
            div.innerHTML = `
            <div class="card h-100">
              <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">
                ${food.strInstructions.slice(0, 100)}
                </p>
                <button onClick="seeDetails('${
                  food.idMeal
                }')" class="btn btn-success">see details</button>
              </div>
            </div>
            `;

            foodContainer.appendChild(div);
          });
          // error
          error.innerHTML = "";
        }
      });
  } else {
    if (inputValue == "") {
      foodContainer.innerHTML = "";
      error.innerText = "please fill up input field";
    } else if (inputValue <= 0 || inputValue > 0) {
      foodContainer.innerHTML = "";
      error.innerText = "please enter food name only";
    }
  }
  // empty input field
  input.value = "";
});

// see details
const seeDetails = (mealId) => {
  document.querySelector(".food-details").innerHTML = "";
  document.querySelector(".food-details").classList.remove("active");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((meal) => {
      const food = meal.meals[0];
      const foodDetails = document.querySelector(".food-details");
      foodDetails.innerHTML = `
  <div class="card mb-3" style="max-width: 540px">
  <div class="row g-0">
    <i class="fa-solid fa-xmark" onClick="deleteIteam()"></i>
    <div class="col-md-4">
      <img src="${
        food.strMealThumb
      }" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${food.strMeal}</h5>
        <p class="card-text">
        ${food.strMeal}
        </p>
        <p class="card-text">
        ${food.strInstructions?.slice(0, 100)}

        </p>
      </div>
    </div>
  </div>
</div>
  `;
    });
};

//
const deleteIteam = () => {
  document.querySelector(".food-details").classList.add("active");
};
