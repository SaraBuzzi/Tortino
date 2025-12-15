
//Controllo Login
if (getUtenteLoggato()) {
    let elementi_loggato = document.querySelectorAll(".loggato");
    let elementi_non_loggato = document.querySelectorAll(".non-loggato");
    elementi_loggato.forEach((el) => el.classList.remove("d-none"));
    elementi_non_loggato.forEach((el) => el.classList.add("d-none"));
}


//Return the Param 'name' in the URL of the window
function getURLParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function pickRandom(array) {
    let element;
    element = array[Math.floor(Math.random() * array.length)];
    return element;
}

//categoria checkata
async function toggleCategoryCards(input) {
    let category_name = input.id;
    let slider_categorie = document.querySelector("#sliding_window_categorie");
    let slider_container = document.querySelector("#" + slider_categorie.getAttribute("data-slider-for"));
    let template_container = document.querySelector("#template_8cards_category");

    //Verifico toggle on / off
    if (!input.checked) {
        //Toggle OFF => Elimino le card (solo se c'è almeno un'altra categoria selezionata)
        if (document.querySelectorAll("#categories_input > .form-check > input:checked").length > 0) {
            let container_da_eliminare = document.querySelectorAll("[data-category='" + category_name + "']");
            container_da_eliminare.forEach((container) => container.parentElement.remove());
        } else {
            input.checked = true;
        }
        //Reset to first slide
        slider_container.setAttribute("data-slider-current", 1);
        slider_container.querySelector("button.previous").click();
        return;
    }

    //Toggle ON => Inserisco le card
    let recipes = await getByCategory(category_name);
    let container, i, count_containers = 0;
    for (i = 0; i < recipes.length || i % 8 != 0; i++) {
        // se è finito lo spazio del container da 8 carte, lo aggiungo e ne creo un altro
        if (i % 8 == 0) {
            if (container) {
                container.querySelector(".cards8").setAttribute("data-category", category_name);
                container.querySelector(".category-name").textContent = category_name;
                slider_categorie.appendChild(container);
                count_containers++;
            }
            container = template_container.content.cloneNode(true);
        }
        if (i >= recipes.length) {
            //Crea recipe INVISIBILE e appendi al container corrente
            let card = creaCard(recipes[0], "");
            card.querySelector("*").style.visibility = "hidden";
            container.querySelector(".cards8").appendChild(card);
        } else {
            //Crea recipe e appendi al container corrente
            let card = creaCard(recipes[i], "");
            container.querySelector(".cards8").appendChild(card);
        }
    }
    container.querySelector(".cards8").setAttribute("data-category", category_name);
    container.querySelector(".category-name").textContent = category_name;
    slider_categorie.appendChild(container);
    count_containers++;
    slider_container.setAttribute("data-slider-current", slider_categorie.querySelectorAll("[data-slider-scope='card']").length - count_containers);
    slider_container.querySelector("button.next").click();
    slider_container.querySelector("button.previous").click();
}


//categoria checkata
async function toggleAreaCards(input) {
    let area_name = input.id;
    let slider_area = document.querySelector("#sliding_window_area");
    let slider_container = document.querySelector("#" + slider_area.getAttribute("data-slider-for"));
    let template_container = document.querySelector("#template_8cards_area");

    //Verifico toggle on / off
    if (!input.checked) {
        //Toggle OFF => Elimino le card (solo se c'è almeno un'altra categoria selezionata)
        if (document.querySelectorAll("#areas_input > .form-check > input:checked").length > 0) {
            let container_da_eliminare = document.querySelectorAll("[data-area='" + area_name + "']");
            container_da_eliminare.forEach((container) => container.parentElement.remove());
        } else {
            input.checked = true;
        }
        //Reset to first slide
        slider_container.setAttribute("data-slider-current", 1);
        slider_container.querySelector("button.previous").click();
        return;
    }

    //Toggle ON => Inserisco le card
    let recipes = await getByArea(area_name);
    let container, i, count_containers = 0;
    for (i = 0; i < recipes.length || i % 8 != 0; i++) {
        // se è finito lo spazio del container da 8 carte, lo aggiungo e ne creo un altro
        if (i % 8 == 0) {
            if (container) {
                container.querySelector(".cards8").setAttribute("data-area", area_name);
                container.querySelector(".area-name").textContent = area_name;
                slider_area.appendChild(container);
                count_containers++;
            }
            container = template_container.content.cloneNode(true);
        }
        if (i >= recipes.length) {
            //Crea recipe INVISIBILE e appendi al container corrente
            let card = creaCard(recipes[0], "");
            card.querySelector("*").style.visibility = "hidden";
            container.querySelector(".cards8").appendChild(card);
        } else {
            //Crea recipe e appendi al container corrente
            let card = creaCard(recipes[i], "");
            container.querySelector(".cards8").appendChild(card);
        }
    }
    container.querySelector(".cards8").setAttribute("data-area", area_name);
    container.querySelector(".area-name").textContent = area_name;
    slider_area.appendChild(container);
    count_containers++;
    slider_container.setAttribute("data-slider-current", slider_area.querySelectorAll("[data-slider-scope='card']").length - count_containers);
    slider_container.querySelector("button.next").click();
    slider_container.querySelector("button.previous").click();
}





