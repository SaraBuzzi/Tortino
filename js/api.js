async function random() {
    let random;
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            random = response.meals[0];
        })
        .catch(err => console.error(err));
    return random;
}


async function getByFirstLetter(letter) {
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            meals = response.meals;
        })
        .catch(err => console.error(err));
    return meals;
}

async function getByName(name) {
    let meal;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            meal = response.meals;
        })
        .catch(err => console.error(err));
    return meal;
}





async function getById(id) {
    let meal;
    await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            meal = response.meals[0];
        })
        .catch(err => console.error(err));
    return meal;
}

async function getByArea(areaName) {
    let areaRecipes;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + areaName)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            areaRecipes = response.meals;
        })
        .catch(err => console.error(err));
    return areaRecipes;
}



async function getByCategory(category) {
    let categoryRecipes;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            categoryRecipes = response.meals;
        })
        .catch(err => console.error(err));
    return categoryRecipes;
}


async function getByIngredient(ingredient) {
    let ingredientRecipes;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            ingredientRecipes = response.meals;
        })
        .catch(err => console.error(err));
    return ingredientRecipes;
}




async function getCategories() {
    let categories;
    await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            categories = response.categories;
        })
        .catch(err => console.error(err));
    return categories;
}

//container.querySelectorAll("[data-category='beef'").forEach((el ) => el.remove();)


async function getAreas() {
    let areas;
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(response => response.json())
        .then(response => {
            //Elaborazione
            areas = response.meals;
        })
        .catch(err => console.error(err));
    return areas;
}





