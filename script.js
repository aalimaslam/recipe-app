const makeARequest = url => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    return request;
}
const truncate = s =>{
    s.slice
}
const cardsContainer = document.querySelector(".cards-container");
function htmlToAdd(title,imageUrl,description,area,category, ingredients){
    let desc = description.slice(0,200).concat('...')
    return `
            <div class="card border p-20 my-10">
                <div class="img-container">
                    <img src="${imageUrl}" alt="thumbnail">
                </div>
                <div class="text-container">
                    <div class="title p-10">${title}</div>
                    <small class="p-10">${area} , </small>
                    <small class="p-10">${category}</small>
                    <div class="description p-10">${desc}</div>
                    <button class="cta mx-10" onclick="ctaBtn()">Read More</button>
                </div>
            </div>
            
            <form method="post" style="display:none;" action="./recipe.php">
                <input type="hidden" name="title" value="${title}">
                <input type="hidden" name="description" value="${description}">
                <input type="hidden" name="imageUrl" value="${imageUrl}">
                <input type="hidden" name="area" value="${area}">
                <input type="hidden" name="category" value="${category}">
                <input type="hidden" name="ingredients" value="${ingredients}">
                <input type="submit" id="submitBtn" />
            </form>

    `
}

window.onload = ()=>{
    let req = makeARequest("https://www.themealdb.com/api/json/v1/1/random.php");
    let ingredients = [];
    req.onload = ()=>{
        let response = JSON.parse(req.response);
        let dishName = response.meals[0].strMeal;
        let dishImageUrl = response.meals[0].strMealThumb;
        let dishInstructions = response.meals[0].strInstructions;
        let dishArea = response.meals[0].strArea
        let dishCategory = response.meals[0].strCategory
        
        for(let c = 1; c <= 10; c++){
            ingredients.push(response.meals[0]["strIngredient" + c]);
        }
        let newingredients = [...new Set(ingredients)];
        cardsContainer.innerHTML = htmlToAdd(dishName, dishImageUrl, dishInstructions, dishArea , dishCategory,newingredients);

    }
    req.send()
}

const input = document.getElementById("recipe-name");
const form = document.getElementById("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let req = makeARequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`);
    if(!req) return;
    req.onload = ()=>{
        let response = JSON.parse(req.response)
        cardsContainer.innerHTML = '';
        const ingredients = [];
        for(let i =0; i < response.meals.length; i++){
            let dishName = response.meals[i].strMeal;
            let dishImageUrl = response.meals[i].strMealThumb;
            let dishInstructions = response.meals[i].strInstructions.slice(0,200).concat('...')
            let dishArea = response.meals[i].strArea
            let dishCategory = response.meals[i].strCategory
            for(let c = 1; c <= 10; c++){
                ingredients.push(response.meals[0]["strIngredient" + c]);
            }
            let newingredients = [...new Set(ingredients)];
            cardsContainer.innerHTML += htmlToAdd(dishName, dishImageUrl, dishInstructions, dishArea , dishCategory, newingredients);
            
        }
    }
    req.send();
})



function ctaBtn(){
    document.getElementById("submitBtn").click();
}