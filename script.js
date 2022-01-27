const makeARequest = (url) => {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  return request;
};
const cardsContainer = document.querySelector(".cards-container");
let cardCount = 0;
function htmlToAdd(title, imageUrl, description, area, category,id) {
  let desc = description.slice(0, 200).concat("...");
  return `
    <div class="card border p-20 my-10" onclick="ctaBtn()">
        <div class="img-container">
            <img src="${imageUrl}" alt="thumbnail">
            </div>
            <div class="text-container">
            <div class="title p-10">${title}</div>
            <small class="p-10">${area} , </small>
            <small class="p-10">${category}</small>
            <div class="description p-10">${desc}</div>
            <button class="cta mx-10" data-number="${id}" onclick="ctaBtn()">Read More</button>
        </div>
    </div>    
    `;
}
function formHTML(title, imageUrl, description, area, category, ingredients,id = 0){
    return `    
    <form method="post" style="display:none;" action="./recipe.php">
        <input type="hidden" name="title" value="${title}">
        <input type="hidden" name="description" value="${description}">
        <input type="hidden" name="imageUrl" value="${imageUrl}">
        <input type="hidden" name="cardCount" value="${id}">
        <input type="hidden" name="area" value="${area}">
        <input type="hidden" name="category" value="${category}">
        <input type="hidden" name="ingredients" value="${ingredients}">
        <input type="submit" class="submitBtn" />
    </form>`
}

window.onload = () => {
  let req = makeARequest("https://www.themealdb.com/api/json/v1/1/random.php");
  let ingredients = [];
  req.onload = () => {
    let response = JSON.parse(req.response);
    let dishName = response.meals[0].strMeal;
    let dishImageUrl = response.meals[0].strMealThumb;
    let dishInstructions = response.meals[0].strInstructions;
    let dishArea = response.meals[0].strArea;
    let dishCategory = response.meals[0].strCategory;

    for (let c = 1; c <= 10; c++) {
      ingredients.push(response.meals[0]["strIngredient" + c]);
    }
    let newingredients = [...new Set(ingredients)];
    cardCount++;
    cardsContainer.innerHTML = htmlToAdd(
      dishName,
      dishImageUrl,
      dishInstructions,
      dishArea,
      dishCategory,
      cardCount
    );
    cardsContainer.innerHTML += formHTML(dishName, dishImageUrl, dishInstructions, dishArea, dishCategory,newingredients,cardCount)
  };
  req.send();
};

const input = document.getElementById("recipe-name");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cardCount = 0;
  let req = makeARequest(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
  );
  req.onload = () => {
    let response = JSON.parse(req.response);
    cardsContainer.innerHTML = "";
    const ingredients = [];
    for (let i = 0; i < response.meals.length; i++) {
      let dishName = response.meals[i].strMeal;
      let dishImageUrl = response.meals[i].strMealThumb;
      let dishInstructions = response.meals[i].strInstructions;
      let dishArea = response.meals[i].strArea;
      let dishCategory = response.meals[i].strCategory;
      for (let c = 1; c <= 10; c++) {
        ingredients.push(response.meals[0]["strIngredient" + c]);
      }
    //   console.log(dishArea);
      cardCount++;
      let newingredients = [...new Set(ingredients)];
      cardsContainer.innerHTML += htmlToAdd(
        dishName,
        dishImageUrl,
        dishInstructions,
        dishArea,
        dishCategory,
        cardCount
      );
    cardsContainer.innerHTML += formHTML(dishName, dishImageUrl, dishInstructions, dishArea, dishCategory,newingredients,cardCount)
    }
  };
  req.send();
});

function ctaBtn() {
        document.querySelectorAll(".cta").forEach(e=>{            
            e.addEventListener("click",()=>{
                let cardNumber = e.getAttribute("data-number");
                document.querySelectorAll(".submitBtn")[cardNumber - 1].click()
            }) 

        })
}