const recipe_note = document.getElementById('recipe-note')
if (recipe_note) {
    recipe_note.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const recipe_id = button.getAttribute('data-recipe')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.

        // Update the modal's content.
        const saveButton = recipe_note.querySelector('.save-recipe')

        saveButton.setAttribute("data-recipe", recipe_id);
    })
}

function saveRecipe(button) {

    let recipe_id = button.getAttribute("data-recipe");

    let saved_recipe = {
        id: recipe_id,
        text: document.querySelector("#note-text").value
    }

    addToCookbook(saved_recipe);

    let cards = document.querySelectorAll(".card:has(svg[data-recipe='"+recipe_id+"'])")
    cards.forEach((card) => {
        card.toggleAttribute("data-saved")
    })
    document.querySelector("#note-text").value = "";

}

function saveReview() {
    let review_info = document.querySelector("#review_info")

    if (!controllaData(review_info.querySelector("input#preparation-date"))) {
        //non invia la recensione
        return false;
    }

    let review = {
        title: getURLParam("id"), //id
        utente: getUtenteLoggato().email, //autore ricetta
        text: review_info.querySelector("#recipe-review").value,
        difficulty: parseInt(review_info.querySelector("#difficoltà").value) + 1,
        taste: parseInt(review_info.querySelector("#gusto").value) + 1,
        date: review_info.querySelector("#preparation-date").value
    }

    addReview(review);

    location.reload();

}




//ricerca per nome
async function search(ricerca) {
    document.querySelector("#ricerca").classList.remove("d-none");
    let container = document.querySelector("#risultati_ricerca");

    let meals = await getByName(ricerca);

    //ricerca per nome
    if (meals) {
        for (let meal of meals) {
            let card = creaCard(meal, "");
            card.querySelector("*").setAttribute("data-slider-scope", "card");
            container.appendChild(card);
        }
        //ricerca per lettera
    } else {
        meals = await getByFirstLetter(ricerca);
        if (meals) {
            for (let meal of meals) {
                let card = creaCard(meal, "");
                card.querySelector("*").setAttribute("data-slider-scope", "card");
                container.appendChild(card);
            }
        }
    }
    if (container.childElementCount < 4) {
        document.querySelector("#" + container.getAttribute("data-slider-for")).querySelector("button.next").disabled = true;
    }
}

function modificaNota(area) {
    let id = area.getAttribute("data-recipe")
    let text = area.value

    modCookbook(id, text);
    area.disabled = true;

}

//Per index prefisso = "pag/", per gli altri prefisso = ""
function creaCard(dati, prefisso) {
    let template_card = document.querySelector("#t-card");
    let card = template_card.content.cloneNode(true);
    card.querySelector(".card-img").src = dati.strMealThumb;
    card.querySelector(".card-title").textContent = dati.strMeal;
    card.querySelector(".card-link").href = prefisso + "ricetta.html?id=" + dati.idMeal;
    card.querySelector(".comment-link").href = prefisso + "ricetta.html?id=" + dati.idMeal + "&reviews=true";
    card.querySelector(".bi-suit-heart").setAttribute("data-recipe", dati.idMeal);
    card.querySelector(".bi-suit-heart-fill").setAttribute("data-recipe", dati.idMeal);

    if (getUtenteLoggato()) {
       if (getUtenteLoggato().cookbook.filter((el) => el.id == dati.idMeal).length >= 1)
        card.querySelector("*").toggleAttribute("data-saved"); 
    }
    
    return card;
}







