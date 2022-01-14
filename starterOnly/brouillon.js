/* const validChoix = city.addEventListener("change", function () {
  if (city.checked) {
    newYork.style.border = "2px solid green";
    isValid = true;
  } else {
    newYork.style.border = "2px solid red";
    isValid = false;
  }
});

validChoix();
 */

/* prenom.addEventListener("input", (e) => {
  if (/[a-zA-Z]{2,}/g.test(e.target.value)) {
    messageError.innerText = " ";
    prenom.style.border = "2px solid green";
    isValid = true;
  } else {
    prenom.style.border = "2px solid red";
    messageError.innerText = nameError;
    isValid = false;
    //e.preventDefault;
  }
}); */

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthDate");
const quantity = document.getElementById("quantity");
const city = document.querySelectorAll("input[type=radio]");

// DOM Elements - affichage des messages d'erreur
const messageErrorPrenom = document.querySelector(".message-error-prenom");
const messageErrorNom = document.querySelector(".message-error-nom");
const messageErrorEmail = document.querySelector(".message-error-email");
const messageErrorDate = document.querySelector(".message-error-date");
const messageErrorCity = document.querySelector(".message-error-city");

// REGEX
const regexName = /[a-zA-Z]{2,}/g;
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
/*  /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/; */

// MESSAGE D'ERREUR
let msgNameError = "Veuillez entrer 3 caractères ou plus dans ce champ.";
let msgEmailError = "Veuillez entrer une adresse mail valide.";
let msgDateError = "Vous devez entrer votre date de naissance.";
let msgCityError = "Vous devez choisir une ville.";
let msgCgvError = "Vous devez lire et accepter les conditions d'utilisation.";

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modal.style.display = "block";
}
// CONDITIONS DE VALIDATION DES ELEMENTS NOM, PRENOM, EMAL, DATE DE NAISSANCE
class ElementFormValid {
  constructor(elementForm, regexError, affichageMessage, messageElementError) {
    this.elementForm = elementForm;
    this.regexError = regexError;
    this.affichageMessage = affichageMessage;
    this.messageElementError = messageElementError;
  }
}

const prenomValid = new ElementFormValid(
  prenom,
  regexName,
  messageErrorPrenom,
  msgNameError
);
const nomValid = new ElementFormValid(
  nom,
  regexName,
  messageErrorNom,
  msgNameError
);
const emailValid = new ElementFormValid(
  email,
  regexEmail,
  messageErrorEmail,
  msgEmailError
);
const dateValid = new ElementFormValid(
  birthDate,
  regexDate,
  messageErrorDate,
  msgDateError
);

const ElementsFormValid = [prenomValid, nomValid, emailValid, dateValid];

function validElementForm(ElementFormValid) {
  ElementFormValid.elementForm.addEventListener("input", (e) => {
    if (ElementFormValid.regexError.test(e.target.value)) {
      ElementFormValid.affichageMessage.innerText = " ";
      ElementFormValid.elementForm.style.border = "2px solid green";
      isValid = true;
    } else {
      ElementFormValid.elementForm.style.border = "2px solid red";
      ElementFormValid.affichageMessage.innerText =
        ElementFormValid.messageElementError;
      isValid = false;
    }
  });
}

validElementForm(prenomValid, nomValid, emailValid, dateValid);

// // CONDITIONS DE VALIDATION DES ELEMENTS CHOIX DE LA VILLE DU TOURNOIS

// for (i = 0; i < city.length; i++) {
//   city[i].addEventListener("change", citiesValidation(e) => {
//     //boucle qui vérifie chaque bouton radio
//     if (city[i].checked) {
//       isValid = true;
//     } else {
//       messageErrorCity.innerText = msgCityError;
//       isValid = false;
//     }
//   }
// });

// citiesValidation();
