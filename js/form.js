function mostraPassword(bottone) {
    let icone = bottone.querySelectorAll("svg");

    icone.forEach((icona) => {
        icona.classList.toggle("d-none");
    });

    let passwords = document.querySelectorAll("input.password");

    passwords.forEach((password) => {
        if (password.type == "text") {
            password.type = "password";
        } else {
            password.type = "text";
        }
    })
}

//Comportamento standard (Controlla solo il Default)
function controllaCampo(campo) {
    if (campo.checkValidity()) {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
    } else {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
    }
}

function controllaValiditaEUnicita(campo) {
    if (!campo.checkValidity() || utenteDoppio(campo.value)) {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
        if (utenteDoppio(campo.value)) {
            campo.nextElementSibling.textContent = "Email already in use";
        } else {
            campo.nextElementSibling.textContent = "Email not valid";
        }
    } else {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
    }
}

function controllaUguaglianzaPassword(password1, password2) {
    console.log(password1, password2);
    if (password1.value == password2.value) {
        password2.classList.add("is-valid");
        password2.classList.remove("is-invalid");
        return true;
    } else {
        password2.classList.remove("is-valid");
        password2.classList.add("is-invalid");;
        return false;
    }

}


//Controllo che la data non sia futura
function controllaData(date) {
    let dateValue = Date.parse(date.value);
    let today = new Date().getTime();

    if (dateValue <= today) {
        date.classList.add("is-valid");
        date.classList.remove("is-invalid");
        return true;
    } else {
        date.classList.remove("is-valid");
        date.classList.add("is-invalid");
        return false;
    }

}

function controllaERegistraUtente(form) {
    let inputs = form.querySelectorAll("input");

    for (let input of inputs) {
        if (!input.checkValidity) {
            return false; //Non inviare il form
        }
    }

    if (controllaValiditaEUnicita(form.querySelector("input#email"))) {
        return false;
    }

    if (!controllaData(form.querySelector("input#birthdate"))) {
        return false;
    }

    if (!controllaUguaglianzaPassword(form.querySelector("input#password"), form.querySelector("input#password2"))) {
        return false;
    }

    //Form è valido

    let dati = new FormData(form);

    let nuovo_utente = {
        email: dati.get("email"),
        password: dati.get("password"),
        nome: dati.get("nome"),
        cognome: dati.get("lname"),
        genere: dati.get("gender"),
        data: dati.get("date"),
        cookbook: [],
    }

    registraUtente(nuovo_utente);
    provaLogin(nuovo_utente.email, nuovo_utente.password);

    return true;

}

function controllaEModificaUtente(form) {
    let inputs = form.querySelectorAll("input");

    for (let input of inputs) {
        if (!input.checkValidity) {
            return false; //Non inviare il form
        }
    }

    if (!controllaData(form.querySelector("input#birthdate-modify"))) {
        return false;
    }

    if (!controllaUguaglianzaPassword(form.querySelector("input#password-modify"), form.querySelector("input#password2-modify"))) {
        return false;
    }

    //form valido 

    let dati = new FormData(form);

    let utente_modificato = {
        email: getUtenteLoggato().email,
        password: dati.get("password-modify"),
        nome: dati.get("nome-modify"),
        cognome: dati.get("lname-modify"),
        genere: dati.get("gender-modify"),
        data: dati.get("date-modify"),
        cookbook: getUtenteLoggato().cookbook,
    }

    console.log(utente_modificato);
    modificaDatiUtente(utente_modificato);
    return true;
}


function controllaELogin(form) {
    let dati = new FormData(form);

    let email = dati.get("email");
    let password = dati.get("password");

    if (provaLogin(email, password)) {
        document.querySelector(".login-errato").classList.add("d-none");
        return true;
    }
    document.querySelector(".login-errato").classList.remove("d-none");
    return false;
}


function controllaERegistraRecensione(form) {
    let inputs = form.querySelectorAll("input");

    for (let input of inputs) {
        if (!input.checkValidity) {
            return false; //Non inviare il form
        }
    }

    if (!controllaData(form.querySelector("input#preparation-date"))) {
        return false;
    }

    // form valido
    console.log("è valido")
    let dati = new FormData(form);

    let review = {
        title: getURLParam("id"), //id
        utente: getUtenteLoggato().email, //autore ricetta
        text: dati.get("review-text"),
        difficulty: dati.get("difficolta"),
        taste: dati.get("gusto"),
        date: dati.get("preparation-date")
    }
    
    console.log(review)
    addReview(review);



    location.reload();
    return false;
}